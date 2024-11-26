import { query, getById, create, update, remove } from './dbUtils';

export async function getEventosByEstabelecimento(estabelecimentoId: number) {
  const res = await query('SELECT * FROM Evento WHERE id_estabelecimento = $1', [estabelecimentoId]);
  return res.rows;
}

export async function getEventosByProprietarioId(proprietarioId: number) {
  const res = await query('SELECT ev.* FROM Evento ev JOIN Estabelecimento es ON ev.id_estabelecimento = es.id_estabelecimento WHERE id_proprietario = $1', [proprietarioId]);
  return res.rows;
}

export async function createEvento(data: any) {
  return create('Evento', data);
}

export async function updateEvento(id: number, data: any) {
  return update('Evento', id, data);
}

export async function deleteEvento(id: number) {
  return remove('Evento', id);
}

export async function getEventoById(id: number) {
  return getById('Evento', id);
}

