# Project Guide: SQL/NoSQL Blockly Dashboard

This guide explains how the system works end-to-end, focusing on the important flows (Blockly blocks, query generation, execution, and learning mode). It does not document every single line, but it covers the core behavior and where it is implemented.

## 1) Big-picture architecture

- Frontend: React + Vite. The UI builds queries using Blockly blocks, shows the generated code, and submits it to the backend.
- Backend: Express server that handles auth, query execution, and persistence (MySQL + MongoDB).

Key files:
- Frontend entry: [src/main.jsx](src/main.jsx)
- App shell and routing: [src/App.jsx](src/App.jsx)
- Game UI layout and run button: [src/components/layout/GameLayout.jsx](src/components/layout/GameLayout.jsx)
- Blockly editor: [src/components/game/BlocklyEditor.jsx](src/components/game/BlocklyEditor.jsx)
- Block definitions (SQL/NoSQL): [src/blocks/sql/definitions.js](src/blocks/sql/definitions.js), [src/blocks/nosql/definitions.js](src/blocks/nosql/definitions.js)
- Block generators (SQL/NoSQL): [src/blocks/sql/generators.js](src/blocks/sql/generators.js), [src/blocks/nosql/generators.js](src/blocks/nosql/generators.js)
- Learning levels and questions: [src/data/levels.js](src/data/levels.js)
- Learning validation logic: [src/utils/queryValidator.js](src/utils/queryValidator.js)
- Server API routes: [server.js](server.js)
- Database access layer: [backend/db.js](backend/db.js)

## 2) UI flow (what the user sees)

- The app starts in `LOGIN`, then moves to `LANDING`, then to `SQL` or `NoSQL` views. This routing is handled in [src/App.jsx](src/App.jsx).
- In `SQL` or `NoSQL` views, the app wraps the UI in `GameProvider` (progress and level state) and renders `GameLayout`. See [src/App.jsx](src/App.jsx).
- `GameLayout` is the main screen: left side is the level map (Learning mode only), center is the Blockly workspace, right side shows the generated query and execution results. See [src/components/layout/GameLayout.jsx](src/components/layout/GameLayout.jsx).

## 3) Blockly blocks: how blocks are created

Blockly has two layers in this repo:

1) **Block definitions (UI shape + fields)**
   - SQL blocks are defined as JSON objects in [src/blocks/sql/definitions.js](src/blocks/sql/definitions.js).
   - NoSQL blocks are defined in [src/blocks/nosql/definitions.js](src/blocks/nosql/definitions.js).
   - These definitions control the visual shape, inputs, dropdowns, and default values.

2) **Generators (block -> query string)**
   - SQL generators live in [src/blocks/sql/generators.js](src/blocks/sql/generators.js).
   - NoSQL generators live in [src/blocks/nosql/generators.js](src/blocks/nosql/generators.js).
   - Each generator returns a SQL or NoSQL string. For example:
     - `sql_create_table` returns a `DROP TABLE IF EXISTS ...; CREATE TABLE ...;` statement.
     - `sql_select` returns a `SELECT ... FROM ... WHERE ...;` statement.
     - `nosql_find` returns `db.collection.find(...)`.

## 4) Blockly workspace and live code generation

The Blockly editor is created in [src/components/game/BlocklyEditor.jsx](src/components/game/BlocklyEditor.jsx).

Important behavior:
- The component registers all SQL + NoSQL block definitions and all generator functions.
- Blockly generates code on every block change by calling `javascriptGenerator.workspaceToCode(workspace)`.
- The generated SQL/NoSQL string is passed up to the parent via `onCodeChange`.

This is the central bridge: **blocks -> code string**.

## 5) How the generated query runs

The “Execute” button is in `GameLayout`:
- It takes the current `generatedCode` string and POSTs it to the backend.
- Endpoint depends on mode:
  - SQL: `/api/sql/execute`
  - NoSQL: `/api/nosql/execute`
- The request includes `mode` (FREE or LEARN) and a Bearer token.

See [src/components/layout/GameLayout.jsx](src/components/layout/GameLayout.jsx).

## 6) Learning mode vs Free mode

`GameLayout` has two modes:
- **FREE**: run any query (subject to server policy).
- **LEARN**: the query is validated before execution.

Validation happens in [src/utils/queryValidator.js](src/utils/queryValidator.js):
- For SQL, it checks whether required tokens are present (structure-based).
- For NoSQL, it compares normalized scripts for matching patterns.

In LEARN mode, a correct query updates progress in `GameContext`.

## 7) Level and progress system

The learning content lives in [src/data/levels.js](src/data/levels.js):
- Each level has multiple questions.
- Each question includes `expectedPattern` and a list of `allowedBlocks`.

Progress and scoring are managed in [src/context/GameContext.jsx](src/context/GameContext.jsx):
- It tracks current level, current question, completed questions, and score.
- It posts progress to `/api/user/progress` after correct answers.

The level UI is rendered by [src/components/game/LevelMap.jsx](src/components/game/LevelMap.jsx).

## 8) Backend API: SQL execution

The SQL execution path is:
1) Frontend POST to `/api/sql/execute` in [server.js](server.js).
2) The server checks free mode and read-only policy.
3) The server calls `db.executeSql(...)` in [backend/db.js](backend/db.js).
4) `executeSql` uses the MySQL pool and runs the query.

Free mode behavior in SQL:
- It tries to use a per-user database named `qa_free_<userId>`.
- If CREATE DATABASE is not allowed, it falls back to the shared DB (`MYSQL_DB`).

## 9) Backend API: NoSQL execution

The NoSQL execution path is:
1) Frontend POST to `/api/nosql/execute` in [server.js](server.js).
2) The server parses the `db.collection.op(...)` syntax and executes it.
3) Allowed operations depend on FREE vs LEARN mode.
4) The server executes on MongoDB (or offline in-memory mode if Mongo is down).

Logic lives in [server.js](server.js) and database access lives in [backend/db.js](backend/db.js).

## 10) Auth and user state

- Login/Register/Me endpoints are in [server.js](server.js).
- User profile and progress are stored in MongoDB via helpers in [backend/db.js](backend/db.js).

The frontend stores a JWT in localStorage (`qa_auth`) and sends it with each request.

## 11) Where to change things

Common changes and where to apply them:
- Add or modify SQL blocks: [src/blocks/sql/definitions.js](src/blocks/sql/definitions.js)
- Add or modify SQL code output: [src/blocks/sql/generators.js](src/blocks/sql/generators.js)
- Add or modify NoSQL blocks: [src/blocks/nosql/definitions.js](src/blocks/nosql/definitions.js)
- Add or modify NoSQL output: [src/blocks/nosql/generators.js](src/blocks/nosql/generators.js)
- Change query validation rules: [src/utils/queryValidator.js](src/utils/queryValidator.js)
- Change learning content: [src/data/levels.js](src/data/levels.js)
- Change SQL/NoSQL execution policy: [server.js](server.js) and [backend/db.js](backend/db.js)

## 12) Summary: blocks -> DB in one sentence

**Blocks are defined in `definitions.js`, turned into SQL/NoSQL strings by `generators.js`, then sent by `GameLayout` to the backend (`server.js`), which executes them via `backend/db.js`.**
