'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

export default function NewEstablishmentPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        nome: '',
        endereco: '',
        tipo: '',
        capacidade: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/establishments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (res.ok) {
                toast({
                    title: "Establishment created",
                    description: "Your new establishment has been created successfully.",
                })
                router.push('/establishments')
            } else {
                toast({
                    title: "Error",
                    description: "Failed to create establishment. Please try again.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('An error occurred', error)
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Establishment</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nome">Name</Label>
                        <Input
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="endereco">Address</Label>
                        <Input
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tipo">Type</Label>
                        <Input
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="capacidade">Capacity</Label>
                        <Input
                            id="capacidade"
                            name="capacidade"
                            type="number"
                            value={formData.capacidade}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit">Create Establishment</Button>
                </form>
            </CardContent>
        </Card>
    )
}

