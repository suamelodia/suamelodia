import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventBrowseScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Browse Events</h2>
      <div className="flex space-x-2">
        <Input placeholder="Search events..." className="flex-grow" />
        <Select>
          <option value="">All Genres</option>
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="jazz">Jazz</option>
        </Select>
        <Select>
          <option value="">All Locations</option>
          <option value="newyork">New York</option>
          <option value="losangeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((event) => (
          <Card key={event}>
            <CardHeader>
              <CardTitle>Event Name {event}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: 2023-06-{event}</p>
              <p>Venue: Venue Name</p>
              <p>Type: Concert</p>
              <Button className="mt-2">Apply</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

