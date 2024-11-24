import { NextResponse } from 'next/server'
import { query, getById, create, update, remove } from '@/lib/dbUtils'

async function getAvaliacoesByUsuario(usuarioId: number) {
  const res = await query('SELECT * FROM Avaliacao WHERE id_usuario = $1', [usuarioId]);
  return res.rows;
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const review = await create('Avaliacao', body)
    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const usuarioId = searchParams.get('usuarioId')

  try {
    if (id) {
      const review = await getById('Avaliacao', parseInt(id))
      if (!review) {
        return NextResponse.json({ error: 'Review not found' }, { status: 404 })
      }
      return NextResponse.json(review)
    } else if (usuarioId) {
      const reviews = await getAvaliacoesByUsuario(parseInt(usuarioId))
      return NextResponse.json(reviews)
    } else {
      return NextResponse.json({ error: 'ID or Usuario ID is required' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get review(s)' }, { status: 500 })
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
    const review = await update('Avaliacao', parseInt(id), body)
    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await remove('Avaliacao', parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'Review deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}

