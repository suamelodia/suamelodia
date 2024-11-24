import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContractDetailsScreen() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Contract Details</h2>
      <Card>
        <CardHeader>
          <CardTitle>Contract Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Event Name:</strong> Sample Event</p>
          <p><strong>Date:</strong> 2023-06-15</p>
          <p><strong>Payment Amount:</strong> $1000</p>
          <p><strong>Status:</strong> Pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>These are the terms and conditions of the contract...</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Current Status: Pending</p>
        </CardContent>
      </Card>
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel Contract</Button>
        <Button>Accept/Sign</Button>
      </div>
    </div>
  )
}

