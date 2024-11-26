import pool from './db';
import { QueryResult } from 'pg';

export async function query(text: string, params?: any[]): Promise<QueryResult> {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error; // Re-throwing the error so that it's propagated
  }
}

export async function getById(table: string, id: number): Promise<any> {
  const res = await query(`SELECT * FROM ${table} WHERE id_${table.toLowerCase()} = $1`, [id]);
  return res.rows[0];
}

export async function create(table: string, data: any): Promise<any> {
  console.log('Creating record with data:', data); // Adicionando log para verificar os dados

  // Remover o campo id_evento (ou qualquer campo auto-incremento) do objeto data
  const { id_evento, ...dataWithoutId } = data;

  // Obter as chaves e valores dos dados sem o campo id_evento
  const keys = Object.keys(dataWithoutId);
  const values = Object.values(dataWithoutId);

  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const columns = keys.join(', ');

  // Log para a query antes de executar
  const queryText = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
  console.log('Executing query:', queryText, 'with values:', values);

  // Executar a consulta
  const res = await query(queryText, values);

  // Retornar o primeiro registro inserido
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

  // Verificar se rowCount é um número válido antes de fazer a comparação
  return res.rowCount !== null && res.rowCount > 0;
}
