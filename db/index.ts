import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    port: 3306,
    database: 'advertisments_map',
    user: 'root',
    password: '',
    decimalNumbers: true,
    namedPlaceholders: true,
})