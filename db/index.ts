// import 'dotenv/config';
import { createPool } from 'mysql2/promise';
import {config} from "../config/config";

export const pool = createPool({
    host: config.dbHostname,
    port: 3306,
    database: config.dbName,
    user: config.dbUser,
    password: config.dbPassword,
    decimalNumbers: true,
    namedPlaceholders: true,
})