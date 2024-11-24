import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtistSearchScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Search Artists/Bands</h2>
      <div className="flex space-x-2">
        <Input placeholder="Search artists..." className="flex-grow" />
        <Select>
          <option value="">All Genres</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="jazz">Jazz</option>
        </Select>
        <Select>
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((artist) => (
          <Card key={artist}>
            <CardHeader>
              <CardTitle>Artist/Band Name {artist}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Genre: Rock</p>
              <p>Rating: 4.5 stars</p>
              <Button className="mt-2">Invite</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

