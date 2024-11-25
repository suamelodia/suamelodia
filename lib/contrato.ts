import { query, getById, create, update, remove } from './dbUtils';

export async function getContratosByEvento(eventoId: number) {
  const res = await query('SELECT * FROM Contrato WHERE id_evento = $1', [eventoId]);
  return res.rows;
}

export async function getContratosAvailableByEvento(eventoId: number) {
  const res = await query('SELECT * FROM Contrato WHERE id_evento = $1 AND id_aplicacao IS NULL', [eventoId]);
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

