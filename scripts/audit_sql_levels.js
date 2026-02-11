
import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/levels_generated.js';
const content = fs.readFileSync(filePath, 'utf8');

// Token normalization: words that should be uppercase in structures
const tokensToUppercase = [
    'as', 'count', 'sum', 'avg', 'min', 'max', 'select', 'from', 'where', 'group', 'by', 'order', 'having', 'limit', 'desc', 'asc', 'distinct', 'join', 'inner', 'left', 'right', 'on', 'and', 'or', 'not', 'in', 'between', 'is', 'null', 'like'
];

let updatedContent = content;

// 1. Normalize tokens in "structures" arrays
tokensToUppercase.forEach(token => {
    const regex = new RegExp(`"${token}"`, 'gi');
    updatedContent = updatedContent.replace(regex, (match) => {
        return match.toUpperCase();
    });
});

fs.writeFileSync(filePath, updatedContent);
console.log('✅ Token normalization complete.');

// 2. Perform Audit
let jsCode = updatedContent
    .replace('export const levels =', '')
    .trim();

if (jsCode.endsWith(';')) jsCode = jsCode.slice(0, -1);

let updatedLevels;
try {
    updatedLevels = eval('(' + jsCode + ')');
} catch (e) {
    console.error('❌ Eval failed:', e.message);
    process.exit(1);
}

const functionToBlockMap = {
    'UPPER': ['sql_string_select_ucase', 'sql_function_expression'],
    'LOWER': ['sql_string_select_lcase', 'sql_function_expression'],
    'LEFT': ['sql_string_select_left'],
    'RIGHT': ['sql_string_select_right'],
    'CONCAT': ['sql_string_select_concat', 'sql_string_select_concat_ws'],
    'LENGTH': ['sql_string_select_length', 'sql_function_expression'],
    'CHAR_LENGTH': ['sql_string_select_char_length'],
    'SUBSTRING': ['sql_string_select_substring'],
    'REPLACE': ['sql_string_select_replace'],
    'REVERSE': ['sql_string_select_reverse'],
    'TRIM': ['sql_string_select_trim'],
    'POSITION': ['sql_string_select_position'],
    'LPAD': ['sql_string_select_lpad'],
    'RPAD': ['sql_string_select_rpad'],
    'REPEAT': ['sql_string_select_repeat'],
    'ASCII': ['sql_string_select_ascii'],
    'SUBSTRING_INDEX': ['sql_string_select_substring_index'],
    'LOCATE': ['sql_string_select_locate'],
    'MID': ['sql_string_select_mid'],
};

const definedBlocks = new Set([
    'sql_select', 'sql_select_extended', 'sql_insert', 'sql_insert_cols', 'sql_update', 'sql_delete', 'sql_limit', 'sql_group', 'sql_order', 'sql_where', 'sql_compare', 'sql_logical', 'sql_between', 'sql_is_null', 'sql_column', 'sql_join_cols', 'sql_join_3_cols', 'sql_join_4_cols', 'sql_value_string', 'sql_value_unquoted', 'sql_value_number', 'sql_in_list', 'sql_arithmetic', 'sql_function_expression', 'sql_alias', 'sql_commit', 'sql_rollback', 'sql_savepoint', 'sql_grant', 'sql_revoke', 'sql_order_by', 'sql_group_by', 'sql_aggregate', 'sql_having', 'sql_subquery', 'sql_select_alias', 'sql_inner_join', 'sql_left_join', 'sql_right_join', 'sql_join', 'sql_create_table', 'sql_alter_table', 'sql_drop_table', 'sql_create_view', 'sql_drop_view', 'sql_create_procedure', 'sql_execute_procedure', 'sql_create_function', 'sql_create_trigger', 'sql_string_select_ucase', 'sql_string_select_lcase', 'sql_string_select_concat', 'sql_string_select_concat_ws', 'sql_string_select_substring', 'sql_string_select_length', 'sql_string_select_char_length', 'sql_string_select_replace', 'sql_string_select_reverse', 'sql_string_select_trim', 'sql_string_select_position', 'sql_string_select_left', 'sql_string_select_right', 'sql_case',
    'sql_string_select_lpad', 'sql_string_select_rpad', 'sql_string_select_repeat', 'sql_string_select_ascii', 'sql_string_select_substring_index', 'sql_string_select_locate', 'sql_string_select_mid'
]);

let auditErrors = [];

updatedLevels.forEach(level => {
    level.questions.forEach(q => {
        const structures = q.expectedPattern.structures || [];
        const allowedBlocks = q.allowedBlocks || [];

        // Check if any allowed block is invalid
        allowedBlocks.forEach(b => {
            if (!definedBlocks.has(b)) {
                auditErrors.push(`[Q ${q.id}] Invalid/Missing block in system: ${b}`);
            }
        });

        // Keyword requirement checks
        if (structures.includes('GROUP') && !allowedBlocks.includes('sql_group') && !allowedBlocks.includes('sql_group_by')) {
            auditErrors.push(`[Q ${q.id}] Missing sql_group or sql_group_by block`);
        }
        if (structures.includes('ORDER') && !allowedBlocks.includes('sql_order') && !allowedBlocks.includes('sql_order_by')) {
            auditErrors.push(`[Q ${q.id}] Missing sql_order or sql_order_by block`);
        }
        if (structures.includes('LIMIT') && !allowedBlocks.includes('sql_limit') && !allowedBlocks.includes('sql_select_extended')) {
            auditErrors.push(`[Q ${q.id}] Missing sql_limit or sql_select_extended block`);
        }
        if (structures.includes('WHERE') && !allowedBlocks.includes('sql_where') && !allowedBlocks.includes('sql_select') && !allowedBlocks.includes('sql_select_extended')) {
            // Many select blocks have WHERE built-in
        }
        if (structures.includes('JOIN') && !allowedBlocks.some(b => b.includes('join'))) {
            auditErrors.push(`[Q ${q.id}] Missing join blocks`);
        }

        // Function requirement checks
        Object.entries(functionToBlockMap).forEach(([func, possibleBlocks]) => {
            if (structures.includes(func)) {
                if (!allowedBlocks.some(b => possibleBlocks.includes(b))) {
                    auditErrors.push(`[Q ${q.id}] Missing block for function: ${func}. Expected one of: ${possibleBlocks.join(', ')}`);
                }
            }
        });
    });
});

let totalQuestions = 0;
updatedLevels.forEach(l => totalQuestions += l.questions.length);

let report = '';
if (auditErrors.length > 0) {
    report = `❌ Audit found ${auditErrors.length} errors:\n` + auditErrors.join('\n');
} else {
    report = `✅ All ${totalQuestions} questions verified. Global block consistency passed.`;
}

console.log(report);
fs.writeFileSync('scripts/global_audit_report.txt', report, 'utf8');
