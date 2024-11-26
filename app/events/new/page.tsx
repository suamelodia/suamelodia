'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Establishment {
  id_estabelecimento: string;
  nome: string;
}

interface FormData {
  data_inicio: string;
  data_termino: string;
  tipo: string;
  status: string;  // Agora é uma string ao invés de um array
  descricao: string;
  id_estabelecimento: string;  // Agora é uma string ao invés de um array
}

export default function NewEventPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    data_inicio: '',
    data_termino: '',
    tipo: '',
    status: '',  // Inicializado como string vazia
    descricao: '',
    id_estabelecimento: '',  // Inicializado como string vazia
  })
  const [establishments, setEstablishments] = useState<Establishment[]>([])

  useEffect(() => {
    const fetchEstablishments = async () => {
      const res = await fetch('/api/establishments/proprietor')
      if (res.ok) {
        setEstablishments(await res.json())
      }
      if (!res.ok) {
        const errorText = await res.text();  // Pega o texto da resposta de erro
        console.error('Failed to create event:', errorText);
      }
    }
    fetchEstablishments()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (status: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        status: status  // Garantindo que apenas um status seja selecionado
      }))
    }
  }

  const handleEstablishmentChange = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        id_estabelecimento: id  // Garantindo que apenas um estabelecimento seja selecionado
      }))
    }
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

  const statusOptions = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Event</CardTitle>
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
                    checked={formData.status === status}  // Verifica se o status atual é o selecionado
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
                    checked={formData.id_estabelecimento === establishment.id_estabelecimento}  // Verifica se o estabelecimento atual é o selecionado
                    onChange={handleEstablishmentChange(establishment.id_estabelecimento)}
                  />
                  <Label htmlFor={`establishment-${establishment.id_estabelecimento}`}>{establishment.nome}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Create Event</Button>
        </form>
      </CardContent>
    </Card>
  )
}
