import { getContratosByEvento } from '@/lib/contrato'
import { getEventosByProprietarioId } from '@/lib/evento'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAplicacoesByContratoFromArtist } from '@/lib/aplicacoes'
import { AppliesForContracts } from '../components/buttonsApplies'
import { getProprietarioByUserId } from '@/lib/proprietario'
import { getArtistaById } from '@/lib/artista'
import { getUserById } from '@/lib/usuario'

export default async function ContractDetailPage({ params }: { params: { id: string } }) {
  const proprietario = await getProprietarioByUserId(parseInt(params.id));
  const events = await getEventosByProprietarioId(proprietario.id_proprietario)

  if (!events) {
    return <div className='h-full w-full flex items-center justify-center'>Não há contratos disponíveis</div>
  }

  return (
    <div className="space-y-6">
      {events.map(async (event) => (
        <div key={event.id_evento}>
          <Card>
            <CardHeader>
              <CardTitle>{event.descricao}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-y-4'>
              {await getContratosByEvento(event.id_evento).then((contracts) =>
                contracts.map(async (contract: any) => (
                  <div key={contract.id_contrato} className='border-2 rounded-md p-4 flex flex-col gap-6'>
                    <div className=' gap-5 flex'>
                      <p><strong>Valor:</strong> {contract.valor}</p>
                      <p><strong>Condições:</strong> {contract.condicoes}</p>
                    </div>
                    <div>
                      <p><strong>Applies:</strong></p>
                      {await getAplicacoesByContratoFromArtist(contract.id_contrato).then((applies) => (
                        applies.map(async (apply: any) => (
                          <AppliesForContracts key={apply.id_aplicacao} contract={contract} apply={apply} userId={parseInt(params.id)} >
                            <div className='flex gap-5'>
                              {apply.valorproposta ? <p><strong>Valor proposta:</strong> {apply.valorproposta}</p>
                                : <p><strong>Valor:</strong> {contract.valor}</p>}
                              <p><strong>Artista:</strong> {await getArtistaById(apply.id_artista).then(async (artista) => { return await getUserById(artista.id_usuario).then((user) => { return user.nome }) })}</p>
                            </div>
                          </AppliesForContracts>
                        ))
                      ))}
                    </div>
                  </div>
                ))
              )}
              {/* <p><strong>Event:</strong> {event.descricao}</p>
              <p><strong>Artist:</strong> {user.nome}</p>
              <p><strong>Value:</strong> ${contract.valor}</p>
              <p><strong>Payment Status:</strong> {contract.status_pagamento}</p>
              <p><strong>Conditions:</strong> {contract.condicoes || 'No specific conditions'}</p> */}
            </CardContent>
          </Card>
          {/* <div className="flex justify-end space-x-4">
            <Link href={`/contracts/${params.id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="destructive">Delete</Button>
          </div> */}
        </div>
      ))}
    </div>
  )
}

