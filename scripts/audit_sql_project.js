import { sqlLevels } from '../src/data/levels.js';
import { sqlDefinitions } from '../src/blocks/sql/definitions.js';
import { sqlGenerators } from '../src/blocks/sql/generators.js';

function toSet(arr) {
  return new Set((arr || []).map(String));
}

function uniq(arr) {
  return [...new Set(arr)];
}

function countQuestions(levels) {
  return levels.reduce((acc, lvl) => acc + (Array.isArray(lvl.questions) ? lvl.questions.length : 0), 0);
}

function printHeader(title) {
  console.log('\n=== ' + title + ' ===');
}

function getBlockTypesFromDefinitions() {
  return toSet(sqlDefinitions.map(d => d && d.type).filter(Boolean));
}

function getBlockTypesFromGenerators() {
  // We only need the keys, not to execute any generator.
  const dummy = {
    ORDER_ATOMIC: 0,
    ORDER_NONE: 0,
    ORDER_LOGICAL_AND: 0,
    valueToCode: () => '',
    statementToCode: () => ''
  };
  const genMap = sqlGenerators(dummy);
  return toSet(Object.keys(genMap || {}));
}

function getAllowedBlocks(levels) {
  const out = [];
  for (const lvl of levels) {
    for (const q of lvl.questions || []) {
      for (const b of q.allowedBlocks || []) out.push(String(b));
    }
  }
  return uniq(out).sort();
}

function assertUniqueQuestionIds(levels) {
  const seen = new Set();
  const dupes = [];
  for (const lvl of levels) {
    for (const q of lvl.questions || []) {
      const id = q && q.id;
      if (id === undefined || id === null) continue;
      if (seen.has(id)) dupes.push(id);
      seen.add(id);
    }
  }
  return uniq(dupes);
}

function main() {
  if (!Array.isArray(sqlLevels) || sqlLevels.length === 0) {
    console.error('❌ sqlLevels not found or empty');
    process.exit(1);
  }

  const defs = getBlockTypesFromDefinitions();
  const gens = getBlockTypesFromGenerators();
  const allowed = getAllowedBlocks(sqlLevels);

  printHeader('SQL Levels Summary');
  console.log('SQL levels:', sqlLevels.length);
  console.log('SQL questions:', countQuestions(sqlLevels));

  const first10 = sqlLevels.filter(l => l.id >= 1).filter(l => l.id <= 10);
  console.log('Levels 1-10:', first10.length);
  console.table(first10.map(l => ({ level: l.id, questions: Array.isArray(l.questions) ? l.questions.length : 0 })));
  console.log('Total Q (1-10):', countQuestions(first10));

  if (process.env.SQL_DISTRIBUTION_SPEC === 'true') {
    printHeader('Expected Distribution Check (SQL_DISTRIBUTION_SPEC=true)');
    // Spec: L1=30, L2=30, L3-10=10 each.
    const expected = new Map();
    expected.set(1, 30);
    expected.set(2, 30);
    for (let i = 3; i <= 10; i++) expected.set(i, 10);
    const mismatches = [];
    for (const [lvlId, exp] of expected.entries()) {
      const level = first10.find(l => l.id === lvlId);
      const actual = level && Array.isArray(level.questions) ? level.questions.length : 0;
      if (actual !== exp) mismatches.push({ level: lvlId, expected: exp, actual });
    }
    if (mismatches.length) {
      console.log('⚠️ Level question-count mismatches detected:');
      console.table(mismatches);
    } else {
      console.log('✅ Level question-count distribution matches the spec.');
    }
  }

  printHeader('Question Integrity');
  const dupes = assertUniqueQuestionIds(sqlLevels);
  if (dupes.length) {
    console.log('❌ Duplicate question IDs found:', dupes.join(', '));
  } else {
    console.log('✅ All question IDs are unique.');
  }

  const missingAllowedBlocks = [];
  const missingGenerators = [];
  for (const b of allowed) {
    if (!defs.has(b)) missingAllowedBlocks.push(b);
    if (!gens.has(b)) missingGenerators.push(b);
  }

  printHeader('Blockly Block Coverage');
  console.log('Unique allowedBlocks referenced:', allowed.length);
  console.log('Defined SQL blocks:', defs.size);
  console.log('SQL generators:', gens.size);

  if (missingAllowedBlocks.length) {
    console.log('❌ Missing block definitions (in src/blocks/sql/definitions.js):');
    console.log(missingAllowedBlocks.join('\n'));
  } else {
    console.log('✅ All allowedBlocks have definitions.');
  }

  if (missingGenerators.length) {
    console.log('❌ Missing block generators (in src/blocks/sql/generators.js):');
    console.log(missingGenerators.join('\n'));
  } else {
    console.log('✅ All allowedBlocks have generators.');
  }

  // Fail the audit if critical issues exist.
  const hasCritical = dupes.length || missingAllowedBlocks.length || missingGenerators.length;
  if (hasCritical) process.exit(1);

  console.log('\n✅ SQL project audit passed.');
}

main();
