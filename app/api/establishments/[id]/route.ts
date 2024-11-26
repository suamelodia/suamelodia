import { NextResponse } from 'next/server'
import { getEstabelecimentoById, updateEstabelecimento, deleteEstabelecimento } from '@/lib/estabelecimento'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const establishment = await getEstabelecimentoById(parseInt(params.id))
        if (!establishment) {
            return NextResponse.json({ error: 'Establishment not found' }, { status: 404 })
        }
        return NextResponse.json(establishment)
    } catch (error) {
        console.error('Failed to fetch establishment:', error)
        return NextResponse.json({ error: 'Failed to fetch establishment' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = await getCurrentUserId()
        const body = await request.json()
        const updatedEstablishment = await updateEstabelecimento(parseInt(params.id), body, userId)
        if (!updatedEstablishment) {
            return NextResponse.json({ error: 'Establishment not found or unauthorized' }, { status: 404 })
        }
        return NextResponse.json(updatedEstablishment)
    } catch (error) {
        console.error('Failed to update establishment:', error)
        return NextResponse.json({ error: 'Failed to update establishment' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = await getCurrentUserId()
        const success = await deleteEstabelecimento(parseInt(params.id), userId)
        if (!success) {
            return NextResponse.json({ error: 'Establishment not found or unauthorized' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Establishment deleted successfully' })
    } catch (error) {
        console.error('Failed to delete establishment:', error)
        return NextResponse.json({ error: 'Failed to delete establishment' }, { status: 500 })
    }
}

