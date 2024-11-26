'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

// Definindo os tipos para os eventos e artistas
interface Event {
  id_evento: string
  descricao: string
}

interface Artist {
  id_artista: string
  nome: string
}

export default function EditContractPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    valor: '',
    condicoes: '',
    status_pagamento: '',
    id_evento: '',
    id_proprietario: '',
    id_artista: ''
  })
  const [events, setEvents] = useState<Event[]>([]) // Tipo explícito para 'events'
  const [artists, setArtists] = useState<Artist[]>([]) // Tipo explícito para 'artists'

  useEffect(() => {
    const fetchData = async () => {
      const [contractRes, eventsRes, artistsRes] = await Promise.all([
        fetch(`/api/contracts?id=${params.id}`),
        fetch('/api/events'),
        fetch('/api/artists')
      ])
      if (contractRes.ok && eventsRes.ok && artistsRes.ok) {
        const [contract, eventsData, artistsData] = await Promise.all([
          contractRes.json(),
          eventsRes.json(),
          artistsRes.json()
        ])
        setFormData(contract)
        setEvents(eventsData)
        setArtists(artistsData)
      }
    }
    fetchData()
  }, [params.id])

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/contracts?id=${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push(`/contracts/${params.id}`)
      } else {
        // Handle errors
        console.error('Failed to update contract')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Contract</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select onValueChange={(value) => handleChange('id_evento', value)} required>
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
          <Select onValueChange={(value) => handleChange('id_artista', value)} required>
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
            onChange={(e) => handleChange('valor', e.target.value)}
            required
          />
          <Select onValueChange={(value) => handleChange('status_pagamento', value)} required>
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
            onChange={(e) => handleChange('condicoes', e.target.value)}
          />
          <Button type="submit">Update Contract</Button>
        </form>
      </CardContent>
    </Card>
  )
}
