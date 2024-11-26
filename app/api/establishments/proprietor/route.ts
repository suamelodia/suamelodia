import { NextResponse } from 'next/server'
import { query } from '@/lib/dbUtils'

async function getCurrentUserId() {
    return process.env.USER_ID;
}

export async function GET() {
    try {
        const userId = await getCurrentUserId()
        const sql = `
      SELECT e.*
      FROM Estabelecimento e
      JOIN Proprietario p ON e.id_proprietario = p.id_proprietario
      WHERE p.id_usuario = $1
    `
        const res = await query(sql, [userId])
        return NextResponse.json(res.rows)
    } catch (error) {
        console.error('Failed to fetch proprietor establishments:', error)
        return NextResponse.json({ error: 'Failed to fetch establishments' }, { status: 500 })
    }
}

