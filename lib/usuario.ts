import { query, getById, create, update, remove } from './dbUtils';

export async function getUserByEmail(email: string) {
  const res = await query('SELECT * FROM Usuario WHERE email = $1', [email]);
  return res.rows[0];
}

export async function createUser(data: any) {
  return create('Usuario', data);
}

export async function updateUser(id: number, data: any) {
  return update('Usuario', id, data);
}

export async function deleteUser(id: number) {
  return remove('Usuario', id);
}

export async function getUserById(id: number) {
  return getById('Usuario', id);
}

