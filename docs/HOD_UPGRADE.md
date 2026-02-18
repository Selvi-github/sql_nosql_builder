# HOD Upgrade Notes

This document summarizes the production-ready upgrade for section-based classification, HOD RBAC, and analytics.

## 1) Updated SQL Schema

The SQL schema is managed by the schema guard and auto-heal logic. The following columns are now required in the learning tables:

- users
  - department_section
  - student_id
  - marks
  - attendance
- students
  - department_section
  - student_id
  - marks
  - attendance

SQL index creation is done at startup (best-effort, no failure if tables/columns are missing):

- users.department_section
- users.student_id
- users.marks
- students.department_section
- students.student_id
- students.marks

See:
- [backend/sqlSchemaRequirements.js](backend/sqlSchemaRequirements.js)
- [backend/db.js](backend/db.js)

## 2) Updated NoSQL Schema (MongoDB)

The users collection now includes:

- role: 'STUDENT' | 'HOD'
- department_section: 'CSE-A' | 'CSE-B' | 'CSE-C'
- student_id: string (defaults to string of _id)
- metrics: { marks: number, attendance: number }

Indexes:

- users.department_section
- users.student_id (sparse)
- users.metrics.marks
- users.role

See:
- [backend/db.js](backend/db.js)

## 3) Role-Based Access Control (RBAC)

- Student-only endpoints: SQL/NoSQL init, SQL/NoSQL execute, progress update, certificate generation.
- HOD-only endpoint: /api/hod/dashboard

See:
- [server.js](server.js)

## 4) HOD Dashboard Query Logic

The dashboard uses a single aggregation pipeline to avoid N+1 queries:

- Match students
- Compute effectiveMarks / effectiveAttendance
- Group for section averages
- Sort + group for top student per section

The API also returns a student list (filtered by section in the UI).

See:
- [backend/db.js](backend/db.js)
- [server.js](server.js)

## 5) Security Improvements

- Separate HOD login + registration endpoints
- HOD registration requires HOD_SIGNUP_CODE
- Password hashing via bcrypt
- JWT auth with role checks

See:
- [server.js](server.js)
- [src/components/auth/Login.jsx](src/components/auth/Login.jsx)

## 6) Migration Strategy

1) Deploy backend changes (role/section defaults + indexes).
2) Ensure environment variable HOD_SIGNUP_CODE is set in production.
3) On first login, existing users are upgraded with:
   - role: STUDENT
   - department_section: CSE-A
   - metrics: { marks: 0, attendance: 0 }
   - student_id: string _id
4) SQL index creation runs at startup (best-effort).

No downtime required; all updates are backward compatible.

## 7) Testing Checklist

- Register student with department section (CSE-A/B/C)
- Student login works (HOD accounts blocked on /api/auth/login)
- HOD registration requires access code
- HOD login works with /api/auth/hod/login
- HOD cannot access student endpoints
- HOD dashboard loads analytics
- Section filter returns correct averages/top student
- SQL/NoSQL runs for students unchanged
- Indexes created successfully (check MongoDB + MySQL)
