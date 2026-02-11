import { levels } from '../src/data/sql/levels_generated.js';

const SQL_KEYWORDS = new Set([
  'select', 'from', 'where', 'group', 'by', 'order', 'having', 'limit', 'offset',
  'insert', 'into', 'values', 'update', 'set', 'delete',
  'join', 'inner', 'left', 'right', 'full', 'outer', 'cross', 'on', 'as',
  'and', 'or', 'not', 'in', 'between', 'is', 'null', 'like',
  'distinct', 'union', 'all', 'case', 'when', 'then', 'else', 'end',
  'create', 'table', 'alter', 'drop', 'view', 'procedure', 'function', 'trigger',
  'database', 'index', 'primary', 'key', 'foreign', 'references',
  'desc', 'asc', 'count', 'sum', 'avg', 'min', 'max',
  'over', 'partition', 'rows', 'range', 'preceding', 'following',
  'with', 'recursive', 'exists', 'if', 'begin', 'declare', 'return',
  'lock', 'tables', 'unlock', 'show', 'describe', 'explain'
]);

const SYSTEM_SCHEMAS = new Set([
  'information_schema',
  'mysql',
  'performance_schema',
  'sys'
]);

function normalizeIdent(identifier) {
  return String(identifier || '')
    .trim()
    .replace(/^`|`$/g, '')
    .replace(/^"|"$/g, '')
    .toLowerCase();
}

function isLikelyColumn(word) {
  if (!word) return false;
  const w = normalizeIdent(word);
  if (!w) return false;
  if (SQL_KEYWORDS.has(w)) return false;
  if (/^\d+$/.test(w)) return false;
  if (w === '*' || w === 'true' || w === 'false') return false;
  if (w.startsWith('@')) return false;
  return /^[a-z_][a-z0-9_]*$/.test(w);
}

function stripStringLiterals(sql) {
  // Replace '...' and "..." with spaces to avoid false identifier matches.
  return sql
    .replace(/'([^'\\]|\\.)*'/g, ' ')
    .replace(/"([^"\\]|\\.)*"/g, ' ');
}

function extractTablesAndAliases(sql) {
  const cleaned = stripStringLiterals(sql);
  const tableOrder = [];
  const aliasToTable = new Map();

  const tableRegex = /\b(from|join|update|into)\s+(`?)([a-zA-Z_][\w$]*)(?:\2)?(?:\s+(?:as\s+)?([a-zA-Z_][\w$]*))?/gi;
  let match;
  while ((match = tableRegex.exec(cleaned)) !== null) {
    const table = normalizeIdent(match[3]);
    const alias = normalizeIdent(match[4]);
    if (!table) continue;
    if (table.includes('.')) {
      const [schemaName, tableName] = table.split('.', 2);
      if (SYSTEM_SCHEMAS.has(schemaName)) continue;
      tableOrder.push(tableName);
      if (alias) aliasToTable.set(alias, tableName);
      continue;
    }
    if (SYSTEM_SCHEMAS.has(table)) continue;
    tableOrder.push(table);
    if (alias) aliasToTable.set(alias, table);
  }

  return { tableOrder, aliasToTable };
}

function ensureSet(map, key) {
  if (!map.has(key)) map.set(key, new Set());
  return map.get(key);
}

function addColumn(requirements, table, column) {
  const t = normalizeIdent(table);
  const c = normalizeIdent(column);
  if (!t || !c) return;
  if (SYSTEM_SCHEMAS.has(t)) return;
  if (!isLikelyColumn(c)) return;
  ensureSet(requirements, t).add(c);
}

function extractColumnsFromHint(sql, requirements) {
  const cleaned = stripStringLiterals(sql);
  const { tableOrder, aliasToTable } = extractTablesAndAliases(cleaned);

  // 1) Qualified identifiers: aliasOrTable.column
  const qualified = /\b([a-zA-Z_][\w$]*)\.([a-zA-Z_][\w$]*)\b/g;
  for (const m of cleaned.matchAll(qualified)) {
    const left = normalizeIdent(m[1]);
    const right = normalizeIdent(m[2]);
    const table = aliasToTable.get(left) || left;
    addColumn(requirements, table, right);
  }

  // 2) INSERT INTO t (a,b,c)
  const insertCols = /\binsert\s+into\s+(`?)([a-zA-Z_][\w$]*)(?:\1)?\s*\(([^)]*)\)/gi;
  let im;
  while ((im = insertCols.exec(cleaned)) !== null) {
    const table = normalizeIdent(im[2]);
    const list = im[3]
      .split(',')
      .map(s => normalizeIdent(s))
      .filter(isLikelyColumn);
    for (const col of list) addColumn(requirements, table, col);
  }

  // 3) UPDATE t SET a=..., b=...
  const updateSet = /\bupdate\s+(`?)([a-zA-Z_][\w$]*)(?:\1)?\s+set\s+([\s\S]*?)(?:\bwhere\b|;|$)/gi;
  let um;
  while ((um = updateSet.exec(cleaned)) !== null) {
    const table = normalizeIdent(um[2]);
    const assigns = um[3].split(',');
    for (const a of assigns) {
      const lhs = normalizeIdent(a.split('=')[0]);
      if (isLikelyColumn(lhs)) addColumn(requirements, table, lhs);
    }
  }

  // 4) Unqualified identifiers (best-effort): if exactly one user table referenced.
  const distinctTables = [...new Set(tableOrder.filter(Boolean))];
  if (distinctTables.length === 1) {
    const table = distinctTables[0];
    const clauses = cleaned
      .split(/\bfrom\b/i)[0] + ' ' + cleaned; // include SELECT list + rest

    for (const m of clauses.matchAll(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g)) {
      const word = normalizeIdent(m[1]);
      if (isLikelyColumn(word)) {
        // Avoid treating table name as a column.
        if (word !== table) addColumn(requirements, table, word);
      }
    }
  }
}

function extractFromExpectedStructures(structures, requirements) {
  if (!Array.isArray(structures)) return;

  // Track a current table when patterns include FROM <table>.
  let currentTable = null;
  for (let i = 0; i < structures.length; i++) {
    const token = String(structures[i] ?? '').trim();
    const upper = token.toUpperCase();

    if (upper === 'FROM' || upper === 'UPDATE' || upper === 'INTO' || upper === 'JOIN') {
      const next = structures[i + 1];
      const table = normalizeIdent(next);
      if (table && !SYSTEM_SCHEMAS.has(table)) {
        currentTable = table.includes('.') ? table.split('.', 2)[1] : table;
        ensureSet(requirements, currentTable);
      }
      continue;
    }

    // Capture qualified tokens like u.user_id / users.city
    if (token.includes('.')) {
      const [left, right] = token.split('.', 2);
      if (isLikelyColumn(right)) {
        addColumn(requirements, left, right);
      }
      continue;
    }

    // Capture plain column tokens when a table context exists.
    if (currentTable && isLikelyColumn(token)) {
      addColumn(requirements, currentTable, token);
    }
  }
}

export function getSqlSchemaRequirements() {
  if (getSqlSchemaRequirements._cache) return getSqlSchemaRequirements._cache;
  const requirements = new Map();

  for (const level of levels) {
    for (const q of level.questions || []) {
      const hint = String(q.hint || '');
      const sql = hint.replace(/^Try using:\s*/i, '').trim();
      if (sql) extractColumnsFromHint(sql, requirements);

      const structures = q?.expectedPattern?.structures;
      if (structures) extractFromExpectedStructures(structures, requirements);
    }
  }

  // Hard safety net for core learning tables.
  for (const t of ['users', 'orders', 'products', 'employees']) {
    ensureSet(requirements, t);
  }

  // Ensure the columns that are definitely used early on.
  for (const c of ['user_id', 'firstname', 'lastname', 'email', 'age', 'city', 'salary', 'gender', 'phone', 'created_at', 'name']) {
    addColumn(requirements, 'users', c);
  }
  for (const c of ['order_id', 'user_id', 'product_id', 'quantity', 'amount', 'order_date', 'created_at']) {
    addColumn(requirements, 'orders', c);
  }
  for (const c of ['product_id', 'product_name', 'price', 'category', 'in_stock', 'created_at']) {
    addColumn(requirements, 'products', c);
  }
  for (const c of ['id', 'first_name', 'last_name', 'department', 'salary', 'hire_date', 'created_at']) {
    addColumn(requirements, 'employees', c);
  }

  // Convert Map<str, Set<str>> to plain object.
  const out = {};
  for (const [table, cols] of requirements.entries()) {
    out[table] = [...cols].sort();
  }
  getSqlSchemaRequirements._cache = out;
  return out;
}

