import { getContratoById } from '@/lib/contrato'
import { getEventoById } from '@/lib/evento'
import { getArtistaById } from '@/lib/artista'
import { getUserById } from '@/lib/usuario'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const contract = await getContratoById(parseInt(params.id))
  const event = contract ? await getEventoById(contract.id_evento) : null
  const artist = contract ? await getArtistaById(contract.id_artista) : null
  const user = artist ? await getUserById(artist.id_usuario) : null

  if (!contract || !event || !artist || !user) {
    return <div>Contract not found</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contract Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Event:</strong> {event.descricao}</p>
          <p><strong>Artist:</strong> {user.nome}</p>
          <p><strong>Value:</strong> ${contract.valor}</p>
          <p><strong>Payment Status:</strong> {contract.status_pagamento}</p>
          <p><strong>Conditions:</strong> {contract.condicoes || 'No specific conditions'}</p>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Link href={`/contracts/${params.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}

