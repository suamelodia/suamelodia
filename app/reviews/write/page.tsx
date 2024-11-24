import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WriteReviewScreen() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
      <Card>
        <CardHeader>
          <CardTitle>Review for: Artist/Venue Name</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <label className="block mb-2">Rating:</label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="outline">{star}</Button>
                ))}
              </div>
            </div>
            <Textarea placeholder="Write your review here..." rows={6} />
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Submit Review</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

