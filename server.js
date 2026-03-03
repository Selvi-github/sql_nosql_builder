import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';
import * as db from './backend/db.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);
const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'dev_secret_change_me');
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SECTION_VALUES = new Set(['A', 'B', 'C', 'CSE-A', 'CSE-B', 'CSE-C', 'UCS-A', 'UCS-B', 'UCS-C']);
const AUTH_DATA_PATH = path.resolve('src', 'data', 'auth.json');
const localUserStore = new Map();
let authDataCache = null;

const RAW_CORS_ORIGIN = process.env.CORS_ORIGIN || '';
const ALLOWED_ORIGINS = RAW_CORS_ORIGIN
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
const ALLOW_ANY_ORIGIN = ALLOWED_ORIGINS.includes('*');

if (process.env.NODE_ENV === 'production') {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET must be set in production.');
    }
    if (!RAW_CORS_ORIGIN || ALLOWED_ORIGINS.length === 0 || ALLOW_ANY_ORIGIN) {
        throw new Error('CORS_ORIGIN must be set to an explicit allowlist in production.');
    }
}

// --- SECURITY MIDDLEWARE ---
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors({
    origin: (origin, callback) => {
        // Allow no origin (mobile apps, curl) or allowed origins
        if (!origin) return callback(null, true);
        if (ALLOW_ANY_ORIGIN || ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    }
}));

// Rate Limit: 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(bodyParser.json({ limit: '1mb' })); // Limit payload size
app.use(bodyParser.urlencoded({ extended: true }));

// Basic request logging (no body to avoid leaking secrets)
app.use((req, res, next) => {
    const started = Date.now();
    res.on('finish', () => {
        const ms = Date.now() - started;
        console.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
    });
    next();
});

// --- AUTH HELPERS ---
const sanitizeUser = (user) => {
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return safe;
};

const respondOk = (res, data = {}, status = 200) => res.status(status).json({ success: true, ...data });
const respondError = (res, status, error, details) => res.status(status).json({
    success: false,
    error,
    ...(details ? { details } : {})
});

const normalizeName = (value) => String(value || '')
    .replace(/[.]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toUpperCase();

const isNameMatch = (inputName, fullName) => {
    const input = normalizeName(inputName);
    const full = normalizeName(fullName);
    if (!input || !full) return false;
    return full.startsWith(input);
};

const normalizeRollNumber = (value) => String(value || '').trim().toUpperCase();

const toSafeKey = (value) => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'user';

const buildOtherLoginKey = (name, password) => {
    const safeName = toSafeKey(name);
    const digest = crypto
        .createHash('sha256')
        .update(`${safeName}:${String(password || '')}`)
        .digest('hex');
    return `${safeName}_${digest}`;
};

const normalizeYear = (value) => {
    const n = Number.parseInt(String(value || '').trim(), 10);
    return Number.isFinite(n) ? n : null;
};

const normalizeSectionValue = (value) => {
    const raw = String(value || '').trim().toUpperCase();
    if (!raw) return '';
    if (SECTION_VALUES.has(raw) && ['A', 'B', 'C'].includes(raw)) return raw;
    const match = raw.match(/([ABC])$/);
    return match ? match[1] : '';
};

const toDepartmentSection = (section) => (section ? `CSE-${section}` : '');

const createEmptyProgress = () => ({
    completedLevels: [],
    completedQuestions: [],
    score: 0
});

const ensureProgress = (progress) => {
    if (!progress || !Array.isArray(progress.completedQuestions)) return createEmptyProgress();
    return progress;
};

const upsertLocalUser = (user) => {
    const existing = localUserStore.get(user._id);
    const sqlProgress = ensureProgress(existing && existing.sqlProgress ? existing.sqlProgress : user.sqlProgress);
    const nosqlProgress = ensureProgress(existing && existing.nosqlProgress ? existing.nosqlProgress : user.nosqlProgress);
    const merged = {
        ...existing,
        ...user,
        sqlProgress,
        nosqlProgress
    };
    localUserStore.set(user._id, merged);
    return merged;
};

const loadAuthData = () => {
    try {
        const raw = fs.readFileSync(AUTH_DATA_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        authDataCache = {
            admin: parsed && parsed.admin ? parsed.admin : null,
            staff: Array.isArray(parsed && parsed.staff) ? parsed.staff : [],
            students: Array.isArray(parsed && parsed.students) ? parsed.students : [],
            others: Array.isArray(parsed && parsed.others) ? parsed.others : []
        };
    } catch {
        authDataCache = { admin: null, staff: [], students: [], others: [] };
    }
    return authDataCache;
};

const getAuthData = () => authDataCache || loadAuthData();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());

const requireRole = (role) => (req, res, next) => {
    const user = req.user;
    if (!user || !user.role) return res.status(403).json({ success: false, error: 'Access denied' });
    if (user.role !== role) return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    next();
};

const requireAnyRole = (roles) => (req, res, next) => {
    const user = req.user;
    if (!user || !user.role) return res.status(403).json({ success: false, error: 'Access denied' });
    if (!roles.includes(user.role)) return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    next();
};

const requireStudent = (req, res, next) => {
    const user = req.user;
    if (!user || (user.role !== 'STUDENT' && user.role !== 'OTHER')) {
        return res.status(403).json({ success: false, error: 'Student access only' });
    }
    next();
};

loadAuthData();

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) return res.status(401).json({ success: false, error: 'Missing auth token' });

        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload || !payload.sub) return res.status(401).json({ success: false, error: 'Invalid token' });

        const localUser = localUserStore.get(payload.sub);
        if (localUser) {
            req.user = localUser;
            req.tokenPayload = payload;
            return next();
        }

        const user = await db.getUserById(new ObjectId(payload.sub));
        if (!user) return res.status(401).json({ success: false, error: 'User not found' });

        req.user = user;
        req.tokenPayload = payload;
        next();
    } catch (e) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
};

const isReadOnlySql = (query) => {
    const q = String(query || '').trim();
    if (!q) return false;

    const stripped = q.replace(/;\s*$/, '');
    if (stripped.includes(';')) return false;

    const start = stripped.toLowerCase();
    const allowedStart = start.startsWith('select') || start.startsWith('with') || start.startsWith('explain') || start.startsWith('describe') || start.startsWith('show');
    if (!allowedStart) return false;

    // Block unsafe keywords even if query starts with SELECT
    if (/\b(insert|update|delete|drop|alter|create|truncate|grant|revoke)\b/i.test(stripped)) return false;
    return true;
};

const isSqlSyntaxError = (err) => {
    const code = err && err.code ? String(err.code) : '';
    return code === 'ER_PARSE_ERROR' || code === 'ER_SYNTAX_ERROR';
};

const isMongoConnectivityError = (err) => {
    const code = err && err.code ? String(err.code) : '';
    const msg = err && err.message ? String(err.message) : '';
    return code === 'ECONNREFUSED'
        || code === 'ENOTFOUND'
        || code === 'ETIMEDOUT'
        || code === 'EAI_AGAIN'
        || /querySrv/i.test(msg);
};

const offlineNoSqlState = {
    collections: null
};

const cloneDoc = (doc) => ({ ...doc });

const getOfflineNoSqlDb = () => {
    if (!offlineNoSqlState.collections) {
        offlineNoSqlState.collections = new Map();
        offlineNoSqlState.collections.set('sample_users', db.getNoSqlSampleData().map(cloneDoc));
    }

    const getCollectionData = (name) => {
        if (!offlineNoSqlState.collections.has(name)) {
            offlineNoSqlState.collections.set(name, []);
        }
        return offlineNoSqlState.collections.get(name);
    };

    const createCursor = (docs) => {
        let current = Array.isArray(docs) ? [...docs] : [];
        return {
            sort: (spec = {}) => {
                const entries = Object.entries(spec || {});
                current.sort((a, b) => {
                    for (const [key, dir] of entries) {
                        const av = a[key];
                        const bv = b[key];
                        if (av === bv) continue;
                        const order = dir === -1 ? -1 : 1;
                        return av > bv ? order : -order;
                    }
                    return 0;
                });
                return createCursor(current);
            },
            limit: (n) => {
                const lim = Number.isFinite(n) ? Math.max(0, n) : 20;
                current = current.slice(0, lim);
                return createCursor(current);
            },
            skip: (n) => {
                const sk = Number.isFinite(n) ? Math.max(0, n) : 0;
                current = current.slice(sk);
                return createCursor(current);
            },
            countDocuments: (filter = {}) => current.filter(doc => matchQuery(doc, filter)).length,
            toArray: async () => current.map(cloneDoc)
        };
    };

    const evalExprValue = (expr, doc) => {
        if (expr === null || expr === undefined) return expr;
        if (typeof expr === 'string') {
            if (expr.startsWith('$')) return doc[expr.slice(1)];
            return expr;
        }
        if (typeof expr === 'number' || typeof expr === 'boolean') return expr;
        if (Array.isArray(expr)) return expr.map(e => evalExprValue(e, doc));
        if (typeof expr === 'object') {
            if (expr.$multiply) {
                const [a, b] = expr.$multiply.map(e => Number(evalExprValue(e, doc)) || 0);
                return a * b;
            }
            if (expr.$size) {
                const v = evalExprValue(expr.$size, doc);
                return Array.isArray(v) ? v.length : 0;
            }
            if (expr.$strLenCP) {
                const v = evalExprValue(expr.$strLenCP, doc);
                return v ? String(v).length : 0;
            }
            return expr;
        }
        return expr;
    };

    const evalExprPredicate = (expr, doc) => {
        if (!expr || typeof expr !== 'object') return false;
        const op = Object.keys(expr)[0];
        const args = expr[op];
        const [left, right] = Array.isArray(args) ? args : [args];
        const lv = evalExprValue(left, doc);
        const rv = evalExprValue(right, doc);
        if (op === '$gt') return lv > rv;
        if (op === '$gte') return lv >= rv;
        if (op === '$lt') return lv < rv;
        if (op === '$lte') return lv <= rv;
        if (op === '$eq') return lv === rv;
        if (op === '$ne') return lv !== rv;
        return false;
    };

    const testRegex = (value, pattern, options) => {
        try {
            const re = new RegExp(pattern, options || '');
            if (Array.isArray(value)) return value.some(v => re.test(String(v)));
            return re.test(String(value));
        } catch {
            return false;
        }
    };

    const matchFieldCondition = (fieldValue, condition) => {
        if (condition && typeof condition === 'object' && !Array.isArray(condition)) {
            if ('$not' in condition) {
                return !matchFieldCondition(fieldValue, condition.$not);
            }

            for (const [op, val] of Object.entries(condition)) {
                if (op === '$gt' && !(fieldValue > val)) return false;
                if (op === '$gte' && !(fieldValue >= val)) return false;
                if (op === '$lt' && !(fieldValue < val)) return false;
                if (op === '$lte' && !(fieldValue <= val)) return false;
                if (op === '$ne') {
                    if (Array.isArray(fieldValue)) {
                        if (fieldValue.includes(val)) return false;
                    } else if (fieldValue === val) {
                        return false;
                    }
                }
                if (op === '$in') {
                    if (Array.isArray(fieldValue)) {
                        if (!fieldValue.some(v => val.includes(v))) return false;
                    } else if (!val.includes(fieldValue)) {
                        return false;
                    }
                }
                if (op === '$nin') {
                    if (Array.isArray(fieldValue)) {
                        if (fieldValue.some(v => val.includes(v))) return false;
                    } else if (val.includes(fieldValue)) {
                        return false;
                    }
                }
                if (op === '$exists') {
                    const exists = fieldValue !== undefined;
                    if (val ? !exists : exists) return false;
                }
                if (op === '$regex') {
                    const options = condition.$options || '';
                    if (!testRegex(fieldValue, val, options)) return false;
                }
                if (op === '$all') {
                    if (!Array.isArray(fieldValue)) return false;
                    if (!val.every(v => fieldValue.includes(v))) return false;
                }
                if (op === '$size') {
                    if (!Array.isArray(fieldValue)) return false;
                    if (fieldValue.length !== val) return false;
                }
                if (op === '$mod') {
                    const [div, rem] = val || [];
                    if (!Number.isFinite(fieldValue) || fieldValue % div !== rem) return false;
                }
            }
            return true;
        }

        if (condition === null) return fieldValue === null || fieldValue === undefined;
        if (Array.isArray(fieldValue)) return fieldValue.includes(condition);
        return fieldValue === condition;
    };

    const matchQuery = (doc, query = {}) => {
        if (!query || Object.keys(query).length === 0) return true;

        for (const [key, value] of Object.entries(query)) {
            if (key === '$or') {
                if (!Array.isArray(value)) return false;
                if (!value.some(v => matchQuery(doc, v))) return false;
                continue;
            }
            if (key === '$and') {
                if (!Array.isArray(value)) return false;
                if (!value.every(v => matchQuery(doc, v))) return false;
                continue;
            }
            if (key === '$expr') {
                if (!evalExprPredicate(value, doc)) return false;
                continue;
            }

            const fieldValue = doc[key];
            if (!matchFieldCondition(fieldValue, value)) return false;
        }

        return true;
    };

    return {
        collection: (name) => {
            const data = getCollectionData(name);
            return {
                find: (filter = {}) => createCursor(data.filter(doc => matchQuery(doc, filter))),
                findOne: async (filter = {}) => {
                    const found = data.find(doc => matchQuery(doc, filter));
                    return found ? cloneDoc(found) : null;
                },
                distinct: async (field) => {
                    const values = data.map(doc => doc[field]).flat();
                    return [...new Set(values.filter(v => v !== undefined))];
                },
                aggregate: () => ({ toArray: async () => [] })
            };
        }
    };
};

// --- API ROUTES ---

// 0. Auth (Register)
app.post('/api/auth/register', authLimiter, async (req, res) => {
    return respondError(res, 403, 'Registration is disabled. Contact the admin.');
});

// 0. Auth (Register HOD)
app.post('/api/auth/hod/register', authLimiter, async (req, res) => {
    return respondError(res, 403, 'Registration is disabled. Contact the admin.');
});

// 0. Auth (Login)
app.post('/api/auth/login', authLimiter, async (req, res) => {
    const { role, name, rollNumber, year, section, email, password } = req.body || {};
    const normalizedRole = String(role || '').toUpperCase();
    const authData = getAuthData();

    if (normalizedRole === 'STUDENT') {
        const roll = normalizeRollNumber(rollNumber);
        const studentName = normalizeName(name);
        const studentYear = normalizeYear(year);
        const studentSection = normalizeSectionValue(section);

        if (!roll || !studentName || !studentYear || !studentSection) {
            return respondError(res, 400, 'Name, roll number, year, and section are required');
        }

        const match = (authData.students || []).find((s) => {
            const sRoll = normalizeRollNumber(s.rollNumber);
            const sYear = normalizeYear(s.year);
            const sSection = normalizeSectionValue(s.section);
            if (sRoll !== roll || sYear !== studentYear || sSection !== studentSection) return false;
            return isNameMatch(studentName, s.name);
        });

        if (!match) return respondError(res, 401, 'Student not found in the approved list');

        const userId = `student:${roll}`;
        const user = upsertLocalUser({
            _id: userId,
            username: match.name,
            email: `${roll.toLowerCase()}@student.local`,
            role: 'STUDENT',
            roll_number: roll,
            section: studentSection,
            year: studentYear,
            department_section: toDepartmentSection(studentSection),
            authSource: 'json',
            sqlProgress: createEmptyProgress(),
            nosqlProgress: createEmptyProgress()
        });

        const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return respondOk(res, { user: sanitizeUser(user), token });
    }

    if (normalizedRole === 'STAFF') {
        if (!email || !isValidEmail(email)) return respondError(res, 400, 'Valid staff email is required');
        if (!name) return respondError(res, 400, 'Staff name is required');
        if (!password) return respondError(res, 400, 'Staff password is required');

        const match = (authData.staff || []).find((s) => {
            const sEmail = String(s.email || '').trim().toLowerCase();
            return sEmail === String(email).trim().toLowerCase()
                && isNameMatch(name, s.name);
        });

        if (!match) return respondError(res, 401, 'Staff not found in the approved list');

        const storedHash = String(match.passwordHash || '').trim();
        const storedPlain = String(match.password || '');
        const passwordOk = storedHash
            ? bcrypt.compareSync(String(password), storedHash)
            : (storedPlain && storedPlain === String(password));

        if (!passwordOk) return respondError(res, 401, 'Invalid staff credentials');

        const staffYear = normalizeYear(match.year);
        const staffSection = normalizeSectionValue(match.section);

        const userId = `staff:${String(email).trim().toLowerCase()}`;
        const user = upsertLocalUser({
            _id: userId,
            username: match.name,
            email: String(email).trim().toLowerCase(),
            role: 'STAFF',
            section: staffSection,
            year: staffYear,
            department_section: toDepartmentSection(staffSection),
            authSource: 'json'
        });

        const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return respondOk(res, { user: sanitizeUser(user), token });
    }

    if (normalizedRole === 'OTHER') {
        if (!name) return respondError(res, 400, 'Name is required');
        if (!password) return respondError(res, 400, 'Password is required');

        const otherKey = buildOtherLoginKey(name, password);
        const otherEmail = `${otherKey}@other.local`;

        try {
            let user = await db.findUserByEmail(otherEmail);
            if (!user) {
                user = await db.createUser({
                    username: String(name || '').trim(),
                    email: otherEmail,
                    passwordHash: bcrypt.hashSync(String(password), 10),
                    role: 'OTHER'
                });
            }

            if (!user) return respondError(res, 500, 'Unable to create user');

            if (user.passwordHash) {
                const ok = bcrypt.compareSync(String(password), user.passwordHash);
                if (!ok) return respondError(res, 401, 'Invalid credentials');
            }

            const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            return respondOk(res, { user: sanitizeUser(user), token });
        } catch (e) {
            return respondError(res, 503, 'User store unavailable');
        }
    }

    if (normalizedRole === 'ADMIN') {
        if (!email || !password) return respondError(res, 400, 'Admin email and password are required');
        if (!isValidEmail(email)) return respondError(res, 400, 'Invalid email format');

        const admin = authData.admin || {};
        const adminEmail = String(admin.email || '').trim().toLowerCase();
        const adminPassword = String(admin.password || '');

        if (adminEmail !== String(email).trim().toLowerCase() || adminPassword !== String(password)) {
            return respondError(res, 401, 'Invalid admin credentials');
        }

        const userId = `admin:${adminEmail}`;
        const user = upsertLocalUser({
            _id: userId,
            username: 'Admin',
            email: adminEmail,
            role: 'ADMIN',
            authSource: 'json'
        });

        const token = jwt.sign({ sub: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return respondOk(res, { user: sanitizeUser(user), token });
    }

    return respondError(res, 400, 'Invalid role for login');
});

// 0. Auth (Login HOD)
app.post('/api/auth/hod/login', authLimiter, async (req, res) => {
    return respondError(res, 404, 'Endpoint removed. Use /api/auth/login.');
});

// 0. Auth (Me)
app.get('/api/auth/me', requireAuth, async (req, res) => {
    res.json({ success: true, user: sanitizeUser(req.user) });
});

// 1. SQL Init
app.post('/api/sql/init', requireAuth, requireStudent, async (req, res) => {
    try {
        const result = await db.initSql();
        if (result.success) {
            let msg = 'SQL Environment Ready';
            if (result.mode === 'SQLITE') msg += ' (Offline Mode)';
            res.json({ success: true, message: msg, mode: result.mode });
        } else {
            res.status(500).json({ success: false, error: result.error });
        }
    } catch (e) {
        console.error('SQL Init Fatal:', e);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 2. SQL Execute
app.post('/api/sql/execute', requireAuth, requireStudent, async (req, res) => {
    const { query, mode } = req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });

    const requestMode = String(mode || '').toUpperCase();
    const allowFreeWrites = String(process.env.FREE_MODE_WRITE || 'true').toLowerCase() !== 'false';
    const isFreeMode = requestMode === 'FREE' && allowFreeWrites;

    if (!isFreeMode && !isReadOnlySql(query)) {
        return res.status(403).json({ success: false, error: "Only read-only SQL is allowed in production sandbox." });
    }

    try {
        const results = await db.executeSql(query, {
            mode: requestMode,
            userId: req.user && req.user._id ? String(req.user._id) : ''
        });
        res.json({ success: true, results });
    } catch (e) {
        const errorType = isSqlSyntaxError(e) ? 'SYNTAX' : 'RUNTIME';
        res.status(500).json({ success: false, errorType, error: e.message });
    }
});

// 3. NoSQL Init
app.post('/api/nosql/init', requireAuth, requireStudent, async (req, res) => {
    try {
        await db.initMongo();
        await db.initNoSQLSampleData(); // Initialize sample data
        res.json({ success: true, message: 'NoSQL Environment Initialized' });
    } catch (e) {
        if (isMongoConnectivityError(e)) {
            return res.json({ success: true, mode: 'OFFLINE', message: 'NoSQL Offline Mode (MongoDB unreachable)' });
        }
        res.status(500).json({ success: false, error: e.message });
    }
});

// 4. NoSQL Execute (Wraps existing parser logic)
app.post('/api/nosql/execute', requireAuth, requireStudent, async (req, res) => {
    const { query, mode } = req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });
    const requestMode = String(mode || '').toUpperCase();
    const allowFreeWrites = String(process.env.FREE_MODE_WRITE || 'true').toLowerCase() !== 'false';
    const isFreeMode = requestMode === 'FREE' && allowFreeWrites;

    try {
        const runNoSql = async (mongoDb) => {
            const statements = query.split(';').map(s => s.trim()).filter(s => s.length > 0);
            const results = [];
            let firstError = null;

            const applyProjection = (rows, projection) => {
                if (!projection || typeof projection !== 'object') return rows;
                const keys = Object.keys(projection);
                if (keys.length === 0) return rows;

                const includeKeys = keys.filter(k => projection[k] === 1 || projection[k] === true);
                const excludeKeys = keys.filter(k => projection[k] === 0 || projection[k] === false);

                return (rows || []).map((row) => {
                    const source = row || {};
                    if (includeKeys.length > 0) {
                        const out = {};
                        includeKeys.forEach(k => {
                            if (Object.prototype.hasOwnProperty.call(source, k)) out[k] = source[k];
                        });
                        if (!excludeKeys.includes('_id') && Object.prototype.hasOwnProperty.call(source, '_id')) {
                            out._id = source._id;
                        }
                        return out;
                    }
                    const out = { ...source };
                    excludeKeys.forEach(k => {
                        delete out[k];
                    });
                    return out;
                });
            };

            const parseJson = (str) => {
                try {
                    const fixed = str.trim().replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
                    return JSON.parse(fixed || '{}');
                } catch (e) { return {}; }
            };

            const allowedOps = new Set(
                isFreeMode
                    ? ['find', 'findOne', 'sort', 'limit', 'skip', 'count', 'countDocuments', 'aggregate', 'distinct', 'insert', 'insertOne', 'update', 'updateOne', 'remove', 'deleteOne']
                    : ['find', 'findOne', 'sort', 'limit', 'skip', 'count', 'countDocuments', 'aggregate', 'distinct']
            );
            const blockedOps = new Set(
                isFreeMode
                    ? []
                    : ['insert', 'insertOne', 'update', 'updateOne', 'remove', 'deleteOne', 'deleteMany', 'updateMany', 'replaceOne']
            );

            for (let statement of statements) {
                const mainMatch = statement.match(/^db\.(\w+)\.(.+)$/);
                if (!mainMatch) {
                    const message = `Invalid syntax: ${statement}`;
                    results.push({ type: 'error', errorType: 'SYNTAX', error: message });
                    if (!firstError) firstError = { error: message, errorType: 'SYNTAX' };
                    continue;
                }

                const [, col, chain] = mainMatch;
                const collectionName = col === 'users' ? 'sample_users' : col;
                const collection = mongoDb.collection(collectionName);

                const regex = /(\w+)\(([^)]*)\)/g;
                let match;
                const calls = [];
                while ((match = regex.exec(chain)) !== null) {
                    calls.push({ op: match[1], argsStr: match[2] });
                }

                if (calls.length === 0) {
                    const message = `No op found: ${statement}`;
                    results.push({ type: 'error', errorType: 'SYNTAX', error: message });
                    if (!firstError) firstError = { error: message, errorType: 'SYNTAX' };
                    continue;
                }

                const hasBlocked = calls.some(c => blockedOps.has(c.op));
                if (hasBlocked) {
                    const message = 'Write operations are disabled in production sandbox.';
                    results.push({ type: 'error', errorType: 'POLICY', error: message });
                    if (!firstError) firstError = { error: message, errorType: 'POLICY' };
                    continue;
                }
                const hasUnknown = calls.some(c => !allowedOps.has(c.op));
                if (hasUnknown) {
                    const message = 'Operation not allowed in production sandbox.';
                    results.push({ type: 'error', errorType: 'SYNTAX', error: message });
                    if (!firstError) firstError = { error: message, errorType: 'SYNTAX' };
                    continue;
                }

                let cursorOrResult = collection;
                let isCursor = true;
                let finalData = null;
                let projection = null;

                for (let i = 0; i < calls.length; i++) {
                    const { op, argsStr } = calls[i];
                    const args = argsStr.split(/,(?![^{}]*})/).map(parseJson);

                    if (op === 'find') {
                        projection = args.length > 1 ? args[1] : null;
                        cursorOrResult = cursorOrResult.find(args[0] || {});
                    } else if (op === 'findOne') {
                        projection = args.length > 1 ? args[1] : null;
                        finalData = [await cursorOrResult.findOne(args[0] || {})];
                        isCursor = false;
                        break;
                    } else if (op === 'insert' || op === 'insertOne') {
                        const res = await cursorOrResult.insertOne(args[0] || {});
                        finalData = [{ message: "Inserted", id: res.insertedId }];
                        isCursor = false;
                        break;
                    } else if (op === 'update' || op === 'updateOne') {
                        const res = await cursorOrResult.updateOne(args[0] || {}, args[1] || {});
                        finalData = [{ message: "Updated", matched: res.matchedCount, modified: res.modifiedCount }];
                        isCursor = false;
                        break;
                    } else if (op === 'remove' || op === 'deleteOne') {
                        const res = await cursorOrResult.deleteOne(args[0] || {});
                        finalData = [{ message: "Deleted", count: res.deletedCount }];
                        isCursor = false;
                        break;
                    } else if (op === 'sort' && isCursor) {
                        cursorOrResult = cursorOrResult.sort(args[0] || {});
                    } else if (op === 'limit' && isCursor) {
                        cursorOrResult = cursorOrResult.limit(parseInt(args[0]) || 20);
                    } else if (op === 'skip' && isCursor) {
                        cursorOrResult = cursorOrResult.skip(parseInt(args[0]) || 0);
                    } else if (op === 'count') {
                        const n = await (isCursor && cursorOrResult.countDocuments ? cursorOrResult.countDocuments(args[0] || {}) : cursorOrResult.count());
                        finalData = [{ count: n }];
                        isCursor = false;
                        break;
                    } else if (op === 'countDocuments') {
                        const n = await cursorOrResult.countDocuments(args[0] || {});
                        finalData = [{ count: n }];
                        isCursor = false;
                        break;
                    } else if (op === 'distinct') {
                        finalData = await cursorOrResult.distinct(args[0]);
                        isCursor = false;
                        break;
                    } else if (op === 'aggregate') {
                        const pipeline = Array.isArray(args[0]) ? args[0] : [args[0]];
                        finalData = await cursorOrResult.aggregate(pipeline).toArray();
                        isCursor = false;
                        break;
                    }
                }

                if (isCursor && cursorOrResult.toArray) {
                    finalData = await cursorOrResult.limit(20).toArray();
                }

                let filteredData = (finalData || []).filter(d => d !== null);
                if (projection) {
                    filteredData = applyProjection(filteredData, projection);
                }
                const isMessage = filteredData.length === 1 && filteredData[0] && filteredData[0].message;

                results.push({
                    type: isMessage ? 'message' : 'table',
                    data: filteredData,
                    columns: filteredData.length > 0 ? Object.keys(filteredData[0]) : [],
                    message: `NoSQL executed.`
                });
            }

            return { results, firstError };
        };

        let allResults;
        let offlineMode = false;
        try {
            allResults = isFreeMode
                ? await db.executeMongoForUser(req.user._id, runNoSql)
                : await db.executeMongo(runNoSql);
        } catch (e) {
            if (requestMode === 'LEARN' && isMongoConnectivityError(e)) {
                offlineMode = true;
                allResults = await runNoSql(getOfflineNoSqlDb());
            } else {
                throw e;
            }
        }

        const payload = allResults && allResults.results ? allResults.results : allResults;
        const firstError = allResults && allResults.firstError ? allResults.firstError : null;

        if (firstError) {
            return res.status(400).json({ success: false, errorType: firstError.errorType, error: firstError.error });
        }

        res.json({ success: true, results: payload, mode: offlineMode ? 'OFFLINE' : undefined });

    } catch (e) {
        if (isMongoConnectivityError(e)) {
            return res.json({
                success: true,
                mode: 'OFFLINE',
                results: [{ type: 'message', data: [], columns: [], message: 'NoSQL Offline Mode (MongoDB unreachable)' }]
            });
        }
        res.status(500).json({ success: false, errorType: 'RUNTIME', error: e.message });
    }
});

// --- AUTH & PROGRESS ROUTES ---

// Login (Username + Email)
// (Legacy login removed; use /api/auth/register and /api/auth/login)

// Save Progress
app.post('/api/user/progress', requireAuth, requireStudent, async (req, res) => {
    const { dbType, progress } = req.body;
    if (!dbType || !progress) return respondError(res, 400, 'Missing required fields');

    try {
        if (req.user && req.user.authSource === 'json') {
            const updateKey = dbType === 'SQL' ? 'sqlProgress' : 'nosqlProgress';
            const existing = localUserStore.get(req.user._id) || req.user;
            const merged = {
                ...existing,
                [updateKey]: progress
            };
            localUserStore.set(req.user._id, merged);
            req.user = merged;
            return respondOk(res);
        }

        await db.updateUserProgressById(req.user._id, dbType, progress);
        return respondOk(res);
    } catch (e) {
        return respondError(res, 500, e.message);
    }
});

const buildLocalDashboardData = ({ section, year }) => {
    const authData = getAuthData();
    const students = (authData.students || []).map((s) => {
        const roll = normalizeRollNumber(s.rollNumber);
        const entrySection = normalizeSectionValue(s.section);
        const entryYear = normalizeYear(s.year);
        const userId = `student:${roll}`;
        const stored = localUserStore.get(userId);
        const sqlProgress = ensureProgress(stored && stored.sqlProgress ? stored.sqlProgress : createEmptyProgress());
        const nosqlProgress = ensureProgress(stored && stored.nosqlProgress ? stored.nosqlProgress : createEmptyProgress());
        return {
            _id: userId,
            username: s.name,
            email: `${roll.toLowerCase()}@student.local`,
            role: 'STUDENT',
            roll_number: roll,
            section: entrySection,
            year: entryYear,
            department_section: toDepartmentSection(entrySection),
            sqlProgress,
            nosqlProgress
        };
    });

    const filtered = students.filter((s) => {
        if (section && s.section !== section) return false;
        if (year && s.year !== year) return false;
        return true;
    });

    return { students: filtered };
};

// Admin/Staff Dashboard
app.get('/api/hod/dashboard', requireAuth, requireAnyRole(['ADMIN', 'STAFF']), async (req, res) => {
    const isStaff = req.user && req.user.role === 'STAFF';
    const requestedSection = normalizeSectionValue(req.query.section);
    const requestedYear = normalizeYear(req.query.year);

    const enforcedSection = isStaff
        ? normalizeSectionValue(req.user.section || req.user.department_section)
        : requestedSection;
    const enforcedYear = isStaff ? normalizeYear(req.user.year) : requestedYear;

    if (req.query.section && !normalizeSectionValue(req.query.section)) {
        return res.status(400).json({ success: false, error: 'Invalid section filter' });
    }
    if (isStaff && !enforcedSection) {
        return res.status(400).json({ success: false, error: 'Staff section is missing' });
    }

    try {
        if (req.user && req.user.authSource === 'json') {
            const data = buildLocalDashboardData({
                section: enforcedSection || null,
                year: enforcedYear || null
            });
            return res.json({ success: true, data });
        }

        const dbSection = enforcedSection ? toDepartmentSection(enforcedSection) : null;
        const data = await db.getHodDashboard(dbSection);
        res.json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 6. Generate Certificate (Metadata Sync)
app.post('/api/certificate/generate', requireAuth, requireStudent, async (req, res) => {
    const { dbType } = req.body;
    if (!dbType) return respondError(res, 400, 'Missing metadata');

    try {
        await db.recordCertificate(req.user._id, { dbType, username: req.user.username, email: req.user.email });
        return respondOk(res, { message: `Certificate recorded for ${req.user.username}` });
    } catch (e) {
        return respondError(res, 500, e.message);
    }
});

// Basic status page for quick checks in the browser
app.get('/', async (req, res) => {
    const sqlStatus = await db.initSql().then(r => r.success).catch(() => false);
    const mongoStatus = await db.initMongo().then(r => r.success).catch(() => false);
    const status = sqlStatus && mongoStatus ? 'Connected' : 'Degraded';
    res.status(200).send(`Backend running. Database status: ${status}.`);
});

// 5. Health Check (for Cloud Monitoring)
app.get('/api/health', async (req, res) => {
    const sqlStatus = await db.initSql().then(r => r.success).catch(() => false);
    const mongoStatus = await db.initMongo().then(r => r.success).catch(() => false);

    const status = sqlStatus && mongoStatus ? 'Healthy' : 'Degraded';
    res.json({
        status,
        sql: sqlStatus ? 'Connected' : 'Disconnected',
        nosql: mongoStatus ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});



// --- SERVER STARTUP ---
const startServer = async () => {
    try {
        console.log("🛠️ Starting Backend Validation...");

        if (process.env.NODE_ENV === 'production') {
            if (!JWT_SECRET) throw new Error('JWT_SECRET is required in production');
            if (!process.env.CORS_ORIGIN) throw new Error('CORS_ORIGIN is required in production');
        }

        // SQL is important but NoSQL + User Auth (MongoDB) is critical for progress
        try {
            await db.initSql();
        } catch (sqlError) {
            console.error("⚠️ SQL Initialization Warning:", sqlError.message);
            console.log("🛡️ Continuing startup... SQL features might be offline.");
        }

        // MongoDB holds user profiles and progress, more critical for the "Platform"
        try {
            await db.initMongo();
        } catch (mongoError) {
            console.error("❌ MONGODB CONNECTION FAILED:", mongoError.message);
            console.log("⚠️  Continuing startup without MongoDB... NoSQL and User profiles will be offline.");
        }

        app.listen(PORT,'0.0.0.0', () => {
            console.log(`🚀 Secure Server ready on port ${PORT}`);
            console.log(`📡 Cloud Monitoring active...`);
        });
    } catch (e) {
        console.error("❌ CRITICAL: Unknown startup error.");
        console.error(e.message);
        process.exit(1);
    }
};

startServer();
