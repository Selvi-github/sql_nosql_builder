import { sqlLevels } from '../src/data/levels.js';
import { initSql, executeSql } from '../backend/db.js';

function extractSqlFromHint(hint) {
  if (!hint) return null;
  const s = String(hint).trim();
  const idx = s.toLowerCase().indexOf('try using:');
  const sql = idx >= 0 ? s.slice(idx + 'try using:'.length).trim() : s;
  return sql || null;
}

function isProbablyReadOnly(sql) {
  // We allow most statements, but we want to avoid destructive ones in smoke tests.
  const t = String(sql || '').trim().toLowerCase();
  if (!t) return false;
  // Block obviously destructive statements.
  return !/\b(drop\s+table|truncate\s+table|alter\s+table|create\s+table|create\s+view|drop\s+view)\b/i.test(t);
}

function isDml(sql) {
  const t = String(sql || '').trim().toLowerCase();
  return /^\s*(insert|update|delete)\b/i.test(t);
}

async function main() {
  const levels = sqlLevels.filter(l => l && l.type === 'SQL' && l.id >= 1 && l.id <= 10);
  const questions = levels.flatMap(l => (l.questions || []).map(q => ({ levelId: l.id, q })));

  console.log('=== SQL Hint Smoke Test (Levels 1-10) ===');
  console.log('Levels:', levels.length);
  console.log('Questions:', questions.length);

  const init = await initSql();
  if (!init || !init.success) {
    console.error('❌ initSql failed:', init);
    process.exit(2);
  }

  const failures = [];
  const skipped = [];

  for (const { levelId, q } of questions) {
    const sql = extractSqlFromHint(q.hint);
    if (!sql) {
      skipped.push({ levelId, id: q.id, reason: 'No hint SQL' });
      continue;
    }

    // Skip DDL-ish statements (unsafe to run against shared cloud DB).
    if (!isProbablyReadOnly(sql)) {
      skipped.push({ levelId, id: q.id, reason: 'DDL statement blocked', sql });
      continue;
    }

    try {
      if (isDml(sql)) {
        // Execute DML in a transaction and rollback to avoid persistent changes.
        await executeSql(`START TRANSACTION; ${sql.replace(/;\s*$/, ';')} ROLLBACK;`);
      } else {
        await executeSql(sql);
      }
    } catch (e) {
      failures.push({
        levelId,
        id: q.id,
        text: q.text,
        sql,
        code: e && e.code,
        message: e && e.message
      });
    }
  }

  console.log('\n=== Results ===');
  console.log('✅ Passed:', questions.length - failures.length - skipped.length);
  console.log('⚠️ Skipped:', skipped.length);
  console.log('❌ Failed:', failures.length);

  if (skipped.length) {
    console.log('\n--- Skipped ---');
    console.table(skipped.map(s => ({ level: s.levelId, qid: s.id, reason: s.reason })));
  }

  if (failures.length) {
    console.log('\n--- Failures ---');
    console.table(failures.map(f => ({ level: f.levelId, qid: f.id, code: f.code, message: (f.message || '').slice(0, 120) })));
    // Print full details for the first few.
    for (const f of failures.slice(0, 5)) {
      console.log(`\n[Level ${f.levelId} | Q${f.id}] ${f.text}`);
      console.log('SQL:', f.sql);
      console.log('Error:', f.code || '', f.message || '');
    }
    process.exit(1);
  }

  console.log('\n✅ Smoke test passed (safe hints only).');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
