import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarRating } from '@/app/components/StarRating'
import { getRandomAvatarUrl } from '@/lib/utils'
import { query } from '@/lib/dbUtils'
import { MessageSquare } from 'lucide-react'

async function searchArtists(searchTerm: string) {
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

export default async function ArtistsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const artists = await searchArtists(searchTerm)

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
                    src={artist.imagem}
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
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{artist.review_count} reviews</span>
                </div>
                <Link href={`/artists/${artist.id_artista}`}>
                  <Button variant="outline" size="sm">View Profile</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

