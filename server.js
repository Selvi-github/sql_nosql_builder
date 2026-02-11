import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import * as db from './backend/db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'dev_secret_change_me');
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// --- SECURITY MIDDLEWARE ---
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors({
    origin: (origin, callback) => {
        // Allow no origin (mobile apps, curl) or allowed origins
        const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',');
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
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

// --- AUTH HELPERS ---
const sanitizeUser = (user) => {
    if (!user) return null;
    const { passwordHash, ...safe } = user;
    return safe;
};

const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!token) return res.status(401).json({ success: false, error: 'Missing auth token' });

        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload || !payload.sub) return res.status(401).json({ success: false, error: 'Invalid token' });

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

// --- API ROUTES ---

// 0. Auth (Register)
app.post('/api/auth/register', authLimiter, async (req, res) => {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) return res.status(400).json({ success: false, error: 'Username, email, and password are required' });

    try {
        const existing = await db.findUserByEmail(email);
        if (existing) return res.status(409).json({ success: false, error: 'Email already registered' });

        const passwordHash = await bcrypt.hash(String(password), 10);
        const user = await db.createUser({ username, email, passwordHash });
        if (!user) return res.status(500).json({ success: false, error: 'Could not create user' });

        const token = jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ success: true, user: sanitizeUser(user), token });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 0. Auth (Login)
app.post('/api/auth/login', authLimiter, async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, error: 'Email and password are required' });

    try {
        const user = await db.findUserByEmail(email);
        if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        if (!user.passwordHash) {
            const passwordHash = await bcrypt.hash(String(password), 10);
            await db.setUserPassword(email, passwordHash);
            user.passwordHash = passwordHash;
        }

        const ok = await bcrypt.compare(String(password), String(user.passwordHash || ''));
        if (!ok) return res.status(401).json({ success: false, error: 'Invalid credentials' });

        const token = jwt.sign({ sub: user._id.toString(), email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ success: true, user: sanitizeUser(user), token });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 0. Auth (Me)
app.get('/api/auth/me', requireAuth, async (req, res) => {
    res.json({ success: true, user: sanitizeUser(req.user) });
});

// 1. SQL Init
app.post('/api/sql/init', requireAuth, async (req, res) => {
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
app.post('/api/sql/execute', requireAuth, async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });

    if (!isReadOnlySql(query)) {
        return res.status(403).json({ success: false, error: "Only read-only SQL is allowed in production sandbox." });
    }

    try {
        const results = await db.executeSql(query);
        res.json({ success: true, results });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 3. NoSQL Init
app.post('/api/nosql/init', requireAuth, async (req, res) => {
    try {
        await db.initMongo();
        await db.initNoSQLSampleData(); // Initialize sample data
        res.json({ success: true, message: 'NoSQL Environment Initialized' });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 4. NoSQL Execute (Wraps existing parser logic)
app.post('/api/nosql/execute', requireAuth, async (req, res) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });

    try {
        const allResults = await db.executeMongo(async (mongoDb) => {
            // Existing Parser Re-Implementation (Simplified/Cleaned)
            const statements = query.split(';').map(s => s.trim()).filter(s => s.length > 0);
            const results = [];

            const parseJson = (str) => {
                try {
                    const fixed = str.trim().replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ').replace(/'/g, '"');
                    return JSON.parse(fixed || '{}');
                } catch (e) { return {}; }
            };

            const allowedOps = new Set(['find', 'findOne', 'sort', 'limit', 'skip', 'count', 'aggregate', 'distinct']);
            const blockedOps = new Set(['insert', 'insertOne', 'update', 'updateOne', 'remove', 'deleteOne', 'deleteMany', 'updateMany', 'replaceOne']);

            for (let statement of statements) {
                const mainMatch = statement.match(/^db\.(\w+)\.(.+)$/);
                if (!mainMatch) {
                    results.push({ success: false, error: `Invalid syntax: ${statement}` });
                    continue;
                }

                const [, col, chain] = mainMatch;
                // Redirect to sample collection for learning
                const collectionName = col === 'users' ? 'sample_users' : col;
                const collection = mongoDb.collection(collectionName);

                // Chain Parser
                const regex = /(\w+)\(([^)]*)\)/g;
                let match;
                const calls = [];
                while ((match = regex.exec(chain)) !== null) {
                    calls.push({ op: match[1], argsStr: match[2] });
                }

                if (calls.length === 0) {
                    results.push({ success: false, error: `No op found: ${statement}` });
                    continue;
                }

                const hasBlocked = calls.some(c => blockedOps.has(c.op));
                if (hasBlocked) {
                    results.push({ success: false, error: 'Write operations are disabled in production sandbox.' });
                    continue;
                }
                const hasUnknown = calls.some(c => !allowedOps.has(c.op));
                if (hasUnknown) {
                    results.push({ success: false, error: 'Operation not allowed in production sandbox.' });
                    continue;
                }

                let cursorOrResult = collection;
                let isCursor = true;
                let finalData = null;

                for (let i = 0; i < calls.length; i++) {
                    const { op, argsStr } = calls[i];
                    const args = argsStr.split(/,(?![^{]*})/).map(parseJson);

                    if (op === 'find') {
                        cursorOrResult = cursorOrResult.find(args[0] || {});
                    } else if (op === 'findOne') {
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
                    } else if (op === 'count') {
                        const n = await (isCursor && cursorOrResult.countDocuments ? cursorOrResult.countDocuments(args[0] || {}) : cursorOrResult.count());
                        finalData = [{ count: n }];
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

                const filteredData = (finalData || []).filter(d => d !== null);
                const isMessage = filteredData.length === 1 && filteredData[0] && filteredData[0].message;

                results.push({
                    type: isMessage ? 'message' : 'table',
                    data: filteredData,
                    columns: filteredData.length > 0 ? Object.keys(filteredData[0]) : [],
                    message: `NoSQL executed.`
                });
            }
            return results;
        });

        res.json({ success: true, results: allResults });

    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// --- AUTH & PROGRESS ROUTES ---

// Login (Username + Email)
// (Legacy login removed; use /api/auth/register and /api/auth/login)

// Save Progress
app.post('/api/user/progress', requireAuth, async (req, res) => {
    const { dbType, progress } = req.body;
    if (!dbType || !progress) return res.status(400).json({ success: false, error: "Missing required fields" });

    try {
        await db.updateUserProgressById(req.user._id, dbType, progress);
        res.json({ success: true });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
});

// 6. Generate Certificate (Metadata Sync)
app.post('/api/certificate/generate', requireAuth, async (req, res) => {
    const { dbType } = req.body;
    if (!dbType) return res.status(400).json({ success: false, error: "Missing metadata" });

    try {
        await db.recordCertificate(req.user._id, { dbType, username: req.user.username, email: req.user.email });
        res.json({ success: true, message: `Certificate recorded for ${req.user.username}` });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
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

        app.listen(PORT, () => {
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
