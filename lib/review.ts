import { query } from './dbUtils';

export async function getReviewsByArtistId(artistId: number) {
  const sql = `
    SELECT a.*, u_sender.nome as sender_name, u_sender.imagemPerfil as sender_image
    FROM Avaliacao a
    JOIN Usuario u_sender ON a.id_usuario_envia = u_sender.id_usuario
    JOIN Artista ar ON ar.id_usuario = $1
    WHERE a.id_usuario_recebe = ar.id_usuario
    ORDER BY a.data DESC
  `
  const res = await query(sql, [artistId])
  return res.rows
}

export async function getSentReviews(userId: number, searchTerm: string = '') {
  const sql = `
    SELECT a.*, u_receiver.nome as receiver_name
    FROM Avaliacao a
    JOIN Usuario u_receiver ON a.id_usuario_recebe = u_receiver.id_usuario
    WHERE a.id_usuario_envia = $1 AND (u_receiver.nome ILIKE $2 OR a.comentario ILIKE $2)
    ORDER BY a.data DESC
  `
  const res = await query(sql, [userId, `%${searchTerm}%`])
  return res.rows
}

export async function getReceivedReviews(userId: number, searchTerm: string = '') {
  const sql = `
    SELECT a.*, u_sender.nome as sender_name
    FROM Avaliacao a
    JOIN Usuario u_sender ON a.id_usuario_envia = u_sender.id_usuario
    WHERE a.id_usuario_recebe = $1 AND (u_sender.nome ILIKE $2 OR a.comentario ILIKE $2)
    ORDER BY a.data DESC
  `
  const res = await query(sql, [userId, `%${searchTerm}%`])
  return res.rows
}

export async function updateReview(id: number, data: { nota: number, comentario: string }) {
  const sql = `
    UPDATE Avaliacao
    SET nota = $1, comentario = $2
    WHERE id_avaliacao = $3
    RETURNING *
  `
  const res = await query(sql, [data.nota, data.comentario, id])
  return res.rows[0]
}

export async function deleteReview(id: number) {
  const sql = `
    DELETE FROM Avaliacao
    WHERE id_avaliacao = $1
  `
  await query(sql, [id])
}

