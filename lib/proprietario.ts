import { query, getById, create, update, remove } from './dbUtils';

export async function getProprietarioByUserId(userId: number) {
  const res = await query('SELECT * FROM Proprietario WHERE id_usuario = $1', [userId]);
  return res.rows[0];
}

export async function createProprietario(data: any) {
  return create('Proprietario', data);
}

export async function updateProprietario(id: number, data: any) {
  return update('Proprietario', id, data);
}

export async function deleteProprietario(id: number) {
  return remove('Proprietario', id);
}

export async function getProprietarioById(id: number) {
  return getById('Proprietario', id);
}

