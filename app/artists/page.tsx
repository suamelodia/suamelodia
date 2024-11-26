import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { query } from '@/lib/dbUtils'
import { getProprietarioByUserId } from '@/lib/proprietario'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getContratosAvailableByEventoAndArtist } from '@/lib/contrato'
import { getEventosByProprietarioId } from '@/lib/evento'
import { DialogApply } from '../components/dialogApply'

// Defina o tipo dos artistas
type Artist = {
  id_artista: number
  nome_artista: string
  genero: string | null
  eh_banda: boolean
  ano_formacao: number | null
}

async function searchArtists(searchTerm: string): Promise<Artist[]> {
  const sql = `
    SELECT a.*, u.nome as nome_artista, gm.nome as genero
    FROM Artista a
    JOIN Usuario u ON a.id_usuario = u.id_usuario
    LEFT JOIN Genero_Musical gm ON a.id_genero = gm.id_genero
    WHERE u.nome ILIKE $1
  `
  const res = await query(sql, [`%${searchTerm}%`])
  return res.rows
}

async function getCurrentUserId() {
  return parseInt(process.env.USER_ID || "0", 10);
}

export default async function ArtistsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const artists: Artist[] = await searchArtists(searchTerm)

  const userId = await getCurrentUserId()
  const proprietario = await getProprietarioByUserId(userId)

  const events = await getEventosByProprietarioId(proprietario.id_proprietario)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Artists</h1>
        <Link href="/artists/new">
          <Button>Add New Artist</Button>
        </Link>
      </div>
      <div className="flex justify-end">
        <form className="w-1/3">
          <Input 
            type="search" 
            name="search" 
            placeholder="Search artists..." 
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist: Artist) => (
          <Card key={artist.id_artista}>
            <CardHeader>
              <CardTitle>{artist.nome_artista}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Genre: {artist.genero || 'Not specified'}</p>
              <p>Type: {artist.eh_banda ? 'Band' : 'Solo Artist'}</p>
              {artist.ano_formacao && <p>Formed in: {artist.ano_formacao}</p>}
              <div className='flex justify-between mt-4'>
                <Link href={`/artists/${artist.id_artista}`}>
                  <Button>View Profile</Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Apply</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <ScrollArea className="max-h-96 mt-4">
                    {events.map(async (event: any) => (
                      event.status !== "Cancelado" &&
                        (
                          <div  key={event.id_evento}>
                                <DialogHeader>
                                  <DialogTitle>{event.descricao}</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className='max-w-full overflow-auto'>
                                  <div className="flex w-max space-x-4 p-4">
                                    {await getContratosAvailableByEventoAndArtist(event.id_evento, artist.id_artista).then((contracts) =>
                                      contracts.map((contract: any) => (
                                          <DialogApply
                                          key={contract.id_contrato}
                                          contract={contract}
                                          userId={userId}
                                          artista={artist}
                                          proprietario={proprietario}
                                          id_evento={event.id_evento}
                                          />
                                      ))
                                    )}
                                  </div>
                                  <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                          </div>
                      )
                    ))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
