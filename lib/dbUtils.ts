import pool from './db';
import { QueryResult } from 'pg';

export async function query(text: string, params?: any[]): Promise<QueryResult> {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function getById(table: string, id: number): Promise<any> {
  const res = await query(`SELECT * FROM ${table} WHERE id_${table.toLowerCase()} = $1`, [id]);
  return res.rows[0];
}

export async function create(table: string, data: any): Promise<any> {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const columns = keys.join(', ');

  const res = await query(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
    values
  );
  return res.rows[0];
}

export async function update(table: string, id: number, data: any): Promise<any> {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');

  const res = await query(
    `UPDATE ${table} SET ${setClause} WHERE id_${table.toLowerCase()} = $1 RETURNING *`,
    [id, ...values]
  );

  return res.rows[0];
}

export async function remove(table: string, id: number): Promise<boolean> {
  const res = await query(`DELETE FROM ${table} WHERE id_${table.toLowerCase()} = $1`, [id]);
  return res.rowCount > 0;
}

