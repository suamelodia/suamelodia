import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { query } from '@/lib/dbUtils'
import { getUserById } from "@/lib/usuario"
import { getArtistaByUserId } from "@/lib/artista"
import { getContratosAvailableByEventoAndArtist } from "@/lib/contrato"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DialogApply } from "@/app/components/dialogApply"

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

async function getCurrentUserId() {
  return parseInt(process.env.USER_ID || "0", 10);
}

export default async function BrowseEventsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const events = await searchEvents(searchTerm)

  const userId = await getCurrentUserId()
  const user = await getUserById(userId)
  const artist = await getArtistaByUserId(userId)

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
        {events.map(async (event: any) => (
          event.status !== "Cancelado" &&
          (<Card key={event.id_evento}>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Apply</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{event.descricao}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea>
                      <div className="flex w-max space-x-4 p-4">
                        {await getContratosAvailableByEventoAndArtist(event.id_evento, artist.id_artista).then((contracts) =>
                          contracts.map((contract: any) => (
                            <DialogApply
                              key={contract.id_contrato}
                              contract={contract}
                              userId={userId}
                              artista={artist}
                              proprietario={null}
                              id_evento={event.id_evento}
                            />
                          ))
                        )}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          )
        ))}
      </div>
    </div>
  )
}
