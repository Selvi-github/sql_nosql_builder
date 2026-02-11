
import fs from 'fs';

const filePath = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/levels_generated.js';
const content = fs.readFileSync(filePath, 'utf8');

let jsCode = content
    .replace('export const levels =', '')
    .trim();

if (jsCode.endsWith(';')) jsCode = jsCode.slice(0, -1);

let levels;
try {
    levels = eval('(' + jsCode + ')');
} catch (e) {
    console.error('❌ Eval failed:', e.message);
    process.exit(1);
}

const functionToBlockMap = {
    'UPPER': 'sql_string_select_ucase',
    'LOWER': 'sql_string_select_lcase',
    'LEFT': 'sql_string_select_left',
    'RIGHT': 'sql_string_select_right',
    'CONCAT': 'sql_string_select_concat',
    'LENGTH': 'sql_string_select_length',
    'CHAR_LENGTH': 'sql_string_select_char_length',
    'SUBSTRING': 'sql_string_select_substring',
    'REPLACE': 'sql_string_select_replace',
    'REVERSE': 'sql_string_select_reverse',
    'TRIM': 'sql_string_select_trim',
    'POSITION': 'sql_string_select_position',
};

let fixCount = 0;

levels.forEach(level => {
    level.questions.forEach(q => {
        const structures = q.expectedPattern.structures || [];
        if (!q.allowedBlocks) q.allowedBlocks = [];

        // Fix Joins
        if (structures.includes('JOIN')) {
            if (!q.allowedBlocks.some(b => b.includes('join'))) {
                q.allowedBlocks.push('sql_join');
                fixCount++;
            }
        }

        // Fix Functions
        Object.entries(functionToBlockMap).forEach(([func, block]) => {
            if (structures.includes(func)) {
                if (!q.allowedBlocks.includes(block) && !q.allowedBlocks.includes('sql_function_expression')) {
                    q.allowedBlocks.push(block);
                    fixCount++;
                }
            }
        });

        // Fix DDL
        if (structures.includes('CREATE') && structures.includes('TABLE') && !q.allowedBlocks.includes('sql_create_table')) {
            q.allowedBlocks.push('sql_create_table');
            fixCount++;
        }
    });
});

const updatedContent = 'export const levels = ' + JSON.stringify(levels, null, 4) + ';';
fs.writeFileSync(filePath, updatedContent);
console.log(`✅ Fixed ${fixCount} missing blocks across all levels.`);
