import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const CLOUD_CONFIG = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: false } : undefined
};

try {
    console.log(`Connecting to ${CLOUD_CONFIG.host}...`);
    connection = await mysql.createConnection(CLOUD_CONFIG);
    console.log('Connected.');

    const [userRows] = await connection.execute('DESCRIBE users');
    const [orderRows] = await connection.execute('DESCRIBE orders');

    const schema = {
        users: userRows,
        orders: orderRows
    };

    const fs = await import('fs/promises');
    await fs.writeFile('cloud_schema_output.json', JSON.stringify(schema, null, 2), 'utf8');
    console.log('Schema written to cloud_schema_output.json');

} catch (e) {
    if (e.code === 'ER_NO_SUCH_TABLE') {
        console.error('Table `users` does not exist!');
    } else {
        console.error('Error:', e);
    }
} finally {
    if (connection) await connection.end();
}
}

inspectSchema();
