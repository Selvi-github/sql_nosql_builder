export const nosqlDefinitions = [
    // ========== NoSQL BLOCKS ==========
    {
        "type": "nosql_find",
        "message0": "db.%1.find( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{ age: { $gt: 18 } }" }
        ],
        "colour": 120,
        "tooltip": "Find documents in collection"
    },
    {
        "type": "nosql_insert",
        "message0": "db.%1.insert( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "DOCUMENT", "text": "{ name: 'John', age: 25 }" }
        ],
        "colour": 120,
        "tooltip": "Insert document into collection"
    },
    {
        "type": "nosql_update",
        "message0": "db.%1.update( %2 , %3 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{ name: 'John' }" },
            { "type": "field_input", "name": "UPDATE", "text": "{ $set: { age: 26 } }" }
        ],
        "colour": 120,
        "tooltip": "Update documents in collection"
    },
    {
        "type": "nosql_delete",
        "message0": "db.%1.remove( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{ name: 'John' }" }
        ],
        "colour": 120,
        "tooltip": "Remove documents from collection"
    },
    {
        "type": "nosql_aggregate",
        "message0": "db.%1.aggregate( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "PIPELINE", "text": "[ { $group: { _id: '$city', total: { $sum: 1 } } } ]" }
        ],
        "colour": 120,
        "tooltip": "Aggregate pipeline on collection"
    },
    {
        "type": "nosql_sort",
        "message0": "db.%1.find().sort( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "SORT", "text": "{ age: 1 }" }
        ],
        "colour": 120,
        "tooltip": "Sort documents"
    },
    {
        "type": "nosql_project",
        "message0": "db.%1.find( %2 , %3 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{}" },
            { "type": "field_input", "name": "PROJECTION", "text": "{ name: 1, age: 1 }" }
        ],
        "colour": 120,
        "tooltip": "Find with projection"
    },
    // NEW NoSQL BLOCKS
    {
        "type": "nosql_comparison",
        "message0": "db.%1.find({ %2: { %3: %4 } })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "FIELD", "text": "age" },
            {
                "type": "field_dropdown", "name": "OPERATOR", "options": [
                    ["$gt", "$gt"], ["$gte", "$gte"], ["$lt", "$lt"], ["$lte", "$lte"],
                    ["$ne", "$ne"], ["$in", "$in"], ["$nin", "$nin"], ["$all", "$all"], ["$size", "$size"]
                ]
            },
            { "type": "field_input", "name": "VALUE", "text": "25" }
        ],
        "colour": 120,
        "tooltip": "Comparison and array operators"
    },
    {
        "type": "nosql_logical",
        "message0": "db.%1.find({ %2: [ %3 ] })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_dropdown", "name": "OPERATOR", "options": [["$and", "$and"], ["$or", "$or"], ["$not", "$not"], ["$nor", "$nor"]] },
            { "type": "field_input", "name": "CONDITIONS", "text": "{ age: { $gt: 25 } }, { city: 'New York' }" }
        ],
        "colour": 120,
        "tooltip": "Logical query operators"
    },
    {
        "type": "nosql_element",
        "message0": "db.%1.find({ %2: { %3: %4 } })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "FIELD", "text": "email" },
            { "type": "field_dropdown", "name": "OPERATOR", "options": [["$exists", "$exists"], ["$type", "$type"], ["$regex", "$regex"]] },
            { "type": "field_input", "name": "VALUE", "text": "true" }
        ],
        "colour": 120,
        "tooltip": "Element and regex operators"
    },
    {
        "type": "nosql_regex",
        "message0": "db.%1.find({ %2: { $regex: /%3/%4 } })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "FIELD", "text": "city" },
            { "type": "field_input", "name": "PATTERN", "text": "^M" },
            { "type": "field_input", "name": "OPTIONS", "text": "i" }
        ],
        "colour": 120,
        "tooltip": "Specialized regex search"
    },
    {
        "type": "nosql_modulo",
        "message0": "db.%1.find({ %2: { $mod: [%3, %4] } })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "FIELD", "text": "age" },
            { "type": "field_number", "name": "DIVISOR", "value": 2 },
            { "type": "field_number", "name": "REMAINDER", "value": 0 }
        ],
        "colour": 120,
        "tooltip": "Modulo operator"
    },
    {
        "type": "nosql_expression",
        "message0": "db.%1.find({ $expr: { %2: [ %3, %4 ] } })",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            {
                "type": "field_dropdown",
                "name": "OP",
                "options": [
                    ["$gt", "$gt"], ["$lt", "$lt"], ["$gte", "$gte"], ["$lte", "$lte"],
                    ["$eq", "$eq"], ["$ne", "$ne"]
                ]
            },
            { "type": "input_value", "name": "LEFT" },
            { "type": "input_value", "name": "RIGHT" }
        ],
        "colour": 120,
        "tooltip": "Expression operator (compares two values)"
    },
    {
        "type": "nosql_field_reference",
        "message0": "$%1",
        "args0": [
            { "type": "field_input", "name": "FIELD", "text": "field" }
        ],
        "output": "String",
        "colour": 60,
        "tooltip": "Reference a field (e.g. $salary)"
    },
    {
        "type": "nosql_expr_arithmetic",
        "message0": "{ %1: [ %2, %3 ] }",
        "args0": [
            {
                "type": "field_dropdown", "name": "OP", "options": [
                    ["$multiply", "$multiply"], ["$divide", "$divide"], ["$add", "$add"], ["$subtract", "$subtract"]
                ]
            },
            { "type": "input_value", "name": "A" },
            { "type": "input_value", "name": "B" }
        ],
        "output": "String",
        "colour": 100,
        "tooltip": "Arithmetic operators"
    },
    {
        "type": "nosql_expr_size",
        "message0": "{ $size: %1 }",
        "args0": [
            { "type": "input_value", "name": "FIELD" }
        ],
        "output": "String",
        "colour": 100,
        "tooltip": "Size of array or string"
    },
    {
        "type": "nosql_expr_strlen",
        "message0": "{ $strLenCP: %1 }",
        "args0": [
            { "type": "input_value", "name": "FIELD" }
        ],
        "output": "String",
        "colour": 100,
        "tooltip": "String length"
    },
    {
        "type": "nosql_number",
        "message0": "%1",
        "args0": [{ "type": "field_number", "name": "VAL", "value": 0 }],
        "output": "Number",
        "colour": 230,
        "tooltip": "Number value"
    },
    {
        "type": "nosql_string",
        "message0": "'%1'",
        "args0": [{ "type": "field_input", "name": "VAL", "text": "value" }],
        "output": "String",
        "colour": 160,
        "tooltip": "String value"
    },
    {
        "type": "nosql_limit",
        "message0": "db.%1.find().limit( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "LIMIT", "text": "10" }
        ],
        "colour": 120,
        "tooltip": "Limit results"
    },
    {
        "type": "nosql_skip",
        "message0": "db.%1.find().skip( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "SKIP", "text": "5" }
        ],
        "colour": 110,
        "tooltip": "Skip documents"
    },
    {
        "type": "nosql_find_skip_limit",
        "message0": "db.%1.find().skip( %2 ).limit( %3 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "SKIP", "text": "5" },
            { "type": "field_input", "name": "LIMIT", "text": "5" }
        ],
        "colour": 110,
        "tooltip": "Skip and Limit results"
    },
    {
        "type": "nosql_count",
        "message0": "db.%1.find().count()",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" }
        ],
        "colour": 120,
        "tooltip": "Count documents"
    },
    {
        "type": "nosql_count_documents",
        "message0": "db.%1.countDocuments( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{ isActive: true }" }
        ],
        "colour": 120,
        "tooltip": "Count documents matching query"
    },
    {
        "type": "nosql_distinct",
        "message0": "db.%1.distinct( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "FIELD", "text": "city" }
        ],
        "colour": 120,
        "tooltip": "Get distinct values"
    },
    {
        "type": "nosql_find_one",
        "message0": "db.%1.findOne( %2 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            { "type": "field_input", "name": "QUERY", "text": "{ name: 'John' }" }
        ],
        "colour": 120,
        "tooltip": "Find single document"
    },
    {
        "type": "nosql_index",
        "message0": "db.%1.%2( %3 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            {
                "type": "field_dropdown", "name": "OPERATION", "options": [
                    ["createIndex", "createIndex"],
                    ["dropIndex", "dropIndex"],
                    ["getIndexes", "getIndexes"]
                ]
            },
            { "type": "field_input", "name": "PARAMS", "text": "{ email: 1 }" }
        ],
        "colour": 100,
        "tooltip": "Index operations"
    },
    {
        "type": "nosql_admin",
        "message0": "db.%1.%2( %3 )",
        "args0": [
            { "type": "field_input", "name": "COLLECTION", "text": "users" },
            {
                "type": "field_dropdown", "name": "OPERATION", "options": [
                    ["stats", "stats"],
                    ["drop", "drop"],
                    ["renameCollection", "renameCollection"]
                ]
            },
            { "type": "field_input", "name": "PARAMS", "text": "" }
        ],
        "colour": 90,
        "tooltip": "Collection admin operations"
    },
    {
        "type": "nosql_db_admin",
        "message0": "db.%1( %2 )",
        "args0": [
            {
                "type": "field_dropdown", "name": "OPERATION", "options": [
                    ["createCollection", "createCollection"],
                    ["dropDatabase", "dropDatabase"],
                    ["getCollectionNames", "getCollectionNames"]
                ]
            },
            { "type": "field_input", "name": "PARAMS", "text": "'newCollection'" }
        ],
        "colour": 85,
        "tooltip": "Database admin operations"
    }
];
