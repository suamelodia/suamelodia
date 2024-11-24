import { getById } from '@/lib/dbUtils'
import { getUserById } from '@/lib/usuario'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default async function ReviewDetailPage({ params }: { params: { id: string } }) {
  const review = await getById('Avaliacao', parseInt(params.id))
  const user = review ? await getUserById(review.id_usuario) : null

  if (!review || !user) {
    return <div>Review not found</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Review by {user.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Rating:</strong> {review.nota} / 5</p>
          <p><strong>Date:</strong> {new Date(review.data).toLocaleString()}</p>
          <p><strong>Comment:</strong> {review.comentario}</p>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-4">
        <Link href={`/reviews/${params.id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}

