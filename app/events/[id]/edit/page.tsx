'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface Establishment {
  id_estabelecimento: string;
  nome: string;
}

interface FormData {
  data_inicio: string;
  data_termino: string;
  tipo: string;
  status: string;
  descricao: string;
  id_estabelecimento: string;
}

export default function EditEventPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    data_inicio: '',
    data_termino: '',
    tipo: '',
    status: '',
    descricao: '',
    id_estabelecimento: '',
  })
  const [establishments, setEstablishments] = useState<Establishment[]>([])

  useEffect(() => {
    const fetchEventData = async () => {
      const res = await fetch(`/api/events/${params.id}`)
      if (res.ok) {
        const eventData = await res.json()
        setFormData(eventData)
      } else {
        console.error('Failed to fetch event data')
      }
    }

    const fetchEstablishments = async () => {
      const res = await fetch('/api/establishments/proprietor')
      if (res.ok) {
        setEstablishments(await res.json())
      } else {
        console.error('Failed to fetch establishments')
      }
    }

    fetchEventData()
    fetchEstablishments()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (status: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, status }))
    }
  }

  const handleEstablishmentChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData(prev => ({ ...prev, id_estabelecimento: id }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        toast({
          title: "Event updated",
          description: "The event has been successfully updated.",
        })
        router.push('/events')
      } else {
        toast({
          title: "Error",
          description: "Failed to update the event. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('An error occurred', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async () => {
    try {
      const res = await fetch(`/api/events/${params.id}/cancel`, {
        method: 'POST',
      })
      if (res.ok) {
        toast({
          title: "Event cancelled",
          description: "The event has been successfully cancelled.",
        })
        router.push('/events')
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel the event. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('An error occurred', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const statusOptions = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data_inicio">Start Date and Time</Label>
            <Input
              id="data_inicio"
              type="datetime-local"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data_termino">End Date and Time</Label>
            <Input
              id="data_termino"
              type="datetime-local"
              name="data_termino"
              value={formData.data_termino}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo">Event Type</Label>
            <Input
              id="tipo"
              name="tipo"
              placeholder="Event Type"
              value={formData.tipo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Event Status</Label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={formData.status === status}
                    onChange={handleStatusChange(status)}
                  />
                  <Label htmlFor={`status-${status}`}>{status}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="descricao">Event Description</Label>
            <Textarea
              id="descricao"
              name="descricao"
              placeholder="Event Description"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Select Venue</Label>
            <div className="grid grid-cols-2 gap-2">
              {establishments.map((establishment) => (
                <div key={establishment.id_estabelecimento} className="flex items-center space-x-2">
                  <Checkbox
                    id={`establishment-${establishment.id_estabelecimento}`}
                    checked={formData.id_estabelecimento === establishment.id_estabelecimento}
                    onChange={handleEstablishmentChange(establishment.id_estabelecimento)}
                  />
                  <Label htmlFor={`establishment-${establishment.id_estabelecimento}`}>{establishment.nome}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <Button type="submit">Update Event</Button>
            <Button type="button" variant="destructive" onClick={handleCancel}>Cancel Event</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

