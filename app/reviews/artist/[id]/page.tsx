import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistReviewsScreen() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Artist Reviews</h2>
        <Button>Write Review</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Artist Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold">Artist Name</h3>
          <p>Genre: Rock</p>
          <p>Average Rating: 4.5 stars</p>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((review) => (
          <Card key={review}>
            <CardContent>
              <div className="flex justify-between">
                <p className="font-semibold">Reviewer Name</p>
                <p>Rating: {review} stars</p>
              </div>
              <p className="text-sm text-gray-500">Date: 2023-06-{review}</p>
              <p className="mt-2">This is a sample review comment...</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

