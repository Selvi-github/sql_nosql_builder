export const sqlDefinitions = [
    // ========== SQL DDL BLOCKS ==========
    {
        "type": "sql_create_table",
        "message0": "CREATE TABLE %1 ( %2 )",
        "args0": [
            { "type": "field_input", "name": "TABLE_NAME", "text": "users" },
            { "type": "field_input", "name": "COLUMNS", "text": "user_id INT PRIMARY KEY, firstname VARCHAR(50), age INT" }
        ],
        "colour": 230,
        "tooltip": "Create a new table"
    },
    {
        "type": "sql_alter_table",
        "message0": "ALTER TABLE %1 %2 %3 %4",
        "args0": [
            { "type": "field_input", "name": "TABLE_NAME", "text": "users" },
            {
                "type": "field_dropdown", "name": "OPERATION", "options": [
                    ["ADD", "ADD"],
                    ["DROP", "DROP"],
                    ["MODIFY", "MODIFY"],
                    ["RENAME COLUMN", "RENAME COLUMN"]
                ]
            },
            { "type": "field_input", "name": "COLUMN_NAME", "text": "column_name" },
            { "type": "field_input", "name": "DETAILS", "text": "INT" }
        ],
        "colour": 230,
        "tooltip": "Modify existing table structure (ADD, DROP, MODIFY, RENAME)"
    },
    {
        "type": "sql_drop_table",
        "message0": "DROP TABLE %1",
        "args0": [
            { "type": "field_input", "name": "TABLE_NAME", "text": "users" }
        ],
        "colour": 230,
        "tooltip": "Delete a table"
    },
    {
        "type": "sql_create_view",
        "message0": "CREATE VIEW %1 AS %2",
        "args0": [
            { "type": "field_input", "name": "VIEW_NAME", "text": "user_view" },
            { "type": "field_input", "name": "QUERY", "text": "SELECT firstname, city FROM users" }
        ],
        "colour": 230,
        "tooltip": "Create a view"
    },
    {
        "type": "sql_drop_view",
        "message0": "DROP VIEW %1",
        "args0": [
            { "type": "field_input", "name": "VIEW_NAME", "text": "user_view" }
        ],
        "colour": 230,
        "tooltip": "Drop a view"
    },
    {
        "type": "sql_show_tables",
        "message0": "SHOW TABLES",
        "colour": 230,
        "tooltip": "List all tables in database"
    },
    {
        "type": "sql_desc_table",
        "message0": "DESCRIBE TABLE %1",
        "args0": [
            { "type": "field_input", "name": "TABLE_NAME", "text": "users" }
        ],
        "colour": 230,
        "tooltip": "Show table structure"
    },
    {
        "type": "sql_create_sequence",
        "message0": "CREATE SEQUENCE %1",
        "args0": [
            { "type": "field_input", "name": "SEQUENCE_NAME", "text": "user_id_seq" }
        ],
        "colour": 230,
        "tooltip": "Create a sequence"
    },

    // ========== SQL DML BLOCKS ==========
    {
        "type": "sql_select",
        "message0": "SELECT %1 %2 FROM %3 %4 WHERE %5",
        "args0": [
            { "type": "field_checkbox", "name": "DISTINCT", "checked": false },
            { "type": "input_value", "name": "COLUMNS" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "input_statement", "name": "JOINS" },
            { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
        ],
        "colour": 210,
        "tooltip": "Select data from table with optional JOINS",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": true
    },
    {
        "type": "sql_select_extended",
        "message0": "SELECT %1 %2 FROM %3 %4 %5 %6 WHERE %7 %8 GROUP BY %9 %10 HAVING %11 %12 ORDER BY %13 %14 %15 LIMIT %16",
        "args0": [
            { "type": "field_checkbox", "name": "DISTINCT", "checked": false },
            { "type": "input_value", "name": "COLUMNS" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "JOINS" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "GROUP_BY" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "HAVING" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "ORDER_BY" },
            { "type": "field_dropdown", "name": "ORDER_DIR", "options": [["ASC", "ASC"], ["DESC", "DESC"]] },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "LIMIT" }
        ],
        "colour": 210,
        "tooltip": "Advanced SELECT query builder with JOINS",
        "previousStatement": null,
        "nextStatement": null,
        "inputsInline": false
    },
    {
        "type": "sql_insert",
        "message0": "INSERT INTO %1 VALUES ( %2 )",
        "args0": [
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "VALUES", "text": "1, 'John', 25" }
        ],
        "colour": 210,
        "tooltip": "Insert data into table"
    },
    {
        "type": "sql_insert_cols",
        "message0": "INSERT INTO %1 ( %2 ) VALUES ( %3 )",
        "args0": [
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "COLUMNS", "text": "user_id, firstname" },
            { "type": "field_input", "name": "VALUES", "text": "3, 'John'" }
        ],
        "colour": 210,
        "tooltip": "Insert data with specific columns"
    },
    {
        "type": "sql_update",
        "message0": "UPDATE %1 SET %2 WHERE %3",
        "args0": [
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "SET_VALUES", "text": "firstname = 'Jane'" },
            { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
        ],
        "colour": 210,
        "tooltip": "Update existing data",
        "inputsInline": true
    },
    {
        "type": "sql_delete",
        "message0": "DELETE FROM %1 WHERE %2",
        "args0": [
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
        ],
        "colour": 210,
        "tooltip": "Delete data from table",
        "inputsInline": true
    },
    {
        "type": "sql_limit",
        "message0": "LIMIT %1",
        "args0": [
            { "type": "field_number", "name": "COUNT", "value": 1 }
        ],
        "output": "String",
        "colour": 210,
        "tooltip": "Limit the number of rows returned"
    },
    {
        "type": "sql_group",
        "message0": "GROUP BY %1",
        "args0": [
            { "type": "input_value", "name": "COLUMN" }
        ],
        "output": "String",
        "colour": 210,
        "tooltip": "Group rows by column"
    },
    {
        "type": "sql_order",
        "message0": "ORDER BY %1 %2",
        "args0": [
            { "type": "input_value", "name": "COLUMN" },
            { "type": "field_dropdown", "name": "DIRECTION", "options": [["ASC", "ASC"], ["DESC", "DESC"]] }
        ],
        "output": "String",
        "colour": 210,
        "tooltip": "Order rows by column"
    },

    // ========== SQL LOGIC BLOCKS ==========
    {
        "type": "sql_compare",
        "message0": "%1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "LEFT" },
            {
                "type": "field_dropdown", "name": "OP", "options": [
                    ["=", "="], ["\u2260", "<>"], ["<", "<"], [">", ">"], ["\u2264", "<="], ["\u2265", ">="], ["LIKE", "LIKE"]
                ]
            },
            { "type": "input_value", "name": "RIGHT" }
        ],
        "output": "Boolean",
        "colour": 210,
        "inputsInline": true
    },
    {
        "type": "sql_logical",
        "message0": "%1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "A", "check": "Boolean" },
            { "type": "field_dropdown", "name": "OP", "options": [["AND", "AND"], ["OR", "OR"]] },
            { "type": "input_value", "name": "B", "check": "Boolean" }
        ],
        "output": "Boolean",
        "colour": 210,
        "inputsInline": true
    },
    {
        "type": "sql_between",
        "message0": "%1 %2 BETWEEN %3 AND %4",
        "args0": [
            { "type": "input_value", "name": "FIELD" },
            { "type": "field_dropdown", "name": "NOT", "options": [["", ""], ["NOT", "NOT "]] },
            { "type": "input_value", "name": "MIN" },
            { "type": "input_value", "name": "MAX" }
        ],
        "output": "Boolean",
        "colour": 210,
        "inputsInline": true
    },
    {
        "type": "sql_is_null",
        "message0": "%1 IS %2 NULL",
        "args0": [
            { "type": "input_value", "name": "FIELD" },
            { "type": "field_dropdown", "name": "NOT", "options": [["", ""], ["NOT", "NOT"]] }
        ],
        "output": "Boolean",
        "colour": 210,
        "inputsInline": true
    },
    {
        "type": "sql_column",
        "message0": "Column: %1",
        "args0": [{ "type": "field_input", "name": "COL", "text": "id" }],
        "output": "String",
        "colour": 60,
        "tooltip": "Specify a column name (unquoted in SQL)"
    },
    {
        "type": "sql_join_cols",
        "message0": "%1 , %2",
        "args0": [
            { "type": "input_value", "name": "A" },
            { "type": "input_value", "name": "B" }
        ],
        "output": "String",
        "colour": 60,
        "inputsInline": true,
        "tooltip": "Join multiple columns or values"
    },
    {
        "type": "sql_join_3_cols",
        "message0": "%1 , %2 , %3",
        "args0": [
            { "type": "input_value", "name": "A" },
            { "type": "input_value", "name": "B" },
            { "type": "input_value", "name": "C" }
        ],
        "output": "String",
        "colour": 60,
        "inputsInline": true,
        "tooltip": "Join 3 columns or values"
    },
    {
        "type": "sql_join_4_cols",
        "message0": "%1 , %2 , %3 , %4",
        "args0": [
            { "type": "input_value", "name": "A" },
            { "type": "input_value", "name": "B" },
            { "type": "input_value", "name": "C" },
            { "type": "input_value", "name": "D" }
        ],
        "output": "String",
        "colour": 60,
        "inputsInline": true,
        "tooltip": "Join 4 columns or values"
    },
    {
        "type": "sql_value_string",
        "message0": "' %1 '",
        "args0": [{ "type": "field_input", "name": "VAL", "text": "text" }],
        "output": "String",
        "colour": 160,
        "tooltip": "String value (single quotes in SQL)"
    },
    {
        "type": "sql_value_unquoted",
        "message0": "Value: %1",
        "args0": [{ "type": "field_input", "name": "VAL", "text": "NULL" }],
        "output": "String",
        "colour": 160,
        "tooltip": "Unquoted literal or keyword"
    },
    {
        "type": "sql_value_number",
        "message0": "%1",
        "args0": [{ "type": "field_number", "name": "VAL", "value": 0 }],
        "output": "Number",
        "colour": 230
    },
    {
        "type": "sql_in_list",
        "message0": "%1 %2 IN ( %3 )",
        "args0": [
            { "type": "input_value", "name": "FIELD" },
            { "type": "field_dropdown", "name": "NOT", "options": [["", ""], ["NOT", "NOT "]] },
            { "type": "field_input", "name": "LIST", "text": "'A', 'B'" }
        ],
        "output": "Boolean",
        "colour": 210,
        "inputsInline": true
    },
    {
        "type": "sql_where",
        "message0": "WHERE %1",
        "args0": [
            { "type": "input_value", "name": "CONDITION", "check": "Boolean" }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "Standalone WHERE clause"
    },
    {
        "type": "sql_arithmetic",
        "message0": "%1 %2 %3",
        "args0": [
            { "type": "input_value", "name": "A" },
            {
                "type": "field_dropdown", "name": "OP", "options": [
                    ["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"], ["%", "%"]
                ]
            },
            { "type": "input_value", "name": "B" }
        ],
        "output": "Number",
        "colour": 230,
        "inputsInline": true
    },
    {
        "type": "sql_math_abs",
        "message0": "ABS( %1 )",
        "args0": [
            { "type": "input_value", "name": "VAL" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Absolute value"
    },
    {
        "type": "sql_math_round",
        "message0": "ROUND( %1 , %2 )",
        "args0": [
            { "type": "input_value", "name": "VAL" },
            { "type": "field_number", "name": "DECIMALS", "value": 2 }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Round number"
    },
    {
        "type": "sql_function_expression",
        "message0": "%1( %2 )",
        "args0": [
            {
                "type": "field_dropdown", "name": "FUNC", "options": [
                    ["LENGTH", "LENGTH"], ["UPPER", "UPPER"], ["LOWER", "LOWER"], ["LEFT", "LEFT"], ["RIGHT", "RIGHT"],
                    ["COUNT", "COUNT"], ["SUM", "SUM"], ["AVG", "AVG"], ["MAX", "MAX"], ["MIN", "MIN"]
                ]
            },
            { "type": "field_input", "name": "PARAM", "text": "column" }
        ],
        "output": "String",
        "colour": 130,
        "tooltip": "SQL function for use in expressions"
    },
    {
        "type": "sql_alias",
        "message0": "%1 AS %2",
        "args0": [
            { "type": "input_value", "name": "COLUMN" },
            { "type": "field_input", "name": "ALIAS", "text": "alias_name" }
        ],
        "output": "String",
        "colour": 180,
        "tooltip": "Alias any column or expression"
    },

    // ========== SQL TCL BLOCKS ==========
    {
        "type": "sql_commit",
        "message0": "COMMIT",
        "colour": 250,
        "tooltip": "Commit transaction"
    },
    {
        "type": "sql_rollback",
        "message0": "ROLLBACK",
        "colour": 250,
        "tooltip": "Rollback transaction"
    },
    {
        "type": "sql_savepoint",
        "message0": "SAVEPOINT %1",
        "args0": [
            { "type": "field_input", "name": "SAVEPOINT_NAME", "text": "sp1" }
        ],
        "colour": 250,
        "tooltip": "Create savepoint"
    },

    // ========== SQL DCL BLOCKS ==========
    {
        "type": "sql_grant",
        "message0": "GRANT %1 ON %2 TO %3",
        "args0": [
            { "type": "field_input", "name": "PRIVILEGES", "text": "SELECT, INSERT" },
            { "type": "field_input", "name": "OBJECT", "text": "users" },
            { "type": "field_input", "name": "USER", "text": "john" }
        ],
        "colour": 240,
        "tooltip": "Grant privileges"
    },
    {
        "type": "sql_revoke",
        "message0": "REVOKE %1 ON %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "PRIVILEGES", "text": "INSERT" },
            { "type": "field_input", "name": "OBJECT", "text": "users" },
            { "type": "field_input", "name": "USER", "text": "john" }
        ],
        "colour": 240,
        "tooltip": "Revoke privileges"
    },

    // ========== SQL ADVANCED BLOCKS ==========
    {
        "type": "sql_order_by",
        "message0": "SELECT %1 FROM %2 ORDER BY %3 %4",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "*" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "ORDER_COLUMN", "text": "firstname" },
            { "type": "field_dropdown", "name": "ORDER_DIRECTION", "options": [["ASC", "ASC"], ["DESC", "DESC"]] }
        ],
        "colour": 190,
        "tooltip": "Select with ordering"
    },
    {
        "type": "sql_group_by",
        "message0": "SELECT %1 FROM %2 GROUP BY %3",
        "args0": [
            { "type": "input_value", "name": "COLUMNS" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "GROUP_COLUMN", "text": "city" }
        ],
        "colour": 190,
        "tooltip": "Group by with aggregate functions"
    },
    {
        "type": "sql_aggregate",
        "message0": "SELECT %1(%2) FROM %3",
        "args0": [
            { "type": "field_dropdown", "name": "FUNCTION", "options": [["COUNT", "COUNT"], ["SUM", "SUM"], ["AVG", "AVG"], ["MAX", "MAX"], ["MIN", "MIN"]] },
            { "type": "field_input", "name": "COLUMN", "text": "salary" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 190,
        "tooltip": "Aggregate functions"
    },
    {
        "type": "sql_having",
        "message0": "SELECT %1 FROM %2 GROUP BY %3 HAVING %4",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "city, COUNT(*)" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "field_input", "name": "GROUP_COLUMN", "text": "city" },
            { "type": "field_input", "name": "HAVING_CONDITION", "text": "COUNT(*) > 1" }
        ],
        "colour": 190,
        "tooltip": "Group by with having clause"
    },
    {
        "type": "sql_subquery",
        "message0": "SELECT %1 FROM %2 %3 WHERE %4 IN ( %5 SELECT %6 FROM %7 %8 WHERE %9 )",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "*" },
            { "type": "field_input", "name": "TABLE", "text": "users" },
            { "type": "input_dummy" },
            { "type": "field_input", "name": "COLUMN", "text": "user_id" },
            { "type": "input_dummy" },
            { "type": "field_input", "name": "SUB_COLUMNS", "text": "user_id" },
            { "type": "field_input", "name": "SUB_TABLE", "text": "orders" },
            { "type": "input_dummy" },
            { "type": "field_input", "name": "SUB_CONDITION", "text": "amount > 500" }
        ],
        "colour": 180,
        "tooltip": "Subquery with IN clause",
        "inputsInline": false
    },
    {
        "type": "sql_select_alias",
        "message0": "SELECT %1 AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "COLUMN", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "customer_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 180,
        "tooltip": "Column aliasing with SELECT"
    },

    // ========== SQL JOIN BLOCKS ==========
    {
        "type": "sql_join",
        "message0": "%1 JOIN %2 ON %3 = %4",
        "args0": [
            {
                "type": "field_dropdown", "name": "JOIN_TYPE", "options": [
                    ["INNER", "INNER"], ["LEFT", "LEFT"], ["RIGHT", "RIGHT"]
                ]
            },
            { "type": "field_input", "name": "TABLE", "text": "orders" },
            { "type": "field_input", "name": "COL1", "text": "u.user_id" },
            { "type": "field_input", "name": "COL2", "text": "o.user_id" }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 170,
        "tooltip": "Join another table"
    },
    {
        "type": "sql_inner_join",
        "message0": "SELECT %1 FROM %2 INNER JOIN %3 ON %4",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "*" },
            { "type": "field_input", "name": "TABLE1", "text": "users" },
            { "type": "field_input", "name": "TABLE2", "text": "orders" },
            { "type": "field_input", "name": "CONDITION", "text": "users.id = orders.user_id" }
        ],
        "colour": 170,
        "tooltip": "Inner join two tables"
    },
    {
        "type": "sql_left_join",
        "message0": "SELECT %1 FROM %2 LEFT JOIN %3 ON %4",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "*" },
            { "type": "field_input", "name": "TABLE1", "text": "users" },
            { "type": "field_input", "name": "TABLE2", "text": "orders" },
            { "type": "field_input", "name": "CONDITION", "text": "users.id = orders.user_id" }
        ],
        "colour": 170,
        "tooltip": "Left join two tables"
    },
    {
        "type": "sql_right_join",
        "message0": "SELECT %1 FROM %2 RIGHT JOIN %3 ON %4",
        "args0": [
            { "type": "field_input", "name": "COLUMNS", "text": "*" },
            { "type": "field_input", "name": "TABLE1", "text": "users" },
            { "type": "field_input", "name": "TABLE2", "text": "orders" },
            { "type": "field_input", "name": "CONDITION", "text": "users.id = orders.user_id" }
        ],
        "colour": 170,
        "tooltip": "Right join two tables"
    },

    // ========== SQL PROCEDURES & FUNCTIONS ==========
    {
        "type": "sql_create_procedure",
        "message0": "CREATE PROCEDURE %1 BEGIN %2 END",
        "args0": [
            { "type": "field_input", "name": "PROCEDURE_NAME", "text": "update_salary" },
            { "type": "field_input", "name": "PROCEDURE_BODY", "text": "UPDATE users SET salary = salary * 1.1 WHERE department_id = 1" }
        ],
        "colour": 160,
        "tooltip": "Create stored procedure"
    },
    {
        "type": "sql_execute_procedure",
        "message0": "EXECUTE %1",
        "args0": [
            { "type": "field_input", "name": "PROCEDURE_NAME", "text": "update_salary" }
        ],
        "colour": 160,
        "tooltip": "Execute stored procedure"
    },
    {
        "type": "sql_create_function",
        "message0": "CREATE FUNCTION %1 RETURNS %2 BEGIN %3 END",
        "args0": [
            { "type": "field_input", "name": "FUNCTION_NAME", "text": "get_avg_salary" },
            { "type": "field_dropdown", "name": "RETURN_TYPE", "options": [["INTEGER", "INTEGER"], ["VARCHAR", "VARCHAR"], ["DECIMAL", "DECIMAL"]] },
            { "type": "field_input", "name": "FUNCTION_BODY", "text": "RETURN (SELECT AVG(salary) FROM users)" }
        ],
        "colour": 160,
        "tooltip": "Create function"
    },

    // ========== SQL TRIGGERS ==========
    {
        "type": "sql_create_trigger",
        "message0": "CREATE TRIGGER %1 %2 %3 ON %4 BEGIN %5 END",
        "args0": [
            { "type": "field_input", "name": "TRIGGER_NAME", "text": "log_user_changes" },
            { "type": "field_dropdown", "name": "TRIGGER_TIME", "options": [["BEFORE", "BEFORE"], ["AFTER", "AFTER"]] },
            { "type": "field_dropdown", "name": "TRIGGER_EVENT", "options": [["INSERT", "INSERT"], ["UPDATE", "UPDATE"], ["DELETE", "DELETE"]] },
            { "type": "field_input", "name": "TABLE_NAME", "text": "users" },
            { "type": "field_input", "name": "TRIGGER_BODY", "text": "INSERT INTO audit_log VALUES (NEW.id, 'UPDATE', CURRENT_TIMESTAMP)" }
        ],
        "colour": 150,
        "tooltip": "Create trigger"
    },

    // ========== STRING FUNCTION BLOCKS ==========
    {
        "type": "sql_string_select_ucase",
        "message0": "SELECT UPPER( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING_VALUE", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "upper_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Convert string to uppercase"
    },
    {
        "type": "sql_string_select_lcase",
        "message0": "SELECT LOWER( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING_VALUE", "text": "city" },
            { "type": "field_input", "name": "ALIAS", "text": "lower_city" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Convert string to lowercase"
    },
    {
        "type": "sql_string_select_concat",
        "message0": "SELECT CONCAT( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "STRING1", "text": "firstname" },
            { "type": "field_input", "name": "STRING2", "text": "lastname" },
            { "type": "field_input", "name": "ALIAS", "text": "fullname" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Concatenate two strings"
    },
    {
        "type": "sql_string_select_concat_ws",
        "message0": "SELECT CONCAT_WS( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "SEPARATOR", "text": "' '" },
            { "type": "field_input", "name": "STRING1", "text": "firstname" },
            { "type": "field_input", "name": "STRING2", "text": "lastname" },
            { "type": "field_input", "name": "ALIAS", "text": "full_name_ws" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Concatenate with separator"
    },
    {
        "type": "sql_case",
        "message0": "CASE WHEN %1 %2 THEN %3 %4 WHEN %5 %6 THEN %7 %8 ELSE %9 %10 END",
        "args0": [
            { "type": "input_value", "name": "WHEN1", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "THEN1" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "WHEN2", "check": "Boolean" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "THEN2" },
            { "type": "input_dummy" },
            { "type": "input_value", "name": "ELSE" },
            { "type": "input_dummy" }
        ],
        "output": "String",
        "colour": 180,
        "tooltip": "SQL CASE statement for conditional logic",
        "inputsInline": false
    },
    {
        "type": "sql_string_select_substring",
        "message0": "SELECT SUBSTRING( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "START", "text": "1" },
            { "type": "field_input", "name": "LENGTH", "text": "3" },
            { "type": "field_input", "name": "ALIAS", "text": "sub_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Extract substring from string"
    },
    {
        "type": "sql_string_select_length",
        "message0": "SELECT LENGTH( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "name_len" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Get string length"
    },
    {
        "type": "sql_string_select_char_length",
        "message0": "SELECT CHAR_LENGTH( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "char_len" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Get character length"
    },
    {
        "type": "sql_string_select_replace",
        "message0": "SELECT REPLACE( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "ORIGINAL", "text": "firstname" },
            { "type": "field_input", "name": "SEARCH", "text": "'a'" },
            { "type": "field_input", "name": "REPLACE", "text": "'b'" },
            { "type": "field_input", "name": "ALIAS", "text": "replaced_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Replace characters in string"
    },
    {
        "type": "sql_string_select_reverse",
        "message0": "SELECT REVERSE( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "reversed_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Reverse string"
    },
    {
        "type": "sql_string_select_trim",
        "message0": "SELECT %1 ( %2 ) AS %3 FROM %4",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    ["TRIM", "TRIM"],
                    ["LTRIM", "LTRIM"],
                    ["RTRIM", "RTRIM"]
                ]
            },
            { "type": "field_input", "name": "STRING", "text": "email" },
            { "type": "field_input", "name": "ALIAS", "text": "trimmed_email" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Remove leading/trailing spaces"
    },
    {
        "type": "sql_string_select_left",
        "message0": "SELECT LEFT( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_number", "name": "LEN", "value": 3 },
            { "type": "field_input", "name": "ALIAS", "text": "left_part" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Get first characters from string"
    },
    {
        "type": "sql_string_select_right",
        "message0": "SELECT RIGHT( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "lastname" },
            { "type": "field_number", "name": "LEN", "value": 3 },
            { "type": "field_input", "name": "ALIAS", "text": "right_part" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Get last characters from string"
    },
    {
        "type": "sql_string_select_position",
        "message0": "SELECT POSITION( %1 IN %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "SUBSTRING", "text": "'abc'" },
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "pos" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Find position of substring"
    },
    {
        "type": "sql_string_select_lpad",
        "message0": "SELECT LPAD( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "LEN", "text": "10" },
            { "type": "field_input", "name": "PAD", "text": "'*'" },
            { "type": "field_input", "name": "ALIAS", "text": "padded_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Left pad string"
    },
    {
        "type": "sql_string_select_rpad",
        "message0": "SELECT RPAD( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "LEN", "text": "10" },
            { "type": "field_input", "name": "PAD", "text": "'*'" },
            { "type": "field_input", "name": "ALIAS", "text": "padded_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Right pad string"
    },
    {
        "type": "sql_string_select_repeat",
        "message0": "SELECT REPEAT( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "COUNT", "text": "3" },
            { "type": "field_input", "name": "ALIAS", "text": "repeated_name" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Repeat string"
    },
    {
        "type": "sql_string_select_ascii",
        "message0": "SELECT ASCII( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "ascii_val" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Get ASCII value of first character"
    },
    {
        "type": "sql_string_select_substring_index",
        "message0": "SELECT SUBSTRING_INDEX( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "email" },
            { "type": "field_input", "name": "DELIMITER", "text": "'@'" },
            { "type": "field_input", "name": "COUNT", "text": "1" },
            { "type": "field_input", "name": "ALIAS", "text": "extracted_part" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Return substring before delimiter occurrence"
    },
    {
        "type": "sql_string_select_locate",
        "message0": "SELECT LOCATE( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "SUBSTRING", "text": "'ar'" },
            { "type": "field_input", "name": "STRING", "text": "firstname" },
            { "type": "field_input", "name": "ALIAS", "text": "position" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Return position of first occurrence of substring"
    },
    {
        "type": "sql_string_select_mid",
        "message0": "SELECT MID( %1 , %2 , %3 ) AS %4 FROM %5",
        "args0": [
            { "type": "field_input", "name": "STRING", "text": "phone" },
            { "type": "field_input", "name": "POS", "text": "1" },
            { "type": "field_input", "name": "LEN", "text": "3" },
            { "type": "field_input", "name": "ALIAS", "text": "part" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 130,
        "tooltip": "Extract a substring from a string (starting at position, length)"
    },

    // ========== MATH FUNCTION BLOCKS ==========
    {
        "type": "sql_math_ceil",
        "message0": "CEIL( %1 )",
        "args0": [
            { "type": "field_input", "name": "VALUE", "text": "AVG(age)" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Round up to nearest integer"
    },
    {
        "type": "sql_math_floor",
        "message0": "FLOOR( %1 )",
        "args0": [
            { "type": "field_input", "name": "VALUE", "text": "AVG(amount)" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Round down to nearest integer"
    },
    {
        "type": "sql_math_sqrt",
        "message0": "SQRT( %1 )",
        "args0": [
            { "type": "field_input", "name": "VALUE", "text": "age" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Calculate square root"
    },
    {
        "type": "sql_math_pow",
        "message0": "POW( %1 , %2 )",
        "args0": [
            { "type": "field_input", "name": "BASE", "text": "age" },
            { "type": "field_input", "name": "EXPONENT", "text": "2" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Raise to power"
    },
    {
        "type": "sql_math_rand",
        "message0": "RAND()",
        "output": "Number",
        "colour": 230,
        "tooltip": "Generate random number between 0 and 1"
    },
    {
        "type": "sql_math_sign",
        "message0": "SIGN( %1 )",
        "args0": [
            { "type": "field_input", "name": "VALUE", "text": "amount - 1000" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Return sign of number (-1, 0, or 1)"
    },
    {
        "type": "sql_math_truncate",
        "message0": "TRUNCATE( %1 , %2 )",
        "args0": [
            { "type": "field_input", "name": "VALUE", "text": "amount" },
            { "type": "field_input", "name": "DECIMALS", "text": "1" }
        ],
        "output": "Number",
        "colour": 230,
        "tooltip": "Truncate number to specified decimal places"
    },

    // ========== DATE FUNCTION BLOCKS ==========
    {
        "type": "sql_date_select_now",
        "message0": "SELECT NOW() AS %1",
        "args0": [
            { "type": "field_input", "name": "ALIAS", "text": "time_now" }
        ],
        "colour": 140,
        "tooltip": "Get current date and time"
    },
    {
        "type": "sql_date_select_curdate",
        "message0": "SELECT CURDATE() AS %1",
        "args0": [
            { "type": "field_input", "name": "ALIAS", "text": "today" }
        ],
        "colour": 140,
        "tooltip": "Get current date"
    },
    {
        "type": "sql_date_select_curtime",
        "message0": "SELECT CURTIME() AS %1",
        "args0": [
            { "type": "field_input", "name": "ALIAS", "text": "now_time" }
        ],
        "colour": 140,
        "tooltip": "Get current time"
    },
    {
        "type": "sql_date_select_format",
        "message0": "SELECT DATE_FORMAT( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "FORMAT", "text": "'%Y-%m-%d'" },
            { "type": "field_input", "name": "ALIAS", "text": "formatted_date" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Format date"
    },
    {
        "type": "sql_date_select_datediff",
        "message0": "SELECT DATEDIFF( %1 , %2 ) AS %3 FROM %4",
        "args0": [
            { "type": "field_input", "name": "DATE1", "text": "end_date" },
            { "type": "field_input", "name": "DATE2", "text": "start_date" },
            { "type": "field_input", "name": "ALIAS", "text": "day_diff" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Difference between two dates"
    },
    {
        "type": "sql_date_select_dayname",
        "message0": "SELECT DAYNAME( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "ALIAS", "text": "day_of_week" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Get day name"
    },
    {
        "type": "sql_date_select_monthname",
        "message0": "SELECT MONTHNAME( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "ALIAS", "text": "month_of_year" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Get month name"
    },
    {
        "type": "sql_date_select_year",
        "message0": "SELECT YEAR( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "ALIAS", "text": "year_only" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Get year from date"
    },
    {
        "type": "sql_date_select_month",
        "message0": "SELECT MONTH( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "ALIAS", "text": "month_only" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Get month from date"
    },
    {
        "type": "sql_date_select_day",
        "message0": "SELECT DAY( %1 ) AS %2 FROM %3",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_input", "name": "ALIAS", "text": "day_only" },
            { "type": "field_input", "name": "TABLE", "text": "users" }
        ],
        "colour": 140,
        "tooltip": "Get day from date"
    },
    {
        "type": "sql_date_date",
        "message0": "DATE( %1 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" }
        ],
        "output": "String",
        "colour": 140,
        "tooltip": "Extract date part"
    },
    {
        "type": "sql_date_add",
        "message0": "DATE_ADD( %1 , INTERVAL %2 %3 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_number", "name": "VALUE", "value": 7 },
            {
                "type": "field_dropdown", "name": "UNIT", "options": [
                    ["DAY", "DAY"], ["MONTH", "MONTH"], ["YEAR", "YEAR"],
                    ["HOUR", "HOUR"], ["MINUTE", "MINUTE"], ["SECOND", "SECOND"]
                ]
            }
        ],
        "output": "String",
        "colour": 140,
        "tooltip": "Add interval to date"
    },
    {
        "type": "sql_date_sub",
        "message0": "DATE_SUB( %1 , INTERVAL %2 %3 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" },
            { "type": "field_number", "name": "VALUE", "value": 1 },
            {
                "type": "field_dropdown", "name": "UNIT", "options": [
                    ["DAY", "DAY"], ["MONTH", "MONTH"], ["YEAR", "YEAR"],
                    ["HOUR", "HOUR"], ["MINUTE", "MINUTE"], ["SECOND", "SECOND"]
                ]
            }
        ],
        "output": "String",
        "colour": 140,
        "tooltip": "Subtract interval from date"
    },
    {
        "type": "sql_date_month_field",
        "message0": "MONTH( %1 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "order_date" }
        ],
        "output": "Number",
        "colour": 140,
        "tooltip": "Get month number (1-12)"
    },
    {
        "type": "sql_date_dayofweek_field",
        "message0": "DAYOFWEEK( %1 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "order_date" }
        ],
        "output": "Number",
        "colour": 140,
        "tooltip": "Get day of week number (1=Sun, 7=Sat)"
    },
    {
        "type": "sql_date_hour_field",
        "message0": "HOUR( %1 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "NOW()" }
        ],
        "output": "Number",
        "colour": 140,
        "tooltip": "Get hour (0-23)"
    },
    {
        "type": "sql_null_check",
        "message0": "%1 IS %2",
        "args0": [
            { "type": "field_input", "name": "COLUMN", "text": "email" },
            {
                "type": "field_dropdown", "name": "TYPE", "options": [
                    ["NULL", "NULL"], ["NOT NULL", "NOT NULL"]
                ]
            }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "Check if value is NULL or NOT NULL"
    },
    {
        "type": "sql_window_func",
        "message0": "%1 ( %2 ) OVER ( %3 )",
        "args0": [
            {
                "type": "field_dropdown", "name": "FUNC", "options": [
                    ["ROW_NUMBER()", "ROW_NUMBER()"],
                    ["RANK()", "RANK()"],
                    ["DENSE_RANK()", "DENSE_RANK()"],
                    ["PERCENT_RANK()", "PERCENT_RANK()"],
                    ["CUME_DIST()", "CUME_DIST()"],
                    ["LEAD(%1)", "LEAD"],
                    ["LAG(%1)", "LAG"],
                    ["FIRST_VALUE(%1)", "FIRST_VALUE"],
                    ["LAST_VALUE(%1)", "LAST_VALUE"]
                ]
            },
            { "type": "field_input", "name": "VALUE", "text": "age" },
            { "type": "input_value", "name": "OVER" }
        ],
        "output": "Number",
        "colour": 190,
        "tooltip": "Window function (e.g., RANK OVER ...)"
    },
    {
        "type": "sql_window_over",
        "message0": "PARTITION BY %1 ORDER BY %2 %3",
        "args0": [
            { "type": "field_input", "name": "PARTITION", "text": "city" },
            { "type": "field_input", "name": "ORDER", "text": "age" },
            {
                "type": "field_dropdown", "name": "DIR", "options": [
                    ["ASC", "ASC"], ["DESC", "DESC"]
                ]
            }
        ],
        "output": "String",
        "colour": 190,
        "tooltip": "OVER clause for window functions"
    },
    {
        "type": "sql_window_rows",
        "message0": "ROWS %1 %2 AND %3",
        "args0": [
            {
                "type": "field_dropdown", "name": "MODE", "options": [
                    ["BETWEEN", "BETWEEN"]
                ]
            },
            { "type": "field_input", "name": "START", "text": "UNBOUNDED PRECEDING" },
            { "type": "field_input", "name": "END", "text": "UNBOUNDED FOLLOWING" }
        ],
        "output": "String",
        "colour": 190,
        "tooltip": "Window frame (ROWS BETWEEN ...)"
    },
    {
        "type": "sql_timestampdiff",
        "message0": "TIMESTAMPDIFF( %1 , %2 , %3 )",
        "args0": [
            {
                "type": "field_dropdown", "name": "UNIT", "options": [
                    ["YEAR", "YEAR"], ["MONTH", "MONTH"], ["DAY", "DAY"],
                    ["HOUR", "HOUR"], ["MINUTE", "MINUTE"], ["SECOND", "SECOND"]
                ]
            },
            { "type": "field_input", "name": "START_DATE", "text": "start_date" },
            { "type": "field_input", "name": "END_DATE", "text": "end_date" }
        ],
        "output": "Number",
        "colour": 140,
        "tooltip": "Calculate difference between two dates"
    },
    {
        "type": "sql_str_to_date",
        "message0": "STR_TO_DATE( %1 , %2 )",
        "args0": [
            { "type": "field_input", "name": "DATE_STRING", "text": "'01-01-2024'" },
            { "type": "field_input", "name": "FORMAT", "text": "'%d-%m-%Y'" }
        ],
        "output": "Date",
        "colour": 140,
        "tooltip": "Convert string to date"
    },
    {
        "type": "sql_unix_timestamp",
        "message0": "UNIX_TIMESTAMP( %1 )",
        "args0": [
            { "type": "field_input", "name": "DATE", "text": "created_at" }
        ],
        "output": "Number",
        "colour": 140,
        "tooltip": "Convert date to Unix timestamp"
    },
    {
        "type": "sql_from_unixtime",
        "message0": "FROM_UNIXTIME( %1 )",
        "args0": [
            { "type": "field_input", "name": "TIMESTAMP", "text": "1234567890" }
        ],
        "output": "Date",
        "colour": 140,
        "tooltip": "Convert Unix timestamp to date"
    },
    {
        "type": "sql_cte",
        "message0": "WITH %1 %2 AS ( %3 %4 ) %5 %6",
        "args0": [
            { "type": "field_checkbox", "name": "RECURSIVE", "checked": false },
            { "type": "field_input", "name": "NAME", "text": "cte_name" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "QUERY" },
            { "type": "input_dummy" },
            { "type": "input_statement", "name": "NEXT" }
        ],
        "colour": 190,
        "tooltip": "Common Table Expression (WITH clause)",
        "inputsInline": false
    },
    {
        "type": "sql_regexp",
        "message0": "%1 REGEXP %2",
        "args0": [
            { "type": "input_value", "name": "COLUMN" },
            { "type": "field_input", "name": "PATTERN", "text": "'^A.*'" }
        ],
        "output": "Boolean",
        "colour": 210,
        "tooltip": "Regular expression match"
    },
    {
        "type": "sql_json_extract",
        "message0": "JSON_EXTRACT( %1 , %2 )",
        "args0": [
            { "type": "field_input", "name": "COLUMN", "text": "metadata" },
            { "type": "field_input", "name": "PATH", "text": "'$.key'" }
        ],
        "output": "String",
        "colour": 130,
        "tooltip": "Extract value from JSON"
    },
    {
        "type": "sql_group_rollup",
        "message0": "GROUP BY %1 WITH ROLLUP",
        "args0": [
            { "type": "input_value", "name": "COLUMN" }
        ],
        "output": "String",
        "colour": 210,
        "tooltip": "Group by with rollup for subtotals"
    },
    {
        "type": "sql_subquery_nested",
        "message0": "( %1 )",
        "args0": [
            { "type": "input_value", "name": "QUERY" }
        ],
        "output": "String",
        "colour": 190,
        "tooltip": "A nested subquery"
    }
];
