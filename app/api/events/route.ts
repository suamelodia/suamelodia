import { NextResponse } from 'next/server'
import { createEvento, getEventosByEstabelecimento, updateEvento, deleteEvento, getEventoById } from '@/lib/evento'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const event = await createEvento(body)
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const estabelecimentoId = searchParams.get('estabelecimentoId')

  try {
    if (id) {
      const event = await getEventoById(parseInt(id))
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 })
      }
      return NextResponse.json(event)
    } else if (estabelecimentoId) {
      const events = await getEventosByEstabelecimento(parseInt(estabelecimentoId))
      return NextResponse.json(events)
    } else {
      return NextResponse.json({ error: 'ID or Estabelecimento ID is required' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get event(s)' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const body = await request.json()
    const event = await updateEvento(parseInt(id), body)
    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await deleteEvento(parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'Event deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}

