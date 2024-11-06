import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cursoaluno',
    password: '1228',
    port: 5432,
});

export const query = (text: string, params?: (string | number)[]) => pool.query(text, params);