import { getById } from '@/lib/dbUtils'
import { getUserById } from '@/lib/usuario'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StarRating } from '@/app/components/StarRating'
import Link from 'next/link'
import { Calendar, User, MessageCircle, Award } from 'lucide-react'

export default async function ReviewDetailPage({ params }: { params: { id: string } }) {
  const review = await getById('Avaliacao', parseInt(params.id))
  const sender = review ? await getUserById(review.id_usuario_envia) : null
  const receiver = review ? await getUserById(review.id_usuario_recebe) : null

  if (!review || !sender || !receiver) {
    return <div>Review not found</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Review Details</CardTitle>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.nota} />
              <span className="text-xl font-semibold">({review.nota}/5)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 italic text-lg">&ldquo;{review.comentario}&rdquo;</p>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 border-t border-b border-gray-200 py-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-[#CC3B58]" />
              <span className="font-medium">Reviewer: {sender.nome}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#CC3B58]" />
              <span>{new Date(review.data).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2 flex items-center">
              <Award className="w-5 h-5 mr-2 text-[#CC3B58]" />
              Reviewed Artist/Venue
            </h3>
            <p className="text-gray-700">{receiver.nome}</p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end space-x-4">
        <Link href={`/reviews/${params.id}/edit`}>
          <Button variant="outline">Edit Review</Button>
        </Link>
        <Button variant="destructive">Delete Review</Button>
      </div>
    </div>
  )
}

