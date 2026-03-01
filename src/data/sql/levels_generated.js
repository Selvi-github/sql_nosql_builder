export const levels = [
    {
        "id": 1,
        "title": "SQL Level 1",
        "type": "SQL",
        "questions": [
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
                ]
            },
            {
                "id": 117,
                "text": "Find users NOT from top 3 cities (Chennai, Mumbai, Delhi)",
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
                ]
            },
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_where"
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
                    "sql_having"
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
                    "sql_group"
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
                    "sql_group"
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
                    "sql_having"
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
                "hint": "Try using: SELECT",
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
                    "sql_limit"
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
                    "sql_group"
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
                    "sql_having"
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
                    "sql_limit"
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
                    "sql_group"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_group"
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
                    "sql_group"
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
                "hint": "Try using: SELECT u.firstname, o.order_id, p.product_name FROM users u",
                "allowedBlocks": [
                    "sql_select"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_join"
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
                    "sql_group"
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
                    "sql_having"
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
                "hint": "Try using: SELECT u.firstname, p.product_name FROM users u",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
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
                    "sql_having"
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
                "hint": "Try using: SELECT u.firstname as customer, p.product_name as item FROM users u",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: SELECT p.product_name, AVG(u.age) FROM users u",
                "allowedBlocks": [
                    "sql_select"
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
                    "sql_where"
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
                    "sql_limit"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_having"
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
                    "sql_having"
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
                    "sql_having"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_having"
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
                    "sql_where"
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
                    "sql_having"
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
                    "sql_having"
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
                    "sql_join"
                ]
            },
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_where"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
                ]
            },
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
            }
        ]
    },
    {
        "id": 8,
        "title": "SQL Level 8",
        "type": "SQL",
        "questions": [
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
                    "sql_where"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_where"
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
                    "sql_limit"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_group"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_select"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
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
                    "sql_order"
                ]
            },
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
                    "sql_order"
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
                    "sql_order"
                ]
            },
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
                "hint": "Try using: WITH male_users AS (SELECT * FROM users WHERE gender = 'Male'),",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
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
                "hint": "Try using: WITH RECURSIVE numbers AS (",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH city_stats AS (SELECT city, AVG(age) as avg_age, COUNT(*) as user_count FROM users GROUP BY city)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
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
                "hint": "Try using: WITH base AS (SELECT * FROM users WHERE age > 20),",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
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
                "hint": "Try using: WITH user_spending AS (SELECT user_id, SUM(amount) as total FROM orders GROUP BY user_id)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
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
                "hint": "Try using: WITH RECURSIVE emp_hierarchy AS (",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH transformed AS (SELECT user_id, UPPER(firstname) as fname, LOWER(city) as city_lower FROM users)",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH ranked_users AS (SELECT firstname, age, RANK() OVER (ORDER BY age DESC) as age_rank FROM users)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
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
                "hint": "Try using: WITH recent_orders AS (SELECT * FROM orders WHERE order_date > DATE_SUB(NOW(), INTERVAL 30 DAY))",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
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
                "hint": "Try using: WITH categorized AS (SELECT firstname, age, CASE WHEN age < 30 THEN 'Young' ELSE 'Old' END as category FROM users)",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH RECURSIVE factorial AS (",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH daily_sales AS (SELECT DATE(order_date) as day, SUM(amount) as total FROM orders GROUP BY day)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
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
                "hint": "Try using: WITH duplicates AS (SELECT email, COUNT(*) as cnt FROM users GROUP BY email HAVING cnt > 1)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having"
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
                "hint": "Try using: WITH yearly_sales AS (SELECT YEAR(order_date) as year, SUM(amount) as total FROM orders GROUP BY year)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
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
                "hint": "Try using: WITH active_users AS (SELECT user_id, firstname FROM users WHERE is_active = 1),",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
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
                "hint": "Try using: WITH ordered_data AS (SELECT age, ROW_NUMBER() OVER (ORDER BY age) as rn, COUNT(*) OVER () as cnt FROM users)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
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
                "hint": "Try using: WITH RECURSIVE hierarchy AS (",
                "allowedBlocks": [
                    "sql_select"
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
                "hint": "Try using: WITH first_purchase AS (SELECT user_id, MIN(order_date) as first_date FROM orders GROUP BY user_id),",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
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
                "hint": "Try using: WITH numbered AS (SELECT user_id, user_id - ROW_NUMBER() OVER (ORDER BY user_id) as grp FROM users)",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
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
                    "sql_order"
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
                    "sql_group"
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
                    "sql_where"
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
                    "sql_group"
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
                "hint": "Try using: UPDATE employees e1 SET salary = salary * 1.1 WHERE salary < (SELECT AVG(salary) FROM employees e2 WHERE e1.dept_id = e2.dept_id);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update"
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
                    "sql_select"
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
                    "sql_join"
                ]
            }
        ]
    },
    {
        "id": 11,
        "title": "SQL Level 11",
        "type": "SQL",
        "questions": [
            {
                "id": 1101,
                "text": "Create unique index",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "UNIQUE",
                        "INDEX",
                        "idx_email",
                        "ON",
                        "users",
                        "email"
                    ]
                },
                "hint": "Try using: CREATE UNIQUE INDEX idx_email ON users(email);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1102,
                "text": "Drop index",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "INDEX",
                        "idx_city",
                        "ON",
                        "users"
                    ]
                },
                "hint": "Try using: DROP INDEX idx_city ON users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1103,
                "text": "Show indexes on table",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "INDEX",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SHOW INDEX FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1104,
                "text": "Create full-text index",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "FULLTEXT",
                        "INDEX",
                        "idx_fulltext",
                        "ON",
                        "articles",
                        "title",
                        "content"
                    ]
                },
                "hint": "Try using: CREATE FULLTEXT INDEX idx_fulltext ON articles(title, content);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1105,
                "text": "Analyze table",
                "expectedPattern": {
                    "structures": [
                        "ANALYZE",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: ANALYZE TABLE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1106,
                "text": "Optimize table",
                "expectedPattern": {
                    "structures": [
                        "OPTIMIZE",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: OPTIMIZE TABLE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1107,
                "text": "Check table",
                "expectedPattern": {
                    "structures": [
                        "CHECK",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: CHECK TABLE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1108,
                "text": "Repair table",
                "expectedPattern": {
                    "structures": [
                        "REPAIR",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: REPAIR TABLE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1109,
                "text": "Explain query plan",
                "expectedPattern": {
                    "structures": [
                        "EXPLAIN",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'"
                    ]
                },
                "hint": "Try using: EXPLAIN SELECT * FROM users WHERE city = 'Chennai';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1110,
                "text": "Explain with format",
                "expectedPattern": {
                    "structures": [
                        "EXPLAIN",
                        "FORMAT=JSON",
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
                "hint": "Try using: EXPLAIN FORMAT=JSON SELECT * FROM users u INNER JOIN orders o ON u.user_id = o.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join"
                ]
            },
            {
                "id": 1111,
                "text": "Show table status",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "TABLE",
                        "STATUS",
                        "LIKE",
                        "'users'"
                    ]
                },
                "hint": "Try using: SHOW TABLE STATUS LIKE 'users';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1112,
                "text": "Force index usage",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "FORCE",
                        "INDEX",
                        "idx_city",
                        "WHERE",
                        "city",
                        "=",
                        "'Mumbai'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users FORCE INDEX (idx_city) WHERE city = 'Mumbai';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1113,
                "text": "Ignore index",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "IGNORE",
                        "INDEX",
                        "idx_city",
                        "WHERE",
                        "city",
                        "=",
                        "'Delhi'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users IGNORE INDEX (idx_city) WHERE city = 'Delhi';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1114,
                "text": "Create index with specific length",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "INDEX",
                        "idx_firstname",
                        "ON",
                        "users",
                        "firstname",
                        "10"
                    ]
                },
                "hint": "Try using: CREATE INDEX idx_firstname ON users(firstname(10));",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1115,
                "text": "Descending index",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "INDEX",
                        "idx_age_desc",
                        "ON",
                        "users",
                        "age",
                        "DESC"
                    ]
                },
                "hint": "Try using: CREATE INDEX idx_age_desc ON users(age DESC);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1116,
                "text": "Spatial index",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "SPATIAL",
                        "INDEX",
                        "idx_location",
                        "ON",
                        "locations",
                        "coordinates"
                    ]
                },
                "hint": "Try using: CREATE SPATIAL INDEX idx_location ON locations(coordinates);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1117,
                "text": "Show query profile",
                "expectedPattern": {
                    "structures": [
                        "SET",
                        "profiling",
                        "=",
                        "1",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "SHOW",
                        "PROFILES"
                    ]
                },
                "hint": "Try using: SET profiling = 1; SELECT * FROM users; SHOW PROFILES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1118,
                "text": "Create covering index",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "INDEX",
                        "idx_covering",
                        "ON",
                        "orders",
                        "user_id",
                        "order_date",
                        "amount"
                    ]
                },
                "hint": "Try using: CREATE INDEX idx_covering ON orders(user_id, order_date, amount);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1119,
                "text": "Start transaction",
                "expectedPattern": {
                    "structures": [
                        "START",
                        "TRANSACTION"
                    ]
                },
                "hint": "Try using: START TRANSACTION;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1120,
                "text": "Commit transaction",
                "expectedPattern": {
                    "structures": [
                        "COMMIT"
                    ]
                },
                "hint": "Try using: COMMIT;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1121,
                "text": "Rollback transaction",
                "expectedPattern": {
                    "structures": [
                        "ROLLBACK"
                    ]
                },
                "hint": "Try using: ROLLBACK;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1122,
                "text": "Savepoint",
                "expectedPattern": {
                    "structures": [
                        "SAVEPOINT",
                        "sp1"
                    ]
                },
                "hint": "Try using: SAVEPOINT sp1;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1123,
                "text": "Rollback to savepoint",
                "expectedPattern": {
                    "structures": [
                        "ROLLBACK",
                        "TO",
                        "SAVEPOINT",
                        "sp1"
                    ]
                },
                "hint": "Try using: ROLLBACK TO SAVEPOINT sp1;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1124,
                "text": "Set transaction isolation level",
                "expectedPattern": {
                    "structures": [
                        "SET",
                        "TRANSACTION",
                        "ISOLATION",
                        "LEVEL",
                        "READ",
                        "COMMITTED"
                    ]
                },
                "hint": "Try using: SET TRANSACTION ISOLATION LEVEL READ COMMITTED;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1125,
                "text": "Lock tables for read",
                "expectedPattern": {
                    "structures": [
                        "LOCK",
                        "TABLES",
                        "users",
                        "READ"
                    ]
                },
                "hint": "Try using: LOCK TABLES users READ;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1126,
                "text": "Lock tables for write",
                "expectedPattern": {
                    "structures": [
                        "LOCK",
                        "TABLES",
                        "users",
                        "WRITE"
                    ]
                },
                "hint": "Try using: LOCK TABLES users WRITE;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1127,
                "text": "Unlock tables",
                "expectedPattern": {
                    "structures": [
                        "UNLOCK",
                        "TABLES"
                    ]
                },
                "hint": "Try using: UNLOCK TABLES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1128,
                "text": "Select with lock in share mode",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "=",
                        "1",
                        "LOCK",
                        "IN",
                        "SHARE",
                        "MODE"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id = 1 LOCK IN SHARE MODE;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1129,
                "text": "Select for update",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "=",
                        "1",
                        "FOR",
                        "UPDATE"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE user_id = 1 FOR UPDATE;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update"
                ]
            },
            {
                "id": 1130,
                "text": "Set autocommit off",
                "expectedPattern": {
                    "structures": [
                        "SET",
                        "autocommit",
                        "=",
                        "0"
                    ]
                },
                "hint": "Try using: SET autocommit = 0;",
                "allowedBlocks": [
                    "sql_select"
                ]
            }
        ]
    },
    {
        "id": 12,
        "title": "SQL Level 12",
        "type": "SQL",
        "questions": [
            {
                "id": 1201,
                "text": "Show open tables",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "OPEN",
                        "TABLES"
                    ]
                },
                "hint": "Try using: SHOW OPEN TABLES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1202,
                "text": "Show process list",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "PROCESSLIST"
                    ]
                },
                "hint": "Try using: SHOW PROCESSLIST;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1203,
                "text": "Kill process",
                "expectedPattern": {
                    "structures": [
                        "KILL",
                        "123"
                    ]
                },
                "hint": "Try using: KILL 123;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1204,
                "text": "Create view",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "VIEW",
                        "active_users",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "is_active",
                        "=",
                        "1"
                    ]
                },
                "hint": "Try using: CREATE VIEW active_users AS SELECT * FROM users WHERE is_active = 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1205,
                "text": "Select from view",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "active_users"
                    ]
                },
                "hint": "Try using: SELECT * FROM active_users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1206,
                "text": "Update view",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "OR",
                        "REPLACE",
                        "VIEW",
                        "active_users",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "is_active",
                        "=",
                        "1",
                        "AND",
                        "age",
                        ">",
                        "18"
                    ]
                },
                "hint": "Try using: CREATE OR REPLACE VIEW active_users AS SELECT * FROM users WHERE is_active = 1 AND age > 18;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1207,
                "text": "Drop view",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "VIEW",
                        "active_users"
                    ]
                },
                "hint": "Try using: DROP VIEW active_users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1208,
                "text": "Create materialized view (using table)",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TABLE",
                        "mv_user_stats",
                        "AS",
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
                        "city"
                    ]
                },
                "hint": "Try using: CREATE TABLE mv_user_stats AS SELECT city, COUNT(*) as cnt FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_create_table"
                ]
            },
            {
                "id": 1209,
                "text": "Create simple stored procedure",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1210,
                "text": "Call stored procedure",
                "expectedPattern": {
                    "structures": [
                        "CALL",
                        "GetUsers"
                    ]
                },
                "hint": "Try using: CALL GetUsers();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1211,
                "text": "Procedure with parameters",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1212,
                "text": "Procedure with OUT parameter",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1213,
                "text": "Drop procedure",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "PROCEDURE",
                        "GetUsers"
                    ]
                },
                "hint": "Try using: DROP PROCEDURE GetUsers;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1214,
                "text": "Show procedures",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "PROCEDURE",
                        "STATUS",
                        "WHERE",
                        "Db",
                        "=",
                        "'your_database'"
                    ]
                },
                "hint": "Try using: SHOW PROCEDURE STATUS WHERE Db = 'your_database';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1215,
                "text": "Create function",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1216,
                "text": "Use function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "GetAgeCategory",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, GetAgeCategory(age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1217,
                "text": "Drop function",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "FUNCTION",
                        "GetAgeCategory"
                    ]
                },
                "hint": "Try using: DROP FUNCTION GetAgeCategory;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1218,
                "text": "Create trigger before insert",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1219,
                "text": "Create trigger after update",
                "expectedPattern": {
                    "structures": [
                        "DELIMITER",
                        "//"
                    ]
                },
                "hint": "Try using: DELIMITER //",
                "allowedBlocks": [
                    "sql_select",
                    "sql_limit"
                ]
            },
            {
                "id": 1220,
                "text": "Drop trigger",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "TRIGGER",
                        "before_user_insert"
                    ]
                },
                "hint": "Try using: DROP TRIGGER before_user_insert;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1221,
                "text": "Show triggers",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "TRIGGERS"
                    ]
                },
                "hint": "Try using: SHOW TRIGGERS;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1222,
                "text": "Create event",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "EVENT",
                        "daily_cleanup",
                        "ON",
                        "SCHEDULE",
                        "EVERY",
                        "1",
                        "DAY",
                        "DO",
                        "DELETE",
                        "FROM",
                        "logs",
                        "WHERE",
                        "log_date",
                        "<",
                        "DATE_SUB",
                        "NOW",
                        "INTERVAL",
                        "30",
                        "DAY"
                    ]
                },
                "hint": "Try using: CREATE EVENT daily_cleanup ON SCHEDULE EVERY 1 DAY DO DELETE FROM logs WHERE log_date < DATE_SUB(NOW(), INTERVAL 30 DAY);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_delete"
                ]
            },
            {
                "id": 1223,
                "text": "Drop event",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "EVENT",
                        "daily_cleanup"
                    ]
                },
                "hint": "Try using: DROP EVENT daily_cleanup;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1224,
                "text": "Insert single row",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users",
                        "firstname",
                        "lastname",
                        "age",
                        "city",
                        "VALUES",
                        "'John'",
                        "'Doe'",
                        "30",
                        "'Chennai'"
                    ]
                },
                "hint": "Try using: INSERT INTO users (firstname, lastname, age, city) VALUES ('John', 'Doe', 30, 'Chennai');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1225,
                "text": "Insert multiple rows",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users",
                        "firstname",
                        "lastname",
                        "age",
                        "VALUES",
                        "'Alice'",
                        "'Smith'",
                        "25",
                        "'Bob'",
                        "'Jones'",
                        "35"
                    ]
                },
                "hint": "Try using: INSERT INTO users (firstname, lastname, age) VALUES ('Alice', 'Smith', 25), ('Bob', 'Jones', 35);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1226,
                "text": "Insert from select",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users_backup",
                        "SELECT",
                        "*",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: INSERT INTO users_backup SELECT * FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1227,
                "text": "Insert or update (upsert)",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users",
                        "user_id",
                        "firstname",
                        "age",
                        "VALUES",
                        "1",
                        "'John'",
                        "30",
                        "ON",
                        "DUPLICATE",
                        "KEY",
                        "UPDATE",
                        "age",
                        "=",
                        "30"
                    ]
                },
                "hint": "Try using: INSERT INTO users (user_id, firstname, age) VALUES (1, 'John', 30) ON DUPLICATE KEY UPDATE age = 30;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert",
                    "sql_update"
                ]
            },
            {
                "id": 1228,
                "text": "Update single column",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "age",
                        "=",
                        "31",
                        "WHERE",
                        "user_id",
                        "=",
                        "1"
                    ]
                },
                "hint": "Try using: UPDATE users SET age = 31 WHERE user_id = 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update"
                ]
            },
            {
                "id": 1229,
                "text": "Update multiple columns",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "firstname",
                        "=",
                        "'Jane'",
                        "city",
                        "=",
                        "'Mumbai'",
                        "WHERE",
                        "user_id",
                        "=",
                        "2"
                    ]
                },
                "hint": "Try using: UPDATE users SET firstname = 'Jane', city = 'Mumbai' WHERE user_id = 2;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update"
                ]
            },
            {
                "id": 1230,
                "text": "Update with calculation",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "age",
                        "=",
                        "age",
                        "+",
                        "1"
                    ]
                },
                "hint": "Try using: UPDATE users SET age = age + 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_update"
                ]
            }
        ]
    },
    {
        "id": 13,
        "title": "SQL Level 13",
        "type": "SQL",
        "questions": [
            {
                "id": 1301,
                "text": "Update with join",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
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
                        "SET",
                        "u.last_order_date",
                        "=",
                        "o.order_date",
                        "WHERE",
                        "o.order_id",
                        "=",
                        "SELECT",
                        "MAX",
                        "order_id",
                        "FROM",
                        "orders",
                        "WHERE",
                        "user_id",
                        "=",
                        "u.user_id"
                    ]
                },
                "hint": "Try using: UPDATE users u INNER JOIN orders o ON u.user_id = o.user_id SET u.last_order_date = o.order_date WHERE o.order_id = (SELECT MAX(order_id) FROM orders WHERE user_id = u.user_id);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_update"
                ]
            },
            {
                "id": 1302,
                "text": "Update with subquery",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "city",
                        "=",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses",
                        "WHERE",
                        "addresses.user_id",
                        "=",
                        "users.user_id",
                        "LIMIT",
                        "1"
                    ]
                },
                "hint": "Try using: UPDATE users SET city = (SELECT city FROM addresses WHERE addresses.user_id = users.user_id LIMIT 1);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_limit",
                    "sql_update"
                ]
            },
            {
                "id": 1303,
                "text": "Delete single row",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "FROM",
                        "users",
                        "WHERE",
                        "user_id",
                        "=",
                        "1"
                    ]
                },
                "hint": "Try using: DELETE FROM users WHERE user_id = 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_delete"
                ]
            },
            {
                "id": 1304,
                "text": "Delete with condition",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        "<",
                        "18"
                    ]
                },
                "hint": "Try using: DELETE FROM users WHERE age < 18;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_delete"
                ]
            },
            {
                "id": 1305,
                "text": "Delete with join",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "u",
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
                        "<",
                        "100"
                    ]
                },
                "hint": "Try using: DELETE u FROM users u INNER JOIN orders o ON u.user_id = o.user_id WHERE o.amount < 100;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_delete"
                ]
            },
            {
                "id": 1306,
                "text": "Delete all rows",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: DELETE FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_delete"
                ]
            },
            {
                "id": 1307,
                "text": "Truncate table",
                "expectedPattern": {
                    "structures": [
                        "TRUNCATE",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: TRUNCATE TABLE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1308,
                "text": "Replace into",
                "expectedPattern": {
                    "structures": [
                        "REPLACE",
                        "INTO",
                        "users",
                        "user_id",
                        "firstname",
                        "age",
                        "VALUES",
                        "1",
                        "'John'",
                        "30"
                    ]
                },
                "hint": "Try using: REPLACE INTO users (user_id, firstname, age) VALUES (1, 'John', 30);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1309,
                "text": "Insert ignore",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "IGNORE",
                        "INTO",
                        "users",
                        "email",
                        "VALUES",
                        "'duplicate@email.com'"
                    ]
                },
                "hint": "Try using: INSERT IGNORE INTO users (email) VALUES ('duplicate@email.com');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1310,
                "text": "Update with CASE",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "age",
                        "=",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "age",
                        "+",
                        "1",
                        "WHEN",
                        "city",
                        "=",
                        "'Mumbai'",
                        "THEN",
                        "age",
                        "+",
                        "2",
                        "ELSE",
                        "age",
                        "END"
                    ]
                },
                "hint": "Try using: UPDATE users SET age = CASE WHEN city = 'Chennai' THEN age + 1 WHEN city = 'Mumbai' THEN age + 2 ELSE age END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_update"
                ]
            },
            {
                "id": 1311,
                "text": "Update with limit",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "is_active",
                        "=",
                        "0",
                        "ORDER",
                        "BY",
                        "last_login",
                        "LIMIT",
                        "100"
                    ]
                },
                "hint": "Try using: UPDATE users SET is_active = 0 ORDER BY last_login LIMIT 100;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_limit",
                    "sql_update"
                ]
            },
            {
                "id": 1312,
                "text": "Delete with limit",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "FROM",
                        "logs",
                        "ORDER",
                        "BY",
                        "log_date",
                        "LIMIT",
                        "1000"
                    ]
                },
                "hint": "Try using: DELETE FROM logs ORDER BY log_date LIMIT 1000;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_limit",
                    "sql_delete"
                ]
            },
            {
                "id": 1313,
                "text": "Multi-table delete",
                "expectedPattern": {
                    "structures": [
                        "DELETE",
                        "u",
                        "o",
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
                        "u.is_active",
                        "=",
                        "0"
                    ]
                },
                "hint": "Try using: DELETE u, o FROM users u INNER JOIN orders o ON u.user_id = o.user_id WHERE u.is_active = 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_join",
                    "sql_delete"
                ]
            },
            {
                "id": 1314,
                "text": "Insert with default values",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users",
                        "firstname",
                        "VALUES",
                        "'John'"
                    ]
                },
                "hint": "Try using: INSERT INTO users (firstname) VALUES ('John');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1315,
                "text": "Update with ORDER BY",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "priority",
                        "=",
                        "priority",
                        "+",
                        "1",
                        "ORDER",
                        "BY",
                        "age",
                        "DESC",
                        "LIMIT",
                        "10"
                    ]
                },
                "hint": "Try using: UPDATE users SET priority = priority + 1 ORDER BY age DESC LIMIT 10;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_limit",
                    "sql_update"
                ]
            },
            {
                "id": 1316,
                "text": "Conditional insert",
                "expectedPattern": {
                    "structures": [
                        "INSERT",
                        "INTO",
                        "users",
                        "firstname",
                        "age",
                        "SELECT",
                        "'Test'",
                        "25",
                        "WHERE",
                        "NOT",
                        "EXISTS",
                        "SELECT",
                        "1",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "=",
                        "'Test'"
                    ]
                },
                "hint": "Try using: INSERT INTO users (firstname, age) SELECT 'Test', 25 WHERE NOT EXISTS (SELECT 1 FROM users WHERE firstname = 'Test');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_insert"
                ]
            },
            {
                "id": 1317,
                "text": "Bulk insert from CSV concept",
                "expectedPattern": {
                    "structures": [
                        "LOAD",
                        "DATA",
                        "INFILE",
                        "'/path/to/file.csv'",
                        "INTO",
                        "TABLE",
                        "users",
                        "FIELDS",
                        "TERMINATED",
                        "BY",
                        "'",
                        "'",
                        "LINES",
                        "TERMINATED",
                        "BY",
                        "'\\n'"
                    ]
                },
                "hint": "Try using: LOAD DATA INFILE '/path/to/file.csv' INTO TABLE users FIELDS TERMINATED BY ',' LINES TERMINATED BY '\\n';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1318,
                "text": "Export to CSV concept",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "INTO",
                        "OUTFILE",
                        "'/path/to/output.csv'",
                        "FIELDS",
                        "TERMINATED",
                        "BY",
                        "'",
                        "'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT * INTO OUTFILE '/path/to/output.csv' FIELDS TERMINATED BY ',' FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1319,
                "text": "Create table",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TABLE",
                        "products",
                        "product_id",
                        "INT",
                        "PRIMARY",
                        "KEY",
                        "product_name",
                        "VARCHAR",
                        "100",
                        "price",
                        "DECIMAL",
                        "10",
                        "2"
                    ]
                },
                "hint": "Try using: CREATE TABLE products (product_id INT PRIMARY KEY, product_name VARCHAR(100), price DECIMAL(10,2));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_create_table"
                ]
            },
            {
                "id": 1320,
                "text": "Create table with constraints",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TABLE",
                        "orders",
                        "order_id",
                        "INT",
                        "AUTO_INCREMENT",
                        "PRIMARY",
                        "KEY",
                        "user_id",
                        "INT",
                        "NOT",
                        "NULL",
                        "amount",
                        "DECIMAL",
                        "10",
                        "2",
                        "DEFAULT",
                        "0",
                        "order_date",
                        "DATE",
                        "FOREIGN",
                        "KEY",
                        "user_id",
                        "REFERENCES",
                        "users",
                        "user_id"
                    ]
                },
                "hint": "Try using: CREATE TABLE orders (order_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, amount DECIMAL(10,2) DEFAULT 0, order_date DATE, FOREIGN KEY (user_id) REFERENCES users(user_id));",
                "allowedBlocks": [
                    "sql_select",
                    "sql_create_table"
                ]
            },
            {
                "id": 1321,
                "text": "Create temporary table",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TEMPORARY",
                        "TABLE",
                        "temp_users",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'"
                    ]
                },
                "hint": "Try using: CREATE TEMPORARY TABLE temp_users AS SELECT * FROM users WHERE city = 'Chennai';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1322,
                "text": "Drop table",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "TABLE",
                        "products"
                    ]
                },
                "hint": "Try using: DROP TABLE products;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1323,
                "text": "Drop table if exists",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "TABLE",
                        "IF",
                        "EXISTS",
                        "temp_table"
                    ]
                },
                "hint": "Try using: DROP TABLE IF EXISTS temp_table;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1324,
                "text": "Alter table add column",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ADD",
                        "COLUMN",
                        "phone",
                        "VARCHAR",
                        "15"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ADD COLUMN phone VARCHAR(15);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1325,
                "text": "Alter table drop column",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "DROP",
                        "COLUMN",
                        "phone"
                    ]
                },
                "hint": "Try using: ALTER TABLE users DROP COLUMN phone;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1326,
                "text": "Alter table modify column",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "MODIFY",
                        "COLUMN",
                        "age",
                        "INT",
                        "NOT",
                        "NULL"
                    ]
                },
                "hint": "Try using: ALTER TABLE users MODIFY COLUMN age INT NOT NULL;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1327,
                "text": "Alter table change column name",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "CHANGE",
                        "COLUMN",
                        "firstname",
                        "first_name",
                        "VARCHAR",
                        "50"
                    ]
                },
                "hint": "Try using: ALTER TABLE users CHANGE COLUMN firstname first_name VARCHAR(50);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1328,
                "text": "Alter table add primary key",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ADD",
                        "PRIMARY",
                        "KEY",
                        "user_id"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ADD PRIMARY KEY (user_id);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1329,
                "text": "Alter table drop primary key",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "DROP",
                        "PRIMARY",
                        "KEY"
                    ]
                },
                "hint": "Try using: ALTER TABLE users DROP PRIMARY KEY;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1330,
                "text": "Alter table add foreign key",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "orders",
                        "ADD",
                        "FOREIGN",
                        "KEY",
                        "user_id",
                        "REFERENCES",
                        "users",
                        "user_id"
                    ]
                },
                "hint": "Try using: ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(user_id);",
                "allowedBlocks": [
                    "sql_select"
                ]
            }
        ]
    },
    {
        "id": 14,
        "title": "SQL Level 14",
        "type": "SQL",
        "questions": [
            {
                "id": 1401,
                "text": "Alter table drop foreign key",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "orders",
                        "DROP",
                        "FOREIGN",
                        "KEY",
                        "orders_ibfk_1"
                    ]
                },
                "hint": "Try using: ALTER TABLE orders DROP FOREIGN KEY orders_ibfk_1;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1402,
                "text": "Alter table add unique constraint",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ADD",
                        "UNIQUE",
                        "email"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ADD UNIQUE (email);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1403,
                "text": "Alter table add check constraint",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ADD",
                        "CONSTRAINT",
                        "chk_age",
                        "CHECK",
                        "age",
                        ">=",
                        "18"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ADD CONSTRAINT chk_age CHECK (age >= 18);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1404,
                "text": "Rename table",
                "expectedPattern": {
                    "structures": [
                        "RENAME",
                        "TABLE",
                        "users",
                        "TO",
                        "customers"
                    ]
                },
                "hint": "Try using: RENAME TABLE users TO customers;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1405,
                "text": "Alter table add index",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ADD",
                        "INDEX",
                        "idx_city",
                        "city"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ADD INDEX idx_city (city);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1406,
                "text": "Describe table",
                "expectedPattern": {
                    "structures": [
                        "DESCRIBE",
                        "users"
                    ]
                },
                "hint": "Try using: DESCRIBE users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1407,
                "text": "Show create table",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "CREATE",
                        "TABLE",
                        "users"
                    ]
                },
                "hint": "Try using: SHOW CREATE TABLE users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_create_table"
                ]
            },
            {
                "id": 1408,
                "text": "Show columns",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "COLUMNS",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SHOW COLUMNS FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1409,
                "text": "Alter table auto_increment",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "AUTO_INCREMENT",
                        "=",
                        "1000"
                    ]
                },
                "hint": "Try using: ALTER TABLE users AUTO_INCREMENT = 1000;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1410,
                "text": "Alter table engine",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "ENGINE",
                        "=",
                        "InnoDB"
                    ]
                },
                "hint": "Try using: ALTER TABLE users ENGINE = InnoDB;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1411,
                "text": "Alter table charset",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "TABLE",
                        "users",
                        "CONVERT",
                        "TO",
                        "CHARACTER",
                        "SET",
                        "utf8mb4"
                    ]
                },
                "hint": "Try using: ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1412,
                "text": "Create table like",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TABLE",
                        "users_copy",
                        "LIKE",
                        "users"
                    ]
                },
                "hint": "Try using: CREATE TABLE users_copy LIKE users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_create_table"
                ]
            },
            {
                "id": 1413,
                "text": "Copy table with data",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "TABLE",
                        "users_backup",
                        "AS",
                        "SELECT",
                        "*",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: CREATE TABLE users_backup AS SELECT * FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_create_table"
                ]
            },
            {
                "id": 1414,
                "text": "Create database",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "DATABASE",
                        "mydb"
                    ]
                },
                "hint": "Try using: CREATE DATABASE mydb;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1415,
                "text": "Create database if not exists",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "DATABASE",
                        "IF",
                        "NOT",
                        "EXISTS",
                        "mydb"
                    ]
                },
                "hint": "Try using: CREATE DATABASE IF NOT EXISTS mydb;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1416,
                "text": "Drop database",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "DATABASE",
                        "mydb"
                    ]
                },
                "hint": "Try using: DROP DATABASE mydb;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1417,
                "text": "Show databases",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "DATABASES"
                    ]
                },
                "hint": "Try using: SHOW DATABASES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1418,
                "text": "Use database",
                "expectedPattern": {
                    "structures": [
                        "USE",
                        "mydb"
                    ]
                },
                "hint": "Try using: USE mydb;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1419,
                "text": "Show current database",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DATABASE"
                    ]
                },
                "hint": "Try using: SELECT DATABASE();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1420,
                "text": "Show tables",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "TABLES"
                    ]
                },
                "hint": "Try using: SHOW TABLES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1421,
                "text": "Show table status",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "TABLE",
                        "STATUS"
                    ]
                },
                "hint": "Try using: SHOW TABLE STATUS;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1422,
                "text": "Alter database charset",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "DATABASE",
                        "mydb",
                        "CHARACTER",
                        "SET",
                        "utf8mb4"
                    ]
                },
                "hint": "Try using: ALTER DATABASE mydb CHARACTER SET utf8mb4;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1423,
                "text": "Show create database",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "CREATE",
                        "DATABASE",
                        "mydb"
                    ]
                },
                "hint": "Try using: SHOW CREATE DATABASE mydb;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1424,
                "text": "Get database size",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_schema",
                        "SUM",
                        "data_length",
                        "+",
                        "index_length",
                        "/",
                        "1024",
                        "/",
                        "1024",
                        "as",
                        "size_mb",
                        "FROM",
                        "information_schema.tables",
                        "GROUP",
                        "BY",
                        "table_schema"
                    ]
                },
                "hint": "Try using: SELECT table_schema, SUM(data_length + index_length) / 1024 / 1024 as size_mb FROM information_schema.tables GROUP BY table_schema;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1425,
                "text": "Show variables",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "VARIABLES",
                        "LIKE",
                        "'%version%'"
                    ]
                },
                "hint": "Try using: SHOW VARIABLES LIKE '%version%';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1426,
                "text": "Set variable",
                "expectedPattern": {
                    "structures": [
                        "SET",
                        "GLOBAL",
                        "max_connections",
                        "=",
                        "200"
                    ]
                },
                "hint": "Try using: SET GLOBAL max_connections = 200;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1427,
                "text": "Show status",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "STATUS",
                        "LIKE",
                        "'%thread%'"
                    ]
                },
                "hint": "Try using: SHOW STATUS LIKE '%thread%';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1428,
                "text": "Show grants",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "GRANTS",
                        "FOR",
                        "CURRENT_USER"
                    ]
                },
                "hint": "Try using: SHOW GRANTS FOR CURRENT_USER;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1429,
                "text": "Create user",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "USER",
                        "'newuser'@'localhost'",
                        "IDENTIFIED",
                        "BY",
                        "'password'"
                    ]
                },
                "hint": "Try using: CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1430,
                "text": "Grant privileges",
                "expectedPattern": {
                    "structures": [
                        "GRANT",
                        "SELECT",
                        "INSERT",
                        "ON",
                        "mydb.*",
                        "TO",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: GRANT SELECT, INSERT ON mydb.* TO 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            }
        ]
    },
    {
        "id": 15,
        "title": "SQL Level 15",
        "type": "SQL",
        "questions": [
            {
                "id": 1501,
                "text": "Grant all privileges",
                "expectedPattern": {
                    "structures": [
                        "GRANT",
                        "ALL",
                        "PRIVILEGES",
                        "ON",
                        "mydb.*",
                        "TO",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: GRANT ALL PRIVILEGES ON mydb.* TO 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1502,
                "text": "Revoke privileges",
                "expectedPattern": {
                    "structures": [
                        "REVOKE",
                        "INSERT",
                        "ON",
                        "mydb.*",
                        "FROM",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: REVOKE INSERT ON mydb.* FROM 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1503,
                "text": "Drop user",
                "expectedPattern": {
                    "structures": [
                        "DROP",
                        "USER",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: DROP USER 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1504,
                "text": "Rename user",
                "expectedPattern": {
                    "structures": [
                        "RENAME",
                        "USER",
                        "'olduser'@'localhost'",
                        "TO",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: RENAME USER 'olduser'@'localhost' TO 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1505,
                "text": "Change password",
                "expectedPattern": {
                    "structures": [
                        "ALTER",
                        "USER",
                        "'newuser'@'localhost'",
                        "IDENTIFIED",
                        "BY",
                        "'newpassword'"
                    ]
                },
                "hint": "Try using: ALTER USER 'newuser'@'localhost' IDENTIFIED BY 'newpassword';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1506,
                "text": "Show users",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "user",
                        "host",
                        "FROM",
                        "mysql.user"
                    ]
                },
                "hint": "Try using: SELECT user, host FROM mysql.user;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1507,
                "text": "Flush privileges",
                "expectedPattern": {
                    "structures": [
                        "FLUSH",
                        "PRIVILEGES"
                    ]
                },
                "hint": "Try using: FLUSH PRIVILEGES;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1508,
                "text": "Show current user",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CURRENT_USER"
                    ]
                },
                "hint": "Try using: SELECT CURRENT_USER();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1509,
                "text": "Grant with grant option",
                "expectedPattern": {
                    "structures": [
                        "GRANT",
                        "SELECT",
                        "ON",
                        "mydb.*",
                        "TO",
                        "'newuser'@'localhost'",
                        "WITH",
                        "GRANT",
                        "OPTION"
                    ]
                },
                "hint": "Try using: GRANT SELECT ON mydb.* TO 'newuser'@'localhost' WITH GRANT OPTION;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1510,
                "text": "Show privileges for user",
                "expectedPattern": {
                    "structures": [
                        "SHOW",
                        "GRANTS",
                        "FOR",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: SHOW GRANTS FOR 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1511,
                "text": "Create role",
                "expectedPattern": {
                    "structures": [
                        "CREATE",
                        "ROLE",
                        "'app_developer'"
                    ]
                },
                "hint": "Try using: CREATE ROLE 'app_developer';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1512,
                "text": "Grant role to user",
                "expectedPattern": {
                    "structures": [
                        "GRANT",
                        "'app_developer'",
                        "TO",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: GRANT 'app_developer' TO 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1513,
                "text": "Set default role",
                "expectedPattern": {
                    "structures": [
                        "SET",
                        "DEFAULT",
                        "ROLE",
                        "'app_developer'",
                        "TO",
                        "'newuser'@'localhost'"
                    ]
                },
                "hint": "Try using: SET DEFAULT ROLE 'app_developer' TO 'newuser'@'localhost';",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1514,
                "text": "List all tables in database",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT table_name FROM information_schema.tables WHERE table_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1515,
                "text": "Get table row count",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "table_rows",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT table_name, table_rows FROM information_schema.tables WHERE table_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1516,
                "text": "Get column information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "column_name",
                        "data_type",
                        "FROM",
                        "information_schema.columns",
                        "WHERE",
                        "table_name",
                        "=",
                        "'users'"
                    ]
                },
                "hint": "Try using: SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1517,
                "text": "Find tables with specific column",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "FROM",
                        "information_schema.columns",
                        "WHERE",
                        "column_name",
                        "=",
                        "'email'",
                        "AND",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT table_name FROM information_schema.columns WHERE column_name = 'email' AND table_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1518,
                "text": "Get primary keys",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "column_name",
                        "FROM",
                        "information_schema.key_column_usage",
                        "WHERE",
                        "table_name",
                        "=",
                        "'users'",
                        "AND",
                        "constraint_name",
                        "=",
                        "'PRIMARY'"
                    ]
                },
                "hint": "Try using: SELECT column_name FROM information_schema.key_column_usage WHERE table_name = 'users' AND constraint_name = 'PRIMARY';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1519,
                "text": "Get foreign keys",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "constraint_name",
                        "column_name",
                        "referenced_table_name",
                        "FROM",
                        "information_schema.key_column_usage",
                        "WHERE",
                        "table_name",
                        "=",
                        "'orders'",
                        "AND",
                        "referenced_table_name",
                        "IS",
                        "NOT",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT constraint_name, column_name, referenced_table_name FROM information_schema.key_column_usage WHERE table_name = 'orders' AND referenced_table_name IS NOT NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1520,
                "text": "Get table constraints",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "constraint_name",
                        "constraint_type",
                        "FROM",
                        "information_schema.table_constraints",
                        "WHERE",
                        "table_name",
                        "=",
                        "'users'"
                    ]
                },
                "hint": "Try using: SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = 'users';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1521,
                "text": "Find tables without primary key",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "FROM",
                        "information_schema.tables",
                        "t",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "AND",
                        "NOT",
                        "EXISTS",
                        "SELECT",
                        "1",
                        "FROM",
                        "information_schema.key_column_usage",
                        "k",
                        "WHERE",
                        "k.table_name",
                        "=",
                        "t.table_name",
                        "AND",
                        "k.constraint_name",
                        "=",
                        "'PRIMARY'"
                    ]
                },
                "hint": "Try using: SELECT table_name FROM information_schema.tables t WHERE table_schema = 'mydb' AND NOT EXISTS (SELECT 1 FROM information_schema.key_column_usage k WHERE k.table_name = t.table_name AND k.constraint_name = 'PRIMARY');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1522,
                "text": "Get index information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "index_name",
                        "column_name",
                        "FROM",
                        "information_schema.statistics",
                        "WHERE",
                        "table_name",
                        "=",
                        "'users'"
                    ]
                },
                "hint": "Try using: SELECT index_name, column_name FROM information_schema.statistics WHERE table_name = 'users';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1523,
                "text": "Table size information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "ROUND",
                        "data_length",
                        "+",
                        "index_length",
                        "/",
                        "1024",
                        "/",
                        "1024",
                        "2",
                        "as",
                        "size_mb",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT table_name, ROUND((data_length + index_length) / 1024 / 1024, 2) as size_mb FROM information_schema.tables WHERE table_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1524,
                "text": "Get view definition",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "view_definition",
                        "FROM",
                        "information_schema.views",
                        "WHERE",
                        "table_name",
                        "=",
                        "'active_users'"
                    ]
                },
                "hint": "Try using: SELECT view_definition FROM information_schema.views WHERE table_name = 'active_users';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1525,
                "text": "Find unused indexes",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "information_schema.statistics",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "AND",
                        "index_name",
                        "NOT",
                        "IN",
                        "SELECT",
                        "DISTINCT",
                        "index_name",
                        "FROM",
                        "information_schema.statistics",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT * FROM information_schema.statistics WHERE table_schema = 'mydb' AND index_name NOT IN (SELECT DISTINCT index_name FROM information_schema.statistics WHERE table_schema = 'mydb');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1526,
                "text": "Get trigger information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "trigger_name",
                        "event_manipulation",
                        "event_object_table",
                        "FROM",
                        "information_schema.triggers",
                        "WHERE",
                        "trigger_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT trigger_name, event_manipulation, event_object_table FROM information_schema.triggers WHERE trigger_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1527,
                "text": "Get stored procedure info",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "routine_name",
                        "routine_type",
                        "FROM",
                        "information_schema.routines",
                        "WHERE",
                        "routine_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT routine_name, routine_type FROM information_schema.routines WHERE routine_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1528,
                "text": "Check auto_increment values",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "auto_increment",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "AND",
                        "auto_increment",
                        "IS",
                        "NOT",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT table_name, auto_increment FROM information_schema.tables WHERE table_schema = 'mydb' AND auto_increment IS NOT NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1529,
                "text": "Find duplicate column names",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "column_name",
                        "COUNT",
                        "*",
                        "FROM",
                        "information_schema.columns",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "GROUP",
                        "BY",
                        "column_name",
                        "HAVING",
                        "COUNT",
                        "*",
                        ">",
                        "1"
                    ]
                },
                "hint": "Try using: SELECT column_name, COUNT(*) FROM information_schema.columns WHERE table_schema = 'mydb' GROUP BY column_name HAVING COUNT(*) > 1;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group",
                    "sql_having"
                ]
            },
            {
                "id": 1530,
                "text": "Get collation information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "table_collation",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'"
                    ]
                },
                "hint": "Try using: SELECT table_name, table_collation FROM information_schema.tables WHERE table_schema = 'mydb';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            }
        ]
    },
    {
        "id": 16,
        "title": "SQL Level 16",
        "type": "SQL",
        "questions": [
            {
                "id": 1601,
                "text": "Find nullable columns",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "column_name",
                        "FROM",
                        "information_schema.columns",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "AND",
                        "is_nullable",
                        "=",
                        "'YES'"
                    ]
                },
                "hint": "Try using: SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'mydb' AND is_nullable = 'YES';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1602,
                "text": "Get column defaults",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "column_name",
                        "column_default",
                        "FROM",
                        "information_schema.columns",
                        "WHERE",
                        "table_name",
                        "=",
                        "'users'"
                    ]
                },
                "hint": "Try using: SELECT column_name, column_default FROM information_schema.columns WHERE table_name = 'users';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1603,
                "text": "Find tables modified recently",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "table_name",
                        "update_time",
                        "FROM",
                        "information_schema.tables",
                        "WHERE",
                        "table_schema",
                        "=",
                        "'mydb'",
                        "ORDER",
                        "BY",
                        "update_time",
                        "DESC"
                    ]
                },
                "hint": "Try using: SELECT table_name, update_time FROM information_schema.tables WHERE table_schema = 'mydb' ORDER BY update_time DESC;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_order",
                    "sql_update"
                ]
            },
            {
                "id": 1604,
                "text": "Union of two queries",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "UNION",
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Mumbai'"
                    ]
                },
                "hint": "Try using: SELECT firstname FROM users WHERE city = 'Chennai' UNION SELECT firstname FROM users WHERE city = 'Mumbai';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1605,
                "text": "Union all (with duplicates)",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "UNION",
                        "ALL",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses"
                    ]
                },
                "hint": "Try using: SELECT city FROM users UNION ALL SELECT city FROM addresses;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1606,
                "text": "Intersect simulation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "DISTINCT",
                        "city",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "IN",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses"
                    ]
                },
                "hint": "Try using: SELECT DISTINCT city FROM users WHERE city IN (SELECT city FROM addresses);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1607,
                "text": "Except simulation (MINUS)",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "NOT",
                        "IN",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses"
                    ]
                },
                "hint": "Try using: SELECT city FROM users WHERE city NOT IN (SELECT city FROM addresses);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1608,
                "text": "Union with order by",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "UNION",
                        "SELECT",
                        "firstname",
                        "age",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Delhi'",
                        "ORDER",
                        "BY",
                        "age"
                    ]
                },
                "hint": "Try using: SELECT firstname, age FROM users WHERE city = 'Chennai' UNION SELECT firstname, age FROM users WHERE city = 'Delhi' ORDER BY age;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_order"
                ]
            },
            {
                "id": 1609,
                "text": "Union different column counts (matched)",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "lastname",
                        "FROM",
                        "users",
                        "UNION",
                        "SELECT",
                        "product_name",
                        "NULL",
                        "FROM",
                        "products"
                    ]
                },
                "hint": "Try using: SELECT firstname, lastname FROM users UNION SELECT product_name, NULL FROM products;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1610,
                "text": "Complex union with joins",
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
                        "UNION",
                        "SELECT",
                        "c.name",
                        "c.credit_amount",
                        "FROM",
                        "customers",
                        "c"
                    ]
                },
                "hint": "Try using: SELECT u.firstname, o.amount FROM users u INNER JOIN orders o ON u.user_id = o.user_id UNION SELECT c.name, c.credit_amount FROM customers c;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join"
                ]
            },
            {
                "id": 1611,
                "text": "Union with aggregation",
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
                        "UNION",
                        "SELECT",
                        "'Total'",
                        "COUNT",
                        "*",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) as cnt FROM users GROUP BY city UNION SELECT 'Total', COUNT(*) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1612,
                "text": "Multiple unions",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "'Users'",
                        "as",
                        "type",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "UNION",
                        "SELECT",
                        "'Orders'",
                        "COUNT",
                        "*",
                        "FROM",
                        "orders",
                        "UNION",
                        "SELECT",
                        "'Products'",
                        "COUNT",
                        "*",
                        "FROM",
                        "products"
                    ]
                },
                "hint": "Try using: SELECT 'Users' as type, COUNT(*) FROM users UNION SELECT 'Orders', COUNT(*) FROM orders UNION SELECT 'Products', COUNT(*) FROM products;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1613,
                "text": "Union with calculated columns",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "age",
                        "age",
                        "*",
                        "2",
                        "as",
                        "double_age",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "UNION",
                        "SELECT",
                        "firstname",
                        "age",
                        "age",
                        "*",
                        "3",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Mumbai'"
                    ]
                },
                "hint": "Try using: SELECT firstname, age, age * 2 as double_age FROM users WHERE city = 'Chennai' UNION SELECT firstname, age, age * 3 FROM users WHERE city = 'Mumbai';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1614,
                "text": "Union with CASE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        ">",
                        "30",
                        "THEN",
                        "'Senior'",
                        "ELSE",
                        "'Junior'",
                        "END",
                        "as",
                        "category",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "UNION",
                        "SELECT",
                        "firstname",
                        "'All'",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Delhi'"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age > 30 THEN 'Senior' ELSE 'Junior' END as category FROM users WHERE city = 'Chennai' UNION SELECT firstname, 'All' FROM users WHERE city = 'Delhi';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1615,
                "text": "Intersect with aggregation",
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
                        "COUNT",
                        "*",
                        ">",
                        "5",
                        "INTERSECT",
                        "SELECT",
                        "city",
                        "FROM",
                        "orders",
                        "o",
                        "INNER",
                        "JOIN",
                        "users",
                        "u",
                        "ON",
                        "o.user_id",
                        "=",
                        "u.user_id",
                        "GROUP",
                        "BY",
                        "u.city",
                        "HAVING",
                        "SUM",
                        "amount",
                        ">",
                        "10000"
                    ]
                },
                "hint": "Try using: SELECT city FROM users GROUP BY city HAVING COUNT(*) > 5 INTERSECT SELECT city FROM orders o INNER JOIN users u ON o.user_id = u.user_id GROUP BY u.city HAVING SUM(amount) > 10000;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join",
                    "sql_group",
                    "sql_having"
                ]
            },
            {
                "id": 1616,
                "text": "Nested union",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "30",
                        "UNION",
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "'Chennai'",
                        "AS",
                        "combined"
                    ]
                },
                "hint": "Try using: SELECT * FROM (SELECT firstname FROM users WHERE age > 30 UNION SELECT firstname FROM users WHERE city = 'Chennai') AS combined;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1617,
                "text": "Union with limit",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "age",
                        "LIMIT",
                        "5",
                        "UNION",
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "age",
                        "DESC",
                        "LIMIT",
                        "5"
                    ]
                },
                "hint": "Try using: (SELECT * FROM users ORDER BY age LIMIT 5) UNION (SELECT * FROM users ORDER BY age DESC LIMIT 5);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order",
                    "sql_limit"
                ]
            },
            {
                "id": 1618,
                "text": "Symmetric difference",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "NOT",
                        "IN",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses",
                        "UNION",
                        "SELECT",
                        "city",
                        "FROM",
                        "addresses",
                        "WHERE",
                        "city",
                        "NOT",
                        "IN",
                        "SELECT",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city FROM users WHERE city NOT IN (SELECT city FROM addresses) UNION SELECT city FROM addresses WHERE city NOT IN (SELECT city FROM users);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1619,
                "text": "IFNULL function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "IFNULL",
                        "email",
                        "'No",
                        "Email'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, IFNULL(email, 'No Email') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1620,
                "text": "COALESCE function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "COALESCE",
                        "email",
                        "phone",
                        "'No",
                        "Contact'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, COALESCE(email, phone, 'No Contact') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1621,
                "text": "NULLIF function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "NULLIF",
                        "city",
                        "'Unknown'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, NULLIF(city, 'Unknown') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1622,
                "text": "IF function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "IF",
                        "age",
                        ">=",
                        "18",
                        "'Adult'",
                        "'Minor'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, IF(age >= 18, 'Adult', 'Minor') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1623,
                "text": "Simple CASE expression",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "city",
                        "WHEN",
                        "'Chennai'",
                        "THEN",
                        "'TN'",
                        "WHEN",
                        "'Mumbai'",
                        "THEN",
                        "'MH'",
                        "ELSE",
                        "'Other'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE city WHEN 'Chennai' THEN 'TN' WHEN 'Mumbai' THEN 'MH' ELSE 'Other' END FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1624,
                "text": "Searched CASE expression",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        "<",
                        "20",
                        "THEN",
                        "'Teen'",
                        "WHEN",
                        "age",
                        "<",
                        "40",
                        "THEN",
                        "'Adult'",
                        "ELSE",
                        "'Senior'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age < 20 THEN 'Teen' WHEN age < 40 THEN 'Adult' ELSE 'Senior' END FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1625,
                "text": "Nested CASE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "CASE",
                        "WHEN",
                        "age",
                        ">=",
                        "18",
                        "THEN",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "'Adult",
                        "Chennai'",
                        "ELSE",
                        "'Adult",
                        "Other'",
                        "END",
                        "ELSE",
                        "'Minor'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN age >= 18 THEN CASE WHEN city = 'Chennai' THEN 'Adult Chennai' ELSE 'Adult Other' END ELSE 'Minor' END FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1626,
                "text": "CASE in WHERE clause",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "age",
                        ">",
                        "25",
                        "ELSE",
                        "age",
                        ">",
                        "30",
                        "END"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE CASE WHEN city = 'Chennai' THEN age > 25 ELSE age > 30 END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1627,
                "text": "CASE in ORDER BY",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "1",
                        "WHEN",
                        "city",
                        "=",
                        "'Mumbai'",
                        "THEN",
                        "2",
                        "ELSE",
                        "3",
                        "END"
                    ]
                },
                "hint": "Try using: SELECT firstname FROM users ORDER BY CASE WHEN city = 'Chennai' THEN 1 WHEN city = 'Mumbai' THEN 2 ELSE 3 END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1628,
                "text": "CASE with aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SUM",
                        "CASE",
                        "WHEN",
                        "age",
                        ">",
                        "30",
                        "THEN",
                        "1",
                        "ELSE",
                        "0",
                        "END",
                        "as",
                        "over_30",
                        "SUM",
                        "CASE",
                        "WHEN",
                        "age",
                        "<=",
                        "30",
                        "THEN",
                        "1",
                        "ELSE",
                        "0",
                        "END",
                        "as",
                        "under_30",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT SUM(CASE WHEN age > 30 THEN 1 ELSE 0 END) as over_30, SUM(CASE WHEN age <= 30 THEN 1 ELSE 0 END) as under_30 FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1629,
                "text": "GREATEST function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "GREATEST",
                        "age",
                        "18",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, GREATEST(age, 18) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1630,
                "text": "LEAST function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "LEAST",
                        "age",
                        "65",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, LEAST(age, 65) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            }
        ]
    },
    {
        "id": 17,
        "title": "SQL Level 17",
        "type": "SQL",
        "questions": [
            {
                "id": 1701,
                "text": "ELT function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "ELT",
                        "2",
                        "'First'",
                        "'Second'",
                        "'Third'"
                    ]
                },
                "hint": "Try using: SELECT ELT(2, 'First', 'Second', 'Third');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1702,
                "text": "FIELD function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "FIELD",
                        "city",
                        "'Chennai'",
                        "'Mumbai'",
                        "'Delhi'",
                        "as",
                        "city_rank",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, FIELD(city, 'Chennai', 'Mumbai', 'Delhi') as city_rank FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1703,
                "text": "Multiple conditions with COALESCE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COALESCE",
                        "NULL",
                        "NULL",
                        "'Default'",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT COALESCE(NULL, NULL, 'Default', NULL);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1704,
                "text": "CASE with NULL handling",
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
                        "WHEN",
                        "email",
                        "=",
                        "''",
                        "THEN",
                        "'Empty'",
                        "ELSE",
                        "email",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN email IS NULL THEN 'No Email' WHEN email = '' THEN 'Empty' ELSE email END FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1705,
                "text": "Conditional counting",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "CASE",
                        "WHEN",
                        "age",
                        ">",
                        "30",
                        "THEN",
                        "1",
                        "END",
                        "as",
                        "over_30_count",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COUNT(CASE WHEN age > 30 THEN 1 END) as over_30_count FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1706,
                "text": "CASE in JOIN condition",
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
                        "o.user_id",
                        "AND",
                        "CASE",
                        "WHEN",
                        "u.city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "o.amount",
                        ">",
                        "1000",
                        "ELSE",
                        "o.amount",
                        ">",
                        "500",
                        "END"
                    ]
                },
                "hint": "Try using: SELECT * FROM users u LEFT JOIN orders o ON u.user_id = o.user_id AND CASE WHEN u.city = 'Chennai' THEN o.amount > 1000 ELSE o.amount > 500 END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join"
                ]
            },
            {
                "id": 1707,
                "text": "Dynamic sorting with CASE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "CASE",
                        "WHEN",
                        "@sort_column",
                        "=",
                        "'age'",
                        "THEN",
                        "age",
                        "END",
                        "CASE",
                        "WHEN",
                        "@sort_column",
                        "=",
                        "'city'",
                        "THEN",
                        "city",
                        "END"
                    ]
                },
                "hint": "Try using: SELECT * FROM users ORDER BY CASE WHEN @sort_column = 'age' THEN age END, CASE WHEN @sort_column = 'city' THEN city END;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1708,
                "text": "Conditional SUM",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SUM",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "amount",
                        "ELSE",
                        "0",
                        "END",
                        "as",
                        "chennai_total",
                        "FROM",
                        "orders",
                        "o",
                        "INNER",
                        "JOIN",
                        "users",
                        "u",
                        "ON",
                        "o.user_id",
                        "=",
                        "u.user_id"
                    ]
                },
                "hint": "Try using: SELECT SUM(CASE WHEN city = 'Chennai' THEN amount ELSE 0 END) as chennai_total FROM orders o INNER JOIN users u ON o.user_id = u.user_id;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_join"
                ]
            },
            {
                "id": 1709,
                "text": "COUNT with DISTINCT",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "DISTINCT",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COUNT(DISTINCT city) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1710,
                "text": "GROUP_CONCAT function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "GROUP_CONCAT",
                        "firstname",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, GROUP_CONCAT(firstname) FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1711,
                "text": "GROUP_CONCAT with separator",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "GROUP_CONCAT",
                        "firstname",
                        "SEPARATOR",
                        "'",
                        "|",
                        "'",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, GROUP_CONCAT(firstname SEPARATOR ' | ') FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1712,
                "text": "GROUP_CONCAT with ORDER BY",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "GROUP_CONCAT",
                        "firstname",
                        "ORDER",
                        "BY",
                        "age",
                        "DESC",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, GROUP_CONCAT(firstname ORDER BY age DESC) FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_order"
                ]
            },
            {
                "id": 1713,
                "text": "Standard deviation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "STDDEV",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT STDDEV(age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1714,
                "text": "Variance",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "VARIANCE",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT VARIANCE(age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1715,
                "text": "Coefficient of variation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "STDDEV",
                        "age",
                        "/",
                        "AVG",
                        "age",
                        "*",
                        "100",
                        "as",
                        "cv",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT (STDDEV(age) / AVG(age)) * 100 as cv FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1716,
                "text": "Percentile with window function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "PERCENTILE_CONT",
                        "0.95",
                        "WITHIN",
                        "GROUP",
                        "ORDER",
                        "BY",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1717,
                "text": "Median using percentile",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "PERCENTILE_CONT",
                        "0.5",
                        "WITHIN",
                        "GROUP",
                        "ORDER",
                        "BY",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY age) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1718,
                "text": "Count with multiple conditions",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "*",
                        "FILTER",
                        "WHERE",
                        "age",
                        ">",
                        "30",
                        "as",
                        "over_30",
                        "COUNT",
                        "*",
                        "FILTER",
                        "WHERE",
                        "age",
                        "<=",
                        "30",
                        "as",
                        "under_30",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COUNT(*) FILTER (WHERE age > 30) as over_30, COUNT(*) FILTER (WHERE age <= 30) as under_30 FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1719,
                "text": "Conditional average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "AVG",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "age",
                        "END",
                        "as",
                        "chennai_avg_age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT AVG(CASE WHEN city = 'Chennai' THEN age END) as chennai_avg_age FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1720,
                "text": "Weighted average",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SUM",
                        "age",
                        "*",
                        "weight",
                        "/",
                        "SUM",
                        "weight",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT SUM(age * weight) / SUM(weight) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1721,
                "text": "Geometric mean",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "EXP",
                        "AVG",
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
                "hint": "Try using: SELECT EXP(AVG(LN(age))) FROM users WHERE age > 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1722,
                "text": "Harmonic mean",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "*",
                        "/",
                        "SUM",
                        "1.0",
                        "/",
                        "age",
                        "FROM",
                        "users",
                        "WHERE",
                        "age",
                        ">",
                        "0"
                    ]
                },
                "hint": "Try using: SELECT COUNT(*) / SUM(1.0 / age) FROM users WHERE age > 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1723,
                "text": "Running product",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "order_id",
                        "amount",
                        "EXP",
                        "SUM",
                        "LN",
                        "amount",
                        "OVER",
                        "ORDER",
                        "BY",
                        "order_id",
                        "as",
                        "running_product",
                        "FROM",
                        "orders",
                        "WHERE",
                        "amount",
                        ">",
                        "0"
                    ]
                },
                "hint": "Try using: SELECT order_id, amount, EXP(SUM(LN(amount)) OVER (ORDER BY order_id)) as running_product FROM orders WHERE amount > 0;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_order"
                ]
            },
            {
                "id": 1724,
                "text": "Cumulative count distinct",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "DISTINCT",
                        "user_id",
                        "OVER",
                        "ORDER",
                        "BY",
                        "city",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(DISTINCT user_id) OVER (ORDER BY city) FROM users;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1725,
                "text": "String aggregation with filtering",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "GROUP_CONCAT",
                        "DISTINCT",
                        "firstname",
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
                "hint": "Try using: SELECT city, GROUP_CONCAT(DISTINCT firstname) FROM users WHERE age > 25 GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_group"
                ]
            },
            {
                "id": 1726,
                "text": "Nested aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "AVG",
                        "city_avg",
                        "FROM",
                        "SELECT",
                        "city",
                        "AVG",
                        "age",
                        "as",
                        "city_avg",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city",
                        "sub"
                    ]
                },
                "hint": "Try using: SELECT AVG(city_avg) FROM (SELECT city, AVG(age) as city_avg FROM users GROUP BY city) sub;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1727,
                "text": "Conditional MAX",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "MAX",
                        "CASE",
                        "WHEN",
                        "city",
                        "=",
                        "'Chennai'",
                        "THEN",
                        "age",
                        "END",
                        "as",
                        "chennai_max_age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT MAX(CASE WHEN city = 'Chennai' THEN age END) as chennai_max_age FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1728,
                "text": "Multiple aggregations",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "as",
                        "cnt",
                        "AVG",
                        "age",
                        "as",
                        "avg_age",
                        "MIN",
                        "age",
                        "as",
                        "min_age",
                        "MAX",
                        "age",
                        "as",
                        "max_age",
                        "SUM",
                        "age",
                        "as",
                        "total_age",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) as cnt, AVG(age) as avg_age, MIN(age) as min_age, MAX(age) as max_age, SUM(age) as total_age FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1729,
                "text": "Aggregation with HAVING and multiple conditions",
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
                        "COUNT",
                        "*",
                        ">",
                        "5",
                        "AND",
                        "AVG",
                        "age",
                        ">",
                        "30"
                    ]
                },
                "hint": "Try using: SELECT city FROM users GROUP BY city HAVING COUNT(*) > 5 AND AVG(age) > 30;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group",
                    "sql_having"
                ]
            },
            {
                "id": 1730,
                "text": "Percent of total",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "city",
                        "COUNT",
                        "*",
                        "*",
                        "100.0",
                        "/",
                        "SELECT",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "as",
                        "percentage",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "city"
                    ]
                },
                "hint": "Try using: SELECT city, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM users) as percentage FROM users GROUP BY city;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            }
        ]
    },
    {
        "id": 18,
        "title": "SQL Level 18",
        "type": "SQL",
        "questions": [
            {
                "id": 1801,
                "text": "BIT_AND, BIT_OR aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "BIT_AND",
                        "age",
                        "BIT_OR",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT BIT_AND(age), BIT_OR(age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1802,
                "text": "JSON aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_ARRAYAGG",
                        "firstname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT JSON_ARRAYAGG(firstname) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1803,
                "text": "JSON object aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_OBJECTAGG",
                        "user_id",
                        "firstname",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT JSON_OBJECTAGG(user_id, firstname) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1804,
                "text": "Basic LIKE with wildcard",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "LIKE",
                        "'%oh%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname LIKE '%oh%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1805,
                "text": "LIKE with single character wildcard",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "LIKE",
                        "'J_hn'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname LIKE 'J_hn';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1806,
                "text": "NOT LIKE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "NOT",
                        "LIKE",
                        "'C%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE city NOT LIKE 'C%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1807,
                "text": "Case insensitive LIKE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "LOWER",
                        "firstname",
                        "LIKE",
                        "'%john%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE LOWER(firstname) LIKE '%john%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1808,
                "text": "REGEXP for pattern matching",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "REGEXP",
                        "'^[A-M]'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname REGEXP '^[A-M]';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1809,
                "text": "REGEXP case insensitive",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "REGEXP",
                        "BINARY",
                        "'^[a-m]'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname REGEXP BINARY '^[a-m]';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1810,
                "text": "Match phone pattern",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "phone",
                        "REGEXP",
                        "'^[0-9]{10}$'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE phone REGEXP '^[0-9]{10}$';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1811,
                "text": "Email validation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "REGEXP",
                        "'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2",
                        "}$'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1812,
                "text": "Match multiple patterns",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "REGEXP",
                        "'John|Jane|Bob'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname REGEXP 'John|Jane|Bob';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1813,
                "text": "REGEXP with character class",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "REGEXP",
                        "'[aeiou]{3}'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname REGEXP '[aeiou]{3}';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1814,
                "text": "NOT REGEXP",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "NOT",
                        "REGEXP",
                        "'^A'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname NOT REGEXP '^A';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1815,
                "text": "SOUNDS LIKE (soundex)",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "SOUNDS",
                        "LIKE",
                        "'Jon'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname SOUNDS LIKE 'Jon';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1816,
                "text": "LIKE with ESCAPE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "products",
                        "WHERE",
                        "description",
                        "LIKE",
                        "'%50\\%%'",
                        "ESCAPE",
                        "'\\'"
                    ]
                },
                "hint": "Try using: SELECT * FROM products WHERE description LIKE '%50\\%%' ESCAPE '\\';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1817,
                "text": "Multiple LIKE conditions",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "firstname",
                        "LIKE",
                        "'A%'",
                        "OR",
                        "firstname",
                        "LIKE",
                        "'B%'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE firstname LIKE 'A%' OR firstname LIKE 'B%';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1818,
                "text": "REGEXP_LIKE function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "REGEXP_LIKE",
                        "email",
                        "'@gmail.com$'"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE REGEXP_LIKE(email, '@gmail.com$');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1819,
                "text": "REGEXP_REPLACE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "REGEXP_REPLACE",
                        "phone",
                        "'[^0-9]'",
                        "''",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT REGEXP_REPLACE(phone, '[^0-9]', '') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1820,
                "text": "REGEXP_SUBSTR",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "REGEXP_SUBSTR",
                        "email",
                        "'@[^.]+'",
                        "as",
                        "domain_part",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT REGEXP_SUBSTR(email, '@[^.]+') as domain_part FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1821,
                "text": "REGEXP_INSTR",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "REGEXP_INSTR",
                        "firstname",
                        "'[aeiou]'",
                        "as",
                        "first_vowel_pos",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, REGEXP_INSTR(firstname, '[aeiou]') as first_vowel_pos FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1822,
                "text": "Match date format",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "orders",
                        "WHERE",
                        "order_date",
                        "REGEXP",
                        "'^[0-9]{4}-[0-9]{2}-[0-9]{2}$'"
                    ]
                },
                "hint": "Try using: SELECT * FROM orders WHERE order_date REGEXP '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1823,
                "text": "Extract numbers from string",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "REGEXP_SUBSTR",
                        "address",
                        "'[0-9]+'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT REGEXP_SUBSTR(address, '[0-9]+') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1824,
                "text": "IS NULL check",
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
                    "sql_where"
                ]
            },
            {
                "id": 1825,
                "text": "IS NOT NULL check",
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
                    "sql_where"
                ]
            },
            {
                "id": 1826,
                "text": "Count NULL values",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "*",
                        "-",
                        "COUNT",
                        "email",
                        "as",
                        "null_emails",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COUNT(*) - COUNT(email) as null_emails FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1827,
                "text": "Replace NULL with value",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "firstname",
                        "IFNULL",
                        "email",
                        "'no-email@example.com'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, IFNULL(email, 'no-email@example.com') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1828,
                "text": "COALESCE multiple columns",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COALESCE",
                        "email",
                        "phone",
                        "address",
                        "'No",
                        "contact'",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COALESCE(email, phone, address, 'No contact') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1829,
                "text": "NULL-safe equal",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "<=>",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email <=> NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1830,
                "text": "Find rows with any NULL",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "IS",
                        "NULL",
                        "OR",
                        "phone",
                        "IS",
                        "NULL",
                        "OR",
                        "city",
                        "IS",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email IS NULL OR phone IS NULL OR city IS NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            }
        ]
    },
    {
        "id": 19,
        "title": "SQL Level 19",
        "type": "SQL",
        "questions": [
            {
                "id": 1901,
                "text": "Find rows with all columns filled",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "email",
                        "IS",
                        "NOT",
                        "NULL",
                        "AND",
                        "phone",
                        "IS",
                        "NOT",
                        "NULL",
                        "AND",
                        "city",
                        "IS",
                        "NOT",
                        "NULL"
                    ]
                },
                "hint": "Try using: SELECT * FROM users WHERE email IS NOT NULL AND phone IS NOT NULL AND city IS NOT NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1902,
                "text": "NULLIF to create NULL",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "NULLIF",
                        "city",
                        "''",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT NULLIF(city, '') FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1903,
                "text": "Count non-NULL values",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "email",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT COUNT(email) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1904,
                "text": "Percentage NULL",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COUNT",
                        "*",
                        "-",
                        "COUNT",
                        "email",
                        "*",
                        "100.0",
                        "/",
                        "COUNT",
                        "*",
                        "as",
                        "null_percentage",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT (COUNT(*) - COUNT(email)) * 100.0 / COUNT(*) as null_percentage FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1905,
                "text": "Group by NULL handling",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "COALESCE",
                        "city",
                        "'Unknown'",
                        "COUNT",
                        "*",
                        "FROM",
                        "users",
                        "GROUP",
                        "BY",
                        "COALESCE",
                        "city",
                        "'Unknown'"
                    ]
                },
                "hint": "Try using: SELECT COALESCE(city, 'Unknown'), COUNT(*) FROM users GROUP BY COALESCE(city, 'Unknown');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_group"
                ]
            },
            {
                "id": 1906,
                "text": "ORDER BY NULL handling",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "users",
                        "ORDER",
                        "BY",
                        "ISNULL",
                        "email",
                        "email"
                    ]
                },
                "hint": "Try using: SELECT * FROM users ORDER BY ISNULL(email), email;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_order"
                ]
            },
            {
                "id": 1907,
                "text": "Update NULL to value",
                "expectedPattern": {
                    "structures": [
                        "UPDATE",
                        "users",
                        "SET",
                        "email",
                        "=",
                        "'unknown@example.com'",
                        "WHERE",
                        "email",
                        "IS",
                        "NULL"
                    ]
                },
                "hint": "Try using: UPDATE users SET email = 'unknown@example.com' WHERE email IS NULL;",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where",
                    "sql_update"
                ]
            },
            {
                "id": 1908,
                "text": "Case when NULL",
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
                        "'Missing'",
                        "ELSE",
                        "'Present'",
                        "END",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT firstname, CASE WHEN email IS NULL THEN 'Missing' ELSE 'Present' END FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1909,
                "text": "Create JSON object",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_OBJECT",
                        "'name'",
                        "firstname",
                        "'age'",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT JSON_OBJECT('name', firstname, 'age', age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1910,
                "text": "Create JSON array",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_ARRAY",
                        "firstname",
                        "lastname",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT JSON_ARRAY(firstname, lastname, age) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1911,
                "text": "Extract JSON value",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_EXTRACT",
                        "'{\"name\":\"John\"}'",
                        "'$.name'"
                    ]
                },
                "hint": "Try using: SELECT JSON_EXTRACT('{\"name\":\"John\"}', '$.name');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1912,
                "text": "Extract with arrow operator",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "data->>'$.city'",
                        "FROM",
                        "user_data"
                    ]
                },
                "hint": "Try using: SELECT data->>'$.city' FROM user_data;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1913,
                "text": "JSON_CONTAINS check",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "*",
                        "FROM",
                        "products",
                        "WHERE",
                        "JSON_CONTAINS",
                        "tags",
                        "'\"electronics\"'"
                    ]
                },
                "hint": "Try using: SELECT * FROM products WHERE JSON_CONTAINS(tags, '\"electronics\"');",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 1914,
                "text": "JSON_LENGTH",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_LENGTH",
                        "'[\"a\"",
                        "\"b\"",
                        "\"c\"]'"
                    ]
                },
                "hint": "Try using: SELECT JSON_LENGTH('[\"a\",\"b\",\"c\"]');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1915,
                "text": "JSON_KEYS",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_KEYS",
                        "'{\"a\":1",
                        "\"b\":2}'"
                    ]
                },
                "hint": "Try using: SELECT JSON_KEYS('{\"a\":1,\"b\":2}');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1916,
                "text": "JSON_MERGE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_MERGE",
                        "'{\"a\":1}'",
                        "'{\"b\":2}'"
                    ]
                },
                "hint": "Try using: SELECT JSON_MERGE('{\"a\":1}', '{\"b\":2}');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1917,
                "text": "JSON_ARRAY_APPEND",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_ARRAY_APPEND",
                        "'[1",
                        "2]'",
                        "'$'",
                        "3"
                    ]
                },
                "hint": "Try using: SELECT JSON_ARRAY_APPEND('[1,2]', '$', 3);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1918,
                "text": "JSON_ARRAY_INSERT",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_ARRAY_INSERT",
                        "'[1",
                        "3]'",
                        "'$[1]'",
                        "2"
                    ]
                },
                "hint": "Try using: SELECT JSON_ARRAY_INSERT('[1,3]', '$[1]', 2);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1919,
                "text": "JSON_INSERT",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_INSERT",
                        "'{\"a\":1}'",
                        "'$.b'",
                        "2"
                    ]
                },
                "hint": "Try using: SELECT JSON_INSERT('{\"a\":1}', '$.b', 2);",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 1920,
                "text": "JSON_REPLACE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_REPLACE",
                        "'{\"a\":1}'",
                        "'$.a'",
                        "2"
                    ]
                },
                "hint": "Try using: SELECT JSON_REPLACE('{\"a\":1}', '$.a', 2);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1921,
                "text": "JSON_REMOVE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_REMOVE",
                        "'{\"a\":1",
                        "\"b\":2}'",
                        "'$.b'"
                    ]
                },
                "hint": "Try using: SELECT JSON_REMOVE('{\"a\":1,\"b\":2}', '$.b');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1922,
                "text": "JSON_SET",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_SET",
                        "'{\"a\":1}'",
                        "'$.a'",
                        "2",
                        "'$.b'",
                        "3"
                    ]
                },
                "hint": "Try using: SELECT JSON_SET('{\"a\":1}', '$.a', 2, '$.b', 3);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1923,
                "text": "JSON_SEARCH",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_SEARCH",
                        "'{\"a\":\"text\"}'",
                        "'one'",
                        "'text'"
                    ]
                },
                "hint": "Try using: SELECT JSON_SEARCH('{\"a\":\"text\"}', 'one', 'text');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1924,
                "text": "JSON_TYPE",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_TYPE",
                        "'{\"a\":1}'"
                    ]
                },
                "hint": "Try using: SELECT JSON_TYPE('{\"a\":1}');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1925,
                "text": "JSON_VALID check",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_VALID",
                        "'{\"a\":1}'"
                    ]
                },
                "hint": "Try using: SELECT JSON_VALID('{\"a\":1}');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1926,
                "text": "JSON table function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "jt.*",
                        "FROM",
                        "JSON_TABLE",
                        "'[{\"name\":\"John\"",
                        "\"age\":30}]'",
                        "'$[*]'",
                        "COLUMNS",
                        "name",
                        "VARCHAR",
                        "50",
                        "PATH",
                        "'$.name'",
                        "age",
                        "INT",
                        "PATH",
                        "'$.age'",
                        "AS",
                        "jt"
                    ]
                },
                "hint": "Try using: SELECT jt.* FROM JSON_TABLE('[{\"name\":\"John\",\"age\":30}]', '$[*]' COLUMNS (name VARCHAR(50) PATH '$.name', age INT PATH '$.age')) AS jt;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1927,
                "text": "JSON aggregation",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_ARRAYAGG",
                        "JSON_OBJECT",
                        "'name'",
                        "firstname",
                        "'age'",
                        "age",
                        "FROM",
                        "users"
                    ]
                },
                "hint": "Try using: SELECT JSON_ARRAYAGG(JSON_OBJECT('name', firstname, 'age', age)) FROM users;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1928,
                "text": "JSON pretty print",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "JSON_PRETTY",
                        "'{\"a\":1",
                        "\"b\":2}'"
                    ]
                },
                "hint": "Try using: SELECT JSON_PRETTY('{\"a\":1,\"b\":2}');",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1929,
                "text": "Generate UUID",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "UUID"
                    ]
                },
                "hint": "Try using: SELECT UUID();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 1930,
                "text": "Get row count after query",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "FOUND_ROWS"
                    ]
                },
                "hint": "Try using: SELECT FOUND_ROWS();",
                "allowedBlocks": [
                    "sql_select"
                ]
            }
        ]
    },
    {
        "id": 20,
        "title": "SQL Level 20",
        "type": "SQL",
        "questions": [
            {
                "id": 2001,
                "text": "Sleep function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "SLEEP",
                        "5"
                    ]
                },
                "hint": "Try using: SELECT SLEEP(5);",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 2002,
                "text": "Benchmark function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "BENCHMARK",
                        "1000000",
                        "MD5",
                        "'test'"
                    ]
                },
                "hint": "Try using: SELECT BENCHMARK(1000000, MD5('test'));",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 2003,
                "text": "Connection ID",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "CONNECTION_ID"
                    ]
                },
                "hint": "Try using: SELECT CONNECTION_ID();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 2004,
                "text": "Database version",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "VERSION"
                    ]
                },
                "hint": "Try using: SELECT VERSION();",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 2005,
                "text": "Last insert ID",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "LAST_INSERT_ID"
                    ]
                },
                "hint": "Try using: SELECT LAST_INSERT_ID();",
                "allowedBlocks": [
                    "sql_select",
                    "sql_insert"
                ]
            },
            {
                "id": 2006,
                "text": "Row number without window function",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "@rownum",
                        ":=",
                        "@rownum",
                        "+",
                        "1",
                        "as",
                        "row_num",
                        "firstname",
                        "FROM",
                        "users",
                        "SELECT",
                        "@rownum",
                        ":=",
                        "0",
                        "r"
                    ]
                },
                "hint": "Try using: SELECT @rownum := @rownum + 1 as row_num, firstname FROM users, (SELECT @rownum := 0) r;",
                "allowedBlocks": [
                    "sql_select"
                ]
            },
            {
                "id": 2007,
                "text": "Dynamic SQL with PREPARE",
                "expectedPattern": {
                    "structures": [
                        "PREPARE",
                        "stmt",
                        "FROM",
                        "'SELECT",
                        "*",
                        "FROM",
                        "users",
                        "WHERE",
                        "city",
                        "=",
                        "?'"
                    ]
                },
                "hint": "Try using: PREPARE stmt FROM 'SELECT * FROM users WHERE city = ?';",
                "allowedBlocks": [
                    "sql_select",
                    "sql_where"
                ]
            },
            {
                "id": 2008,
                "text": "Meta query information",
                "expectedPattern": {
                    "structures": [
                        "SELECT",
                        "@@max_allowed_packet",
                        "@@version",
                        "@@datadir"
                    ]
                },
                "hint": "Try using: SELECT @@max_allowed_packet, @@version, @@datadir;",
                "allowedBlocks": [
                    "sql_select"
                ]
            }
        ]
    }
];
