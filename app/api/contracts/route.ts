import { NextResponse } from 'next/server'
import { createContrato, getContratosByEvento, updateContrato, deleteContrato, getContratoById } from '@/lib/contrato'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const contract = await createContrato(body)
    return NextResponse.json(contract)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contract' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const eventoId = searchParams.get('eventoId')

  try {
    if (id) {
      const contract = await getContratoById(parseInt(id))
      if (!contract) {
        return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
      }
      return NextResponse.json(contract)
    } else if (eventoId) {
      const contracts = await getContratosByEvento(parseInt(eventoId))
      return NextResponse.json(contracts)
    } else {
      return NextResponse.json({ error: 'ID or Evento ID is required' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get contract(s)' }, { status: 500 })
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
    const contract = await updateContrato(parseInt(id), body)
    return NextResponse.json(contract)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contract' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await deleteContrato(parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'Contract deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete contract' }, { status: 500 })
  }
}

