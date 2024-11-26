import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from '@/app/components/StarRating'
import { getSentReviews, getReceivedReviews } from '@/lib/review'

async function getCurrentUserId() {
  return parseInt(process.env.USER_ID || '1');
}

export default async function ReviewsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const currentUserId = await getCurrentUserId()
  const sentReviews = await getSentReviews(currentUserId, searchTerm)
  const receivedReviews = await getReceivedReviews(currentUserId, searchTerm)

  const ReviewList = ({ reviews, type }: { reviews: any[], type: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id_avaliacao} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{type === 'sent' ? review.receiver_name : review.sender_name}</CardTitle>
              <StarRating rating={review.nota} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-2">{review.comentario}</p>
            <p className="text-sm text-gray-500 mb-4">{new Date(review.data).toLocaleDateString()}</p>
            <Link href={`/reviews/${review.id_avaliacao}`}>
              <Button variant="outline" size="sm" className="w-full">View Details</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <Link href="/reviews/new">
          <Button>Write a Review</Button>
        </Link>
      </div>
      <div className="flex justify-end">
        <form className="w-full md:w-1/3">
          <Input
            type="search"
            name="search"
            placeholder="Search reviews..."
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <Tabs defaultValue="sent" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="sent" className="flex-1">Sent Reviews</TabsTrigger>
          <TabsTrigger value="received" className="flex-1">Received Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="sent" className="mt-6">
          <ReviewList reviews={sentReviews} type="sent" />
        </TabsContent>
        <TabsContent value="received" className="mt-6">
          <ReviewList reviews={receivedReviews} type="received" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
