import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { query } from '@/lib/dbUtils'

// Definindo a interface para o tipo de Review
interface Review {
  id_avaliacao: number
  usuario_nome: string
  nota: number
  comentario: string
  data: string
}

async function searchReviews(searchTerm: string): Promise<Review[]> {
  const sql = `
    SELECT a.*, u.nome as usuario_nome
    FROM Avaliacao a
    JOIN Usuario u ON a.id_usuario = u.id_usuario
    WHERE u.nome ILIKE $1 OR a.comentario ILIKE $1
  `
  const res = await query(sql, [`%${searchTerm}%`])
  return res.rows
}

export default async function ReviewsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const reviews = await searchReviews(searchTerm)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Link href="/reviews/new">
          <Button>Write a Review</Button>
        </Link>
      </div>
      <div className="flex justify-end">
        <form className="w-1/3">
          <Input 
            type="search" 
            name="search" 
            placeholder="Search reviews..." 
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review: Review) => (
          <Card key={review.id_avaliacao}>
            <CardHeader>
              <CardTitle>{review.usuario_nome}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Rating: {review.nota} / 5</p>
              <p>Date: {new Date(review.data).toLocaleDateString()}</p>
              <p>{review.comentario}</p>
              <Link href={`/reviews/${review.id_avaliacao}`}>
                <Button className="mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
