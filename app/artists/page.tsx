import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarRating } from '@/app/components/StarRating'
import { query } from '@/lib/dbUtils'
import { MessageSquare } from 'lucide-react'
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
    SELECT a.*, u.nome as nome_artista, u.ImagemPerfil as imagem, gm.nome as genero,
           COALESCE(AVG(av.nota), 0) as avg_rating,
           COUNT(av.id_avaliacao) as review_count
    FROM Artista a
    JOIN Usuario u ON a.id_usuario = u.id_usuario
    LEFT JOIN Genero_Musical gm ON a.id_genero = gm.id_genero
    LEFT JOIN Avaliacao av ON av.id_usuario_recebe = u.id_usuario
    WHERE u.nome ILIKE $1
    GROUP BY a.id_artista, u.id_usuario, gm.id_genero
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
      </div>
      <div className="flex justify-end">
        <form className="w-full md:w-1/3">
          <Input
            type="search"
            name="search"
            placeholder="Search artists..."
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Card key={artist.id_artista} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 overflow-hidden rounded-full">
                  <Image
                    src={artist.imagem || '/placeholder.svg'}
                    alt={`${artist.nome_artista} avatar`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle>{artist.nome_artista}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <StarRating rating={Math.round(artist.avg_rating)} />
                    <span className="text-sm text-gray-500">({Number(artist.avg_rating).toFixed(1)})</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Genre: {artist.genero || 'Not specified'}</p>
              <p className="text-gray-600 mb-2">Type: {artist.eh_banda ? 'Band' : 'Solo Artist'}</p>
              {artist.ano_formacao && <p className="text-gray-600 mb-2">Formed in: {artist.ano_formacao}</p>}
              <div className="flex items-center space-x-1 mb-4">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">{artist.review_count} reviews</span>
              </div>
              <div className='flex justify-between mt-4'>
                <Link href={`/artists/${artist.id_artista}`}>
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Invite</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Available Events for {artist.nome_artista}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="flex-grow">
                      <div className="space-y-4 p-4">
                        {events.map((event) => (
                          event.status !== "Cancelado" && (
                            <div key={event.id_evento} className="border-b pb-4 last:border-b-0">
                              <h3 className="text-lg font-semibold mb-2">{event.descricao}</h3>
                              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                                <div className="flex w-max space-x-4 p-4">
                                  {getContratosAvailableByEventoAndArtist(event.id_evento, artist.id_artista).then((contracts: Contract[]) =>
                                    contracts.map((contract) => (
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
                      </div>
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
