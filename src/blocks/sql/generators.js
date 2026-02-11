export const sqlGenerators = (javascriptGenerator) => ({
    // DDL Generators
    'sql_create_table': (block) => {
        const name = block.getFieldValue('TABLE_NAME');
        const cols = block.getFieldValue('COLUMNS');
        return `DROP TABLE IF EXISTS ${name}; CREATE TABLE ${name} (${cols}); `;
    },
    'sql_alter_table': (block) => {
        const table = block.getFieldValue('TABLE_NAME');
        const operation = block.getFieldValue('OPERATION');
        const column = block.getFieldValue('COLUMN_NAME');
        const details = block.getFieldValue('DETAILS');
        return `ALTER TABLE ${table} ${operation} ${column} ${details};`;
    },
    'sql_drop_table': (block) => `DROP TABLE ${block.getFieldValue('TABLE_NAME')}; `,
    'sql_create_view': (block) => `CREATE OR REPLACE VIEW ${block.getFieldValue('VIEW_NAME')} AS ${block.getFieldValue('QUERY')};`,
    'sql_drop_view': (block) => `DROP VIEW IF EXISTS ${block.getFieldValue('VIEW_NAME')};`,
    'sql_show_tables': () => `SHOW TABLES;`,
    'sql_desc_table': (block) => `DESCRIBE ${block.getFieldValue('TABLE_NAME')};`,
    'sql_create_sequence': (block) => `CREATE SEQUENCE IF NOT EXISTS ${block.getFieldValue('SEQUENCE_NAME')};`,

    // DML Generators
    'sql_select': (block) => {
        const distinct = block.getFieldValue('DISTINCT') === 'TRUE' ? 'DISTINCT ' : '';
        let cols = javascriptGenerator.valueToCode(block, 'COLUMNS', javascriptGenerator.ORDER_ATOMIC);
        if (!cols) cols = '*';
        const table = block.getFieldValue('TABLE');
        const joins = javascriptGenerator.statementToCode(block, 'JOINS');
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || '1=1';
        return `SELECT ${distinct}${cols} FROM ${table} ${joins}WHERE ${cond};`;
    },
    'sql_select_extended': (block) => {
        const distinct = block.getFieldValue('DISTINCT') === 'TRUE' ? 'DISTINCT ' : '';
        let cols = javascriptGenerator.valueToCode(block, 'COLUMNS', javascriptGenerator.ORDER_ATOMIC) || '*';
        const table = block.getFieldValue('TABLE');
        const joins = javascriptGenerator.statementToCode(block, 'JOINS');

        const whereVal = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE);
        const whereClause = whereVal ? ` WHERE ${whereVal}` : '';

        const groupVal = javascriptGenerator.valueToCode(block, 'GROUP_BY', javascriptGenerator.ORDER_ATOMIC);
        const groupClause = groupVal ? ` GROUP BY ${groupVal}` : '';

        const havingVal = javascriptGenerator.valueToCode(block, 'HAVING', javascriptGenerator.ORDER_ATOMIC);
        const havingClause = havingVal ? ` HAVING ${havingVal}` : '';

        const orderVal = javascriptGenerator.valueToCode(block, 'ORDER_BY', javascriptGenerator.ORDER_ATOMIC);
        const orderDir = block.getFieldValue('ORDER_DIR');
        const orderClause = orderVal ? ` ORDER BY ${orderVal} ${orderDir}` : '';

        const limitVal = javascriptGenerator.valueToCode(block, 'LIMIT', javascriptGenerator.ORDER_ATOMIC);
        const limitClause = limitVal ? ` LIMIT ${limitVal}` : '';

        return `SELECT ${distinct}${cols} FROM ${table} ${joins}${whereClause}${groupClause}${havingClause}${orderClause}${limitClause};`;
    },
    'sql_insert': (block) => `INSERT INTO ${block.getFieldValue('TABLE')} VALUES (${block.getFieldValue('VALUES')});`,
    'sql_insert_cols': (block) => `INSERT INTO ${block.getFieldValue('TABLE')} (${block.getFieldValue('COLUMNS')}) VALUES (${block.getFieldValue('VALUES')});`,
    'sql_update': (block) => {
        const table = block.getFieldValue('TABLE');
        const setVals = block.getFieldValue('SET_VALUES');
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || '1=1';
        return `UPDATE ${table} SET ${setVals} WHERE ${cond};`;
    },
    'sql_delete': (block) => {
        const table = block.getFieldValue('TABLE');
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || '1=1';
        return `DELETE FROM ${table} WHERE ${cond};`;
    },

    // Logic Generators
    'sql_compare': (block) => {
        const left = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC) || '0';
        const op = block.getFieldValue('OP');
        const right = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC) || '0';
        return [`${left} ${op} ${right}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_logical': (block) => {
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_LOGICAL_AND) || 'false';
        const op = block.getFieldValue('OP');
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_LOGICAL_AND) || 'false';
        return [`${a} ${op} ${b}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_between': (block) => {
        const field = javascriptGenerator.valueToCode(block, 'FIELD', javascriptGenerator.ORDER_ATOMIC) || 'curr';
        const not = block.getFieldValue('NOT');
        const min = javascriptGenerator.valueToCode(block, 'MIN', javascriptGenerator.ORDER_ATOMIC) || '0';
        const max = javascriptGenerator.valueToCode(block, 'MAX', javascriptGenerator.ORDER_ATOMIC) || '100';
        return [`${field} ${not}BETWEEN ${min} AND ${max}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_is_null': (block) => {
        const field = javascriptGenerator.valueToCode(block, 'FIELD', javascriptGenerator.ORDER_ATOMIC) || 'field';
        const not = block.getFieldValue('NOT') ? ' NOT' : '';
        return [`${field} IS${not} NULL`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_join_cols': (block) => {
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ATOMIC) || '';
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) || '';
        return [`${a}, ${b}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_join_3_cols': (block) => {
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ATOMIC) || '';
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) || '';
        const c = javascriptGenerator.valueToCode(block, 'C', javascriptGenerator.ORDER_ATOMIC) || '';
        return [`${a}, ${b}, ${c}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_join_4_cols': (block) => {
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ATOMIC) || '';
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) || '';
        const c = javascriptGenerator.valueToCode(block, 'C', javascriptGenerator.ORDER_ATOMIC) || '';
        const d = javascriptGenerator.valueToCode(block, 'D', javascriptGenerator.ORDER_ATOMIC) || '';
        return [`${a}, ${b}, ${c}, ${d}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_limit': (block) => [`LIMIT ${block.getFieldValue('COUNT')}`, javascriptGenerator.ORDER_ATOMIC],
    'sql_group': (block) => {
        const col = javascriptGenerator.valueToCode(block, 'COLUMN', javascriptGenerator.ORDER_ATOMIC) || 'id';
        return [`GROUP BY ${col}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_order': (block) => {
        const col = javascriptGenerator.valueToCode(block, 'COLUMN', javascriptGenerator.ORDER_ATOMIC) || 'id';
        const dir = block.getFieldValue('DIRECTION');
        return [`ORDER BY ${col} ${dir}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_join': (block) => `${block.getFieldValue('JOIN_TYPE')} JOIN ${block.getFieldValue('TABLE')} ON ${block.getFieldValue('COL1')} = ${block.getFieldValue('COL2')} `,

    'sql_column': (block) => [block.getFieldValue('COL'), javascriptGenerator.ORDER_ATOMIC],
    'sql_value_string': (block) => {
        const val = block.getFieldValue('VAL');
        return [`'${val}'`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_value_number': (block) => [block.getFieldValue('VAL'), javascriptGenerator.ORDER_ATOMIC],
    'sql_value_unquoted': (block) => [block.getFieldValue('VAL'), javascriptGenerator.ORDER_ATOMIC],
    'sql_in_list': (block) => {
        const field = javascriptGenerator.valueToCode(block, 'FIELD', javascriptGenerator.ORDER_ATOMIC);
        const not = block.getFieldValue('NOT');
        const list = block.getFieldValue('LIST');
        return [`${field} ${not}IN (${list})`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_where': (block) => {
        const cond = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || '1=1';
        return [`WHERE ${cond}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_arithmetic': (block) => {
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ATOMIC) || '0';
        const op = block.getFieldValue('OP');
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) || '0';
        return [`${a} ${op} ${b}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_math_abs': (block) => [`ABS(${javascriptGenerator.valueToCode(block, 'VAL', javascriptGenerator.ORDER_ATOMIC) || '0'})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_round': (block) => [`ROUND(${javascriptGenerator.valueToCode(block, 'VAL', javascriptGenerator.ORDER_ATOMIC) || '0'}, ${block.getFieldValue('DECIMALS')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_function_expression': (block) => {
        const func = block.getFieldValue('FUNC');
        const param = block.getFieldValue('PARAM');
        return [`${func}(${param})`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_alias': (block) => {
        const col = javascriptGenerator.valueToCode(block, 'COLUMN', javascriptGenerator.ORDER_ATOMIC) || "''";
        const alias = block.getFieldValue('ALIAS');
        return [`${col} AS ${alias}`, javascriptGenerator.ORDER_ATOMIC];
    },

    // TCL Generators
    'sql_commit': () => `COMMIT;`,
    'sql_rollback': () => `ROLLBACK;`,
    'sql_savepoint': (block) => `SAVEPOINT ${block.getFieldValue('SAVEPOINT_NAME')};`,

    // DCL Generators
    'sql_grant': (block) => `GRANT ${block.getFieldValue('PRIVILEGES')} ON ${block.getFieldValue('OBJECT')} TO ${block.getFieldValue('USER')};`,
    'sql_revoke': (block) => `REVOKE ${block.getFieldValue('PRIVILEGES')} ON ${block.getFieldValue('OBJECT')} FROM ${block.getFieldValue('USER')};`,

    // Join Generators
    'sql_inner_join': (block) => `SELECT ${block.getFieldValue('COLUMNS')} FROM ${block.getFieldValue('TABLE1')} INNER JOIN ${block.getFieldValue('TABLE2')} ON ${block.getFieldValue('CONDITION')};`,
    'sql_left_join': (block) => `SELECT ${block.getFieldValue('COLUMNS')} FROM ${block.getFieldValue('TABLE1')} LEFT JOIN ${block.getFieldValue('TABLE2')} ON ${block.getFieldValue('CONDITION')};`,
    'sql_right_join': (block) => `SELECT ${block.getFieldValue('COLUMNS')} FROM ${block.getFieldValue('TABLE1')} RIGHT JOIN ${block.getFieldValue('TABLE2')} ON ${block.getFieldValue('CONDITION')};`,

    // Advanced SELECT Generators
    'sql_order_by': (block) => {
        const columns = (block.getFieldValue('COLUMNS') || '*').trim() || '*';
        const table = (block.getFieldValue('TABLE') || 'users').trim() || 'users';
        const orderColumn = (block.getFieldValue('ORDER_COLUMN') || 'id').trim() || 'id';
        const orderDirection = block.getFieldValue('ORDER_DIRECTION') || 'ASC';
        return `SELECT ${columns} FROM ${table} ORDER BY ${orderColumn} ${orderDirection};`;
    },
    'sql_group_by': (block) => {
        let columns = javascriptGenerator.valueToCode(block, 'COLUMNS', javascriptGenerator.ORDER_ATOMIC);
        if (!columns) columns = '*';
        const table = (block.getFieldValue('TABLE') || 'users').trim() || 'users';
        const groupColumn = (block.getFieldValue('GROUP_COLUMN') || 'id').trim() || 'id';
        return `SELECT ${columns} FROM ${table} GROUP BY ${groupColumn};`;
    },
    'sql_aggregate': (block) => {
        const func = block.getFieldValue('FUNCTION') || 'COUNT';
        const column = (block.getFieldValue('COLUMN') || '*').trim() || '*';
        const table = (block.getFieldValue('TABLE') || 'users').trim() || 'users';
        return `SELECT ${func}(${column}) FROM ${table};`;
    },
    'sql_having': (block) => {
        const columns = (block.getFieldValue('COLUMNS') || '*').trim() || '*';
        const table = (block.getFieldValue('TABLE') || 'users').trim() || 'users';
        const groupColumn = (block.getFieldValue('GROUP_COLUMN') || 'id').trim() || 'id';
        const havingCondition = (block.getFieldValue('HAVING_CONDITION') || '1=1').trim() || '1=1';
        return `SELECT ${columns} FROM ${table} GROUP BY ${groupColumn} HAVING ${havingCondition};`;
    },
    'sql_select_alias': (block) => {
        const column = (block.getFieldValue('COLUMN') || '*').trim() || '*';
        const alias = (block.getFieldValue('ALIAS') || 'alias').trim() || 'alias';
        const table = (block.getFieldValue('TABLE') || 'users').trim() || 'users';
        return `SELECT ${column} AS ${alias} FROM ${table};`;
    },

    // Procedure & Function Generators
    'sql_create_procedure': (block) => `CREATE PROCEDURE ${block.getFieldValue('PROCEDURE_NAME')} BEGIN ${block.getFieldValue('PROCEDURE_BODY')} END;`,
    'sql_execute_procedure': (block) => `EXECUTE ${block.getFieldValue('PROCEDURE_NAME')};`,
    'sql_create_function': (block) => `CREATE FUNCTION ${block.getFieldValue('FUNCTION_NAME')} RETURNS ${block.getFieldValue('RETURN_TYPE')} BEGIN ${block.getFieldValue('FUNCTION_BODY')} END;`,

    // Trigger Generators
    'sql_create_trigger': (block) => `CREATE TRIGGER ${block.getFieldValue('TRIGGER_NAME')} ${block.getFieldValue('TRIGGER_TIME')} ${block.getFieldValue('TRIGGER_EVENT')} ON ${block.getFieldValue('TABLE_NAME')} BEGIN ${block.getFieldValue('TRIGGER_BODY')} END;`,

    // String Function Generators
    'sql_string_select_ucase': (block) => `SELECT UPPER(${block.getFieldValue('STRING_VALUE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_lcase': (block) => `SELECT LOWER(${block.getFieldValue('STRING_VALUE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_concat': (block) => `SELECT CONCAT(${block.getFieldValue('STRING1')}, ${block.getFieldValue('STRING2')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_concat_ws': (block) => `SELECT CONCAT_WS(${block.getFieldValue('SEPARATOR')}, ${block.getFieldValue('STRING1')}, ${block.getFieldValue('STRING2')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_case': (block) => {
        const when1 = javascriptGenerator.valueToCode(block, 'WHEN1', javascriptGenerator.ORDER_NONE) || '1=1';
        const then1 = javascriptGenerator.valueToCode(block, 'THEN1', javascriptGenerator.ORDER_ATOMIC) || "''";
        const when2 = javascriptGenerator.valueToCode(block, 'WHEN2', javascriptGenerator.ORDER_NONE) || '1=1';
        const then2 = javascriptGenerator.valueToCode(block, 'THEN2', javascriptGenerator.ORDER_ATOMIC) || "''";
        const elseVal = javascriptGenerator.valueToCode(block, 'ELSE', javascriptGenerator.ORDER_ATOMIC) || "''";
        return [`CASE WHEN ${when1} THEN ${then1} WHEN ${when2} THEN ${then2} ELSE ${elseVal} END`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_string_select_substring': (block) => `SELECT SUBSTRING(${block.getFieldValue('STRING')}, ${block.getFieldValue('START')}, ${block.getFieldValue('LENGTH')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_length': (block) => `SELECT LENGTH(${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_char_length': (block) => `SELECT CHAR_LENGTH(${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_replace': (block) => `SELECT REPLACE(${block.getFieldValue('ORIGINAL')}, ${block.getFieldValue('SEARCH')}, ${block.getFieldValue('REPLACE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_reverse': (block) => `SELECT REVERSE(${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_trim': (block) => `SELECT ${block.getFieldValue('MODE')}(${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_left': (block) => `SELECT LEFT(${block.getFieldValue('STRING')}, ${block.getFieldValue('LEN')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_right': (block) => `SELECT RIGHT(${block.getFieldValue('STRING')}, ${block.getFieldValue('LEN')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_position': (block) => `SELECT POSITION(${block.getFieldValue('SUBSTRING')} IN ${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_lpad': (block) => `SELECT LPAD(${block.getFieldValue('STRING')}, ${block.getFieldValue('LEN')}, ${block.getFieldValue('PAD')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_rpad': (block) => `SELECT RPAD(${block.getFieldValue('STRING')}, ${block.getFieldValue('LEN')}, ${block.getFieldValue('PAD')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_repeat': (block) => `SELECT REPEAT(${block.getFieldValue('STRING')}, ${block.getFieldValue('COUNT')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_ascii': (block) => `SELECT ASCII(${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_substring_index': (block) => `SELECT SUBSTRING_INDEX(${block.getFieldValue('STRING')}, ${block.getFieldValue('DELIMITER')}, ${block.getFieldValue('COUNT')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_locate': (block) => `SELECT LOCATE(${block.getFieldValue('SUBSTRING')}, ${block.getFieldValue('STRING')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_string_select_mid': (block) => `SELECT MID(${block.getFieldValue('STRING')}, ${block.getFieldValue('POS')}, ${block.getFieldValue('LEN')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,

    // Date Function Generators
    'sql_date_select_now': (block) => `SELECT NOW() AS ${block.getFieldValue('ALIAS')};`,
    'sql_date_select_curdate': (block) => `SELECT CURDATE() AS ${block.getFieldValue('ALIAS')};`,
    'sql_date_select_curtime': (block) => `SELECT CURTIME() AS ${block.getFieldValue('ALIAS')};`,
    'sql_date_select_format': (block) => `SELECT DATE_FORMAT(${block.getFieldValue('DATE')}, ${block.getFieldValue('FORMAT')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_datediff': (block) => `SELECT DATEDIFF(${block.getFieldValue('DATE1')}, ${block.getFieldValue('DATE2')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_dayname': (block) => `SELECT DAYNAME(${block.getFieldValue('DATE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_monthname': (block) => `SELECT MONTHNAME(${block.getFieldValue('DATE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_year': (block) => `SELECT YEAR(${block.getFieldValue('DATE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_month': (block) => `SELECT MONTH(${block.getFieldValue('DATE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')};`,
    'sql_date_select_day': (block) => `SELECT DAY(${block.getFieldValue('DATE')}) AS ${block.getFieldValue('ALIAS')} FROM ${block.getFieldValue('TABLE')}`,

    // Math Function Generators
    'sql_math_ceil': (block) => [`CEIL(${block.getFieldValue('VALUE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_floor': (block) => [`FLOOR(${block.getFieldValue('VALUE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_sqrt': (block) => [`SQRT(${block.getFieldValue('VALUE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_pow': (block) => [`POW(${block.getFieldValue('BASE')}, ${block.getFieldValue('EXPONENT')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_rand': (block) => [`RAND()`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_sign': (block) => [`SIGN(${block.getFieldValue('VALUE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_math_truncate': (block) => [`TRUNCATE(${block.getFieldValue('VALUE')}, ${block.getFieldValue('DECIMALS')})`, javascriptGenerator.ORDER_ATOMIC],

    // Date manipulation generators
    'sql_date_date': (block) => [`DATE(${block.getFieldValue('DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_date_add': (block) => [`DATE_ADD(${block.getFieldValue('DATE')}, INTERVAL ${block.getFieldValue('VALUE')} ${block.getFieldValue('UNIT')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_date_sub': (block) => [`DATE_SUB(${block.getFieldValue('DATE')}, INTERVAL ${block.getFieldValue('VALUE')} ${block.getFieldValue('UNIT')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_timestampdiff': (block) => [`TIMESTAMPDIFF(${block.getFieldValue('UNIT')}, ${block.getFieldValue('START_DATE')}, ${block.getFieldValue('END_DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_str_to_date': (block) => [`STR_TO_DATE(${block.getFieldValue('DATE_STRING')}, ${block.getFieldValue('FORMAT')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_unix_timestamp': (block) => [`UNIX_TIMESTAMP(${block.getFieldValue('DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_from_unixtime': (block) => [`FROM_UNIXTIME(${block.getFieldValue('TIMESTAMP')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_date_month_field': (block) => [`MONTH(${block.getFieldValue('DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_date_dayofweek_field': (block) => [`DAYOFWEEK(${block.getFieldValue('DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_date_hour_field': (block) => [`HOUR(${block.getFieldValue('DATE')})`, javascriptGenerator.ORDER_ATOMIC],
    'sql_null_check': (block) => [`${block.getFieldValue('COLUMN')} IS ${block.getFieldValue('TYPE')}`, javascriptGenerator.ORDER_ATOMIC],
    'sql_window_func': (block) => {
        const func = block.getFieldValue('FUNC');
        const val = block.getFieldValue('VALUE');
        const over = javascriptGenerator.valueToCode(block, 'OVER', javascriptGenerator.ORDER_ATOMIC) || '';
        let sql = func;
        if (['LEAD', 'LAG', 'FIRST_VALUE', 'LAST_VALUE'].includes(func)) {
            sql = `${func}(${val})`;
        }
        return [`${sql} OVER (${over})`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_window_over': (block) => {
        const part = block.getFieldValue('PARTITION');
        const order = block.getFieldValue('ORDER');
        const dir = block.getFieldValue('DIR');
        let parts = [];
        if (part && part !== 'city') parts.push(`PARTITION BY ${part}`);
        if (order) parts.push(`ORDER BY ${order} ${dir}`);
        return [parts.join(' '), javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_window_rows': (block) => {
        const mode = block.getFieldValue('MODE');
        const start = block.getFieldValue('START');
        const end = block.getFieldValue('END');
        return [`ROWS ${mode} ${start} AND ${end}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_cte': (block) => {
        const recursive = block.getFieldValue('RECURSIVE') === 'TRUE' ? 'RECURSIVE ' : '';
        const name = block.getFieldValue('NAME');
        let query = javascriptGenerator.statementToCode(block, 'QUERY') || 'SELECT 1';
        query = query.trim().replace(/;$/, '');
        const next = javascriptGenerator.statementToCode(block, 'NEXT') || '';
        const parent = block.getParent();
        const isChained = parent && parent.type === 'sql_cte';
        const prefix = isChained ? ', ' : 'WITH ';
        return `${prefix}${recursive}${name} AS (${query}) ${next}`;
    },
    'sql_regexp': (block) => {
        const col = javascriptGenerator.valueToCode(block, 'COLUMN', javascriptGenerator.ORDER_ATOMIC) || 'column';
        const pattern = block.getFieldValue('PATTERN');
        return [`${col} REGEXP ${pattern}`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_json_extract': (block) => {
        const col = block.getFieldValue('COLUMN');
        const path = block.getFieldValue('PATH');
        return [`JSON_EXTRACT(${col}, ${path})`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_group_rollup': (block) => {
        const col = javascriptGenerator.valueToCode(block, 'COLUMN', javascriptGenerator.ORDER_ATOMIC) || 'column';
        return [`GROUP BY ${col} WITH ROLLUP`, javascriptGenerator.ORDER_ATOMIC];
    },
    'sql_subquery_nested': (block) => {
        const query = javascriptGenerator.valueToCode(block, 'QUERY', javascriptGenerator.ORDER_ATOMIC) || 'SELECT 1';
        return [`(${query})`, javascriptGenerator.ORDER_ATOMIC];
    }
});
