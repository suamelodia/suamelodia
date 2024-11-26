import { getArtistaById } from '@/lib/artista'
import { getUserById } from '@/lib/usuario'
import { getReviewsByArtistId } from '@/lib/review'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarRating } from '@/app/components/StarRating'
import Link from 'next/link'
import Image from 'next/image'
import { MessageSquare, User } from 'lucide-react'

export default async function ArtistDetailPage({ params }: { params: { id: string } }) {
  const artist = await getArtistaById(parseInt(params.id))
  const user = artist ? await getUserById(artist.id_usuario) : null
  const reviews = artist ? await getReviewsByArtistId(artist.id_usuario) : []

  if (!artist || !user) {
    return <div>Artist not found</div>
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.nota, 0) / reviews.length
    : 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 overflow-hidden rounded-full">
              <Image
                src={user.imagemperfil || '/placeholder.svg'}
                alt={`${user.nome} avatar`}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-2xl">{user.nome}</CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-lg font-semibold">({averageRating.toFixed(1)})</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.telefone || 'Not provided'}</p>
              <p><strong>Type:</strong> {artist.eh_banda ? 'Band' : 'Solo Artist'}</p>
              {artist.ano_formacao && <p><strong>Formed in:</strong> {artist.ano_formacao}</p>}
            </div>
            <div>
              <p><strong>Biography:</strong></p>
              <p className="text-gray-600">{artist.biografia || 'No biography provided'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Reviews</CardTitle>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
              <span className="text-lg font-semibold">{reviews.length} reviews</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id_avaliacao} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          src={review.sender_image || '/placeholder.svg'}
                          alt={`${review.sender_name} avatar`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{review.sender_name}</p>
                        <p className="text-sm text-gray-500">{new Date(review.data).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <StarRating rating={review.nota} />
                  </div>
                  <p className="text-gray-600 mt-2">{review.comentario}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

