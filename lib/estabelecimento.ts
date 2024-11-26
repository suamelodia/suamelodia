import { query } from './dbUtils'

export async function getEstabelecimentoByProprietarioId(userId: number) {
    const sql = `
    SELECT e.*
    FROM Estabelecimento e
    JOIN Proprietario p ON e.id_proprietario = p.id_proprietario
    WHERE p.id_usuario = $1
  `
    const res = await query(sql, [userId])
    return res.rows
}

export async function createEstabelecimento(data: any) {
    const { nome, endereco, tipo, capacidade, id_proprietario } = data
    const sql = `
    INSERT INTO Estabelecimento (nome, endereco, tipo, capacidade, id_proprietario)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `
    const res = await query(sql, [nome, endereco, tipo, capacidade, id_proprietario])
    return res.rows[0]
}

export async function getEstabelecimentoById(id: number) {
    const sql = 'SELECT * FROM Estabelecimento WHERE id_estabelecimento = $1'
    const res = await query(sql, [id])
    return res.rows[0]
}

export async function updateEstabelecimento(id: number, data: any, userId: number) {
    const { nome, endereco, tipo, capacidade } = data
    const sql = `
    UPDATE Estabelecimento
    SET nome = $1, endereco = $2, tipo = $3, capacidade = $4
    WHERE id_estabelecimento = $5
    AND id_proprietario = (SELECT id_proprietario FROM Proprietario WHERE id_usuario = $6)
    RETURNING *
  `
    const res = await query(sql, [nome, endereco, tipo, capacidade, id, userId])
    return res.rows[0]
}

export async function deleteEstabelecimento(id: number, userId: number) {
    const sql = `
    DELETE FROM Estabelecimento
    WHERE id_estabelecimento = $1
    AND id_proprietario = (SELECT id_proprietario FROM Proprietario WHERE id_usuario = $2)
  `
    const res = await query(sql, [id, userId])
    return res.rowCount > 0
}

