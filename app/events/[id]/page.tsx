import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventDetailsScreen() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event Details</h2>
        <div className="space-x-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline">Cancel Event</Button>
          <Button>Mark as Completed</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Name:</strong> Sample Event</p>
          <p><strong>Description:</strong> This is a sample event description.</p>
          <p><strong>Date/Time:</strong> 2023-06-15 19:00 - 2023-06-15 23:00</p>
          <p><strong>Venue:</strong> Sample Venue</p>
          <p><strong>Type:</strong> Concert</p>
          <p><strong>Status:</strong> Upcoming</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5">
            <li>Artist 1 (Confirmed)</li>
            <li>Artist 2 (Pending)</li>
            <li>Band 1 (Confirmed)</li>
          </ul>
          <Button className="mt-4">Invite Artist</Button>
        </CardContent>
      </Card>
    </div>
  )
}

