import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { query } from '@/lib/dbUtils'

async function searchArtists(searchTerm: string) {
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

export default async function ArtistsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const artists = await searchArtists(searchTerm)

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
        {artists.map((artist) => (
          <Card key={artist.id_artista}>
            <CardHeader>
              <CardTitle>{artist.nome_artista}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Genre: {artist.genero || 'Not specified'}</p>
              <p>Type: {artist.eh_banda ? 'Band' : 'Solo Artist'}</p>
              {artist.ano_formacao && <p>Formed in: {artist.ano_formacao}</p>}
              <Link href={`/artists/${artist.id_artista}`}>
                <Button className="mt-4">View Profile</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

