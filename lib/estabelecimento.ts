import { query, getById, create, update, remove } from './dbUtils';

export async function getEstabelecimentoByProprietarioId(proprietarioId: number) {
    const res = await query('SELECT * FROM Estabelecimento WHERE id_proprietario = $1', [proprietarioId]);
    return res.rows[0];
}

export async function createEstabelecimento(data: any) {
    return create('Estabelecimento', data);
}

export async function updateEstabelecimento(id: number, data: any) {
    return update('Estabelecimento', id, data);
}

export async function deleteEstabelecimento(id: number) {
    return remove('Estabelecimento', id);
}

export async function getEstabelecimentoById(id: number) {
    return getById('Estabelecimento', id);
}

export async function getAllEstabelecimentos() {
    const res = await query('SELECT * FROM Estabelecimento');
    return res.rows;
}

