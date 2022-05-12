import 'dotenv/config';
import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: '',
    decimalNumbers: true,
    namedPlaceholders: true,
})