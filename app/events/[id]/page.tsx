import { getEventoById } from '@/lib/evento'
import { getEstabelecimentoById } from '@/lib/estabelecimento'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  const event = await getEventoById(parseInt(params.id))
  const establishment = event?.id_estabelecimento ? await getEstabelecimentoById(event.id_estabelecimento) : null

  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{event.descricao}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Start Date:</strong> {new Date(event.data_inicio).toLocaleString()}</p>
          <p><strong>End Date:</strong> {new Date(event.data_termino).toLocaleString()}</p>
          <p><strong>Type:</strong> {event.tipo}</p>
          <p><strong>Status:</strong> {event.status}</p>
          <p><strong>Venue:</strong> {establishment ? establishment.nome : 'Not specified'}</p>
          <p><strong>Description:</strong> {event.descricao}</p>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Link href={`/events/${params.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Button variant="destructive">Cancel Event</Button>
      </div>
    </div>
  )
}

