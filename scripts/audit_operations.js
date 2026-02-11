import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawPath = path.join(__dirname, '../src/data/raw_nosql.txt');
const raw = fs.readFileSync(rawPath, 'utf8');

// Extract all MongoDB operations
const operations = new Set();
const operationPattern = /db\.users\.([\w]+)\(/g;
let match;

while ((match = operationPattern.exec(raw)) !== null) {
    operations.add(match[1]);
}

console.log('\n=== MongoDB Operations Found in Raw Questions ===\n');
console.log(`Total unique operations: ${operations.size}\n`);

const sortedOps = [...operations].sort();
sortedOps.forEach(op => {
    const count = (raw.match(new RegExp(`db\\.users\\.${op}\\(`, 'g')) || []).length;
    console.log(`  ${op}: ${count} occurrences`);
});

// Map operations to required blocks
const operationToBlock = {
    'find': 'nosql_find',
    'findOne': 'nosql_find_one',
    'insert': 'nosql_insert',
    'insertOne': 'nosql_insert',
    'insertMany': 'nosql_insert',
    'update': 'nosql_update',
    'updateOne': 'nosql_update',
    'updateMany': 'nosql_update',
    'remove': 'nosql_delete',
    'deleteOne': 'nosql_delete',
    'deleteMany': 'nosql_delete',
    'aggregate': 'nosql_aggregate',
    'distinct': 'nosql_distinct',
    'countDocuments': 'nosql_count',
    'count': 'nosql_count',
    'sort': 'nosql_sort',
    'limit': 'nosql_limit',
    'skip': 'nosql_skip',
    'project': 'nosql_project',
    'createIndex': 'nosql_index',
    'dropIndex': 'nosql_index',
    'getIndexes': 'nosql_index',
    'renameCollection': 'nosql_admin',
    'drop': 'nosql_admin',
    'stats': 'nosql_admin',
    'replaceOne': 'nosql_update'
};

const existingBlocks = new Set([
    'nosql_find',
    'nosql_find_one',
    'nosql_insert',
    'nosql_update',
    'nosql_delete',
    'nosql_aggregate',
    'nosql_sort',
    'nosql_project',
    'nosql_comparison',
    'nosql_logical',
    'nosql_element',
    'nosql_limit',
    'nosql_count',
    'nosql_distinct'
]);

const requiredBlocks = new Set();
sortedOps.forEach(op => {
    const block = operationToBlock[op];
    if (block) {
        requiredBlocks.add(block);
    }
});

const missingBlocks = [...requiredBlocks].filter(b => !existingBlocks.has(b));

console.log('\n=== Required Blocks Analysis ===\n');
console.log(`Required blocks: ${requiredBlocks.size}`);
console.log(`Existing blocks: ${existingBlocks.size}`);
console.log(`Missing blocks: ${missingBlocks.length}\n`);

if (missingBlocks.length > 0) {
    console.log('⚠️  MISSING BLOCKS NEEDED:');
    missingBlocks.forEach(block => {
        const ops = sortedOps.filter(op => operationToBlock[op] === block);
        console.log(`  - ${block} (for: ${ops.join(', ')})`);
    });
} else {
    console.log('✅ All required blocks are implemented!');
}

// Write report
const reportPath = path.join(__dirname, '../src/data/operations_audit.txt');
let report = '=== MongoDB Operations Audit ===\n\n';
report += `Total unique operations: ${operations.size}\n\n`;
report += 'Operations found:\n';
sortedOps.forEach(op => {
    const count = (raw.match(new RegExp(`db\\.users\\.${op}\\(`, 'g')) || []).length;
    const block = operationToBlock[op] || 'UNKNOWN';
    const status = existingBlocks.has(block) ? '✓' : '✗';
    report += `${status} ${op}: ${count} times → ${block}\n`;
});

if (missingBlocks.length > 0) {
    report += '\n⚠️  MISSING BLOCKS:\n';
    missingBlocks.forEach(block => {
        const ops = sortedOps.filter(op => operationToBlock[op] === block);
        report += `  - ${block} (for: ${ops.join(', ')})\n`;
    });
}

fs.writeFileSync(reportPath, report);
console.log(`\nDetailed report: operations_audit.txt`);
