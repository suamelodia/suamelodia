import { query, getById, create, update, remove } from './dbUtils';

export async function getContratosByEvento(eventoId: number) {
  const res = await query('SELECT * FROM Contrato WHERE id_evento = $1', [eventoId]);
  return res.rows;
}

export async function getContratosAvailableByEvento(eventoId: number) {
  const res = await query('SELECT * FROM Contrato WHERE id_evento = $1 AND id_aplicacao IS NULL', [eventoId]);
  return res.rows;
}

export async function getContratosAvailableByEventoAndArtist(eventoId: number, artistaId: number) {
  const res = await query('SELECT c.* FROM Contrato c WHERE c.id_evento = $1 AND c.id_aplicacao IS NULL AND c.id_contrato NOT IN (SELECT a.id_contrato FROM Aplicacao a WHERE a.id_artista = $2)', [eventoId, artistaId]);
  return res.rows;
}

export async function createContrato(data: any) {
  return create('Contrato', data);
}

export async function updateContrato(id: number, data: any) {
  return update('Contrato', id, data);
}

export async function updateIdAplicacaoContrato(id: number, id_aplicacao: number) {
  return update('Contrato', id, { id_aplicacao });
}

export async function deleteContrato(id: number) {
  return remove('Contrato', id);
}

export async function getContratoById(id: number) {
  return getById('Contrato', id);
}

export async function getContratosByProprietarioId(proprietarioId: number) {
  const res = await query('SELECT * FROM Contrato WHERE id_proprietario = $1', [proprietarioId]);
  return res.rows;
}

export async function getContratosByUserId(id: number) {
  return getById('Contrato', id);
}

