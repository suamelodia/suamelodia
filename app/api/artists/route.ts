import { NextResponse } from 'next/server'
import { createArtista, getArtistaByUserId, updateArtista, deleteArtista, getArtistaById } from '@/lib/artista'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const artist = await createArtista(body)
    return NextResponse.json(artist)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create artist' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const userId = searchParams.get('userId')

  try {
    let artist
    if (id) {
      artist = await getArtistaById(parseInt(id))
    } else if (userId) {
      artist = await getArtistaByUserId(parseInt(userId))
    } else {
      return NextResponse.json({ error: 'ID or User ID is required' }, { status: 400 })
    }

    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }
    return NextResponse.json(artist)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get artist' }, { status: 500 })
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
    const artist = await updateArtista(parseInt(id), body)
    return NextResponse.json(artist)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update artist' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await deleteArtista(parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'Artist deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete artist' }, { status: 500 })
  }
}

