export const nosqlGenerators = (javascriptGenerator) => ({
    // NoSQL Generators
    'nosql_find': (block) => `db.${block.getFieldValue('COLLECTION')}.find(${block.getFieldValue('QUERY')})`,
    'nosql_insert': (block) => `db.${block.getFieldValue('COLLECTION')}.insert(${block.getFieldValue('DOCUMENT')})`,
    'nosql_update': (block) => `db.${block.getFieldValue('COLLECTION')}.update(${block.getFieldValue('QUERY')}, ${block.getFieldValue('UPDATE')})`,
    'nosql_delete': (block) => `db.${block.getFieldValue('COLLECTION')}.remove(${block.getFieldValue('QUERY')})`,
    'nosql_aggregate': (block) => `db.${block.getFieldValue('COLLECTION')}.aggregate(${block.getFieldValue('PIPELINE')})`,
    'nosql_sort': (block) => `db.${block.getFieldValue('COLLECTION')}.find().sort(${block.getFieldValue('SORT')})`,
    'nosql_project': (block) => `db.${block.getFieldValue('COLLECTION')}.find(${block.getFieldValue('QUERY')}, ${block.getFieldValue('PROJECTION')})`,

    // NEW NoSQL Generators
    'nosql_comparison': (block) => `db.${block.getFieldValue('COLLECTION')}.find({ ${block.getFieldValue('FIELD')}: { ${block.getFieldValue('OPERATOR')}: ${block.getFieldValue('VALUE')} } })`,
    'nosql_logical': (block) => `db.${block.getFieldValue('COLLECTION')}.find({ ${block.getFieldValue('OPERATOR')}: [ ${block.getFieldValue('CONDITIONS')} ] })`,
    'nosql_element': (block) => `db.${block.getFieldValue('COLLECTION')}.find({ ${block.getFieldValue('FIELD')}: { ${block.getFieldValue('OPERATOR')}: ${block.getFieldValue('VALUE')} } })`,
    'nosql_regex': (block) => `db.${block.getFieldValue('COLLECTION')}.find({ ${block.getFieldValue('FIELD')}: { $regex: /${block.getFieldValue('PATTERN')}/${block.getFieldValue('OPTIONS')} } })`,
    'nosql_modulo': (block) => `db.${block.getFieldValue('COLLECTION')}.find({ ${block.getFieldValue('FIELD')}: { $mod: [${block.getFieldValue('DIVISOR')}, ${block.getFieldValue('REMAINDER')}] } })`,
    'nosql_expression': (block) => {
        const collection = block.getFieldValue('COLLECTION');
        const op = block.getFieldValue('OP');
        const left = javascriptGenerator.valueToCode(block, 'LEFT', javascriptGenerator.ORDER_ATOMIC) || '0';
        const right = javascriptGenerator.valueToCode(block, 'RIGHT', javascriptGenerator.ORDER_ATOMIC) || '0';
        return `db.${collection}.find({ $expr: { ${op}: [ ${left}, ${right} ] } })`;
    },
    'nosql_field_reference': (block) => [`"$${block.getFieldValue('FIELD')}"`, javascriptGenerator.ORDER_ATOMIC],
    'nosql_expr_arithmetic': (block) => {
        const op = block.getFieldValue('OP');
        const a = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_ATOMIC) || '0';
        const b = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_ATOMIC) || '0';
        return [`{ ${op}: [ ${a}, ${b} ] }`, javascriptGenerator.ORDER_ATOMIC];
    },
    'nosql_expr_size': (block) => {
        const field = javascriptGenerator.valueToCode(block, 'FIELD', javascriptGenerator.ORDER_ATOMIC) || '""';
        return [`{ $size: ${field} }`, javascriptGenerator.ORDER_ATOMIC];
    },
    'nosql_expr_strlen': (block) => {
        const field = javascriptGenerator.valueToCode(block, 'FIELD', javascriptGenerator.ORDER_ATOMIC) || '""';
        return [`{ $strLenCP: ${field} }`, javascriptGenerator.ORDER_ATOMIC];
    },
    'nosql_number': (block) => [block.getFieldValue('VAL'), javascriptGenerator.ORDER_ATOMIC],
    'nosql_string': (block) => [`"${block.getFieldValue('VAL')}"`, javascriptGenerator.ORDER_ATOMIC],
    'nosql_limit': (block) => `db.${block.getFieldValue('COLLECTION')}.find().limit(${block.getFieldValue('LIMIT')})`,
    'nosql_skip': (block) => `db.${block.getFieldValue('COLLECTION')}.find().skip(${block.getFieldValue('SKIP')})`,
    'nosql_find_skip_limit': (block) => `db.${block.getFieldValue('COLLECTION')}.find().skip(${block.getFieldValue('SKIP')}).limit(${block.getFieldValue('LIMIT')})`,
    'nosql_count': (block) => `db.${block.getFieldValue('COLLECTION')}.find().count()`,
    'nosql_count_documents': (block) => `db.${block.getFieldValue('COLLECTION')}.countDocuments(${block.getFieldValue('QUERY')})`,
    'nosql_distinct': (block) => `db.${block.getFieldValue('COLLECTION')}.distinct(${block.getFieldValue('FIELD')})`,
    'nosql_find_one': (block) => `db.${block.getFieldValue('COLLECTION')}.findOne(${block.getFieldValue('QUERY')})`,
    'nosql_index': (block) => `db.${block.getFieldValue('COLLECTION')}.${block.getFieldValue('OPERATION')}(${block.getFieldValue('PARAMS')})`,
    'nosql_admin': (block) => {
        const params = block.getFieldValue('PARAMS');
        const operation = block.getFieldValue('OPERATION');
        if (params && params.trim()) {
            return `db.${block.getFieldValue('COLLECTION')}.${operation}(${params})`;
        }
        return `db.${block.getFieldValue('COLLECTION')}.${operation}()`;
    },
    'nosql_db_admin': (block) => {
        const params = block.getFieldValue('PARAMS');
        const operation = block.getFieldValue('OPERATION');
        if (params && params.trim()) {
            return `db.${operation}(${params})`;
        }
        return `db.${operation}()`;
    }
});
