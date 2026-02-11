import { nosqlLevels } from './nosql/levels.js';

const sqlLevelsRaw = [
    {
        "id": 1,
        "title": "SQL Level 1",
        "type": "SQL",
        "questions": [
            {
                "id": 101,
                "text": "Find users NOT from Chennai or Delhi",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "NOT",
                        "IN",
                        "'Chennai'",
                        "'Delhi'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city NOT IN ('Chennai', 'Delhi');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_logical",
                    "sql_is_null",
                    "sql_between",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 102,
                "text": "Find users with age NOT between 20 and 30",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "NOT",
                        "BETWEEN",
                        "20",
                        "AND",
                        "30"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age NOT BETWEEN 20 AND 30;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_between",
                    "sql_logical",
                    "sql_is_null",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 103,
                "text": "Find users where email is NULL",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "IS",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email IS NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_is_null",
                    "sql_null_check",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 104,
                "text": "Find users where phone is NOT NULL",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "phone",
                        "IS",
                        "NOT",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE phone IS NOT NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_is_null",
                    "sql_null_check",
                    "sql_logical",
                    "sql_between",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 105,
                "text": "Find users with age >= 18 AND age <= 60",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">=",
                        "18",
                        "AND",
                        "age",
                        "<=",
                        "60"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age >= 18 AND age <= 60;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 106,
                "text": "Find users from Mumbai with age > 30",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Mumbai'",
                        "AND",
                        "age",
                        ">",
                        "30"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city = 'Mumbai' AND age > 30;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 107,
                "text": "Find users whose lastname is NULL OR city is Delhi",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "lastname",
                        "IS",
                        "NULL",
                        "OR",
                        "city",
                        "=",
                        "'Delhi'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE lastname IS NULL OR city = 'Delhi';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_is_null",
                    "sql_null_check",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 108,
                "text": "Find users with age = 25 OR age = 30 OR age = 35",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "IN",
                        "25",
                        "30",
                        "35"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age IN (25, 30, 35);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 109,
                "text": "Find users whose firstname is exactly 5 characters long",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "LENGTH",
                        "firstname",
                        "=",
                        "5"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE LENGTH(firstname) = 5;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_string_select_length",
                    "sql_function_expression"
                ]
            },
            {
                "id": 110,
                "text": "Find users whose city starts with 'B'",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "LIKE",
                        "'B%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city LIKE 'B%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 111,
                "text": "Find users whose lastname ends with 'sharma'",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "lastname",
                        "LIKE",
                        "'%sharma'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE lastname LIKE '%sharma';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 112,
                "text": "Find users with age < 20 OR age > 50",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "<",
                        "20",
                        "OR",
                        "age",
                        ">",
                        "50"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age < 20 OR age > 50;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 113,
                "text": "Find users from Chennai with firstname starting with 'R'",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "AND",
                        "firstname",
                        "LIKE",
                        "'R%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city = 'Chennai' AND firstname LIKE 'R%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 114,
                "text": "Find users whose email contains '@gmail'",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "LIKE",
                        "'%@gmail%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email LIKE '%@gmail%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 115,
                "text": "Find users where age is divisible by 5",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "%",
                        "5",
                        "=",
                        "0"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age % 5 = 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 116,
                "text": "Find users whose firstname has exactly 4 letters",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "LIKE",
                        "'____'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname LIKE '____';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 117,
                "text": "Find users NOT from top 3 cities",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "NOT",
                        "IN",
                        "'Chennai'",
                        "'Mumbai'",
                        "'Delhi'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city NOT IN ('Chennai', 'Mumbai', 'Delhi');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_logical",
                    "sql_is_null",
                    "sql_between",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 118,
                "text": "Find users with age between 25 and 35 from Bangalore",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "BETWEEN",
                        "25",
                        "AND",
                        "35",
                        "AND",
                        "city",
                        "=",
                        "'Bangalore'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age BETWEEN 25 AND 35 AND city = 'Bangalore';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_between",
                    "sql_logical",
                    "sql_arithmetic"
                ]
            }
        ]
    },
    {
        "id": 2,
        "title": "SQL Level 2",
        "type": "SQL",
        "questions": [
            {
                "id": 201,
                "text": "Find cities with exactly 3 users",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "COUNT",
                        "*",
                        "=",
                        "3"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) FROM users GROUP BY city HAVING COUNT(*) = 3;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_group_by",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 202,
                "text": "Group by city and gender, count users",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "gender",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "gender"
                    ]
                },
                "hint": "Try using: SELECT city, gender, COUNT(*) FROM users GROUP BY city, gender;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 203,
                "text": "Average age by city and gender",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "gender",
                        "AVG",
                        "age",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "gender"
                    ]
                },
                "hint": "Try using: SELECT city, gender, AVG(age) FROM users GROUP BY city, gender;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 204,
                "text": "Cities with total age sum > 200",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "SUM",
                        "age",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "SUM",
                        "age",
                        ">",
                        "200"
                    ]
                },
                "hint": "Try using: SELECT city, SUM(age) FROM users GROUP BY city HAVING SUM(age) > 200;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_group_by",
                    "sql_compare",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 205,
                "text": "Count users by age range (grouped manually)",
                "expectedPattern": {
                    "structures": [
                        "SELECT"
                    ]
                },
                "hint": "Try using: SELECT CASE WHEN age < 20 THEN 'Under 20' WHEN age BETWEEN 20 AND 30 THEN '20-30' ELSE 'Over 30' END AS age_range, COUNT(*) AS cnt FROM users GROUP BY age_range;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 206,
                "text": "Find most common age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "age",
                        "COUNT",
                        "*",
                        "as",
                        "frequency",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "age",
                        "ORDER",
                        "BY",
                        "frequency",
                        "DESC",
                        "LIMIT",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT age, COUNT(*) as frequency FROM users GROUP BY age ORDER BY frequency DESC LIMIT 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_order",
                    "sql_limit",
                    "sql_group_by",
                    "sql_order_by",
                    "sql_select_extended",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 207,
                "text": "Count users per city with age > 25",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "25",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) FROM users WHERE age > 25 GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 208,
                "text": "Find cities where max age is less than 40",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "MAX",
                        "age",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "MAX",
                        "age",
                        "<",
                        "40"
                    ]
                },
                "hint": "Try using: SELECT city, MAX(age) FROM users GROUP BY city HAVING MAX(age) < 40;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 209,
                "text": "Convert firstname to uppercase",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "UPPER",
                        "firstname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT UPPER(firstname) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_ucase",
                    "sql_function_expression"
                ]
            },
            {
                "id": 210,
                "text": "Convert city to lowercase",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LOWER",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT LOWER(city) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_lcase",
                    "sql_function_expression"
                ]
            },
            {
                "id": 211,
                "text": "Get first 3 characters of firstname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LEFT",
                        "firstname",
                        "3",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT LEFT(firstname, 3) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_left_join",
                    "sql_string_select_left",
                    "sql_function_expression"
                ]
            },
            {
                "id": 212,
                "text": "Get last 3 characters of lastname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "RIGHT",
                        "lastname",
                        "3",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT RIGHT(lastname, 3) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_right_join",
                    "sql_string_select_right",
                    "sql_function_expression"
                ]
            },
            {
                "id": 213,
                "text": "Concatenate firstname and lastname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CONCAT",
                        "firstname",
                        "'",
                        "'",
                        "lastname",
                        "as",
                        "fullname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT CONCAT(firstname, ' ', lastname) as fullname FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_string_select_concat",
                    "sql_function_expression"
                ]
            },
            {
                "id": 214,
                "text": "Get length of firstname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "LENGTH",
                        "firstname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, LENGTH(firstname) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_length",
                    "sql_function_expression"
                ]
            },
            {
                "id": 215,
                "text": "Trim spaces from email",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "TRIM",
                        "email",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT TRIM(email) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_trim"
                ]
            },
            {
                "id": 216,
                "text": "Replace 'a' with 'X' in firstname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "REPLACE",
                        "firstname",
                        "'a'",
                        "'X'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT REPLACE(firstname, 'a', 'X') FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_replace"
                ]
            },
            {
                "id": 217,
                "text": "Get substring from position 2, length 4",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SUBSTRING",
                        "firstname",
                        "2",
                        "4",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT SUBSTRING(firstname, 2, 4) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_substring",
                    "sql_function_expression"
                ]
            },
            {
                "id": 218,
                "text": "Reverse the firstname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "REVERSE",
                        "firstname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT REVERSE(firstname) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_string_select_reverse"
                ]
            }
        ]
    },
    {
        "id": 3,
        "title": "SQL Level 3",
        "type": "SQL",
        "questions": [
            {
                "id": 301,
                "text": "Count vowels in firstname",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "LENGTH",
                        "firstname",
                        "-",
                        "LENGTH",
                        "REPLACE",
                        "REPLACE",
                        "REPLACE",
                        "REPLACE",
                        "REPLACE",
                        "LOWER",
                        "firstname",
                        "'a'",
                        "''",
                        "'e'",
                        "''",
                        "'i'",
                        "''",
                        "'o'",
                        "''",
                        "'u'",
                        "''",
                        "as",
                        "vowel_count",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, LENGTH(firstname) - LENGTH(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(LOWER(firstname), 'a', ''), 'e', ''), 'i', ''), 'o', ''), 'u', '')) as vowel_count FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_string_select_lcase",
                    "sql_function_expression",
                    "sql_string_select_length",
                    "sql_string_select_replace"
                ]
            },
            {
                "id": 302,
                "text": "Get initials from name",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CONCAT",
                        "LEFT",
                        "firstname",
                        "1",
                        "LEFT",
                        "lastname",
                        "1",
                        "as",
                        "initials",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT CONCAT(LEFT(firstname, 1), LEFT(lastname, 1)) as initials FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_left_join",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_string_select_concat",
                    "sql_function_expression",
                    "sql_string_select_left"
                ]
            },
            {
                "id": 303,
                "text": "Convert firstname to title case",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CONCAT",
                        "UPPER",
                        "LEFT",
                        "firstname",
                        "1",
                        "LOWER",
                        "SUBSTRING",
                        "firstname",
                        "2",
                        "as",
                        "title_case",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT CONCAT(UPPER(LEFT(firstname, 1)), LOWER(SUBSTRING(firstname, 2))) as title_case FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_left_join",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_string_select_ucase",
                    "sql_function_expression",
                    "sql_string_select_lcase",
                    "sql_string_select_concat",
                    "sql_string_select_substring",
                    "sql_string_select_left"
                ]
            },
            {
                "id": 304,
                "text": "Inner join users and orders on user_id",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT * FROM users u INNER JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 305,
                "text": "Get username and order amount",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "o.amount",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, o.amount FROM users u INNER JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare"
                ]
            },
            {
                "id": 306,
                "text": "Left join users and orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "u",
                        "LEFT",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT * FROM users u LEFT JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_string_select_left",
                    "sql_function_expression"
                ]
            },
            {
                "id": 307,
                "text": "Right join users and orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "u",
                        "RIGHT",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT * FROM users u RIGHT JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_string_select_right",
                    "sql_function_expression"
                ]
            },
            {
                "id": 308,
                "text": "Find users who have placed orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DISTINCT",
                        "u.*",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT DISTINCT u.* FROM users u INNER JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare"
                ]
            },
            {
                "id": 309,
                "text": "Find users who haven't placed any orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.*",
                        "FROM",
                        "users",
                        "u",
                        "LEFT",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "WHERE",
                        "o.order_id",
                        "IS",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT u.* FROM users u LEFT JOIN orders o ON u.user_id = o.user_id WHERE o.order_id IS NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_is_null",
                    "sql_null_check",
                    "sql_string_select_left",
                    "sql_function_expression"
                ]
            },
            {
                "id": 310,
                "text": "Count orders per user",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "COUNT",
                        "o.order_id",
                        "FROM",
                        "users",
                        "u",
                        "LEFT",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "GROUP",
                        "BY",
                        "u.user_id",
                        "u.firstname"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, COUNT(o.order_id) FROM users u LEFT JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.firstname;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_compare",
                    "sql_string_select_left",
                    "sql_function_expression",
                    "sql_aggregate"
                ]
            },
            {
                "id": 311,
                "text": "Total amount spent per user",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "SUM",
                        "o.amount",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "GROUP",
                        "BY",
                        "u.user_id",
                        "u.firstname"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, SUM(o.amount) FROM users u INNER JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.firstname;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_compare",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 312,
                "text": "Join users, orders, and products",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "o.order_id",
                        "p.product_name",
                        "FROM",
                        "users",
                        "u"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, o.order_id, p.product_name FROM users u INNER JOIN orders o ON u.user_id = o.user_id INNER JOIN products p ON o.product_id = p.product_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_logical",
                    "sql_column"
                ]
            },
            {
                "id": 313,
                "text": "Find users with orders > 1000",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "o.amount",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "WHERE",
                        "o.amount",
                        ">",
                        "1000"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, o.amount FROM users u INNER JOIN orders o ON u.user_id = o.user_id WHERE o.amount > 1000;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join"
                ]
            },
            {
                "id": 314,
                "text": "Self join to find users from same city",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u1.firstname",
                        "u2.firstname",
                        "u1.city",
                        "FROM",
                        "users",
                        "u1",
                        "INNER",
                        "JOIN",
                        "users",
                        "u2",
                        "ON",
                        "u1.city",
                        "=",
                        "u2.city",
                        "WHERE",
                        "u1.user_id",
                        "<",
                        "u2.user_id"
                    ]
                },
                "hint": "Try using: SELECT u1.firstname, u2.firstname, u1.city FROM users u1 INNER JOIN users u2 ON u1.city = u2.city WHERE u1.user_id < u2.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join"
                ]
            },
            {
                "id": 315,
                "text": "Join users and orders, filter by date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "o.order_date",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "WHERE",
                        "o.order_date",
                        ">",
                        "'2024-01-01'"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, o.order_date FROM users u INNER JOIN orders o ON u.user_id = o.user_id WHERE o.order_date > '2024-01-01';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join"
                ]
            },
            {
                "id": 316,
                "text": "Average order amount per city",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.city",
                        "AVG",
                        "o.amount",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "GROUP",
                        "BY",
                        "u.city"
                    ]
                },
                "hint": "Try using: SELECT u.city, AVG(o.amount) FROM users u INNER JOIN orders o ON u.user_id = o.user_id GROUP BY u.city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_compare",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 317,
                "text": "Users with more than 3 orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "COUNT",
                        "o.order_id",
                        "as",
                        "order_count",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "GROUP",
                        "BY",
                        "u.user_id",
                        "u.firstname",
                        "HAVING",
                        "order_count",
                        ">",
                        "3"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, COUNT(o.order_id) as order_count FROM users u INNER JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.firstname HAVING order_count > 3;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_having",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 318,
                "text": "Find product names ordered by each user",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "p.product_name",
                        "FROM",
                        "users",
                        "u"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, p.product_name FROM users u INNER JOIN orders o ON u.user_id = o.user_id INNER JOIN products p ON o.product_id = p.product_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_logical",
                    "sql_column"
                ]
            }
        ]
    },
    {
        "id": 4,
        "title": "SQL Level 4",
        "type": "SQL",
        "questions": [
            {
                "id": 401,
                "text": "Users who ordered more than one product type",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "COUNT",
                        "DISTINCT",
                        "o.product_id",
                        "as",
                        "product_count",
                        "FROM",
                        "users",
                        "u",
                        "INNER",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "GROUP",
                        "BY",
                        "u.user_id",
                        "u.firstname",
                        "HAVING",
                        "product_count",
                        ">",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, COUNT(DISTINCT o.product_id) as product_count FROM users u INNER JOIN orders o ON u.user_id = o.user_id GROUP BY u.user_id, u.firstname HAVING product_count > 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_having",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 402,
                "text": "Join with alias and complex conditions",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.firstname",
                        "as",
                        "customer",
                        "p.product_name",
                        "as",
                        "item",
                        "FROM",
                        "users",
                        "u"
                    ]
                },
                "hint": "Try using: SELECT u.firstname AS customer, p.product_name AS item FROM users u INNER JOIN orders o ON u.user_id = o.user_id INNER JOIN products p ON o.product_id = p.product_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_compare",
                    "sql_logical",
                    "sql_column"
                ]
            },
            {
                "id": 403,
                "text": "Find average age of users per product",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "p.product_name",
                        "AVG",
                        "u.age",
                        "FROM",
                        "users",
                        "u"
                    ]
                },
                "hint": "Try using: SELECT p.product_name, AVG(u.age) FROM users u INNER JOIN orders o ON u.user_id = o.user_id INNER JOIN products p ON o.product_id = p.product_id GROUP BY p.product_name;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_aggregate",
                    "sql_function_expression",
                    "sql_join",
                    "sql_group",
                    "sql_group_by",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join"
                ]
            },
            {
                "id": 404,
                "text": "Find users with age greater than average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "SELECT",
                        "AVG",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 405,
                "text": "Find users from city with most users",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "ORDER",
                        "BY",
                        "COUNT",
                        "*",
                        "DESC",
                        "LIMIT",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city = (SELECT city FROM users GROUP BY city ORDER BY COUNT(*) DESC LIMIT 1);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_order",
                    "sql_limit",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_order_by",
                    "sql_select_extended",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 406,
                "text": "Users with above average order amount",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "IN",
                        "SELECT",
                        "user_id",
                        "FROM",
                        "orders",
                        "WHERE",
                        "amount",
                        ">",
                        "SELECT",
                        "AVG",
                        "amount",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id IN (SELECT user_id FROM orders WHERE amount > (SELECT AVG(amount) FROM orders));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 407,
                "text": "Find maximum age user details",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "=",
                        "SELECT",
                        "MAX",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age = (SELECT MAX(age) FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 408,
                "text": "Users who placed orders above average amount",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "IN",
                        "SELECT",
                        "user_id",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id",
                        "HAVING",
                        "AVG",
                        "amount",
                        ">",
                        "SELECT",
                        "AVG",
                        "amount",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id IN (SELECT user_id FROM orders GROUP BY user_id HAVING AVG(amount) > (SELECT AVG(amount) FROM orders));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_having",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_in_list",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 409,
                "text": "Find cities with more users than average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "as",
                        "cnt",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "cnt",
                        ">",
                        "SELECT",
                        "AVG",
                        "city_count",
                        "FROM",
                        "SELECT",
                        "COUNT",
                        "*",
                        "as",
                        "city_count",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "as",
                        "subq"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) as cnt FROM users GROUP BY city HAVING cnt > (SELECT AVG(city_count) FROM (SELECT COUNT(*) as city_count FROM users GROUP BY city) as subq);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 410,
                "text": "Users from cities with total age > 200",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "IN",
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "SUM",
                        "age",
                        ">",
                        "200"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city IN (SELECT city FROM users GROUP BY city HAVING SUM(age) > 200);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_having",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_in_list",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 411,
                "text": "Find youngest user per city using subquery",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "u1",
                        "WHERE",
                        "age",
                        "=",
                        "SELECT",
                        "MIN",
                        "age",
                        "FROM",
                        "users",
                        "u2",
                        "WHERE",
                        "u1.city",
                        "=",
                        "u2.city"
                    ]
                },
                "hint": "Try using: SELECT * FROM users u1 WHERE age = (SELECT MIN(age) FROM users u2 WHERE u1.city = u2.city);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 412,
                "text": "Users who never placed an order",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "NOT",
                        "IN",
                        "SELECT",
                        "DISTINCT",
                        "user_id",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id NOT IN (SELECT DISTINCT user_id FROM orders);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_logical",
                    "sql_is_null",
                    "sql_between",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 413,
                "text": "Products never ordered",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "products",
                        "WHERE",
                        "product_id",
                        "NOT",
                        "IN",
                        "SELECT",
                        "DISTINCT",
                        "product_id",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT * FROM products WHERE product_id NOT IN (SELECT DISTINCT product_id FROM orders);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_logical",
                    "sql_is_null",
                    "sql_between",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 414,
                "text": "Users with more orders than average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user_id",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id",
                        "HAVING",
                        "COUNT",
                        "*",
                        ">",
                        "SELECT",
                        "AVG",
                        "order_count",
                        "FROM",
                        "SELECT",
                        "COUNT",
                        "*",
                        "as",
                        "order_count",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id",
                        "as",
                        "subq"
                    ]
                },
                "hint": "Try using: SELECT user_id FROM orders GROUP BY user_id HAVING COUNT(*) > (SELECT AVG(order_count) FROM (SELECT COUNT(*) as order_count FROM orders GROUP BY user_id) as subq);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 415,
                "text": "Find second highest age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "MAX",
                        "age",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "<",
                        "SELECT",
                        "MAX",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT MAX(age) FROM users WHERE age < (SELECT MAX(age) FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 416,
                "text": "Users with total spending above 5000",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "IN",
                        "SELECT",
                        "user_id",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id",
                        "HAVING",
                        "SUM",
                        "amount",
                        ">",
                        "5000"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id IN (SELECT user_id FROM orders GROUP BY user_id HAVING SUM(amount) > 5000);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_having",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_in_list",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 417,
                "text": "Cities where minimum age is less than overall average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "HAVING",
                        "MIN",
                        "age",
                        "<",
                        "SELECT",
                        "AVG",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city FROM users GROUP BY city HAVING MIN(age) < (SELECT AVG(age) FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_group_by",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 418,
                "text": "Find orders with amount greater than user's city average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "orders",
                        "o",
                        "WHERE",
                        "amount",
                        ">",
                        "SELECT",
                        "AVG",
                        "o2.amount",
                        "FROM",
                        "orders",
                        "o2",
                        "INNER",
                        "JOIN",
                        "users",
                        "u",
                        "ON",
                        "o2.user_id",
                        "=",
                        "u.user_id",
                        "WHERE",
                        "u.user_id",
                        "=",
                        "o.user_id"
                    ]
                },
                "hint": "Try using: SELECT * FROM orders o WHERE amount > (SELECT AVG(o2.amount) FROM orders o2 INNER JOIN users u ON o2.user_id = u.user_id WHERE u.user_id = o.user_id);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            }
        ]
    },
    {
        "id": 5,
        "title": "SQL Level 5",
        "type": "SQL",
        "questions": [
            {
                "id": 501,
                "text": "Products with no orders in last 30 days",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "products",
                        "WHERE",
                        "product_id",
                        "NOT",
                        "IN",
                        "SELECT",
                        "product_id",
                        "FROM",
                        "orders",
                        "WHERE",
                        "order_date",
                        ">",
                        "DATE_SUB",
                        "NOW",
                        "INTERVAL",
                        "30",
                        "DAY"
                    ]
                },
                "hint": "Try using: SELECT * FROM products WHERE product_id NOT IN (SELECT product_id FROM orders WHERE order_date > DATE_SUB(NOW(), INTERVAL 30 DAY));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_logical",
                    "sql_is_null",
                    "sql_between",
                    "sql_arithmetic",
                    "sql_date_select_now",
                    "sql_date_select_day",
                    "sql_date_sub"
                ]
            },
            {
                "id": 502,
                "text": "Find users with exact average age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "=",
                        "SELECT",
                        "ROUND",
                        "AVG",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE age = (SELECT ROUND(AVG(age)) FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_math_round",
                    "sql_function_expression",
                    "sql_aggregate"
                ]
            },
            {
                "id": 503,
                "text": "Orders from users older than 30",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "orders",
                        "WHERE",
                        "user_id",
                        "IN",
                        "SELECT",
                        "user_id",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "30"
                    ]
                },
                "hint": "Try using: SELECT * FROM orders WHERE user_id IN (SELECT user_id FROM users WHERE age > 30);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_in_list",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 504,
                "text": "Get current date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CURDATE"
                    ]
                },
                "hint": "Try using: SELECT CURDATE();",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_curdate"
                ]
            },
            {
                "id": 505,
                "text": "Get current time",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CURTIME"
                    ]
                },
                "hint": "Try using: SELECT CURTIME();",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_curtime"
                ]
            },
            {
                "id": 506,
                "text": "Get current datetime",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "NOW"
                    ]
                },
                "hint": "Try using: SELECT NOW();",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_now"
                ]
            },
            {
                "id": 507,
                "text": "Extract year from date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "YEAR",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT YEAR(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_year"
                ]
            },
            {
                "id": 508,
                "text": "Extract month from date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "MONTH",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT MONTH(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_month",
                    "sql_date_month_field"
                ]
            },
            {
                "id": 509,
                "text": "Extract day from date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DAY",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DAY(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_day"
                ]
            },
            {
                "id": 510,
                "text": "Get day name",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DAYNAME",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DAYNAME(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_dayname"
                ]
            },
            {
                "id": 511,
                "text": "Get month name",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "MONTHNAME",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT MONTHNAME(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_monthname"
                ]
            },
            {
                "id": 512,
                "text": "Add 7 days to date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATE_ADD",
                        "created_date",
                        "INTERVAL",
                        "7",
                        "DAY",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DATE_ADD(created_date, INTERVAL 7 DAY) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_day",
                    "sql_date_add"
                ]
            },
            {
                "id": 513,
                "text": "Subtract 1 month from date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATE_SUB",
                        "created_date",
                        "INTERVAL",
                        "1",
                        "MONTH",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DATE_SUB(created_date, INTERVAL 1 MONTH) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_month",
                    "sql_date_month_field",
                    "sql_date_sub"
                ]
            },
            {
                "id": 514,
                "text": "Calculate age from birthdate",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "TIMESTAMPDIFF",
                        "YEAR",
                        "birthdate",
                        "CURDATE",
                        "as",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) as age FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_date_select_curdate",
                    "sql_date_select_year"
                ]
            },
            {
                "id": 515,
                "text": "Difference in days between two dates",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATEDIFF",
                        "NOW",
                        "created_date",
                        "as",
                        "days_since_creation",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DATEDIFF(NOW(), created_date) as days_since_creation FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_date_select_now",
                    "sql_date_select_datediff"
                ]
            },
            {
                "id": 516,
                "text": "Format date as DD-MM-YYYY",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATE_FORMAT",
                        "created_date",
                        "'%d-%m-%Y'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT DATE_FORMAT(created_date, '%d-%m-%Y') FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_format"
                ]
            },
            {
                "id": 517,
                "text": "Get last day of month",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LAST_DAY",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT LAST_DAY(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 518,
                "text": "Get first day of current month",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATE_FORMAT",
                        "NOW",
                        "'%Y-%m-01'"
                    ]
                },
                "hint": "Try using: SELECT DATE_FORMAT(NOW(), '%Y-%m-01');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_date_select_now",
                    "sql_date_select_format"
                ]
            }
        ]
    },
    {
        "id": 6,
        "title": "SQL Level 6",
        "type": "SQL",
        "questions": [
            {
                "id": 601,
                "text": "Convert string to date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "STR_TO_DATE",
                        "'01-01-2024'",
                        "'%d-%m-%Y'"
                    ]
                },
                "hint": "Try using: SELECT STR_TO_DATE('01-01-2024', '%d-%m-%Y');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 602,
                "text": "Get Unix timestamp",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "UNIX_TIMESTAMP",
                        "created_date",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT UNIX_TIMESTAMP(created_date) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 603,
                "text": "Convert Unix timestamp to date",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "FROM_UNIXTIME",
                        "1234567890"
                    ]
                },
                "hint": "Try using: SELECT FROM_UNIXTIME(1234567890);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 604,
                "text": "Round age to nearest integer",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "ROUND",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT ROUND(age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_round",
                    "sql_function_expression"
                ]
            },
            {
                "id": 605,
                "text": "Round amount to 2 decimal places",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "ROUND",
                        "amount",
                        "2",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT ROUND(amount, 2) FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_round",
                    "sql_function_expression"
                ]
            },
            {
                "id": 606,
                "text": "Ceiling of average age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CEIL",
                        "AVG",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT CEIL(AVG(age)) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_ceil",
                    "sql_function_expression",
                    "sql_aggregate"
                ]
            },
            {
                "id": 607,
                "text": "Floor of average amount",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "FLOOR",
                        "AVG",
                        "amount",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT FLOOR(AVG(amount)) FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_floor",
                    "sql_function_expression",
                    "sql_aggregate"
                ]
            },
            {
                "id": 608,
                "text": "Absolute value of difference",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "ABS",
                        "age",
                        "-",
                        "30",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT ABS(age - 30) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_arithmetic",
                    "sql_math_abs",
                    "sql_function_expression"
                ]
            },
            {
                "id": 609,
                "text": "Square root of age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SQRT",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT SQRT(age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_sqrt",
                    "sql_function_expression"
                ]
            },
            {
                "id": 610,
                "text": "Power of 2",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "POW",
                        "age",
                        "2",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT POW(age, 2) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_pow",
                    "sql_function_expression"
                ]
            },
            {
                "id": 611,
                "text": "Modulus operation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "age",
                        "%",
                        "10",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT age % 10 FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 612,
                "text": "Random number",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "RAND"
                    ]
                },
                "hint": "Try using: SELECT RAND();",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_rand"
                ]
            },
            {
                "id": 613,
                "text": "Random number between 1 and 100",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "FLOOR",
                        "RAND",
                        "*",
                        "100",
                        "+",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT FLOOR(RAND() * 100) + 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_arithmetic",
                    "sql_math_floor",
                    "sql_function_expression",
                    "sql_math_rand"
                ]
            },
            {
                "id": 614,
                "text": "Sign of number",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SIGN",
                        "amount",
                        "-",
                        "1000",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT SIGN(amount - 1000) FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_arithmetic",
                    "sql_math_sign"
                ]
            },
            {
                "id": 615,
                "text": "Truncate to 1 decimal",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "TRUNCATE",
                        "amount",
                        "1",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT TRUNCATE(amount, 1) FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_math_truncate"
                ]
            },
            {
                "id": 616,
                "text": "Greatest of three values",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "GREATEST",
                        "age",
                        "18",
                        "65",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT GREATEST(age, 18, 65) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 617,
                "text": "Least of three values",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LEAST",
                        "age",
                        "18",
                        "65",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT LEAST(age, 18, 65) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 618,
                "text": "Natural logarithm",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LN",
                        "age",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "0"
                    ]
                },
                "hint": "Try using: SELECT LN(age) FROM users WHERE age > 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column"
                ]
            }
        ]
    },
    {
        "id": 7,
        "title": "SQL Level 7",
        "type": "SQL",
        "questions": [
            {
                "id": 701,
                "text": "Gender abbreviation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "gender",
                        "WHEN",
                        "'Male'",
                        "THEN",
                        "'M'",
                        "WHEN",
                        "'Female'",
                        "THEN",
                        "'F'",
                        "ELSE",
                        "'O'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE gender WHEN 'Male' THEN 'M' WHEN 'Female' THEN 'F' ELSE 'O' END FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_case"
                ]
            },
            {
                "id": 702,
                "text": "City region classification",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "CASE",
                        "WHEN",
                        "city",
                        "IN",
                        "'Chennai'",
                        "'Bangalore'",
                        "THEN",
                        "'South'",
                        "WHEN",
                        "city",
                        "IN",
                        "'Delhi'",
                        "'Mumbai'",
                        "THEN",
                        "'North'",
                        "ELSE",
                        "'Other'",
                        "END",
                        "as",
                        "region",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, CASE WHEN city IN ('Chennai', 'Bangalore') THEN 'South' WHEN city IN ('Delhi', 'Mumbai') THEN 'North' ELSE 'Other' END as region FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_in_list",
                    "sql_case"
                ]
            },
            {
                "id": 703,
                "text": "Discount based on amount",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "amount",
                        "CASE",
                        "WHEN",
                        "amount",
                        ">",
                        "5000",
                        "THEN",
                        "amount",
                        "*",
                        "0.9",
                        "WHEN",
                        "amount",
                        ">",
                        "2000",
                        "THEN",
                        "amount",
                        "*",
                        "0.95",
                        "ELSE",
                        "amount",
                        "END",
                        "as",
                        "final_amount",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT amount, CASE WHEN amount > 5000 THEN amount * 0.9 WHEN amount > 2000 THEN amount * 0.95 ELSE amount END as final_amount FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_case"
                ]
            },
            {
                "id": 704,
                "text": "Priority based on age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        ">",
                        "60",
                        "THEN",
                        "'High'",
                        "WHEN",
                        "age",
                        ">",
                        "30",
                        "THEN",
                        "'Medium'",
                        "ELSE",
                        "'Low'",
                        "END",
                        "as",
                        "priority",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age > 60 THEN 'High' WHEN age > 30 THEN 'Medium' ELSE 'Low' END as priority FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 705,
                "text": "Season from month",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CASE",
                        "WHEN",
                        "MONTH",
                        "order_date",
                        "IN",
                        "3",
                        "4",
                        "5",
                        "THEN",
                        "'Spring'",
                        "WHEN",
                        "MONTH",
                        "order_date",
                        "IN",
                        "6",
                        "7",
                        "8",
                        "THEN",
                        "'Summer'",
                        "WHEN",
                        "MONTH",
                        "order_date",
                        "IN",
                        "9",
                        "10",
                        "11",
                        "THEN",
                        "'Fall'",
                        "ELSE",
                        "'Winter'",
                        "END",
                        "as",
                        "season",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT CASE WHEN MONTH(order_date) IN (3,4,5) THEN 'Spring' WHEN MONTH(order_date) IN (6,7,8) THEN 'Summer' WHEN MONTH(order_date) IN (9,10,11) THEN 'Fall' ELSE 'Winter' END as season FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_in_list",
                    "sql_case",
                    "sql_date_select_month",
                    "sql_date_month_field"
                ]
            },
            {
                "id": 706,
                "text": "Grade based on marks",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "student_name",
                        "CASE",
                        "WHEN",
                        "marks",
                        ">=",
                        "90",
                        "THEN",
                        "'A'",
                        "WHEN",
                        "marks",
                        ">=",
                        "75",
                        "THEN",
                        "'B'",
                        "WHEN",
                        "marks",
                        ">=",
                        "60",
                        "THEN",
                        "'C'",
                        "ELSE",
                        "'F'",
                        "END",
                        "as",
                        "grade",
                        "FROM",
                        "students"
                    ]
                },
                "hint": "Try using: SELECT student_name, CASE WHEN marks >= 90 THEN 'A' WHEN marks >= 75 THEN 'B' WHEN marks >= 60 THEN 'C' ELSE 'F' END as grade FROM students;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 707,
                "text": "Status based on NULL check",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "email",
                        "IS",
                        "NULL",
                        "THEN",
                        "'No",
                        "Email'",
                        "ELSE",
                        "'Has",
                        "Email'",
                        "END",
                        "as",
                        "email_status",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN email IS NULL THEN 'No Email' ELSE 'Has Email' END as email_status FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_is_null",
                    "sql_null_check",
                    "sql_case"
                ]
            },
            {
                "id": 708,
                "text": "Weekend or weekday",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_date",
                        "CASE",
                        "WHEN",
                        "DAYOFWEEK",
                        "order_date",
                        "IN",
                        "1",
                        "7",
                        "THEN",
                        "'Weekend'",
                        "ELSE",
                        "'Weekday'",
                        "END",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_date, CASE WHEN DAYOFWEEK(order_date) IN (1,7) THEN 'Weekend' ELSE 'Weekday' END FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_in_list",
                    "sql_case"
                ]
            },
            {
                "id": 709,
                "text": "Price range categorization",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "product_name",
                        "CASE",
                        "WHEN",
                        "price",
                        "<",
                        "100",
                        "THEN",
                        "'Budget'",
                        "WHEN",
                        "price",
                        "<",
                        "500",
                        "THEN",
                        "'Mid-Range'",
                        "ELSE",
                        "'Premium'",
                        "END",
                        "FROM",
                        "products"
                    ]
                },
                "hint": "Try using: SELECT product_name, CASE WHEN price < 100 THEN 'Budget' WHEN price < 500 THEN 'Mid-Range' ELSE 'Premium' END FROM products;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 710,
                "text": "Multiple condition CASE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        ">",
                        "50",
                        "AND",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "'Senior",
                        "Chennai'",
                        "WHEN",
                        "age",
                        "<",
                        "25",
                        "AND",
                        "city",
                        "=",
                        "'Mumbai'",
                        "THEN",
                        "'Young",
                        "Mumbai'",
                        "ELSE",
                        "'Other'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age > 50 AND city = 'Chennai' THEN 'Senior Chennai' WHEN age < 25 AND city = 'Mumbai' THEN 'Young Mumbai' ELSE 'Other' END FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_logical",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 711,
                "text": "Tax calculation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "amount",
                        "CASE",
                        "WHEN",
                        "amount",
                        "<",
                        "1000",
                        "THEN",
                        "amount",
                        "*",
                        "1.05",
                        "WHEN",
                        "amount",
                        "<",
                        "5000",
                        "THEN",
                        "amount",
                        "*",
                        "1.12",
                        "ELSE",
                        "amount",
                        "*",
                        "1.18",
                        "END",
                        "as",
                        "with_tax",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT amount, CASE WHEN amount < 1000 THEN amount * 1.05 WHEN amount < 5000 THEN amount * 1.12 ELSE amount * 1.18 END as with_tax FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_case"
                ]
            },
            {
                "id": 712,
                "text": "Member tier",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user_id",
                        "CASE",
                        "WHEN",
                        "total_orders",
                        ">",
                        "50",
                        "THEN",
                        "'Gold'",
                        "WHEN",
                        "total_orders",
                        ">",
                        "20",
                        "THEN",
                        "'Silver'",
                        "ELSE",
                        "'Bronze'",
                        "END",
                        "FROM",
                        "SELECT",
                        "user_id",
                        "COUNT",
                        "*",
                        "as",
                        "total_orders",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id",
                        "as",
                        "subq"
                    ]
                },
                "hint": "Try using: SELECT user_id, CASE WHEN total_orders > 50 THEN 'Gold' WHEN total_orders > 20 THEN 'Silver' ELSE 'Bronze' END FROM (SELECT user_id, COUNT(*) as total_orders FROM orders GROUP BY user_id) as subq;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_case",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 713,
                "text": "Risk assessment",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        "<",
                        "18",
                        "THEN",
                        "'Minor",
                        "Risk'",
                        "WHEN",
                        "age",
                        ">",
                        "65",
                        "THEN",
                        "'Senior",
                        "Risk'",
                        "ELSE",
                        "'Normal'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age < 18 THEN 'Minor Risk' WHEN age > 65 THEN 'Senior Risk' ELSE 'Normal' END FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 714,
                "text": "Shipping cost",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "amount",
                        "CASE",
                        "WHEN",
                        "amount",
                        ">",
                        "2000",
                        "THEN",
                        "0",
                        "WHEN",
                        "amount",
                        ">",
                        "1000",
                        "THEN",
                        "50",
                        "ELSE",
                        "100",
                        "END",
                        "as",
                        "shipping",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT amount, CASE WHEN amount > 2000 THEN 0 WHEN amount > 1000 THEN 50 ELSE 100 END as shipping FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 715,
                "text": "Performance rating",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "employee_name",
                        "CASE",
                        "WHEN",
                        "rating",
                        ">=",
                        "4.5",
                        "THEN",
                        "'Excellent'",
                        "WHEN",
                        "rating",
                        ">=",
                        "3.5",
                        "THEN",
                        "'Good'",
                        "WHEN",
                        "rating",
                        ">=",
                        "2.5",
                        "THEN",
                        "'Average'",
                        "ELSE",
                        "'Poor'",
                        "END",
                        "FROM",
                        "employees"
                    ]
                },
                "hint": "Try using: SELECT employee_name, CASE WHEN rating >= 4.5 THEN 'Excellent' WHEN rating >= 3.5 THEN 'Good' WHEN rating >= 2.5 THEN 'Average' ELSE 'Poor' END FROM employees;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 716,
                "text": "Day type classification",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CASE",
                        "DAYOFWEEK",
                        "NOW",
                        "WHEN",
                        "2",
                        "THEN",
                        "'Monday",
                        "Blues'",
                        "WHEN",
                        "6",
                        "THEN",
                        "'Friday",
                        "Feeling'",
                        "ELSE",
                        "'Regular",
                        "Day'",
                        "END"
                    ]
                },
                "hint": "Try using: SELECT CASE DAYOFWEEK(NOW()) WHEN 2 THEN 'Monday Blues' WHEN 6 THEN 'Friday Feeling' ELSE 'Regular Day' END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_case",
                    "sql_date_select_now"
                ]
            },
            {
                "id": 717,
                "text": "Temperature category",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "temp",
                        "CASE",
                        "WHEN",
                        "temp",
                        ">",
                        "35",
                        "THEN",
                        "'Hot'",
                        "WHEN",
                        "temp",
                        ">",
                        "25",
                        "THEN",
                        "'Warm'",
                        "WHEN",
                        "temp",
                        ">",
                        "15",
                        "THEN",
                        "'Cool'",
                        "ELSE",
                        "'Cold'",
                        "END",
                        "FROM",
                        "weather"
                    ]
                },
                "hint": "Try using: SELECT city, temp, CASE WHEN temp > 35 THEN 'Hot' WHEN temp > 25 THEN 'Warm' WHEN temp > 15 THEN 'Cool' ELSE 'Cold' END FROM weather;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_compare",
                    "sql_case"
                ]
            }
        ]
    },
    {
        "id": 8,
        "title": "SQL Level 8",
        "type": "SQL",
        "questions": [
            {
                "id": 801,
                "text": "Lead to get next user age",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "LEAD",
                        "age",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "next_age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, LEAD(age) OVER (ORDER BY age) as next_age FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 802,
                "text": "First value in partition",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "age",
                        "FIRST_VALUE",
                        "age",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "youngest",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, age, FIRST_VALUE(age) OVER (PARTITION BY city ORDER BY age) as youngest FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 803,
                "text": "Last value in partition",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "age",
                        "LAST_VALUE",
                        "age",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "ORDER",
                        "BY",
                        "age",
                        "ROWS",
                        "BETWEEN",
                        "UNBOUNDED",
                        "PRECEDING",
                        "AND",
                        "UNBOUNDED",
                        "FOLLOWING",
                        "as",
                        "oldest",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, age, LAST_VALUE(age) OVER (PARTITION BY city ORDER BY age ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) as oldest FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_between",
                    "sql_logical"
                ]
            },
            {
                "id": 804,
                "text": "Percentile rank",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "PERCENT_RANK",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, PERCENT_RANK() OVER (ORDER BY age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by"
                ]
            },
            {
                "id": 805,
                "text": "Cumulative distribution",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "CUME_DIST",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, CUME_DIST() OVER (ORDER BY age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by"
                ]
            },
            {
                "id": 806,
                "text": "NTile to create quartiles",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "NTILE",
                        "4",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "quartile",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, NTILE(4) OVER (ORDER BY age) as quartile FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 807,
                "text": "Moving average of last 3 orders",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_id",
                        "amount",
                        "AVG",
                        "amount",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_date",
                        "ROWS",
                        "BETWEEN",
                        "2",
                        "PRECEDING",
                        "AND",
                        "CURRENT",
                        "ROW",
                        "as",
                        "moving_avg",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_id, amount, AVG(amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as moving_avg FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_between",
                    "sql_logical",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 808,
                "text": "Count over partition",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "city",
                        "COUNT",
                        "*",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "as",
                        "city_user_count",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, city, COUNT(*) OVER (PARTITION BY city) as city_user_count FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 809,
                "text": "Max amount per user window",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user_id",
                        "order_id",
                        "amount",
                        "MAX",
                        "amount",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "user_id",
                        "as",
                        "max_user_order",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT user_id, order_id, amount, MAX(amount) OVER (PARTITION BY user_id) as max_user_order FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 810,
                "text": "Min amount per user window",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user_id",
                        "order_id",
                        "amount",
                        "MIN",
                        "amount",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "user_id",
                        "as",
                        "min_user_order",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT user_id, order_id, amount, MIN(amount) OVER (PARTITION BY user_id) as min_user_order FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 811,
                "text": "Difference from average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "age",
                        "-",
                        "AVG",
                        "age",
                        "OVER",
                        "as",
                        "diff_from_avg",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, age - AVG(age) OVER () as diff_from_avg FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 812,
                "text": "Row number with partition",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "city",
                        "ROW_NUMBER",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "city_rank",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, city, ROW_NUMBER() OVER (PARTITION BY city ORDER BY age) as city_rank FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 813,
                "text": "Running count",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_id",
                        "order_date",
                        "COUNT",
                        "*",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_date",
                        "as",
                        "cumulative_orders",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_id, order_date, COUNT(*) OVER (ORDER BY order_date) as cumulative_orders FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 814,
                "text": "Standard deviation over window",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "age",
                        "STDDEV",
                        "age",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, age, STDDEV(age) OVER (PARTITION BY city) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 815,
                "text": "Variance over window",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "age",
                        "VARIANCE",
                        "age",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, age, VARIANCE(age) OVER (PARTITION BY city) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 816,
                "text": "Nth value function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "age",
                        "NTH_VALUE",
                        "age",
                        "2",
                        "OVER",
                        "PARTITION",
                        "BY",
                        "city",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "second_youngest",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, age, NTH_VALUE(age, 2) OVER (PARTITION BY city ORDER BY age) as second_youngest FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 817,
                "text": "Range between clause",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_id",
                        "amount",
                        "SUM",
                        "amount",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_date",
                        "RANGE",
                        "BETWEEN",
                        "INTERVAL",
                        "7",
                        "DAY",
                        "PRECEDING",
                        "AND",
                        "CURRENT",
                        "ROW",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_id, amount, SUM(amount) OVER (ORDER BY order_date RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW) FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_between",
                    "sql_logical",
                    "sql_aggregate",
                    "sql_function_expression",
                    "sql_date_select_day"
                ]
            }
        ]
    },
    {
        "id": 9,
        "title": "SQL Level 9",
        "type": "SQL",
        "questions": [
            {
                "id": 901,
                "text": "Multiple CTEs",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "male_users",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "gender",
                        "=",
                        "'Male'"
                    ]
                },
                "hint": "Try using: WITH male_users AS (SELECT * FROM users WHERE gender = 'Male'), delhi_users AS (SELECT * FROM users WHERE city = 'Delhi') SELECT * FROM male_users UNION ALL SELECT * FROM delhi_users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 902,
                "text": "Recursive CTE for numbers",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "RECURSIVE",
                        "numbers",
                        "AS"
                    ]
                },
                "hint": "Try using: WITH RECURSIVE numbers AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM numbers WHERE n < 10) SELECT * FROM numbers;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 903,
                "text": "CTE with aggregation",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "city_stats",
                        "AS",
                        "SELECT",
                        "city",
                        "AVG",
                        "age",
                        "as",
                        "avg_age",
                        "COUNT",
                        "*",
                        "as",
                        "user_count",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: WITH city_stats AS (SELECT city, AVG(age) as avg_age, COUNT(*) as user_count FROM users GROUP BY city) SELECT * FROM city_stats;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 904,
                "text": "Nested CTE reference",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "base",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "20"
                    ]
                },
                "hint": "Try using: WITH base AS (SELECT * FROM users WHERE age > 20), base2 AS (SELECT * FROM base WHERE city IS NOT NULL) SELECT * FROM base2;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 905,
                "text": "CTE for top spenders",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "user_spending",
                        "AS",
                        "SELECT",
                        "user_id",
                        "SUM",
                        "amount",
                        "as",
                        "total",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id"
                    ]
                },
                "hint": "Try using: WITH user_spending AS (SELECT user_id, SUM(amount) as total FROM orders GROUP BY user_id) SELECT * FROM user_spending ORDER BY total DESC LIMIT 5;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 906,
                "text": "Recursive org chart",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "RECURSIVE",
                        "emp_hierarchy",
                        "AS"
                    ]
                },
                "hint": "Try using: WITH RECURSIVE emp_hierarchy AS (SELECT employee_id, employee_name, manager_id, 0 AS lvl FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.employee_id, e.employee_name, e.manager_id, h.lvl + 1 FROM employees e INNER JOIN emp_hierarchy h ON e.manager_id = h.employee_id) SELECT * FROM emp_hierarchy;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 907,
                "text": "CTE for data transformation",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "transformed",
                        "AS",
                        "SELECT",
                        "user_id",
                        "UPPER",
                        "firstname",
                        "as",
                        "fname",
                        "LOWER",
                        "city",
                        "as",
                        "city_lower",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: WITH transformed AS (SELECT user_id, UPPER(firstname) as fname, LOWER(city) as city_lower FROM users) SELECT * FROM transformed;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_string_select_ucase",
                    "sql_function_expression",
                    "sql_string_select_lcase"
                ]
            },
            {
                "id": 908,
                "text": "CTE with window function",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "ranked_users",
                        "AS",
                        "SELECT",
                        "firstname",
                        "age",
                        "RANK",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "DESC",
                        "as",
                        "age_rank",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: WITH ranked_users AS (SELECT firstname, age, RANK() OVER (ORDER BY age DESC) as age_rank FROM users) SELECT * FROM ranked_users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 909,
                "text": "CTE for date calculations",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "recent_orders",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "orders",
                        "WHERE",
                        "order_date",
                        ">",
                        "DATE_SUB",
                        "NOW",
                        "INTERVAL",
                        "30",
                        "DAY"
                    ]
                },
                "hint": "Try using: WITH recent_orders AS (SELECT * FROM orders WHERE order_date > DATE_SUB(NOW(), INTERVAL 30 DAY)) SELECT * FROM recent_orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_date_select_now",
                    "sql_date_select_day",
                    "sql_date_sub"
                ]
            },
            {
                "id": 910,
                "text": "CTE with CASE",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "categorized",
                        "AS",
                        "SELECT",
                        "firstname",
                        "age",
                        "CASE",
                        "WHEN",
                        "age",
                        "<",
                        "30",
                        "THEN",
                        "'Young'",
                        "ELSE",
                        "'Old'",
                        "END",
                        "as",
                        "category",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: WITH categorized AS (SELECT firstname, age, CASE WHEN age < 30 THEN 'Young' ELSE 'Old' END as category FROM users) SELECT * FROM categorized;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_case"
                ]
            },
            {
                "id": 911,
                "text": "Factorial using recursive CTE",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "RECURSIVE",
                        "factorial",
                        "AS"
                    ]
                },
                "hint": "Try using: WITH RECURSIVE factorial AS (SELECT 1 AS n, 1 AS fact UNION ALL SELECT n + 1, fact * (n + 1) FROM factorial WHERE n < 5) SELECT * FROM factorial;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 912,
                "text": "CTE for moving average",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "daily_sales",
                        "AS",
                        "SELECT",
                        "DATE",
                        "order_date",
                        "as",
                        "day",
                        "SUM",
                        "amount",
                        "as",
                        "total",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "day"
                    ]
                },
                "hint": "Try using: WITH daily_sales AS (SELECT DATE(order_date) as day, SUM(amount) as total FROM orders GROUP BY day) SELECT day, AVG(total) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS moving_avg_7day FROM daily_sales;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression",
                    "sql_date_select_day",
                    "sql_date_date"
                ]
            },
            {
                "id": 913,
                "text": "CTE to find duplicates",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "duplicates",
                        "AS",
                        "SELECT",
                        "email",
                        "COUNT",
                        "*",
                        "as",
                        "cnt",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "email",
                        "HAVING",
                        "cnt",
                        ">",
                        "1"
                    ]
                },
                "hint": "Try using: WITH duplicates AS (SELECT email, COUNT(*) as cnt FROM users GROUP BY email HAVING cnt > 1) SELECT * FROM duplicates;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 914,
                "text": "CTE for year over year comparison",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "yearly_sales",
                        "AS",
                        "SELECT",
                        "YEAR",
                        "order_date",
                        "as",
                        "year",
                        "SUM",
                        "amount",
                        "as",
                        "total",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "year"
                    ]
                },
                "hint": "Try using: WITH yearly_sales AS (SELECT YEAR(order_date) as year, SUM(amount) as total FROM orders GROUP BY year) SELECT * FROM yearly_sales ORDER BY year;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression",
                    "sql_date_select_year"
                ]
            },
            {
                "id": 915,
                "text": "CTE with UNION",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "active_users",
                        "AS",
                        "SELECT",
                        "user_id",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "is_active",
                        "=",
                        "1"
                    ]
                },
                "hint": "Try using: WITH active_users AS (SELECT user_id, firstname FROM users WHERE is_active = 1), inactive_users AS (SELECT user_id, firstname FROM users WHERE is_active = 0) SELECT * FROM active_users UNION ALL SELECT * FROM inactive_users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_alias",
                    "sql_select_alias"
                ]
            }
        ]
    },
    {
        "id": 10,
        "title": "SQL Level 10",
        "type": "SQL",
        "questions": [
            {
                "id": 1001,
                "text": "Running difference",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_id",
                        "amount",
                        "amount",
                        "-",
                        "LAG",
                        "amount",
                        "1",
                        "0",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_date",
                        "as",
                        "diff",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_id, amount, amount - LAG(amount, 1, 0) OVER (ORDER BY order_date) as diff FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 1002,
                "text": "Median calculation",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "ordered_data",
                        "AS",
                        "SELECT",
                        "age",
                        "ROW_NUMBER",
                        "OVER",
                        "ORDER",
                        "BY",
                        "age",
                        "as",
                        "rn",
                        "COUNT",
                        "*",
                        "OVER",
                        "as",
                        "cnt",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: WITH ordered_data AS (SELECT age, ROW_NUMBER() OVER (ORDER BY age) as rn, COUNT(*) OVER () as cnt FROM users) SELECT AVG(age) AS median_age FROM ordered_data WHERE rn IN (FLOOR((cnt + 1) / 2), FLOOR((cnt + 2) / 2));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1003,
                "text": "Mode calculation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "age",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "age",
                        "ORDER",
                        "BY",
                        "COUNT",
                        "*",
                        "DESC",
                        "LIMIT",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT age FROM users GROUP BY age ORDER BY COUNT(*) DESC LIMIT 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_order",
                    "sql_limit",
                    "sql_group_by",
                    "sql_order_by",
                    "sql_select_extended",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1004,
                "text": "Find islands of consecutive numbers",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "numbered",
                        "AS",
                        "SELECT",
                        "user_id",
                        "user_id",
                        "-",
                        "ROW_NUMBER",
                        "OVER",
                        "ORDER",
                        "BY",
                        "user_id",
                        "as",
                        "grp",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: WITH numbered AS (SELECT user_id, user_id - ROW_NUMBER() OVER (ORDER BY user_id) as grp FROM users) SELECT MIN(user_id) AS start_id, MAX(user_id) AS end_id, COUNT(*) AS len FROM numbered GROUP BY grp ORDER BY start_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic"
                ]
            },
            {
                "id": 1005,
                "text": "Cumulative percentage",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "as",
                        "cnt",
                        "SUM",
                        "COUNT",
                        "*",
                        "OVER",
                        "ORDER",
                        "BY",
                        "COUNT",
                        "*",
                        "DESC",
                        "*",
                        "100.0",
                        "/",
                        "SELECT",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "as",
                        "cumulative_pct",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) as cnt, SUM(COUNT(*)) OVER (ORDER BY COUNT(*) DESC) * 100.0 / (SELECT COUNT(*) FROM users) as cumulative_pct FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_order",
                    "sql_group_by",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1006,
                "text": "Cross tab query",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "u.city",
                        "p.product_name",
                        "COUNT",
                        "o.order_id",
                        "FROM",
                        "users",
                        "u",
                        "CROSS",
                        "JOIN",
                        "products",
                        "p",
                        "LEFT",
                        "JOIN",
                        "orders",
                        "o",
                        "ON",
                        "u.user_id",
                        "=",
                        "o.user_id",
                        "AND",
                        "p.product_id",
                        "=",
                        "o.product_id",
                        "GROUP",
                        "BY",
                        "u.city",
                        "p.product_name"
                    ]
                },
                "hint": "Try using: SELECT u.city, p.product_name, COUNT(o.order_id) FROM users u CROSS JOIN products p LEFT JOIN orders o ON u.user_id = o.user_id AND p.product_id = o.product_id GROUP BY u.city, p.product_name;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_group_by",
                    "sql_logical",
                    "sql_compare",
                    "sql_string_select_left",
                    "sql_function_expression",
                    "sql_aggregate"
                ]
            },
            {
                "id": 1007,
                "text": "Find patterns in strings",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "REGEXP",
                        "'^[A-M]'"
                    ]
                },
                "hint": "Try using: SELECT firstname FROM users WHERE firstname REGEXP '^[A-M]';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column"
                ]
            },
            {
                "id": 1008,
                "text": "Dynamic date ranges",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "orders",
                        "WHERE",
                        "order_date",
                        "BETWEEN",
                        "DATE_FORMAT",
                        "NOW",
                        "'%Y-%m-01'",
                        "AND",
                        "LAST_DAY",
                        "NOW"
                    ]
                },
                "hint": "Try using: SELECT * FROM orders WHERE order_date BETWEEN DATE_FORMAT(NOW(), '%Y-%m-01') AND LAST_DAY(NOW());",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_between",
                    "sql_logical",
                    "sql_arithmetic",
                    "sql_date_select_now",
                    "sql_date_select_format"
                ]
            },
            {
                "id": 1009,
                "text": "Hierarchical data flattening",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "RECURSIVE",
                        "hierarchy",
                        "AS"
                    ]
                },
                "hint": "Try using: WITH RECURSIVE hierarchy AS (SELECT employee_id, employee_name, manager_id, 0 AS lvl FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.employee_id, e.employee_name, e.manager_id, h.lvl + 1 FROM employees e INNER JOIN hierarchy h ON e.manager_id = h.employee_id) SELECT * FROM hierarchy;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 1010,
                "text": "Time-based bucketing",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATE_FORMAT",
                        "order_date",
                        "'%Y-%m-%d",
                        "%H:00:00'",
                        "as",
                        "hour_bucket",
                        "COUNT",
                        "*",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "hour_bucket"
                    ]
                },
                "hint": "Try using: SELECT DATE_FORMAT(order_date, '%Y-%m-%d %H:00:00') as hour_bucket, COUNT(*) FROM orders GROUP BY hour_bucket;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression",
                    "sql_date_select_format"
                ]
            },
            {
                "id": 1011,
                "text": "Conditional aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "SUM",
                        "CASE",
                        "WHEN",
                        "age",
                        "<",
                        "30",
                        "THEN",
                        "1",
                        "ELSE",
                        "0",
                        "END",
                        "as",
                        "under_30",
                        "SUM",
                        "CASE",
                        "WHEN",
                        "age",
                        ">=",
                        "30",
                        "THEN",
                        "1",
                        "ELSE",
                        "0",
                        "END",
                        "as",
                        "over_30",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, SUM(CASE WHEN age < 30 THEN 1 ELSE 0 END) as under_30, SUM(CASE WHEN age >= 30 THEN 1 ELSE 0 END) as over_30 FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_compare",
                    "sql_case",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1012,
                "text": "Rolling window calculation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_date",
                        "amount",
                        "SUM",
                        "amount",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_date",
                        "ROWS",
                        "BETWEEN",
                        "6",
                        "PRECEDING",
                        "AND",
                        "CURRENT",
                        "ROW",
                        "as",
                        "rolling_7day",
                        "FROM",
                        "orders"
                    ]
                },
                "hint": "Try using: SELECT order_date, amount, SUM(amount) OVER (ORDER BY order_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) as rolling_7day FROM orders;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_order_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_between",
                    "sql_logical",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1013,
                "text": "Self-referencing update",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "employees",
                        "e1",
                        "SET",
                        "salary",
                        "=",
                        "salary",
                        "*",
                        "1.1",
                        "WHERE",
                        "salary",
                        "<",
                        "SELECT",
                        "AVG",
                        "salary",
                        "FROM",
                        "employees",
                        "e2",
                        "WHERE",
                        "e1.dept_id",
                        "=",
                        "e2.dept_id"
                    ]
                },
                "hint": "Try using: UPDATE employees e1 JOIN (SELECT dept_id, AVG(salary) AS avg_sal FROM employees GROUP BY dept_id) x ON e1.dept_id = x.dept_id SET e1.salary = e1.salary * 1.1 WHERE e1.salary < x.avg_sal;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update",
                    "sql_compare",
                    "sql_value_string",
                    "sql_value_number",
                    "sql_column",
                    "sql_arithmetic",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            },
            {
                "id": 1014,
                "text": "Complex JSON extraction",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user_id",
                        "JSON_EXTRACT",
                        "metadata",
                        "'$.city'",
                        "as",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT user_id, JSON_EXTRACT(metadata, '$.city') as city FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_alias",
                    "sql_select_alias"
                ]
            },
            {
                "id": 1015,
                "text": "Generate random sample",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "RAND",
                        "LIMIT",
                        "10"
                    ]
                },
                "hint": "Try using: SELECT * FROM users ORDER BY RAND() LIMIT 10;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_limit",
                    "sql_order_by",
                    "sql_select_extended",
                    "sql_arithmetic",
                    "sql_math_rand"
                ]
            },
            {
                "id": 1016,
                "text": "Find overlapping date ranges",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "a.booking_id",
                        "b.booking_id",
                        "FROM",
                        "bookings",
                        "a",
                        "INNER",
                        "JOIN",
                        "bookings",
                        "b",
                        "ON",
                        "a.booking_id",
                        "<",
                        "b.booking_id",
                        "AND",
                        "a.room_id",
                        "=",
                        "b.room_id",
                        "AND",
                        "a.start_date",
                        "<=",
                        "b.end_date",
                        "AND",
                        "a.end_date",
                        ">=",
                        "b.start_date"
                    ]
                },
                "hint": "Try using: SELECT a.booking_id, b.booking_id FROM bookings a INNER JOIN bookings b ON a.booking_id < b.booking_id AND a.room_id = b.room_id AND a.start_date <= b.end_date AND a.end_date >= b.start_date;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_inner_join",
                    "sql_left_join",
                    "sql_right_join",
                    "sql_logical",
                    "sql_compare"
                ]
            },
            {
                "id": 1017,
                "text": "Calculate retention rate",
                "expectedPattern": {
                    "structures": [
                        "WITH",
                        "first_purchase",
                        "AS",
                        "SELECT",
                        "user_id",
                        "MIN",
                        "order_date",
                        "as",
                        "first_date",
                        "FROM",
                        "orders",
                        "GROUP",
                        "BY",
                        "user_id"
                    ]
                },
                "hint": "Try using: WITH first_purchase AS (SELECT user_id, MIN(order_date) as first_date FROM orders GROUP BY user_id) SELECT COUNT(DISTINCT user_id) AS users_with_orders FROM first_purchase;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_group_by",
                    "sql_alias",
                    "sql_select_alias",
                    "sql_aggregate",
                    "sql_function_expression"
                ]
            }
        ]
    }
];

function normalizeSqlLevelsToSpec(levels) {
    const desiredCounts = new Map([[1, 30], [2, 30]]);
    for (let i = 3; i <= 10; i++) desiredCounts.set(i, 10);

    const normalized = (levels || []).map((lvl) => ({
        ...lvl,
        questions: Array.isArray(lvl.questions) ? [...lvl.questions] : []
    }));

    const byId = new Map(normalized.map((l) => [l.id, l]));
    const overflowPool = [];

    // First, clamp levels 3-10 to 10 questions and collect overflow.
    for (let i = 3; i <= 10; i++) {
        const lvl = byId.get(i);
        if (!lvl) continue;
        const keepCount = desiredCounts.get(i);
        if (typeof keepCount !== 'number') continue;
        const keep = lvl.questions.slice(0, keepCount);
        const overflow = lvl.questions.slice(keepCount);
        lvl.questions = keep;
        overflowPool.push(...overflow);
    }

    // Also clamp levels 1-2 if they exceed the desired count.
    for (const i of [1, 2]) {
        const lvl = byId.get(i);
        if (!lvl) continue;
        const keepCount = desiredCounts.get(i);
        if (typeof keepCount !== 'number') continue;
        if (lvl.questions.length > keepCount) {
            overflowPool.push(...lvl.questions.slice(keepCount));
            lvl.questions = lvl.questions.slice(0, keepCount);
        }
    }

    // Then, top up levels 1-2 to 30 questions each from the overflow pool.
    let overflowIndex = 0;
    for (const i of [1, 2]) {
        const lvl = byId.get(i);
        if (!lvl) continue;
        const desired = desiredCounts.get(i);
        if (typeof desired !== 'number') continue;
        const need = desired - lvl.questions.length;
        if (need <= 0) continue;
        const add = overflowPool.slice(overflowIndex, overflowIndex + need);
        overflowIndex += add.length;
        lvl.questions = lvl.questions.concat(add);
    }

    const archived = overflowPool.slice(overflowIndex);
    return { normalized, archived };
}

const { normalized: sqlLevelsNormalized, archived: sqlLevelsArchive } = normalizeSqlLevelsToSpec(sqlLevelsRaw);

// Default: use the full question set (174) as requested.
// If you ever want the strict 30/30/10 distribution, use `sqlLevelsNormalized`.
export { sqlLevelsRaw as sqlLevels, sqlLevelsNormalized, sqlLevelsArchive, nosqlLevels };