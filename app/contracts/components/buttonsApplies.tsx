'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState } from "react";

export function AppliesForContracts({ children, contract, apply, userId }) {
    const [comentarios, setComentarios] = useState<Record<string, string | null>>({});


    const handleInputChange = (id_contrato: string, value: string) => {
        setComentarios((prev) => ({
            ...prev,
            [id_contrato]: value ? value : null,
        }));
    };

    const handleButton = async (contrato, accepted) => {
        const formData = {
            from_artist: apply.from_artist,
            valorProposta: apply.valorProposta, // ta zerando o valor
            status_aplicacao: 'Concluída',
            is_accepted: accepted,
            comentario_dest: comentarios[contrato.id_contrato] || null,
            id_contrato: contrato.id_contrato,
            id_artista: apply.id_artista,
        }

        try {
            const res = await fetch(`/api/applications?id=${apply.id_aplicacao}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if (res.ok) {
                redirect(`/contracts/${userId}`)
            } else {
                console.error('Failed to create application')
            }
        } catch (error) {
            console.error('An error occurred', error)
        }
    }

    return (
        <div className='flex flex-col gap-5 mt-5 border-2 p-4 rounded-md'>
            <div className='flex flex-row justify-between'>
                {children}
                <div className='flex gap-5'>
                    <Button onClick={() => handleButton(contract, true)}>Aceitar</Button>
                    <Button onClick={() => handleButton(contract, false)}>Rejeitar</Button>
                </div>
            </div>
            <div>
                <p>Comentário:</p>
                <Input
                    id="comentario"
                    name="comentario"
                    value={comentarios[contract.id_contrato] || ''}
                    onChange={(e) => handleInputChange(contract.id_contrato, e.target.value)}
                />
            </div>
        </div>
    )
}