import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistProfileScreen() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Artist Profile</h2>
        <Button>Invite to Event</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="text-xl font-semibold">Artist Name</h3>
              <p>Genre: Rock</p>
              <p>Year of Formation: 2010</p>
            </div>
          </div>
          <p className="mt-4">Biography: This is a sample artist biography...</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add a calendar component here */}
          <p>Calendar placeholder</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ratings and Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Average Rating: 4.5 stars</p>
          {/* Add a list of reviews here */}
          <ul className="mt-2">
            <li>Great performance! - 5 stars</li>
            <li>Good energy on stage - 4 stars</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

