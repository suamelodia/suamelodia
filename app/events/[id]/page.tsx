"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getEstabelecimentoById } from "@/lib/estabelecimento"
import { getEventoById } from "@/lib/evento"

// Função para buscar o evento
async function fetchEventData(id: string) {
  const response = await fetch(`/api/events/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch event data')
  }
  return response.json()
}

// Função para excluir o evento
async function deleteEvent(id: string) {
  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    const result = await response.json()
    throw new Error(result.error || 'Failed to delete event')
  }

  return response.json()  // Retorna a mensagem de sucesso
}

async function getEvent(id: string) {
  const response = await fetch(`/api/events/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    const result = await response.json()
    throw new Error(result.error || 'Failed to get event')
  }

  return response.json()
}

export default async function EventDetailPage({ params }: { params: { id: string } }) {
  let establishment

  const event = await getEvent(params.id)

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
        <Button variant="destructive" onClick={async () => {
          try {
            // Tenta excluir o evento
            const result = await deleteEvent(params.id)
            window.location.href = '/events'  // Redireciona para a lista de eventos
          } catch (error) {
            console.error('Error deleting event:', error)
          }
        }}>Cancel Event</Button>
      </div>
    </div>
  )
}
