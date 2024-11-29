import { NextResponse } from 'next/server'
import { createAplicacao, getAplicacoesByContrato, updateAplicacao, deleteAplicacao, getAplicacaoById } from '@/lib/aplicacoes'
import { getUserById } from '@/lib/usuario'
import { getArtistaByUserId } from '@/lib/artista'
import { getProprietarioByUserId } from '@/lib/proprietario'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = await getUserById(body.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const artist = await getArtistaByUserId(user.id_usuario)
    const proprietario = await getProprietarioByUserId(user.id_usuario)

    if (!artist && !proprietario) {
      return NextResponse.json({ error: 'User is neither an artist nor a proprietário' }, { status: 400 })
    }

    const applicationData = {
      from_artist: artist ? true : false,
      from_proprietor: artist ? false : true,
      status_aplicacao: 'Pendente',
      valorproposta: body.valorProposta,
      is_accepted: false,
      comentario_dest: body.comentario_dest || null,
      id_artista: artist ? artist.id_artista : body.id_artista,
      id_contrato: body.id_contrato
    }


    const application = await createAplicacao(applicationData)
    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const contratoId = searchParams.get('contratoId')

  try {
    if (id) {
      const application = await getAplicacaoById(parseInt(id))
      if (!application) {
        return NextResponse.json({ error: 'Application not found' }, { status: 404 })
      }
      return NextResponse.json(application)
    } else if (contratoId) {
      const applications = await getAplicacoesByContrato(parseInt(contratoId))
      return NextResponse.json(applications)
    } else {
      return NextResponse.json({ error: 'ID or Contrato ID is required' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get application(s)' }, { status: 500 })
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

    const applicationData = {
      from_artist: body.from_artist,
      status_aplicacao: body.status_aplicacao,
      valorproposta: body.valorProposta,
      is_accepted: body.is_accepted,
      comentario_dest: body.comentario_dest || null,
      id_artista: body.id_artista,
      id_contrato: body.id_contrato
    }

    const application = await updateAplicacao(parseInt(id), applicationData)
    return NextResponse.json(application)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  console.log("ID APPLY: ", id)
  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  }
  try {
    const success = await deleteAplicacao(parseInt(id))
    if (success) {
      return NextResponse.json({ message: 'Application deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}

