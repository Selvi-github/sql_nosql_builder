import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/nosql_levels_data.js');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract all allowedBlocks from the file
const blockMatches = content.matchAll(/"allowedBlocks":\s*\[([\s\S]*?)\]/g);
const allBlocks = new Set();
const blockUsage = {};

for (const match of blockMatches) {
    const blocksStr = match[1];
    const blocks = blocksStr.match(/"([^"]+)"/g);
    if (blocks) {
        blocks.forEach(b => {
            const blockName = b.replace(/"/g, '');
            allBlocks.add(blockName);
            blockUsage[blockName] = (blockUsage[blockName] || 0) + 1;
        });
    }
}

// Known existing blocks from BlocklyEditor.jsx
const existingBlocks = new Set([
    'nosql_find',
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
    'nosql_distinct',
    'nosql_find_one'
]);

// Find missing blocks
const missingBlocks = [...allBlocks].filter(b => !existingBlocks.has(b));

console.log('\n=== NoSQL Block Audit Report ===\n');
console.log(`Total unique blocks referenced: ${allBlocks.size}`);
console.log(`Existing blocks implemented: ${existingBlocks.size}`);
console.log(`Missing blocks: ${missingBlocks.length}\n`);

if (missingBlocks.length > 0) {
    console.log('⚠️  MISSING BLOCKS:');
    missingBlocks.forEach(block => {
        console.log(`  - ${block} (used ${blockUsage[block]} times)`);
    });
} else {
    console.log('✅ All blocks are implemented!');
}

console.log('\n=== Block Usage Statistics ===');
const sortedBlocks = Object.entries(blockUsage).sort((a, b) => b[1] - a[1]);
sortedBlocks.forEach(([block, count]) => {
    const status = existingBlocks.has(block) ? '✓' : '✗';
    console.log(`${status} ${block}: ${count} questions`);
});

// Write detailed report
const reportPath = path.join(__dirname, '../src/data/block_audit_report.txt');
let report = '=== NoSQL Block Audit Report ===\n\n';
report += `Generated: ${new Date().toISOString()}\n\n`;
report += `Total unique blocks referenced: ${allBlocks.size}\n`;
report += `Existing blocks implemented: ${existingBlocks.size}\n`;
report += `Missing blocks: ${missingBlocks.length}\n\n`;

if (missingBlocks.length > 0) {
    report += '⚠️  MISSING BLOCKS:\n';
    missingBlocks.forEach(block => {
        report += `  - ${block} (used ${blockUsage[block]} times)\n`;
    });
    report += '\n';
}

report += '=== Block Usage Statistics ===\n';
sortedBlocks.forEach(([block, count]) => {
    const status = existingBlocks.has(block) ? '✓' : '✗';
    report += `${status} ${block}: ${count} questions\n`;
});

fs.writeFileSync(reportPath, report);
console.log(`\nDetailed report written to: block_audit_report.txt`);
