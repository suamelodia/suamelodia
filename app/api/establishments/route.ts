import { NextResponse } from 'next/server'
import { query, getById, create, update, remove } from '@/lib/dbUtils'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const establishment = await create('Estabelecimento', body)
        return NextResponse.json(establishment)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create establishment' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    try {
        if (id) {
            const establishment = await getById('Estabelecimento', parseInt(id))
            if (!establishment) {
                return NextResponse.json({ error: 'Establishment not found' }, { status: 404 })
            }
            return NextResponse.json(establishment)
        } else {
            const establishments = await query('SELECT * FROM Estabelecimento')
            return NextResponse.json(establishments.rows)
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get establishment(s)' }, { status: 500 })
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
        const establishment = await update('Estabelecimento', parseInt(id), body)
        return NextResponse.json(establishment)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update establishment' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    try {
        const success = await remove('Estabelecimento', parseInt(id))
        if (success) {
            return NextResponse.json({ message: 'Establishment deleted successfully' })
        } else {
            return NextResponse.json({ error: 'Establishment not found' }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete establishment' }, { status: 500 })
    }
}

