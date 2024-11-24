import { getArtistaById } from '@/lib/artista'
import { getUserById } from '@/lib/usuario'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function ArtistDetailPage({ params }: { params: { id: string } }) {
  const artist = await getArtistaById(parseInt(params.id))
  const user = artist ? await getUserById(artist.id_usuario) : null

  if (!artist || !user) {
    return <div>Artist not found</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{user.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.telefone || 'Not provided'}</p>
          <p><strong>Type:</strong> {artist.eh_banda ? 'Band' : 'Solo Artist'}</p>
          {artist.ano_formacao && <p><strong>Formed in:</strong> {artist.ano_formacao}</p>}
          <p><strong>Biography:</strong> {artist.biografia || 'No biography provided'}</p>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Link href={`/artists/${params.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}

