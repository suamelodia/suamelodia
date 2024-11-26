import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getEstabelecimentoByProprietarioId } from '@/lib/estabelecimento'

async function getCurrentUserId() {
    return Number(process.env.USER_ID)
}

export default async function EstablishmentsPage() {
    const userId = await getCurrentUserId()
    const establishments = await getEstabelecimentoByProprietarioId(userId)

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
                                <Link href={`/establishments/${establishment.id_estabelecimento}/delete`}>
                                    <Button variant="destructive">Delete</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

