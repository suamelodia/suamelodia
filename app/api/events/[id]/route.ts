import { NextResponse } from 'next/server'
import { getEventoById, updateEvento, deleteEvento } from '@/lib/evento'

async function getCurrentUserId() {
    return Number(process.env.USER_ID) // Obtém o ID do usuário atual
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const evento = await getEventoById(parseInt(params.id))
        if (!evento) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 })
        }
        return NextResponse.json(evento)
    } catch (error) {
        console.error('Failed to fetch event:', error)
        return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = await getCurrentUserId() // Obtém o ID do usuário atual
        const body = await request.json() // Obtém os dados enviados no corpo da requisição
        const updatedEvent = await updateEvento(parseInt(params.id), body, userId) // Atualiza o evento com os dados recebidos
        if (!updatedEvent) {
            return NextResponse.json({ error: 'Event not found or unauthorized' }, { status: 404 })
        }
        return NextResponse.json(updatedEvent) // Retorna o evento atualizado
    } catch (error) {
        console.error('Failed to update event:', error)
        return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = await getCurrentUserId() // Obtém o ID do usuário atual
        const success = await deleteEvento(parseInt(params.id), userId) // Exclui o evento
        if (!success) {
            return NextResponse.json({ error: 'Event not found or unauthorized' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Event deleted successfully' }) // Retorna uma mensagem de sucesso
    } catch (error) {
        console.error('Failed to delete event:', error)
        return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }
}
