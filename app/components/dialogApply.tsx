'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DialogApply({ userId, artista, proprietario, contract, id_evento }) {
  const router = useRouter()
  const [propostas, setPropostas] = useState<Record<string, number | null>>({});

  const handleInputChange = (id_contrato: string, value: string) => {
    setPropostas((prev) => ({
      ...prev,
      [id_contrato]: value ? parseFloat(value) : null,
    }));
  };

  const handleApply = async (contrato) => {
    const formData = {
      userId: userId,
      valorProposta: propostas[contrato.id_contrato] || null,
      comentario_dest: null,
      id_contrato: contrato.id_contrato,
      id_artista: artista.id_artista,
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push(`/events/browse`)
      } else {
        console.error('Failed to create application')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  const handleInvite = async (contrato) => {
    const formData = {
      userId: userId,
      valorProposta: null,
      comentario_dest: null,
      id_contrato: contrato.id_contrato,
      id_artista: artista.id_artista,
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push(`/artists`)
      } else {
        console.error('Failed to create application')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
    <div>
      {!proprietario ?
        <div className="p-4 rounded-md border-2 space-y-4">
          <p><strong>Valor:</strong> {contract.valor}</p>
          <p><strong>Condições:</strong> {contract.condicoes}</p>
          <div className="space-y-2">
            <label htmlFor="valorProposta" className="block text-sm font-medium text-gray-700">Proposta de Valor:</label>
            <Input
              id="valorProposta"
              name="valorProposta"
              type="number"
              placeholder="350,00"
              value={propostas[contract.id_contrato] || ''}
              onChange={(e) => handleInputChange(contract.id_contrato, e.target.value)}
            />
          </div>
          <Button onClick={() => handleApply(contract)}>Aplicar</Button>
        </div>
        :
        <div className="p-4 rounded-md border-2 space-y-4">
          <p><strong>Valor:</strong> {contract.valor}</p>
          <p><strong>Condições:</strong> {contract.condicoes}</p>
          <Button onClick={() => handleInvite(contract)}>Convidar</Button>
        </div>
      }
    </div>
  )
}

