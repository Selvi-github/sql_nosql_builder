import { sqlLevels } from '../src/data/levels.js';
import { initSql, executeSql } from '../backend/db.js';

const SWEEP_USER = 'sweep_user';
const FREE_PREFIX = process.env.SQL_FREE_DB_PREFIX || 'qa_free_';

function extractSqlFromHint(hint) {
  if (!hint) return null;
  const s = String(hint).trim();
  const idx = s.toLowerCase().indexOf('try using:');
  const sql = idx >= 0 ? s.slice(idx + 'try using:'.length).trim() : s;
  return sql || null;
}

function isDdl(sql) {
  return /\b(create\s+table|alter\s+table|drop\s+table|truncate\s+table|create\s+view|drop\s+view|create\s+procedure|create\s+function|create\s+trigger|drop\s+procedure|drop\s+function|drop\s+trigger)\b/i.test(String(sql || ''));
}

function isDml(sql) {
  return /^\s*(insert|update|delete)\b/i.test(String(sql || ''));
}

async function getActiveDbName(options) {
  const res = await executeSql('SELECT DATABASE() AS db', options);
  const first = Array.isArray(res) ? res[0] : null;
  const row = first && first.data && first.data[0] ? first.data[0] : null;
  return row && row.db ? String(row.db) : '';
}

async function runPass(passName, options, allowDdlWhenFree) {
  const levels = sqlLevels.filter(l => l && l.type === 'SQL');
  const questions = levels.flatMap(l => (l.questions || []).map(q => ({ levelId: l.id, q })));

  console.log(`=== SQL Full Sweep (${passName}) ===`);
  console.log('Levels:', levels.length);
  console.log('Questions:', questions.length);

  const failures = [];
  const skipped = [];

  let activeDb = '';
  try {
    activeDb = await getActiveDbName(options);
  } catch (e) {
    console.warn('⚠️ Could not detect active database:', e && e.message ? e.message : String(e));
  }

  const freeDbOk = activeDb.startsWith(FREE_PREFIX);
  if (allowDdlWhenFree && !freeDbOk) {
    console.warn(`⚠️ Free-mode DB prefix not active (${activeDb || 'unknown'}). DDL will be skipped.`);
  }

  for (const { levelId, q } of questions) {
    const sql = extractSqlFromHint(q.hint);
    if (!sql) {
      skipped.push({ levelId, id: q.id, reason: 'No hint SQL' });
      continue;
    }

    if (isDdl(sql) && allowDdlWhenFree && !freeDbOk) {
      skipped.push({ levelId, id: q.id, reason: 'DDL skipped (shared DB)', sql });
      continue;
    }

    try {
      if (isDml(sql)) {
        await executeSql(`START TRANSACTION; ${sql.replace(/;\s*$/, ';')} ROLLBACK;`, options);
      } else {
        await executeSql(sql, options);
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
    for (const f of failures.slice(0, 5)) {
      console.log(`\n[Level ${f.levelId} | Q${f.id}] ${f.text}`);
      console.log('SQL:', f.sql);
      console.log('Error:', f.code || '', f.message || '');
    }
    return false;
  }

  console.log('\n✅ SQL sweep passed.');
  return true;
}

async function main() {
  const init = await initSql();
  if (!init || !init.success) {
    console.error('❌ initSql failed:', init);
    process.exit(2);
  }

  const learnOk = await runPass('LEARN', { mode: 'LEARN', userId: SWEEP_USER }, false);
  const freeOk = await runPass('FREE', { mode: 'FREE', userId: SWEEP_USER }, true);

  if (!learnOk || !freeOk) process.exit(1);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
