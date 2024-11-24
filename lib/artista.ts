import { query, getById, create, update, remove } from './dbUtils';

export async function getArtistaByUserId(userId: number) {
  const res = await query('SELECT * FROM Artista WHERE id_usuario = $1', [userId]);
  return res.rows[0];
}

export async function createArtista(data: any) {
  return create('Artista', data);
}

export async function updateArtista(id: number, data: any) {
  return update('Artista', id, data);
}

export async function deleteArtista(id: number) {
  return remove('Artista', id);
}

export async function getArtistaById(id: number) {
  return getById('Artista', id);
}

