'use client'

import { Button } from "@/components/ui/button"

export function ApplyCard({apply}){
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
      

    return (
        <div className="border-4 rounded-md p-10">
            <h1>Contrato: {apply.id_contrato}</h1>
            <h1>Status: {apply.status_aplicacao}</h1>
            <h1>Valor Proposta: {apply.valorproposta}</h1>
            <h1>Aceito: {apply.is_accepted}</h1>
            <h1>Comentário: {apply.comentario_dest}</h1>
            <Button onClick={() => {handleDelete(apply.id_aplicacao)}} variant="destructive" className="mt-4">Cancel Apply</Button>
        </div>
    )
}