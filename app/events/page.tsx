import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { query } from '@/lib/dbUtils'

interface Event {
  id_evento: number;
  descricao: string;
  data_inicio: string;
  data_termino: string;
  tipo: string;
  status: string;
  estabelecimento_nome: string | null;
}

async function searchEvents(searchTerm: string): Promise<Event[]> {
  const sql = `
    SELECT e.*, es.nome as estabelecimento_nome
    FROM Evento e
    LEFT JOIN Estabelecimento es ON e.id_estabelecimento = es.id_estabelecimento
    WHERE e.descricao ILIKE $1 OR es.nome ILIKE $1
  `
  const res = await query(sql, [`%${searchTerm}%`])
  return res.rows
}

export default async function EventsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const events = await searchEvents(searchTerm)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link href="/events/new">
          <Button>Create New Event</Button>
        </Link>
      </div>
      <div className="flex justify-end">
        <form className="w-1/3">
          <Input 
            type="search" 
            name="search" 
            placeholder="Search events..." 
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: Event) => (
          <Card key={event.id_evento}>
            <CardHeader>
              <CardTitle>{event.descricao}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {new Date(event.data_inicio).toLocaleDateString()} - {new Date(event.data_termino).toLocaleDateString()}</p>
              <p>Venue: {event.estabelecimento_nome || 'Not specified'}</p>
              <p>Type: {event.tipo}</p>
              <p>Status: {event.status}</p>
              <Link href={`/events/${event.id_evento}`}>
                <Button className="mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

