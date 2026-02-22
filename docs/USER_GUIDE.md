# DualDB Query Architect - User Guide

Audience: Non-technical stakeholders
Version: February 19, 2026

## 1) What this platform is
DualDB Query Architect is an academic learning platform that teaches SQL and NoSQL concepts through a visual, block-based interface. Learners assemble blocks to build queries and run them against a managed database sandbox.

The platform supports two roles:
- Students: Learn SQL and NoSQL through guided levels, earn certificates.
- HOD (Staff): View academic progress analytics by section.

## 2) How users sign in
### Students
- Choose "Student" on the login screen.
- Register with username, email, password, department section, and roll number.
- Sign in with email and password.

### HOD (Staff)
- Choose "Staff" on the login screen.
- Register with username, email, password, and the HOD access code.
- Sign in with email and password.

Note: HOD registration requires an access code configured by the system admin.

## 3) Student journey
### 3.1 Landing page
After login, students see two learning tracks:
- SQL Builder (relational databases)
- NoSQL Builder (document databases)

Each track can be launched independently.

### 3.2 Learning modes
Inside a track, there are two modes:
- Free Builder: Explore and run queries freely (within safe limits).
- Learning Mode: Step-by-step questions with validation and scoring.

### 3.3 Learning Mode experience
- A level map appears on the left.
- Each level contains multiple questions.
- Correct answers unlock new levels and award points.
- Progress is saved automatically.

### 3.4 Running queries
- Assemble blocks in the center workspace.
- The generated query appears on the right.
- Click EXECUTE to run.

Results are shown in a table (SQL) or JSON format (NoSQL).

### 3.5 Viewing schemas and ER diagrams
- "View Schema" shows the sample data fields.
- "ER Diagram" visualizes tables and relationships when DDL statements are used.

### 3.6 Profile and certificates
- "My Profile" shows SQL and NoSQL progress.
- Certificates unlock after 100% completion for a track.
- Certificates can be downloaded as PDF or image.

## 4) HOD (Staff) dashboard
HOD users see a section-based analytics dashboard:
- Average completed questions per section.
- Student counts by section.
- Top student per section.
- Detailed student progress table.

HOD users cannot execute student learning activities.

## 5) What data is stored
- User profiles (username, email, role, section, roll number).
- Learning progress (completed questions, completed levels, score).
- Certificate issuance events (metadata only).

Passwords are stored as secure hashes.

## 6) System behavior and limits
- The database sandbox limits unsafe write operations in Learning Mode.
- The system can fall back to offline NoSQL simulation if MongoDB is unavailable.
- SQL initialization can be temporarily degraded without stopping the app.

## 7) Troubleshooting
- Login fails: verify email/password and role selection.
- HOD registration fails: ensure HOD access code is set by admin.
- Cannot execute query: verify internet or backend is running.
- NoSQL offline notice: MongoDB is unreachable; learning still works with a limited local simulation.

## 8) Quick start checklist
- Student: Register -> choose SQL or NoSQL -> Learning Mode -> complete levels.
- HOD: Register with access code -> open dashboard -> filter by section.

## 9) Contact and support
For account access or HOD access code issues, contact the system administrator.
