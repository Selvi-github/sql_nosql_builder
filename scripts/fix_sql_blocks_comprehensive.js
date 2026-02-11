
import fs from 'fs';

const filePath = 'c:/Users/lenovo/OneDrive/Desktop/sql-nosql-dashboard/my-dashboard/src/data/levels.js';
const content = fs.readFileSync(filePath, 'utf8');

// Identify the structure of the file to extract data
// It usually starts with "import ... export const sqlLevels = ["
const startMarker = 'export const sqlLevels = [';
const endMarker = '];'; // This is risky if strict, but let's assume standard formatting or use a parser approach

// Better approach: minimal extraction
const startIdx = content.indexOf(startMarker);
if (startIdx === -1) {
    console.error('Could not find sqlLevels start.');
    process.exit(1);
}

const jsonStart = startIdx + startMarker.length - 1; // start at [
// We need to find the matching closing bracket for the array
let open = 0;
let jsonEnd = -1;
for (let i = jsonStart; i < content.length; i++) {
    if (content[i] === '[') open++;
    else if (content[i] === ']') {
        open--;
        if (open === 0) {
            jsonEnd = i + 1;
            break;
        }
    }
}

if (jsonEnd === -1) {
    console.error('Could not find sqlLevels end.');
    process.exit(1);
}

const jsonString = content.substring(jsonStart, jsonEnd);
let sqlLevels;
try {
    // We need to handle potential imports referenced inside (though unlikely for pure data)
    // eval is risky but standard for this project scripts so far
    sqlLevels = eval('(' + jsonString + ')');
} catch (e) {
    console.error('Eval failed:', e.message);
    process.exit(1);
}

// Map keywords/functions to Required Blocks
const keywordMap = {
    'SELECT': ['sql_select'], // Base, but often implies more
    'INSERT': ['sql_insert', 'sql_insert_cols'],
    'UPDATE': ['sql_update'],
    'DELETE': ['sql_delete'],
    'WHERE': ['sql_where', 'sql_select'], // sql_select usually has WHERE
    'JOIN': ['sql_join', 'sql_inner_join', 'sql_left_join', 'sql_right_join'],
    'INNER': ['sql_inner_join'],
    'LEFT': ['sql_left_join'],
    'RIGHT': ['sql_right_join'],
    'GROUP': ['sql_group_by', 'sql_group'],
    'HAVING': ['sql_having'],
    'ORDER': ['sql_order_by', 'sql_order'],
    'LIMIT': ['sql_limit', 'sql_select_extended'],
    'DistincT': ['sql_select', 'sql_select_extended'], // Checkbox usually
    'AS': ['sql_alias', 'sql_select_alias'],
    'IN': ['sql_in_list'],
    'BETWEEN': ['sql_between'],
    'LIKE': ['sql_compare'],
    'IS': ['sql_is_null', 'sql_null_check'],
    'NULL': ['sql_is_null', 'sql_null_check'],
    'AND': ['sql_logical'],
    'OR': ['sql_logical'],
    'NOT': ['sql_logical', 'sql_is_null', 'sql_between'], // Context dependent, add logic generally
    '>': ['sql_compare'],
    '<': ['sql_compare'],
    '=': ['sql_compare'],
    '>=': ['sql_compare'],
    '<=': ['sql_compare'],
    '<>': ['sql_compare'],
    '!=': ['sql_compare'],
    '+': ['sql_arithmetic'],
    '-': ['sql_arithmetic'],
    '*': ['sql_arithmetic'],
    '/': ['sql_arithmetic'],
    '%': ['sql_arithmetic'],
    'CASE': ['sql_case']
};

const functionMap = {
    // String
    'UPPER': ['sql_string_select_ucase', 'sql_function_expression'],
    'LOWER': ['sql_string_select_lcase', 'sql_function_expression'],
    'CONCAT': ['sql_string_select_concat', 'sql_function_expression'],
    'CONCAT_WS': ['sql_string_select_concat_ws'],
    'LENGTH': ['sql_string_select_length', 'sql_function_expression'],
    'CHAR_LENGTH': ['sql_string_select_char_length'],
    'SUBSTRING': ['sql_string_select_substring', 'sql_function_expression'],
    'LEFT': ['sql_string_select_left', 'sql_function_expression'],
    'RIGHT': ['sql_string_select_right', 'sql_function_expression'],
    'TRIM': ['sql_string_select_trim'],
    'REPLACE': ['sql_string_select_replace'],
    'REVERSE': ['sql_string_select_reverse'],
    'POSITION': ['sql_string_select_position'],
    'LOCATE': ['sql_string_select_locate'],
    'LPAD': ['sql_string_select_lpad'],
    'RPAD': ['sql_string_select_rpad'],
    'REPEAT': ['sql_string_select_repeat'],
    'ASCII': ['sql_string_select_ascii'],
    'SUBSTRING_INDEX': ['sql_string_select_substring_index'],
    'MID': ['sql_string_select_mid'],

    // Math
    'ABS': ['sql_math_abs', 'sql_function_expression'],
    'ROUND': ['sql_math_round', 'sql_function_expression'],
    'CEIL': ['sql_math_ceil', 'sql_function_expression'],
    'FLOOR': ['sql_math_floor', 'sql_function_expression'],
    'SQRT': ['sql_math_sqrt', 'sql_function_expression'],
    'POW': ['sql_math_pow', 'sql_function_expression'],
    'POWER': ['sql_math_pow', 'sql_function_expression'],
    'RAND': ['sql_math_rand'],
    'SIGN': ['sql_math_sign'],
    'TRUNCATE': ['sql_math_truncate'],

    // Aggregate
    'COUNT': ['sql_aggregate', 'sql_function_expression'],
    'SUM': ['sql_aggregate', 'sql_function_expression'],
    'AVG': ['sql_aggregate', 'sql_function_expression'],
    'MAX': ['sql_aggregate', 'sql_function_expression'],
    'MIN': ['sql_aggregate', 'sql_function_expression'],

    // Date
    'NOW': ['sql_date_select_now'],
    'CURDATE': ['sql_date_select_curdate'],
    'CURTIME': ['sql_date_select_curtime'],
    'DATE_FORMAT': ['sql_date_select_format'],
    'DATEDIFF': ['sql_date_select_datediff'],
    'DAYNAME': ['sql_date_select_dayname'],
    'MONTHNAME': ['sql_date_select_monthname'],
    'YEAR': ['sql_date_select_year'],
    'MONTH': ['sql_date_select_month', 'sql_date_month_field'],
    'DAY': ['sql_date_select_day'],
    'DATE': ['sql_date_date'],
    'DATE_ADD': ['sql_date_add'],
    'DATE_SUB': ['sql_date_sub'],
    'MD5': [], // Not supported?
    'SHA1': []
};

let updates = 0;

sqlLevels.forEach(level => {
    level.questions.forEach(q => {
        if (!q.allowedBlocks) q.allowedBlocks = [];

        // Ensure baseline blocks for functionality
        q.allowedBlocks.push('sql_select'); // Almost always needed
        if (q.text.toLowerCase().includes('where') || q.expectedPattern.structures.includes('WHERE')) {
            q.allowedBlocks.push('sql_where');
            // Add basic values and comparison if WHERE is involved
            q.allowedBlocks.push('sql_compare');
            q.allowedBlocks.push('sql_value_string');
            q.allowedBlocks.push('sql_value_number');
            q.allowedBlocks.push('sql_column');
        }

        const structures = q.expectedPattern.structures.map(s => s.toUpperCase());
        const structureString = structures.join(' ');

        // Check Keywords
        Object.entries(keywordMap).forEach(([key, blocks]) => {
            if (structures.includes(key)) {
                blocks.forEach(b => {
                    if (!q.allowedBlocks.includes(b)) {
                        q.allowedBlocks.push(b);
                        updates++;
                    }
                });
            }
        });

        // Check Functions (Exact match in structures)
        Object.entries(functionMap).forEach(([func, blocks]) => {
            // Sometimes function is part of a string in structures e.g. "COUNT(*)"
            // Normalize structure items to check specifically for function names
            const presences = structures.some(s => s.includes(func + '(') || s === func);

            if (presences) {
                blocks.forEach(b => {
                    if (!q.allowedBlocks.includes(b)) {
                        q.allowedBlocks.push(b);
                        updates++;
                    }
                });
            }
        });

        // Dedup
        q.allowedBlocks = [...new Set(q.allowedBlocks)];
    });
});

console.log(`Identified ${updates} missing block insertions.`);

// Reconstruct file
const newJson = JSON.stringify(sqlLevels, null, 4);
const newContent = content.substring(0, jsonStart) + newJson + content.substring(jsonEnd);

fs.writeFileSync(filePath, newContent);
console.log('✅ File updated successfully.');
