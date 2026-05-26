import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSqlSchemaRequirements } from './sqlSchemaRequirements.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SQL_FREE_DB_PREFIX = process.env.SQL_FREE_DB_PREFIX || 'qa_free_';
const MONGO_FREE_DB_PREFIX = process.env.MONGO_FREE_DB_PREFIX || 'qa_free_';

const NO_SQL_SAMPLE_USERS = [
    {
        firstname: "Alice",
        lastname: "Johnson",
        name: "Alice",
        age: 25,
        skills: ["JS", "Python"],
        role: "Admin",
        city: "Mumbai",
        gender: "Female",
        email: "alice@example.com",
        phone: "9876543210",
        isActive: true,
        salary: 50000
    },
    {
        firstname: "Bob",
        lastname: "Smith",
        name: "Bob",
        age: 30,
        skills: ["Java"],
        role: "User",
        city: "Delhi",
        gender: "Male",
        email: "bob@example.com",
        phone: "9876543211",
        isActive: true,
        salary: 45000
    },
    {
        firstname: "Charlie",
        lastname: "Brown",
        name: "Charlie",
        age: 22,
        skills: ["Go", "Rust"],
        role: "User",
        city: "Bangalore",
        gender: "Male",
        email: "charlie@example.com",
        isActive: false,
        salary: 35000
    },
    {
        firstname: "Diana",
        lastname: "Prince",
        name: "Diana",
        age: 28,
        skills: ["Python", "R"],
        role: "Admin",
        city: "Chennai",
        gender: "Female",
        email: "diana@example.com",
        phone: "9876543213",
        isActive: true,
        salary: 60000
    },
    {
        firstname: "Eve",
        lastname: "Davis",
        name: "Eve",
        age: 35,
        skills: ["C++", "Rust"],
        role: "User",
        city: "Hyderabad",
        gender: "Female",
        isActive: true,
        salary: 55000
    },
    {
        firstname: "Frank",
        lastname: "Miller",
        name: "Frank",
        age: 19,
        skills: ["HTML", "CSS"],
        role: "User",
        city: "Pune",
        gender: "Male",
        email: "frank@example.com",
        phone: "9876543215",
        isActive: false,
        salary: 25000
    },
    {
        firstname: "Grace",
        lastname: "Lee",
        name: "Grace",
        age: 27,
        skills: ["Ruby", "Rails"],
        role: "Admin",
        city: "Mumbai",
        gender: "Female",
        email: "grace@example.com",
        isActive: true,
        salary: 48000
    },
    {
        firstname: "Henry",
        lastname: "Wilson",
        name: "Henry",
        age: 32,
        skills: ["PHP", "Laravel"],
        role: "User",
        city: "Delhi",
        gender: "Male",
        phone: "9876543217",
        isActive: true,
        salary: 42000
    },
    {
        firstname: "Ivy",
        lastname: "Taylor",
        name: "Ivy",
        age: 24,
        skills: ["Swift", "iOS"],
        role: "User",
        city: "Bangalore",
        gender: "Female",
        email: "ivy@example.com",
        isActive: false,
        salary: 38000
    },
    {
        firstname: "Jack",
        lastname: "Anderson",
        name: "Jack",
        age: 29,
        skills: ["Kotlin", "Android"],
        role: "Admin",
        city: "Chennai",
        gender: "Male",
        email: "jack@example.com",
        phone: "9876543219",
        isActive: true,
        salary: 52000
    }
];

export function getNoSqlSampleData() {
    return NO_SQL_SAMPLE_USERS.map(doc => ({ ...doc }));
}

function toSafeIdentifier(value) {
    const safe = String(value || '')
        .toLowerCase()
        .replace(/[^a-z0-9_]+/g, '_')
        .replace(/^_+|_+$/g, '');
    return safe || 'user';
}

function getFreeSqlDbName(userId) {
    return `${SQL_FREE_DB_PREFIX}${toSafeIdentifier(userId)}`;
}

function getFreeMongoDbName(userId) {
    return `${MONGO_FREE_DB_PREFIX}${toSafeIdentifier(userId)}`;
}

async function ensureDatabase(connection, dbName) {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    await connection.query(`USE \`${dbName}\``);
}

// --- CONFIGURATION ---
const CLOUD_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
};

// --- STATE ---
let sqlPool = null;
let mongoClient = null;
let mongoDb = null;
let activeSqlMode = 'NONE'; // 'CLOUD' or 'NONE'

// Dedupe concurrent ALTER/CREATE attempts.
const schemaRepairLocks = new Map();

// --- HELPERS ---
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function guessColumnType(columnName) {
    const c = String(columnName).toLowerCase();
    if (c.endsWith('_id') || c === 'id') return 'INT';
    if (c.includes('date') || c.endsWith('_at')) return 'DATETIME';
    if (c.includes('price') || c.includes('salary') || c.includes('amount')) return 'DECIMAL(10,2)';
    if (c.startsWith('is_') || c.startsWith('has_') || c === 'in_stock' || c.endsWith('_flag')) return 'BOOLEAN';
    if (c.includes('email')) return 'VARCHAR(100)';
    if (c.includes('phone')) return 'VARCHAR(20)';
    if (c.includes('city') || c.includes('country') || c.includes('state')) return 'VARCHAR(50)';
    if (c.includes('name') || c.includes('department') || c.includes('category')) return 'VARCHAR(200)';
    return 'VARCHAR(255)';
}

async function getActiveDbName(connection) {
    let dbName = CLOUD_CONFIG.database;
    try {
        const [rows] = await connection.query('SELECT DATABASE() AS db');
        const activeDb = rows && rows[0] && rows[0].db;
        if (activeDb) dbName = activeDb;
    } catch {
        // ignore
    }
    return dbName;
}

function parseTablesFromQuery(query) {
    const sql = String(query || '');
    const aliasToTable = new Map();

    // Capture FROM/JOIN table + optional alias.
    // Examples:
    // FROM users u
    // FROM `users` AS u
    // JOIN orders o
    const re = /\b(?:from|join)\s+`?([a-zA-Z0-9_]+)`?(?:\s+(?:as\s+)?([a-zA-Z0-9_]+))?/gi;
    let match;
    while ((match = re.exec(sql))) {
        const table = match[1];
        const alias = match[2];
        if (alias) aliasToTable.set(alias, table);
        // Also map the table name to itself for convenience.
        aliasToTable.set(table, table);
    }

    // First FROM table is the default target if we can't disambiguate.
    const fromMatch = /\bfrom\s+`?([a-zA-Z0-9_]+)`?/i.exec(sql);
    const firstTable = fromMatch ? fromMatch[1] : null;

    // Also capture comma-separated tables in FROM clause: FROM a x, b y, c
    try {
        const fromClauseMatch = /\bfrom\s+([\s\S]+?)(?=\bwhere\b|\bgroup\b|\border\b|\blimit\b|;|$)/i.exec(sql);
        if (fromClauseMatch && fromClauseMatch[1]) {
            const fromClause = fromClauseMatch[1];
            const parts = fromClause.split(',').map(p => p.trim()).filter(Boolean);
            for (const part of parts) {
                // Remove any JOIN tail if present in the same segment.
                const cleaned = part.replace(/\b(inner|left|right|cross)?\s*join\b[\s\S]*$/i, '').trim();
                const m = /^`?([a-zA-Z0-9_]+)`?(?:\s+(?:as\s+)?([a-zA-Z0-9_]+))?/i.exec(cleaned);
                if (!m) continue;
                const table = m[1];
                const alias = m[2];
                if (alias) aliasToTable.set(alias, table);
                aliasToTable.set(table, table);
            }
        }
    } catch {
        // ignore
    }

    return { aliasToTable, firstTable };
}

async function withSchemaRepairLock(key, fn) {
    const k = String(key);
    const existing = schemaRepairLocks.get(k);
    if (existing) return existing;
    const p = (async () => {
        try {
            return await fn();
        } finally {
            schemaRepairLocks.delete(k);
        }
    })();
    schemaRepairLocks.set(k, p);
    return p;
}

async function tableExists(connection, dbName, tableName) {
    const [rows] = await connection.query(
        `SELECT 1 as ok FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1`,
        [dbName, tableName]
    );
    return rows.length > 0;
}

async function indexExists(connection, dbName, tableName, indexName) {
    const [rows] = await connection.query(
        `SELECT 1 as ok FROM information_schema.statistics WHERE table_schema = ? AND table_name = ? AND index_name = ? LIMIT 1`,
        [dbName, tableName, indexName]
    );
    return rows.length > 0;
}

async function createIndexIfMissing(connection, dbName, tableName, indexName, columnName) {
    if (!(await tableExists(connection, dbName, tableName))) return false;
    if (!(await columnExists(connection, dbName, tableName, columnName))) return false;
    if (await indexExists(connection, dbName, tableName, indexName)) return false;
    await connection.query(`CREATE INDEX \`${indexName}\` ON \`${tableName}\` (\`${columnName}\`)`);
    return true;
}

async function columnExists(connection, dbName, tableName, columnName) {
    const [rows] = await connection.query(
        `SELECT 1 as ok FROM information_schema.columns WHERE table_schema = ? AND table_name = ? AND column_name = ? LIMIT 1`,
        [dbName, tableName, columnName]
    );
    return rows.length > 0;
}

async function createMinimalTable(connection, tableName) {
    // Minimal table that won't break many SELECTs; columns can be added on-demand.
    await connection.query(
        `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\`id\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY)`
    );
}

async function addColumnIfMissing(connection, dbName, tableName, columnName) {
    const col = String(columnName);
    const tbl = String(tableName);
    const lockKey = `addcol:${dbName}:${tbl}:${col}`;
    return withSchemaRepairLock(lockKey, async () => {
        if (!(await tableExists(connection, dbName, tbl))) {
            await createMinimalTable(connection, tbl);
        }
        if (await columnExists(connection, dbName, tbl, col)) return false;

        const guessed = guessColumnType(col);
        const primaryType = col === 'created_at'
            ? 'TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP'
            : `${guessed} NULL`;

        try {
            await connection.query(`ALTER TABLE \`${tbl}\` ADD COLUMN \`${col}\` ${primaryType}`);
        } catch (err) {
            const msg = err && err.message ? String(err.message) : '';
            const isRowSize = /Row size too large/i.test(msg);
            const isVarchar = /^varchar\b/i.test(String(guessed));
            if (isRowSize && isVarchar) {
                // TEXT columns are stored off-page and avoid hitting row-size limits.
                await connection.query(`ALTER TABLE \`${tbl}\` ADD COLUMN \`${col}\` TEXT NULL`);
            } else {
                throw err;
            }
        }
        return true;
    });
}

function extractUnknownColumnName(errMessage) {
    const msg = String(errMessage || '');
    const m = /Unknown column '([^']+)'/i.exec(msg);
    if (!m) return null;
    return m[1];
}

function extractMissingTableName(errMessage) {
    const msg = String(errMessage || '');
    const m = /Table '([^']+)' doesn't exist/i.exec(msg);
    if (!m) return null;
    const full = m[1];
    const parts = full.split('.');
    return parts[parts.length - 1] || null;
}

async function repairSchemaFromExecutionError(connection, query, error) {
    if (!error || !error.code) return false;

    const dbName = await getActiveDbName(connection);
    if (!dbName) return false;
    await connection.query(`USE \`${dbName}\``);

    if (error.code === 'ER_BAD_FIELD_ERROR') {
        const raw = extractUnknownColumnName(error.message);
        if (!raw) return false;

        // raw might be "city" or "u.city".
        const rawStr = String(raw);
        const parts = rawStr.split('.');
        const maybeAlias = parts.length > 1 ? parts[0] : null;
        const columnName = parts.length > 1 ? parts.slice(1).join('.') : rawStr;

        const { aliasToTable, firstTable } = parseTablesFromQuery(query);
        const tableName = maybeAlias
            ? (aliasToTable.get(maybeAlias) || aliasToTable.get(maybeAlias.replace(/`/g, '')) || firstTable)
            : firstTable;

        if (!tableName) return false;

        const changed = await addColumnIfMissing(connection, dbName, tableName, columnName);
        if (changed) console.log(`🩹 [DB] Added missing column ${tableName}.${columnName}`);
        return changed;
    }

    if (error.code === 'ER_NO_SUCH_TABLE') {
        const tableName = extractMissingTableName(error.message);
        if (!tableName) return false;
        const lockKey = `createtbl:${dbName}:${tableName}`;
        return withSchemaRepairLock(lockKey, async () => {
            if (await tableExists(connection, dbName, tableName)) return false;
            await createMinimalTable(connection, tableName);
            console.log(`🩹 [DB] Created missing table ${tableName}`);
            return true;
        });
    }

    return false;
}

async function ensureCloudSchema(connection) {
    const requirements = getSqlSchemaRequirements();
    let dbName = CLOUD_CONFIG.database;

    // In hosted environments, MYSQL_DB may be missing/mismatched.
    // Prefer the DB actually selected on the connection.
    try {
        const [rows] = await connection.query('SELECT DATABASE() AS db');
        const activeDb = rows && rows[0] && rows[0].db;
        if (activeDb) dbName = activeDb;
    } catch {
        // ignore
    }

    if (!dbName) {
        throw new Error('Cloud SQL schema guard failed: no database selected (set MYSQL_DB).');
    }

    // Ensure the intended DB is active for CREATE/ALTER statements.
    await connection.query(`USE \`${dbName}\``);

    // Log only once per process to avoid noisy output.
    if (!ensureCloudSchema._logged) {
        ensureCloudSchema._logged = true;
        console.log(`🧩 [DB] Schema guard active on DB: ${dbName}`);
        console.log(`🧩 [DB] Schema guard tables: ${Object.keys(requirements).length}`);
    }

    const getExistingColumns = async (tableName) => {
        const [rows] = await connection.query(
            `SELECT COLUMN_NAME FROM information_schema.columns WHERE table_schema = ? AND table_name = ?`,
            [dbName, tableName]
        );
        return new Set(rows.map(r => String(r.COLUMN_NAME).toLowerCase()));
    };

    const tableExists = async (tableName) => {
        const [rows] = await connection.query(
            `SELECT 1 as ok FROM information_schema.tables WHERE table_schema = ? AND table_name = ? LIMIT 1`,
            [dbName, tableName]
        );
        return rows.length > 0;
    };

    const createTable = async (tableName, columns) => {
        const cols = new Set(columns.map(c => String(c).toLowerCase()));
        let pk = null;
        // Prefer common PK names if present in requirements.
        if (cols.has(`${tableName}_id`)) pk = `${tableName}_id`;
        else if (cols.has('user_id') && tableName === 'users') pk = 'user_id';
        else if (cols.has('order_id') && tableName === 'orders') pk = 'order_id';
        else if (cols.has('product_id') && tableName === 'products') pk = 'product_id';
        else if (cols.has('id')) pk = 'id';
        else pk = 'id';

        const defs = [];
        defs.push(`\`${pk}\` INT NOT NULL AUTO_INCREMENT PRIMARY KEY`);

        for (const col of cols) {
            if (col === pk) continue;
            const type = guessColumnType(col);
            if (col === 'created_at') {
                defs.push(`\`${col}\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP`);
            } else {
                defs.push(`\`${col}\` ${type} NULL`);
            }
        }

        await connection.query(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n  ${defs.join(',\n  ')}\n)`);
    };

    const ensureColumns = async (tableName, requiredColumns) => {
        const existing = await getExistingColumns(tableName);
        for (const col of requiredColumns) {
            const lc = String(col).toLowerCase();
            if (existing.has(lc)) continue;
            if (lc === 'created_at') {
                await connection.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${lc}\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP`);
            } else {
                await connection.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${lc}\` ${guessColumnType(lc)} NULL`);
            }
        }
    };

    for (const [tableName, columns] of Object.entries(requirements)) {
        // Skip system schemas just in case.
        if (!tableName || tableName.includes('.')) continue;

        if (!(await tableExists(tableName))) {
            await createTable(tableName, columns);
        }
        await ensureColumns(tableName, columns);
    }
}

async function ensureSqlIndexes(connection) {
    if (ensureSqlIndexes._done) return;
    const dbName = await getActiveDbName(connection);
    if (!dbName) return;

    await createIndexIfMissing(connection, dbName, 'users', 'idx_users_department_section', 'department_section');
    await createIndexIfMissing(connection, dbName, 'users', 'idx_users_student_id', 'student_id');
    await createIndexIfMissing(connection, dbName, 'users', 'idx_users_marks', 'marks');
    await createIndexIfMissing(connection, dbName, 'students', 'idx_students_department_section', 'department_section');
    await createIndexIfMissing(connection, dbName, 'students', 'idx_students_student_id', 'student_id');
    await createIndexIfMissing(connection, dbName, 'students', 'idx_students_marks', 'marks');

    ensureSqlIndexes._done = true;
}

// --- SQL INITIALIZATION ---
export async function initSql() {
    console.log('🔄 [DB] Initializing SQL (Cloud Only)...');

    if (!CLOUD_CONFIG.host) {
        console.warn("⚠️ MYSQL_HOST is missing. Running without Cloud SQL.");
        activeSqlMode = 'NONE';
        return { success: false, mode: 'NONE', error: 'Missing Host' };
    }

    const MAX_RETRIES = 3;
    let attempt = 0;

    while (attempt < MAX_RETRIES) {
        attempt++;
        try {
            console.log(`📡 [DB] Attempting Cloud SQL (${CLOUD_CONFIG.host}) - Attempt ${attempt}/${MAX_RETRIES}...`);

            // Create pool if not exists
            if (!sqlPool) {
                sqlPool = mysql.createPool(CLOUD_CONFIG);
            }

            // Test connection
            const conn = await sqlPool.getConnection();

            // Optional: full schema-guard is expensive and can exceed MySQL row-size limits
            // if it tries to create very wide tables. Default off; we rely on per-query auto-heal.
            try {
                if (process.env.SQL_SCHEMA_GUARD === 'true') {
                    console.log('🧩 [DB] Ensuring Cloud SQL schema (SQL_SCHEMA_GUARD=true)...');
                    await ensureCloudSchema(conn);
                    console.log('✅ [DB] Cloud SQL schema OK');
                }
                await ensureSqlIndexes(conn);
            } finally {
                conn.release();
            }

            activeSqlMode = 'CLOUD';
            console.log('✅ [DB] Connected to CLOUD SQL');
            return { success: true, mode: 'CLOUD' };
        } catch (e) {
            console.error(`❌ [DB] Cloud SQL attempt ${attempt} failed: ${e.message}`);

            if (attempt < MAX_RETRIES) {
                const delay = attempt * 1000;
                console.log(`🕒 [DB] Retrying in ${delay / 1000}s...`);
                await wait(delay);
            } else {
                console.error('🛑 [DB] All Cloud SQL connection attempts failed.');
                activeSqlMode = 'NONE';
                // For a product ready system, we don't throw; we set mode to NONE so the rest of the app can start
                return { success: false, mode: 'NONE', error: e.message };
            }
        }
    }
}

// --- SQL EXECUTION ---
export async function executeSql(query, options = {}) {
    if (!activeSqlMode || activeSqlMode === 'NONE') {
        await initSql();
    }

    const mode = String(options.mode || '').toUpperCase();
    const userId = options.userId ? String(options.userId) : '';
    const isFreeMode = mode === 'FREE' && userId;

    if (activeSqlMode === 'CLOUD') {
        let connection;
        try {
            connection = await sqlPool.getConnection();
            let targetDb = CLOUD_CONFIG.database;
            if (!targetDb) {
                targetDb = await getActiveDbName(connection);
            }

            if (isFreeMode) {
                const freeDb = getFreeSqlDbName(userId);
                try {
                    await ensureDatabase(connection, freeDb);
                    targetDb = freeDb;
                } catch (err) {
                    // Fall back to shared DB if CREATE DATABASE is not permitted.
                    const msg = err && err.message ? String(err.message) : 'unknown error';
                    console.warn(`⚠️ [DB] Free-mode DB creation failed (${freeDb}): ${msg}`);
                }
            }

            if (targetDb) {
                await connection.query(`USE \`${targetDb}\``);
            }

            const [results] = await connection.query(query);
            return transformSqlResults(results);
        } catch (e) {
            // Auto-heal schema drift on common learning errors.
            if (e && (e.code === 'ER_BAD_FIELD_ERROR' || e.code === 'ER_NO_SUCH_TABLE')) {
                try {
                    console.warn(`⚠️ [DB] Schema error (${e.code}). Attempting schema repair and retry...`);
                    if (!connection) connection = await sqlPool.getConnection();

                    // Iteratively repair chained schema errors (max attempts) and retry.
                    let lastErr = e;
                    for (let attempt = 0; attempt < 8; attempt++) {
                        const repaired = await repairSchemaFromExecutionError(connection, query, lastErr);
                        if (!repaired) break;
                        try {
                            const [results] = await connection.query(query);
                            return transformSqlResults(results);
                        } catch (nextErr) {
                            if (nextErr && (nextErr.code === 'ER_BAD_FIELD_ERROR' || nextErr.code === 'ER_NO_SUCH_TABLE')) {
                                lastErr = nextErr;
                                continue;
                            }
                            throw nextErr;
                        }
                    }

                    // Optional fallback: full schema-guard for all levels (off by default).
                    if (process.env.SQL_SCHEMA_GUARD === 'true') {
                        await ensureCloudSchema(connection);
                        const [results] = await connection.query(query);
                        return transformSqlResults(results);
                    }
                } catch (repairErr) {
                    console.warn(`⚠️ [DB] Schema repair failed: ${repairErr && repairErr.message ? repairErr.message : String(repairErr)}`);
                    // If we repaired schema and then hit a different non-schema error,
                    // return that error to the caller (more accurate than the original).
                    if (repairErr && repairErr.code && repairErr.code !== e.code) {
                        throw repairErr;
                    }
                    // Otherwise fall through to normal error handling.
                }
            }
            // Auto-heal: If connection is lost, try to re-init
            if (e.code === 'PROTOCOL_CONNECTION_LOST' ||
                e.code === 'ECONNREFUSED' ||
                e.code === 'ECONNRESET' ||
                e.fatal) {
                console.warn(`⚠️ [DB] Connection lost (${e.code}), re-initializing...`);
                await initSql();
                if (activeSqlMode === 'CLOUD') {
                    connection = await sqlPool.getConnection();
                    const [results] = await connection.query(query);
                    return transformSqlResults(results);
                }
            }
            throw e;
        } finally {
            if (connection) connection.release();
        }
    }

    throw new Error(`Database not initialized or in an invalid state: ${activeSqlMode}`);
}

// --- USER MANAGEMENT (MONGODB) ---
export async function findOrCreateUser(username, email) {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    let user = await users.findOne({ email });

    if (!user) {
        user = {
            username,
            email,
            role: 'STUDENT',
            department_section: 'CSE-A',
            roll_number: null,
            student_id: null,
            metrics: {
                marks: 0,
                attendance: 0
            },
            sqlProgress: {
                completedLevels: [],
                completedQuestions: []
            },
            nosqlProgress: {
                completedLevels: [],
                completedQuestions: []
            },
            createdAt: new Date()
        };
        const res = await users.insertOne(user);
        user._id = res.insertedId;
    }

    return ensureUserDefaults(user);
}

async function ensureUserIndexes() {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    await users.createIndex({ department_section: 1 });
    await users.createIndex({ roll_number: 1 }, { sparse: true });
    await users.createIndex({ student_id: 1 }, { sparse: true });
    await users.createIndex({ 'metrics.marks': -1 });
    await users.createIndex({ role: 1 });
}

async function ensureUserDefaults(user) {
    if (!user || !user._id) return user;
    const updates = {};
    const metrics = { ...(user.metrics || {}) };

    if (!user.role) updates.role = 'STUDENT';
    if (!user.department_section) {
        updates.department_section = 'CSE-A';
    } else {
        const normalizedSection = String(user.department_section).toUpperCase();
        if (normalizedSection !== user.department_section) updates.department_section = normalizedSection;
    }
    if (user.roll_number === undefined) updates.roll_number = null;
    if (user.student_id === undefined) updates.student_id = String(user._id);

    if (typeof metrics.marks !== 'number') metrics.marks = 0;
    if (typeof metrics.attendance !== 'number') metrics.attendance = 0;
    if (!user.metrics || metrics.marks !== user.metrics.marks || metrics.attendance !== user.metrics.attendance) {
        updates.metrics = metrics;
    }

    if (Object.keys(updates).length > 0) {
        const users = mongoDb.collection('users');
        await users.updateOne({ _id: user._id }, { $set: updates });
        return { ...user, ...updates, metrics: { ...metrics } };
    }
    return user;
}

export async function findUserByEmail(email) {
    if (!mongoDb) await initMongo();
    const users = mongoDb.collection('users');
    const user = await users.findOne({ email });
    return ensureUserDefaults(user);
}

export async function getUserById(id) {
    if (!mongoDb) await initMongo();
    const users = mongoDb.collection('users');
    const user = await users.findOne({ _id: id });
    return ensureUserDefaults(user);
}

export async function createUser({ username, email, passwordHash, role, department_section, roll_number, student_id, metrics }) {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    const existing = await users.findOne({ email });
    if (existing) return null;

    const user = {
        username,
        email,
        passwordHash,
        role: role || 'STUDENT',
        department_section: department_section || 'CSE-A',
        roll_number: roll_number || null,
        student_id: student_id || null,
        metrics: {
            marks: metrics && typeof metrics.marks === 'number' ? metrics.marks : 0,
            attendance: metrics && typeof metrics.attendance === 'number' ? metrics.attendance : 0
        },
        sqlProgress: {
            completedLevels: [],
            completedQuestions: [],
            score: 0
        },
        nosqlProgress: {
            completedLevels: [],
            completedQuestions: [],
            score: 0
        },
        createdAt: new Date()
    };

    const res = await users.insertOne(user);
    user._id = res.insertedId;
    if (!user.student_id) {
        user.student_id = String(user._id);
        await users.updateOne({ _id: user._id }, { $set: { student_id: user.student_id } });
    }
    return user;
}

export async function setUserPassword(email, passwordHash) {
    if (!mongoDb) await initMongo();
    const users = mongoDb.collection('users');
    await users.updateOne({ email }, { $set: { passwordHash } });
}

export async function updateUserProgress(email, dbType, progress) {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    const updateKey = dbType === 'SQL' ? 'sqlProgress' : 'nosqlProgress';

    await users.updateOne(
        { email },
        { $set: { [updateKey]: progress } }
    );
}

export async function updateUserProgressById(userId, dbType, progress) {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    const updateKey = dbType === 'SQL' ? 'sqlProgress' : 'nosqlProgress';

    await users.updateOne(
        { _id: userId },
        { $set: { [updateKey]: progress } }
    );
}

export async function saveOrUpdateStudentOrStaff(user) {
    if (!mongoDb) await initMongo();
    const users = mongoDb.collection('users');

    const existing = await users.findOne({ _id: user._id });
    if (existing) {
        const updates = {
            username: user.username,
            email: user.email,
            role: user.role,
            roll_number: user.roll_number || null,
            section: user.section || null,
            year: user.year || null,
            department_section: user.department_section || null
        };
        await users.updateOne(
            { _id: user._id },
            { $set: updates }
        );
        return { ...existing, ...user };
    } else {
        await users.insertOne(user);
        return user;
    }
}


export async function getHodDashboard(section) {
    if (!mongoDb) await initMongo();

    const users = mongoDb.collection('users');
    const roleMatch = { $or: [{ role: 'STUDENT' }, { role: { $exists: false } }] };
    const normalizedSection = section ? String(section).toUpperCase() : null;
    const sectionMatch = normalizedSection
        ? { normalizedSection }
        : null;

    const pipeline = [
        { $match: roleMatch },
        {
            $addFields: {
                normalizedSection: {
                    $toUpper: {
                        $ifNull: ['$department_section', 'CSE-A']
                    }
                }
            }
        },
        ...(sectionMatch ? [{ $match: sectionMatch }] : []),
        {
            $addFields: {
                effectiveMarks: {
                    $ifNull: [
                        '$metrics.marks',
                        {
                            $add: [
                                { $ifNull: ['$sqlProgress.score', 0] },
                                { $ifNull: ['$nosqlProgress.score', 0] }
                            ]
                        }
                    ]
                },
                effectiveAttendance: { $ifNull: ['$metrics.attendance', 0] }
            }
        },
        {
            $facet: {
                averages: [
                    {
                        $group: {
                            _id: '$normalizedSection',
                            avgMarks: { $avg: '$effectiveMarks' },
                            avgAttendance: { $avg: '$effectiveAttendance' },
                            count: { $sum: 1 }
                        }
                    }
                ],
                topStudents: [
                    { $sort: { effectiveMarks: -1 } },
                    {
                        $group: {
                            _id: '$normalizedSection',
                            student: {
                                $first: {
                                    _id: '$_id',
                                    username: '$username',
                                    email: '$email',
                                    student_id: '$student_id',
                                    marks: '$effectiveMarks',
                                    attendance: '$effectiveAttendance'
                                }
                            }
                        }
                    }
                ]
            }
        }
    ];

    const [result] = await users.aggregate(pipeline).toArray();
    const averages = result && result.averages ? result.averages : [];
    const topStudents = result && result.topStudents ? result.topStudents : [];

    const studentPipeline = [
        { $match: roleMatch },
        {
            $addFields: {
                normalizedSection: {
                    $toUpper: {
                        $ifNull: ['$department_section', 'CSE-A']
                    }
                }
            }
        },
        ...(sectionMatch ? [{ $match: sectionMatch }] : []),
        {
            $project: {
                username: 1,
                email: 1,
                roll_number: 1,
                student_id: 1,
                department_section: '$normalizedSection',
                metrics: 1,
                sqlProgress: 1,
                nosqlProgress: 1
            }
        },
        { $limit: 500 }
    ];
    const students = await users.aggregate(studentPipeline).toArray();

    return { averages, topStudents, students };
}

export async function recordCertificate(userId, payload) {
    if (!mongoDb) await initMongo();

    const certs = mongoDb.collection('certificates');
    const doc = {
        userId,
        ...payload,
        createdAt: new Date()
    };
    await certs.insertOne(doc);
    return doc;
}

function transformSqlResults(results) {
    // 1. Single Non-Select (Header) - mysql2 returns object, not array
    if (!Array.isArray(results)) {
        return handleSingleResult(results, 0);
    }

    if (results.length === 0) {
        return [{ type: 'info', message: 'Query executed successfully (No results).' }];
    }

    // 2. Is it Multi-Statement? 
    // It is multi if:
    // a) It contains nested arrays (e.g. [[Row], [Row]])
    // b) It contains Headers (objects with affectedRows). Single SELECT returns [Row, Row] (Rows don't have affectedRows).
    //    Single INSERT returns Header (Object). 
    //    So if we have an Array of Objects where objects have 'affectedRows', it MUST be a multi-statement result (e.g. [Header, Header]).
    const isMulti = results.some(r => Array.isArray(r) || (r && typeof r === 'object' && 'affectedRows' in r));

    if (isMulti) {
        return results.map((r, idx) => {
            if (Array.isArray(r)) return formatTable(r, idx);
            if (r && 'affectedRows' in r) return formatMessage(r, idx);
            return { type: 'info', message: `Result ${idx + 1}` };
        });
    }

    // 3. Single Select (Array of Rows)
    return [formatTable(results, 0)];
}

function formatTable(rows, idx) {
    return {
        type: 'table',
        columns: rows.length > 0 ? Object.keys(rows[0]) : [],
        data: rows,
        message: `Result ${idx + 1}`
    };
}

function formatMessage(packet, idx) {
    return {
        type: 'message',
        columns: [],
        data: [],
        message: `Statement ${idx + 1} OK. ${packet.affectedRows || 0} rows affected.`
    };
}

function handleSingleResult(r, idx) {
    if (r && (r.affectedRows !== undefined || r.changes !== undefined)) {
        return [formatMessage(r, idx)];
    }
    return [{ type: 'info', message: 'Query executed' }];
}

// --- NOSQL INITIALIZATION ---
export async function initMongo() {
    if (mongoDb) return { success: true };

    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI is missing");

    try {
        console.log('🍃 [DB] Connecting to MongoDB...');
        mongoClient = new MongoClient(uri, {
            serverSelectionTimeoutMS: 15000, // 15s timeout for cloud networks
            maxPoolSize: 10
        });
        await mongoClient.connect();
        mongoDb = mongoClient.db();
        await mongoDb.command({ ping: 1 });
        await ensureUserIndexes();
        console.log('✅ [DB] Connected to MongoDB');
        return { success: true };
    } catch (e) {
        console.error('❌ [DB] MongoDB Init Failed:', e.message);
        if (e.message.includes('selection timed out')) {
            console.log('💡 HINT: Ensure your current IP is whitelisted in MongoDB Atlas (Network Access).');
        }
        throw e;
    }
}

export async function executeMongo(wrapperFunction) {
    if (!mongoDb) {
        await initMongo();
    }
    return wrapperFunction(mongoDb);
}

export async function executeMongoForUser(userId, wrapperFunction) {
    if (!mongoClient) {
        await initMongo();
    }
    const dbName = getFreeMongoDbName(userId);
    const userDb = mongoClient.db(dbName);
    return wrapperFunction(userDb);
}

// --- NOSQL SAMPLE DATA INITIALIZATION ---
export async function initNoSQLSampleData() {
    if (!mongoDb) await initMongo();

    const sampleUsers = mongoDb.collection('sample_users');

    // Check if sample data already exists
    const count = await sampleUsers.countDocuments();
    if (count > 0) {
        console.log('✅ [DB] NoSQL sample data already exists');
        return;
    }

    await sampleUsers.insertMany(getNoSqlSampleData());
    console.log('✅ [DB] NoSQL sample data initialized with 10 comprehensive documents');
}
