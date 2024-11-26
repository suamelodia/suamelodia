import { query, getById, create, update, remove } from './dbUtils';

export async function getAplicacoesByContrato(contratoId: number) {
  const res = await query('SELECT * FROM Aplicacao WHERE id_contrato = $1', [contratoId]);
  return res.rows;
}

export async function getAplicacoesByContratoFromArtist(contratoId: number) {
  const res = await query('SELECT * FROM Aplicacao WHERE id_contrato = $1 AND From_Artist = true AND (status_aplicacao <> $2 AND is_accepted = false)', [contratoId, 'Concluída']);
  return res.rows;
}

export async function getAplicacoesByContratoFromProprietario(contratoId: number) {
  const res = await query('SELECT * FROM Aplicacao WHERE id_contrato = $1 AND From_Artist = false', [contratoId]);
  return res.rows;
}

export async function getAplicacoesByArtista(artistaId: number) {
  const res = await query('SELECT * FROM Aplicacao WHERE id_artista = $1', [artistaId]);
  return res.rows;
}

export async function createAplicacao(data: any) {
  return create('Aplicacao', data);
}

export async function updateAplicacao(id: number, data: any) {
  return update('Aplicacao', id, data);
}

export async function deleteAplicacao(id: number) {
  return remove('Aplicacao', id);
}

export async function getAplicacaoById(id: number) {
  return getById('Aplicacao', id);
}

