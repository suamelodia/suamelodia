'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

export default function NewContractPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    valor: '',
    condicoes: '',
    status_pagamento: '',
    id_evento: '',
    id_proprietario: '',
    id_artista: ''
  })
  const [events, setEvents] = useState([])
  const [artists, setArtists] = useState([])

  useEffect(() => {
    // Fetch events and artists for dropdowns
    const fetchData = async () => {
      const eventsRes = await fetch('/api/events')
      const artistsRes = await fetch('/api/artists')
      if (eventsRes.ok && artistsRes.ok) {
        setEvents(await eventsRes.json())
        setArtists(await artistsRes.json())
      }
    }
    fetchData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/contracts')
      } else {
        // Handle errors
        console.error('Failed to create contract')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Contract</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select name="id_evento" value={formData.id_evento} onChange={handleChange} required>
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.id_evento} value={event.id_evento}>
                {event.descricao}
              </option>
            ))}
          </Select>
          <Select name="id_artista" value={formData.id_artista} onChange={handleChange} required>
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.id_artista} value={artist.id_artista}>
                {artist.nome}
              </option>
            ))}
          </Select>
          <Input
            name="valor"
            type="number"
            step="0.01"
            placeholder="Contract Value"
            value={formData.valor}
            onChange={handleChange}
            required
          />
          <Select name="status_pagamento" value={formData.status_pagamento} onChange={handleChange} required>
            <option value="">Select Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <Textarea
            name="condicoes"
            placeholder="Contract Conditions"
            value={formData.condicoes}
            onChange={handleChange}
          />
          <Button type="submit">Create Contract</Button>
        </form>
      </CardContent>
    </Card>
  )
}

