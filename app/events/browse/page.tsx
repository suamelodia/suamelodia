import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { query } from '@/lib/dbUtils'

// Definir o tipo do Evento
type Event = {
  id_evento: number
  descricao: string
  data_inicio: string
  data_termino: string
  tipo: string
  status: string
  estabelecimento_nome: string | null
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

export default async function BrowseEventsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const events = await searchEvents(searchTerm)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Browse Events</h1>
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
        {events.map((event: Event | undefined) => {  // Garantir que event seja do tipo Event ou undefined
          if (!event) return null;  // Se event for undefined, não renderiza nada

          return (
            <Card key={event.id_evento}>
              <CardHeader>
                <CardTitle>{event.descricao}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {new Date(event.data_inicio).toLocaleDateString()} - {new Date(event.data_termino).toLocaleDateString()}</p>
                <p>Venue: {event.estabelecimento_nome || 'Not specified'}</p>
                <p>Type: {event.tipo}</p>
                <p>Status: {event.status}</p>
                <div className="flex justify-between items-center mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{event.descricao}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p><strong>Date:</strong> {new Date(event.data_inicio).toLocaleString()} - {new Date(event.data_termino).toLocaleString()}</p>
                        <p><strong>Venue:</strong> {event.estabelecimento_nome || 'Not specified'}</p>
                        <p><strong>Type:</strong> {event.tipo}</p>
                        <p><strong>Status:</strong> {event.status}</p>
                        <p><strong>Description:</strong> {event.descricao}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link href={`/events/apply/${event.id_evento}`}>
                    <Button>Apply</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
