import { nosqlLevels } from '../src/data/nosql/levels.js';
import { initMongo, initNoSQLSampleData, executeMongo } from '../backend/db.js';

function extractScriptFromHint(hint) {
  if (!hint) return null;
  const s = String(hint).trim();
  const idx = s.toLowerCase().indexOf('try:');
  const script = idx >= 0 ? s.slice(idx + 'try:'.length).trim() : s;
  return script || null;
}

async function resetAuditUsers(mongoDb) {
  const sample = mongoDb.collection('sample_users');
  const audit = mongoDb.collection('audit_users');
  const docs = await sample.find({}).toArray();
  await audit.deleteMany({});
  if (docs.length) {
    await audit.insertMany(docs.map(d => {
      const c = { ...d };
      delete c._id;
      return c;
    }));
  }
}

function rewriteToAuditUsers(script) {
  return String(script).replace(/\bdb\.users\./g, 'db.audit_users.');
}

async function runParser(mongoDb, query) {
  const statements = query.split(';').map(s => s.trim()).filter(s => s.length > 0);
  const results = [];

  const parseJson = (str) => {
    try {
      const fixed = str.trim().replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
      return JSON.parse(fixed || '{}');
    } catch (e) { return {}; }
  };

  for (let statement of statements) {
    const mainMatch = statement.match(/^db\.(\w+)\.(.+)$/);
    if (!mainMatch) {
      results.push({ success: false, error: `Invalid syntax: ${statement}` });
      continue;
    }

    const [, col, chain] = mainMatch;
    const collection = mongoDb.collection(col);

    const regex = /(\w+)\(([^)]*)\)/g;
    let match;
    const calls = [];
    while ((match = regex.exec(chain)) !== null) {
      calls.push({ op: match[1], argsStr: match[2] });
    }

    if (calls.length === 0) {
      results.push({ success: false, error: `No op found: ${statement}` });
      continue;
    }

    let cursorOrResult = collection;
    let isCursor = true;
    let finalData = null;

    for (let i = 0; i < calls.length; i++) {
      const { op, argsStr } = calls[i];
      const args = argsStr.split(/,(?![^{]*})/).map(parseJson);

      if (op === 'find') {
        cursorOrResult = cursorOrResult.find(args[0] || {});
      } else if (op === 'findOne') {
        finalData = [await cursorOrResult.findOne(args[0] || {})];
        isCursor = false;
        break;
      } else if (op === 'insert' || op === 'insertOne') {
        const res = await cursorOrResult.insertOne(args[0] || {});
        finalData = [{ message: 'Inserted', id: res.insertedId }];
        isCursor = false;
        break;
      } else if (op === 'update' || op === 'updateOne') {
        const res = await cursorOrResult.updateOne(args[0] || {}, args[1] || {});
        finalData = [{ message: 'Updated', matched: res.matchedCount, modified: res.modifiedCount }];
        isCursor = false;
        break;
      } else if (op === 'remove' || op === 'deleteOne') {
        const res = await cursorOrResult.deleteOne(args[0] || {});
        finalData = [{ message: 'Deleted', count: res.deletedCount }];
        isCursor = false;
        break;
      } else if (op === 'sort' && isCursor) {
        cursorOrResult = cursorOrResult.sort(args[0] || {});
      } else if (op === 'limit' && isCursor) {
        cursorOrResult = cursorOrResult.limit(parseInt(args[0]) || 20);
      } else if (op === 'count') {
        const n = await (isCursor && cursorOrResult.countDocuments ? cursorOrResult.countDocuments(args[0] || {}) : cursorOrResult.count());
        finalData = [{ count: n }];
        isCursor = false;
        break;
      } else if (op === 'aggregate') {
        const pipeline = Array.isArray(args[0]) ? args[0] : [args[0]];
        finalData = await cursorOrResult.aggregate(pipeline).toArray();
        isCursor = false;
        break;
      }
    }

    if (isCursor && cursorOrResult.toArray) {
      finalData = await cursorOrResult.limit(20).toArray();
    }

    results.push({ success: true, data: (finalData || []).filter(d => d !== null) });
  }

  return results;
}

async function main() {
  const levels = nosqlLevels.filter(l => l && l.type === 'NoSQL');
  const questions = levels.flatMap(l => (l.questions || []).map(q => ({ levelId: l.id, q })));

  console.log('=== NoSQL Hint Smoke Test ===');
  console.log('NoSQL levels:', levels.length);
  console.log('NoSQL questions:', questions.length);

  await initMongo();
  await initNoSQLSampleData();

  const failures = [];

  await executeMongo(async (mongoDb) => {
    await resetAuditUsers(mongoDb);

    for (const { levelId, q } of questions) {
      const script = extractScriptFromHint(q.hint);
      if (!script) {
        failures.push({ levelId, id: q.id, reason: 'No hint script' });
        continue;
      }

      const rewritten = rewriteToAuditUsers(script);

      try {
        await runParser(mongoDb, rewritten);
      } catch (e) {
        failures.push({
          levelId,
          id: q.id,
          text: q.text,
          script: rewritten,
          message: e && e.message
        });
      }
    }
  });

  console.log('\n=== Results ===');
  console.log('✅ Passed:', questions.length - failures.length);
  console.log('❌ Failed:', failures.length);

  if (failures.length) {
    console.log('\n--- Failures ---');
    console.table(failures.map(f => ({ level: f.levelId, qid: f.id, message: (f.message || f.reason || '').slice(0, 120) })));
    process.exit(1);
  }

  console.log('\n✅ NoSQL smoke test passed.');
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
