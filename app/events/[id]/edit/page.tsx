import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export default function CreateEditEventScreen() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create/Edit Event</h2>
      <form className="space-y-4">
        <Input placeholder="Event Name" />
        <Textarea placeholder="Description" />
        <div className="grid grid-cols-2 gap-4">
          <Input type="datetime-local" placeholder="Start Date/Time" />
          <Input type="datetime-local" placeholder="End Date/Time" />
        </div>
        <Select>
          <option value="">Select Type</option>
          <option value="concert">Concert</option>
          <option value="festival">Festival</option>
          <option value="private">Private Event</option>
        </Select>
        <Select>
          <option value="">Select Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
        <Select>
          <option value="">Select Venue</option>
          <option value="venue1">Venue 1</option>
          <option value="venue2">Venue 2</option>
          <option value="add">Add New Venue</option>
        </Select>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </form>
    </div>
  )
}

