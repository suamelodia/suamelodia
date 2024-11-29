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

export async function updateEvento(id: number, data: any, userId: number) {
  const { data_inicio, data_termino, tipo, status, descricao, id_estabelecimento } = data;

  const sql = `
    UPDATE Evento
    SET 
      data_inicio = $1,
      data_termino = $2,
      tipo = $3,
      status = $4,
      descricao = $5,
      id_estabelecimento = $6
    WHERE id_evento = $7
    AND id_estabelecimento = $8
    AND EXISTS (
      SELECT 1
      FROM Estabelecimento
      WHERE id_estabelecimento = $8
      AND id_proprietario = (
        SELECT id_proprietario 
        FROM Proprietario 
        WHERE id_usuario = $9
      )
    )
    RETURNING *;
  `;

  const res = await query(sql, [
    data_inicio,
    data_termino,
    tipo,
    status,
    descricao,
    id_estabelecimento,
    id,
    id_estabelecimento,
    userId
  ]);

  return res.rows[0];
}

export async function deleteEvento(id: number, userId: number) {
  const sql = `
    DELETE FROM Evento
    WHERE id_evento = $1
    AND id_estabelecimento IN (
      SELECT id_estabelecimento FROM Estabelecimento
      WHERE id_proprietario = (
        SELECT id_proprietario 
        FROM Proprietario 
        WHERE id_usuario = $2
      )
    )
    RETURNING *;
  `;

  const res = await query(sql, [id, userId]);
  return res.rowCount > 0;  // Retorna true se o evento foi deletado, caso contrário, false
}

export async function getEventoById(id: number) {
  return getById('Evento', id);
}

