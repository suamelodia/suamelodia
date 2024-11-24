import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventListScreen() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events</h2>
        <Button>Add Event</Button>
      </div>
      <div className="flex space-x-2">
        <Input placeholder="Search events..." className="flex-grow" />
        <Select>
          <option value="">All Statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
        <Select>
          <option value="">All Types</option>
          <option value="concert">Concert</option>
          <option value="festival">Festival</option>
          <option value="private">Private Event</option>
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
              <p>Status: Upcoming</p>
              <p>Venue: Venue Name</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

