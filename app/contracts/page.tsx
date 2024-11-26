import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { query } from '@/lib/dbUtils'

// Definir o tipo Contract
type Contract = {
  id_contrato: number
  evento_descricao: string
  artista_nome: string
  valor: number
  status_pagamento: string
}

async function searchContracts(searchTerm: string) {
  const sql = `
    SELECT c.*, e.descricao as evento_descricao, u.nome as artista_nome
    FROM Contrato c
    JOIN Evento e ON c.id_evento = e.id_evento
    JOIN Artista a ON c.id_artista = a.id_artista
    JOIN Usuario u ON a.id_usuario = u.id_usuario
    WHERE e.descricao ILIKE $1 OR u.nome ILIKE $1
  `
  const res = await query(sql, [`%${searchTerm}%`])
  return res.rows
}

export default async function ContractsPage({ searchParams }: { searchParams: { search: string } }) {
  const searchTerm = searchParams.search || ''
  const contracts = await searchContracts(searchTerm)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Contracts</h1>
        <Link href="/contracts/new">
          <Button>Create New Contract</Button>
        </Link>
      </div>
      <div className="flex justify-end">
        <form className="w-1/3">
          <Input 
            type="search" 
            name="search" 
            placeholder="Search contracts..." 
            defaultValue={searchTerm}
          />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract: Contract) => (
          <Card key={contract.id_contrato}>
            <CardHeader>
              <CardTitle>{contract.evento_descricao}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Artist: {contract.artista_nome}</p>
              <p>Value: ${contract.valor}</p>
              <p>Payment Status: {contract.status_pagamento}</p>
              <Link href={`/contracts/${contract.id_contrato}`}>
                <Button className="mt-4">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
