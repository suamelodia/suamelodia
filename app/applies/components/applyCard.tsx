'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { useState } from "react";

export function ApplyCard({ children, apply, state, userId }) {
    const [valorProposta, setValorProposta] = useState('')
    const [comentario, setComentario] = useState('')

    const handleDelete = async (applyId) => {
        try {
            const res = await fetch(`/api/applications?id=${applyId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                console.log("Application canceled successfully");
                //if (onDelete) onDelete(applyId);
            } else {
                console.error("Failed to cancel application");
            }
        } catch (error) {
            console.error("An error occurred while canceling application", error);
        }
    };

    const handleSendResponse = async (accepted) => {
        const formData = {
            from_artist: apply.from_artist,
            from_proprietor: apply.from_proprietor,
            valorProposta: apply.valorproposta,
            status_aplicacao: 'Concluída',
            is_accepted: accepted,
            comentario_dest: comentario || null,
            id_contrato: apply.id_contrato,
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
                redirect(`/applies/${userId}`)
            } else {
                console.error('Failed to create application')
            }
        } catch (error) {
            console.error('An error occurred', error)
        }
    }

    const handlePropose = async () => {
        const formData = {
            from_artist: true,
            from_proprietor: apply.from_proprietor,
            valorProposta: valorProposta,
            status_aplicacao: apply.status_aplicacao,
            is_accepted: apply.is_accepted,
            comentario_dest: comentario || null,
            id_contrato: apply.id_contrato,
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
                redirect(`/applies/${userId}`)
            } else {
                console.error('Failed to create application')
            }
        } catch (error) {
            console.error('An error occurred', error)
        }
    }

    return (
        <div className="border-4 rounded-md p-10">
            {children}
            <h1>Status: {apply.status_aplicacao}</h1>
            {apply.status_aplicacao === 'Pendente' &&
                state === 1 ?
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex gap-4 items-center">
                        <p><strong>Valor proposta:</strong></p>
                        <Input
                            className="w-fit"
                            id="valorProposta"
                            name="valorProposta"
                            type="number"
                            placeholder="350,00"
                            value={valorProposta}
                            onChange={(e) => setValorProposta(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <p><strong>Comentário:</strong></p>
                        <Textarea
                            id="comentario"
                            name="comentario"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between">
                        <Button onClick={() => { handlePropose() }} className="mt-4">Send propose</Button>
                        <div className="flex gap-2">
                            <Button onClick={() => { handleSendResponse(true) }} className="mt-4">Accept</Button>
                            <Button onClick={() => { handleSendResponse(false) }} className="mt-4">Reject</Button>
                        </div>
                    </div >
                </div>
                :
                state === 2 &&
                <div>
                    <h1>{apply.valorproposta && `Valor Proposta: ${apply.valorproposta}`}</h1>
                    <h1>Accepted: {apply.is_accepted ? 'Yes' : 'No'}</h1>
                    <h1>{apply.comentario_dest && `Comentário: ${apply.comentario_dest}`}</h1>
                    {apply.status_aplicacao !== 'Concluída' && <Button onClick={() => { handleDelete(apply.id_aplicacao) }} className="mt-4">Cancel Apply</Button>}
                </div>
            }
        </div>
    )
}