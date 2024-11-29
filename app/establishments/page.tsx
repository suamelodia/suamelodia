"use client"  // Garantindo que este componente será executado no lado do cliente

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

async function deleteEstablishment(id: string) {
    const response = await fetch(`/api/establishments/${id}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to delete establishment')
    }

    return response.json()  // Retorna a mensagem de sucesso
}

async function getEstabelecimentoByProprietarioId(id: number) {
    const response = await fetch(`/api/establishments?userId=${id}`, {
        method: 'GET',
    })

    if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to get establishment')
    }

    return response.json()  // Retorna a lista de estabelecimentos
}

export default function EstablishmentsPage() {
    const [establishments, setEstablishments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const userId = await getCurrentUserId()
            try {
                const data = await getEstabelecimentoByProprietarioId(userId)
                setEstablishments(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        fetchData()
    }, [])  // A função será executada uma vez, quando o componente for montado

    const handleDelete = async (id: string) => {
        try {
            // Tenta excluir o estabelecimento
            const result = await deleteEstablishment(id)

            // Atualiza o estado para refletir a exclusão
            setEstablishments(prevEstablishments =>
                prevEstablishments.filter(establishment => establishment.id_estabelecimento !== id)
            )
        } catch (error) {
            console.error('Error deleting establishment:', error)
        }
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">My Establishments</h1>
                <Link href="/establishments/new">
                    <Button>Create New Establishment</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {establishments.map((establishment) => (
                    <Card key={establishment.id_estabelecimento}>
                        <CardHeader>
                            <CardTitle>{establishment.nome}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Address: {establishment.endereco}</p>
                            <p>Type: {establishment.tipo}</p>
                            <p>Capacity: {establishment.capacidade}</p>
                            <div className="flex justify-between mt-4">
                                <Link href={`/establishments/${establishment.id_estabelecimento}/edit`}>
                                    <Button variant="outline">Edit</Button>
                                </Link>
                                <Button variant="destructive" onClick={() => handleDelete(establishment.id_estabelecimento)}>
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
