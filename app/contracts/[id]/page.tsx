import { getContratosByEvento } from '@/lib/contrato'
import { getEventosByProprietarioId } from '@/lib/evento'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAplicacoesByContratoFromArtist, getAplicacoesByContratoFromProprietario } from '@/lib/aplicacoes'
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
                contracts.length > 0 ? contracts.map(async (contract: any) => (
                  <div key={contract.id_contrato} className='border-2 rounded-md p-4 flex flex-col gap-6'>
                    <div className=' gap-5 flex'>
                      <p><strong>Valor:</strong> {contract.valor}</p>
                      <p><strong>Condições:</strong> {contract.condicoes}</p>
                    </div>
                    <div>
                      <p><strong>Applies:</strong></p>
                      {
                        await getAplicacoesByContratoFromArtist(contract.id_contrato).then(async (applies) => {
                          const acceptedApply = applies.find((apply) => apply.is_accepted);

                          if (acceptedApply) {
                            const artist = await getArtistaById(acceptedApply.id_artista);
                            const user = await getUserById(artist.id_usuario);

                            return (
                              <div key={acceptedApply.id_aplicacao} className='flex gap-3 pt-2'>
                                <p><strong>Signed contract:</strong></p>
                                <div className="flex gap-5">
                                  {acceptedApply.valorproposta ? (
                                    <p>
                                      Valor proposta: {acceptedApply.valorproposta}
                                    </p>
                                  ) : (
                                    <p>
                                      Valor: {contract.valor}
                                    </p>
                                  )}
                                  <p>
                                    Artista: {user.nome}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          if (applies.length > 0) {
                            return (
                              <div key={`applies-${contract.id_contrato}`}>
                                {await Promise.all(
                                  applies.map(async (apply) => {
                                    const artist = await getArtistaById(apply.id_artista);
                                    const user = await getUserById(artist.id_usuario);

                                    return (
                                      <AppliesForContracts key={apply.id_aplicacao} contract={contract} apply={apply} userId={parseInt(params.id)}>
                                        <div className="flex gap-5">
                                          {apply.valorproposta ? (
                                            <p>
                                              <strong>Valor proposta:</strong> {apply.valorproposta}
                                            </p>
                                          ) : (
                                            <p>
                                              <strong>Valor:</strong> {contract.valor}
                                            </p>
                                          )}
                                          <p>
                                            <strong>Artista:</strong> {user.nome}
                                          </p>
                                        </div>
                                      </AppliesForContracts>
                                    );
                                  })
                                )}
                              </div>
                            );
                          }

                          return (
                            <div key={`no-applies-${contract.id_contrato}`}>
                              <p>There is no applies for this contract</p>
                            </div>
                          );
                        })}
                    </div>
                    {/* <div>
                      <p><strong>Your Invites:</strong></p>
                      {
                        await getAplicacoesByContratoFromProprietario(contract.id_contrato).then(async (applies) => {
                          const acceptedApply = applies.find((apply) => apply.is_accepted);

                          if (acceptedApply) {
                            const artist = await getArtistaById(acceptedApply.id_artista);
                            const user = await getUserById(artist.id_usuario);

                            return (
                              <div key={acceptedApply.id_aplicacao} className='flex gap-3 pt-2'>
                                <p><strong>Signed contract:</strong></p>
                                <div className="flex gap-5">
                                  {acceptedApply.valorproposta ? (
                                    <p>
                                      Valor proposta: {acceptedApply.valorproposta}
                                    </p>
                                  ) : (
                                    <p>
                                      Valor: {contract.valor}
                                    </p>
                                  )}
                                  <p>
                                    Artista: {user.nome}
                                  </p>
                                </div>
                              </div>
                            );
                          }

                          if (applies.length > 0) {
                            return (
                              <div key={`applies-${contract.id_contrato}`}>
                                {await Promise.all(
                                  applies.map(async (apply) => {
                                    const artist = await getArtistaById(apply.id_artista);
                                    const user = await getUserById(artist.id_usuario);

                                    return (
                                      <AppliesForContracts key={apply.id_aplicacao} contract={contract} apply={apply} userId={parseInt(params.id)}>
                                        <div className="flex gap-5">
                                          {apply.valorproposta ? (
                                            <p>
                                              <strong>Valor proposta:</strong> {apply.valorproposta}
                                            </p>
                                          ) : (
                                            <p>
                                              <strong>Valor:</strong> {contract.valor}
                                            </p>
                                          )}
                                          <p>
                                            <strong>Artista:</strong> {user.nome}
                                          </p>
                                        </div>
                                      </AppliesForContracts>
                                    );
                                  })
                                )}
                              </div>
                            );
                          }

                          return (
                            <div key={`no-applies-${contract.id_contrato}`}>
                              <p>You didn't invite any artists</p>
                            </div>
                          );
                        })}
                    </div> */}
                  </div>
                ))
                  :
                  <div>
                    <p>Não há contratos para esse evento</p>
                  </div>
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

