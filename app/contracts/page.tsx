import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContractListScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contracts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((contract) => (
          <Card key={contract}>
            <CardHeader>
              <CardTitle>Contract #{contract}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Event: Event Name</p>
              <p>Artist/Owner: Name</p>
              <p>Payment: $1000</p>
              <p>Status: {contract % 2 === 0 ? 'Pending' : 'Signed'}</p>
              <Button className="mt-2">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

