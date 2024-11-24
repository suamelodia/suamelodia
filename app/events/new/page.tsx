'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export default function NewEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    data_inicio: '',
    data_termino: '',
    tipo: '',
    status: '',
    descricao: '',
    id_estabelecimento: ''
  })
  const [establishments, setEstablishments] = useState([])

  useEffect(() => {
    const fetchEstablishments = async () => {
      const res = await fetch('/api/establishments')
      if (res.ok) {
        setEstablishments(await res.json())
      }
    }
    fetchEstablishments()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/events')
      } else {
        console.error('Failed to create event')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="datetime-local"
            name="data_inicio"
            value={formData.data_inicio}
            onChange={handleChange}
            required
          />
          <Input
            type="datetime-local"
            name="data_termino"
            value={formData.data_termino}
            onChange={handleChange}
            required
          />
          <Input
            name="tipo"
            placeholder="Event Type"
            value={formData.tipo}
            onChange={handleChange}
            required
          />
          <Select name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <Textarea
            name="descricao"
            placeholder="Event Description"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
          <Select name="id_estabelecimento" value={formData.id_estabelecimento} onChange={handleChange} required>
            <option value="">Select Venue</option>
            {establishments.map((establishment) => (
              <option key={establishment.id_estabelecimento} value={establishment.id_estabelecimento}>
                {establishment.nome}
              </option>
            ))}
          </Select>
          <Button type="submit">Create Event</Button>
        </form>
      </CardContent>
    </Card>
  )
}

