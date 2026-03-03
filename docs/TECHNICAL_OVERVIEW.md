# Technical Overview: DualDB Query Architect

Version: March 2, 2026
Audience: Review/technical presentation

## 1) System purpose
DualDB Query Architect is a learning platform that teaches SQL and NoSQL using a visual block editor (Blockly). Users assemble blocks, the app generates queries, and a backend executes them against sandboxed databases. Progress and reporting are tracked for academic review.

## 2) High-level architecture
- Frontend: React + Vite SPA. Handles UI, Blockly, query generation, validation, and result rendering.
- Backend: Express API. Handles authentication, query execution, progress persistence, and reporting.
- Datastores:
  - MySQL for SQL execution (cloud DB; free mode can use per-user DB if permitted).
  - MongoDB for user profiles, progress, certificates, and NoSQL execution.
  - Offline NoSQL fallback for learning mode if MongoDB is unreachable.

## 3) Core frontend flow
- Login screen selects role (Student, Staff, Admin, Other User).
- Student flow:
  - Landing page lets the learner choose SQL or NoSQL builder.
  - Builder shows Blockly workspace, live query output, and results panel.
  - Learning mode validates against expected patterns before execution.
- Staff/Admin flow:
  - Dashboard shows analytics, filters, and PDF report export.
- Profile:
  - Shows progress and enables certificate generation at 100% completion.

## 4) Blockly pipeline
- Block definitions define visual shape and inputs.
- Generators map blocks -> SQL or NoSQL strings.
- The workspace emits generated code on change.
- Code is sent to the backend for execution.

Key files:
- Blocks: src/blocks/sql/definitions.js, src/blocks/sql/generators.js
- Blocks: src/blocks/nosql/definitions.js, src/blocks/nosql/generators.js
- Workspace: src/components/game/BlocklyEditor.jsx

## 5) Query execution
SQL:
- Endpoint: POST /api/sql/execute
- Learning mode enforces read-only SQL.
- Free mode can allow writes (configurable).
- Backend auto-heals missing tables/columns for common learning queries.

NoSQL:
- Endpoint: POST /api/nosql/execute
- Parser accepts Mongo-like syntax: db.collection.op(...)
- Learning mode allows read-only ops only.
- Free mode allows write ops (configurable).
- If MongoDB is unreachable, learning mode uses offline in-memory data.

## 6) Authentication model
- Role-based login via /api/auth/login.
- Student auth uses a pre-approved allowlist.
- Staff/Admin auth uses allowlist credentials.
- Other User auto-creates an account on first login and persists progress in MongoDB.
- JWT tokens stored in localStorage and attached to API calls.

## 7) Progress and learning model
- Learning content is defined in src/data/levels.js.
- Each question defines expected patterns (tokens or scripts) and allowed blocks.
- Progress is stored per user and synced via POST /api/user/progress.
- Score increases on correct answers; levels unlock sequentially.

## 8) Reporting and certificates
- HOD/Staff dashboard aggregates progress per section and year.
- Admin can generate reports by year (and optionally section).
- Certificates are generated on the client (PDF/PNG) and logged to the backend.

## 9) Key backend modules
- server.js: Express routes, auth, rate limits, CORS, SQL/NoSQL execution.
- backend/db.js: MySQL/MongoDB connections, schema guard, progress storage, dashboards.

## 10) Operational notes
- Environment variables:
  - MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_PORT
  - MONGO_URI
  - JWT_SECRET, CORS_ORIGIN
- App can run locally with Vite + Express (dev:full script).
- If MongoDB or MySQL is unavailable, the app degrades gracefully in some flows.

## 11) Suggested review talking points
- Visual programming pipeline: blocks -> query -> execution -> feedback loop.
- Safe learning constraints: read-only enforcement and offline fallback.
- Progress tracking and analytics for academic monitoring.
- Role-based access (Student vs Staff/Admin vs Other User).

## 12) Quick demo script (2-3 minutes)
1) Login as Student, open SQL Builder.
2) Assemble a simple SELECT in Learning Mode and execute.
3) Show automatic progress update.
4) Switch to profile and show certificate locked/unlocked logic.
5) Login as Admin and open dashboard; generate year report.
