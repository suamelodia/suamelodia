'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DialogApply({ userId, artista, contract, id_evento }) {
  const router = useRouter()
  const [propostas, setPropostas] = useState<Record<string, number | null>>({});
  const [selectedArtistId, setSelectedArtistId] = useState('');

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
      id_artista: artista ? artista.id_artista : selectedArtistId,
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
        router.push(`/events/${id_evento}`)
      } else {
        console.error('Failed to create application')
      }
    } catch (error) {
      console.error('An error occurred', error)
    }
  }

  return (
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
                {!artista && (
                  <div className="space-y-2">
                    <label htmlFor="artistSelect" className="block text-sm font-medium text-gray-700">Selecione um Artista:</label>
                    <select
                      id="artistSelect"
                      value={selectedArtistId}
                      onChange={(e) => setSelectedArtistId(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Selecione um artista</option>
                      {/* You need to fetch and map artists here */}
                    </select>
                  </div>
                )}
                <Button onClick={() => handleApply(contract)}>Aplicar</Button>
              </div>
  )
}

