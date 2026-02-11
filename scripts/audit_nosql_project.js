import { nosqlLevels } from '../src/data/nosql/levels.js';
import { nosqlDefinitions } from '../src/blocks/nosql/definitions.js';
import { nosqlGenerators } from '../src/blocks/nosql/generators.js';

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
  return toSet(nosqlDefinitions.map(d => d && d.type).filter(Boolean));
}

function getBlockTypesFromGenerators() {
  const dummy = {
    ORDER_ATOMIC: 0,
    valueToCode: () => ''
  };
  const genMap = nosqlGenerators(dummy);
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
  if (!Array.isArray(nosqlLevels) || nosqlLevels.length === 0) {
    console.error('❌ nosqlLevels not found or empty');
    process.exit(1);
  }

  const defs = getBlockTypesFromDefinitions();
  const gens = getBlockTypesFromGenerators();
  const allowed = getAllowedBlocks(nosqlLevels);

  printHeader('NoSQL Levels Summary');
  console.log('NoSQL levels:', nosqlLevels.length);
  console.log('NoSQL questions:', countQuestions(nosqlLevels));
  console.table(nosqlLevels.map(l => ({ level: l.id, questions: Array.isArray(l.questions) ? l.questions.length : 0 })));

  printHeader('Question Integrity');
  const dupes = assertUniqueQuestionIds(nosqlLevels);
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
  console.log('Defined NoSQL blocks:', defs.size);
  console.log('NoSQL generators:', gens.size);

  if (missingAllowedBlocks.length) {
    console.log('❌ Missing block definitions (in src/blocks/nosql/definitions.js):');
    console.log(missingAllowedBlocks.join('\n'));
  } else {
    console.log('✅ All allowedBlocks have definitions.');
  }

  if (missingGenerators.length) {
    console.log('❌ Missing block generators (in src/blocks/nosql/generators.js):');
    console.log(missingGenerators.join('\n'));
  } else {
    console.log('✅ All allowedBlocks have generators.');
  }

  const hasCritical = dupes.length || missingAllowedBlocks.length || missingGenerators.length;
  if (hasCritical) process.exit(1);

  console.log('\n✅ NoSQL project audit passed.');
}

main();
