import { NextResponse } from 'next/server'
import { createEstabelecimento, getEstabelecimentoByProprietarioId } from '@/lib/estabelecimento'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

export async function GET() {
    try {
        const userId = await getCurrentUserId()
        const establishments = await getEstabelecimentoByProprietarioId(userId)
        return NextResponse.json(establishments)
    } catch (error) {
        console.error('Failed to fetch establishments:', error)
        return NextResponse.json({ error: 'Failed to fetch establishments' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const userId = await getCurrentUserId()
        const body = await request.json()
        const establishment = await createEstabelecimento({ ...body, id_proprietario: userId })
        return NextResponse.json(establishment)
    } catch (error) {
        console.error('Failed to create establishment:', error)
        return NextResponse.json({ error: 'Failed to create establishment' }, { status: 500 })
    }
}

