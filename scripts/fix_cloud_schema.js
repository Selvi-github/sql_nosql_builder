import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const CLOUD_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    multipleStatements: true
};

const SEED_DATA = [
    { name: 'Rohan Sharma', email: 'rohan.sharma@gmail.com', age: 25, city: 'Delhi', phone: '9876543210', gender: 'Male', firstname: 'Rohan', lastname: 'Sharma', salary: 50000 },
    { name: 'Priya Verma', email: 'priya.v@yahoo.com', age: 30, city: 'Mumbai', phone: null, gender: 'Female', firstname: 'Priya', lastname: 'Verma', salary: 60000 },
    { name: 'Amit Singh', email: null, age: 35, city: 'Chennai', phone: '9123456789', gender: 'Male', firstname: 'Amit', lastname: 'Singh', salary: 55000 },
    { name: 'Sneha Gupta', email: 'sneha.g@gmail.com', age: 22, city: 'Bangalore', phone: '9988776655', gender: 'Female', firstname: 'Sneha', lastname: 'Gupta', salary: 45000 },
    { name: 'Rahul Roy', email: 'rahul.roy@outlook.com', age: 28, city: 'Kolkata', phone: null, gender: 'Male', firstname: 'Rahul', lastname: 'Roy', salary: 48000 },
    { name: 'Anjali Das', email: 'anjali.d@gmail.com', age: 26, city: 'Delhi', phone: '9876500000', gender: 'Female', firstname: 'Anjali', lastname: 'Das', salary: 52000 },
    { name: 'Vikram Malhotra', email: 'vikram.m@gmail.com', age: 40, city: 'Mumbai', phone: '9000012345', gender: 'Male', firstname: 'Vikram', lastname: 'Malhotra', salary: 75000 },
    { name: 'Pooja Reddy', email: 'pooja.r@hotmail.com', age: 32, city: 'Hyderabad', phone: null, gender: 'Female', firstname: 'Pooja', lastname: 'Reddy', salary: 62000 },
    { name: 'Karan Mehra', email: 'karan.m@gmail.com', age: 29, city: 'Pune', phone: '8888899999', gender: 'Male', firstname: 'Karan', lastname: 'Mehra', salary: 58000 },
    { name: 'Nisha Kapoor', email: null, age: 24, city: 'Chennai', phone: '7777766666', gender: 'Female', firstname: 'Nisha', lastname: 'Kapoor', salary: 47000 },
    { name: 'Suresh Raina', email: 'suresh.r@gmail.com', age: 34, city: 'Bangalore', phone: '9998887776', gender: 'Male', firstname: 'Suresh', lastname: 'Raina', salary: 65000 },
    { name: 'Meera Iyer', email: 'meera.i@yahoo.com', age: 27, city: 'Mumbai', phone: null, gender: 'Female', firstname: 'Meera', lastname: 'Iyer', salary: 53000 },
    { name: 'Arjun Rampal', email: 'arjun.r@gmail.com', age: 45, city: 'Delhi', phone: '9111122222', gender: 'Male', firstname: 'Arjun', lastname: 'Rampal', salary: 80000 },
    { name: 'Divya Spandana', email: 'divya.s@gmail.com', age: 31, city: 'Bangalore', phone: '8000090000', gender: 'Female', firstname: 'Divya', lastname: 'Spandana', salary: 60000 },
    { name: 'Kabir Khan', email: null, age: 38, city: 'Hyderabad', phone: '7000080000', gender: 'Male', firstname: 'Kabir', lastname: 'Khan', salary: 70000 },
    { name: 'Riya Sen', email: 'riya.s@gmail.com', age: 23, city: 'Kolkata', phone: null, gender: 'Female', firstname: 'Riya', lastname: 'Sen', salary: 46000 },
    { name: 'Varun Dhawan', email: 'varun.d@gmail.com', age: 25, city: 'Mumbai', phone: '9555544444', gender: 'Male', firstname: 'Varun', lastname: 'Dhawan', salary: 72000 },
    { name: 'Sana Khan', email: 'sana.k@yahoo.com', age: 29, city: 'Delhi', phone: '9444433333', gender: 'Female', firstname: 'Sana', lastname: 'Khan', salary: 55000 },
    { name: 'Raj Kumar', email: 'raj.k@gmail.com', age: 55, city: 'Chennai', phone: null, gender: 'Male', firstname: 'Raj', lastname: 'Kumar', salary: 90000 },
    { name: 'Lata Mangeshkar', email: null, age: 60, city: 'Mumbai', phone: '9222211111', gender: 'Female', firstname: 'Lata', lastname: 'Mangeshkar', salary: 95000 },
    { name: 'Ajay Devgn', email: 'ajay.d@gmail.com', age: 52, city: 'Delhi', phone: '9100020000', gender: 'Male', firstname: 'Ajay', lastname: 'Devgn', salary: 85000 },
    { name: 'Deepika Padukone', email: 'deepika.p@gmail.com', age: 36, city: 'Bangalore', phone: null, gender: 'Female', firstname: 'Deepika', lastname: 'Padukone', salary: 88000 },
    { name: 'Ranveer Singh', email: 'ranveer.s@gmail.com', age: 36, city: 'Mumbai', phone: '9333322222', gender: 'Male', firstname: 'Ranveer', lastname: 'Singh', salary: 87000 },
    { name: 'Alia Bhatt', email: 'alia.b@gmail.com', age: 28, city: 'Mumbai', phone: '9666655555', gender: 'Female', firstname: 'Alia', lastname: 'Bhatt', salary: 82000 },
    { name: 'Ranbir Kapoor', email: null, age: 39, city: 'Mumbai', phone: null, gender: 'Male', firstname: 'Ranbir', lastname: 'Kapoor', salary: 89000 },
    // Specific edge case data
    { name: 'John Doe', email: 'john.doe@example.com', age: 20, city: 'New York', phone: '1234567890', gender: 'Male', firstname: 'John', lastname: null, salary: 40000 },
    { name: 'Jane Doe', email: 'jane.doe@example.com', age: 19, city: 'London', phone: '0987654321', gender: 'Female', firstname: 'Jane', lastname: 'Doe', salary: 42000 },
    { name: 'Bob Smith', email: 'bob.smith@example.com', age: 51, city: 'Paris', phone: '1122334455', gender: 'Male', firstname: 'Bob', lastname: 'Smith', salary: 60000 }
];

const SEED_PRODUCTS = [
    { product_name: 'Laptop', price: 1200.00, category: 'Electronics', in_stock: true },
    { product_name: 'Smartphone', price: 800.00, category: 'Electronics', in_stock: true },
    { product_name: 'Desk Chair', price: 150.00, category: 'Furniture', in_stock: true },
    { product_name: 'Table', price: 300.00, category: 'Furniture', in_stock: false },
    { product_name: 'Headphones', price: 100.00, category: 'Electronics', in_stock: true }
];

const SEED_EMPLOYEES = [
    { first_name: 'Alice', last_name: 'Johnson', department: 'HR', salary: 60000, hire_date: '2020-01-15' },
    { first_name: 'Bob', last_name: 'Williams', department: 'Engineering', salary: 80000, hire_date: '2019-03-10' },
    { first_name: 'Charlie', last_name: 'Brown', department: 'Sales', salary: 55000, hire_date: '2021-06-20' },
    { first_name: 'David', last_name: 'Miller', department: 'Engineering', salary: 90000, hire_date: '2018-11-05' },
    { first_name: 'Eve', last_name: 'Davis', department: 'HR', salary: 62000, hire_date: '2020-08-12' }
];

const SEED_ORDERS = [
    { user_id: 1, product_id: 1, quantity: 1, amount: 1200.00, order_date: '2023-01-01' },
    { user_id: 2, product_id: 2, quantity: 2, amount: 1600.00, order_date: '2023-01-05' },
    { user_id: 1, product_id: 3, quantity: 1, amount: 150.00, order_date: '2023-02-10' },
    { user_id: 3, product_id: 1, quantity: 1, amount: 1200.00, order_date: '2023-03-15' },
    { user_id: 2, product_id: 5, quantity: 3, amount: 300.00, order_date: '2023-04-20' }
];

async function fixSchema() {
    console.log(`📡 Connecting to Cloud SQL (${CLOUD_CONFIG.host})...`);
    let connection;

    try {
        connection = await mysql.createConnection(CLOUD_CONFIG);
        console.log('✅ Connected.');

        // Disable Foreign Key Checks
        await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
        console.log('🔓 FK Checks Disabled.');

        // 1. DROP and RECREATE Table (Nuclear Option - Guaranteed to fix schema mismatch)
        console.log('💥 DROP and RECREATE table...');

        await connection.execute('DROP TABLE IF EXISTS users');

        // Recreate with perfect schema matching requirements
        // All fields nullable except ID, allowing maximum flexibility for partial data
        await connection.execute(`
            CREATE TABLE users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                age INT,
                city VARCHAR(50),
                salary DECIMAL(10, 2),
                firstname VARCHAR(50),
                lastname VARCHAR(50),
                gender VARCHAR(10),
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table users recreated successfully.');

        // 2. Insert Seed Data
        console.log('🌱 Seeding data...');
        const insertQuery = `
            INSERT INTO users (name, email, age, city, phone, gender, firstname, lastname, salary)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const user of SEED_DATA) {
            await connection.execute(insertQuery, [
                user.name, user.email, user.age, user.city, user.phone, user.gender, user.firstname, user.lastname, user.salary
            ]);
        }

        // --- PRODUCTS ---
        console.log('💥 DROP and RECREATE table products...');
        await connection.execute('DROP TABLE IF EXISTS products');
        await connection.execute(`
            CREATE TABLE products (
                product_id INT AUTO_INCREMENT PRIMARY KEY,
                product_name VARCHAR(200),
                price DECIMAL(10, 2),
                category VARCHAR(50),
                in_stock BOOLEAN DEFAULT true,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table products recreated.');

        console.log('🌱 Seeding products...');
        for (const p of SEED_PRODUCTS) {
            await connection.execute('INSERT INTO products (product_name, price, category, in_stock) VALUES (?, ?, ?, ?)',
                [p.product_name, p.price, p.category, p.in_stock]);
        }

        // --- EMPLOYEES ---
        console.log('💥 DROP and RECREATE table employees...');
        await connection.execute('DROP TABLE IF EXISTS employees');
        await connection.execute(`
            CREATE TABLE employees (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                department VARCHAR(50),
                salary DECIMAL(10, 2),
                hire_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table employees recreated.');

        console.log('🌱 Seeding employees...');
        for (const emp of SEED_EMPLOYEES) {
            await connection.execute('INSERT INTO employees (first_name, last_name, department, salary, hire_date) VALUES (?, ?, ?, ?, ?)',
                [emp.first_name, emp.last_name, emp.department, emp.salary, emp.hire_date]);
        }

        // --- ORDERS (Dependent on users and products) ---
        console.log('💥 DROP and RECREATE table orders...');
        await connection.execute('DROP TABLE IF EXISTS orders');
        await connection.execute(`
            CREATE TABLE orders (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                product_id INT,
                quantity INT,
                amount DECIMAL(10, 2),
                order_date DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Table orders recreated.');

        console.log('🌱 Seeding orders...');
        for (const ord of SEED_ORDERS) {
            // Ensure IDs exist (user 1-3, product 1-5 exist in seeds)
            await connection.execute('INSERT INTO orders (user_id, product_id, quantity, amount, order_date) VALUES (?, ?, ?, ?, ?)',
                [ord.user_id, ord.product_id, ord.quantity, ord.amount, ord.order_date]);
        }

        console.log(`✅ Successfully inserted ${SEED_DATA.length} users, ${SEED_PRODUCTS.length} products, ${SEED_EMPLOYEES.length} employees, ${SEED_ORDERS.length} orders.`);
        process.exit(0);

    } catch (e) {
        console.error('❌ Error fixing schema:', JSON.stringify(e, null, 2));
        process.exit(1);
    } finally {
        if (connection) {
            await connection.execute('SET FOREIGN_KEY_CHECKS = 1'); // Re-enable
            await connection.end();
        }
    }
}

fixSchema();
