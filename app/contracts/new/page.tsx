'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Definindo os tipos para os dados
interface Event {
  id_evento: string;
  descricao: string;
}

interface Artist {
  id_artista: string;
  nome: string;
}

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
  const [events, setEvents] = useState<Event[]>([]) // Definindo o tipo do estado
  const [artists, setArtists] = useState<Artist[]>([]) // Definindo o tipo do estado

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
          <Select value={formData.id_evento} onValueChange={(value) => handleChange({ target: { name: 'id_evento', value } } as any)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select Event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id_evento} value={event.id_evento}>
                  {event.descricao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={formData.id_artista} onValueChange={(value) => handleChange({ target: { name: 'id_artista', value } } as any)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select Artist" />
            </SelectTrigger>
            <SelectContent>
              {artists.map((artist) => (
                <SelectItem key={artist.id_artista} value={artist.id_artista}>
                  {artist.nome}
                </SelectItem>
              ))}
            </SelectContent>
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
          <Select value={formData.status_pagamento} onValueChange={(value) => handleChange({ target: { name: 'status_pagamento', value } } as any)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
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
