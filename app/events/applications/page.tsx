import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EventApplicationStatusScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Application Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((application) => (
          <Card key={application}>
            <CardHeader>
              <CardTitle>Event Name {application}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: 2023-06-{application}</p>
              <p>Status: {application % 2 === 0 ? 'Pending' : 'Approved'}</p>
              <Button variant="outline" className="mt-2">Withdraw</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

