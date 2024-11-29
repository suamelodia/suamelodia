import { getAplicacoesByArtista } from '@/lib/aplicacoes'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ApplyCard } from "../components/applyCard"
import { getContratoById } from '@/lib/contrato'
import { getEventoById } from '@/lib/evento'

export default async function AppliesPage({ params }: { params: { id: string } }) {
  const applies = await getAplicacoesByArtista(parseInt(params.id))

  const appliesWithDetails = await Promise.all(
    applies.map(async (apply: any) => {
      const contrato = await getContratoById(apply.id_contrato);
      const evento = await getEventoById(contrato.id_evento);

      return {
        ...apply,
        contratoValor: contrato.valor,
        eventoDescricao: evento.descricao,
        fromArtist: apply.from_artist,
        isAccepted: apply.is_accepted,
      };
    })
  );

  const appliesReceived = appliesWithDetails.filter((apply) => !apply.fromArtist && !apply.isAccepted);
  const appliesSended = appliesWithDetails.filter((apply) => apply.fromArtist && !apply.isAccepted);
  const appliesSigned = appliesWithDetails.filter((apply) => apply.isAccepted);

  return (
    <div className="space-y-6">
      {appliesSigned.length > 0 &&
        <div>
          <p><strong>Signed contracts</strong></p>
          <ScrollArea>
            <div className="flex w-max gap-x-6 p-4">
              {appliesSigned.map((apply: any) => (
                <ApplyCard key={apply.id_aplicacao} apply={apply} state={0} userId={parseInt(params.id)}>
                  <p>
                    <strong>{apply.eventoDescricao}</strong>
                  </p>
                  <h1>Contrato: {apply.valorproposta ?? apply.contratoValor}</h1>
                </ApplyCard>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      }
      {appliesReceived.length > 0 &&
        <div>
          <p><strong>Contracts received</strong></p>
          <ScrollArea>
            <div className="flex w-max gap-x-6 p-4">
              {appliesReceived.map((apply: any) => (
                <ApplyCard key={apply.id_aplicacao} apply={apply} state={1} userId={parseInt(params.id)}>
                  <p>
                    <strong>{apply.eventoDescricao}</strong>
                  </p>
                  <h1>Contrato: {apply.contratoValor}</h1>
                </ApplyCard>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      }
      {appliesSended.length > 0 &&
        <div>
          <p><strong>Contracts sended</strong></p>
          <ScrollArea>
            <div className="flex w-max gap-x-6 p-4">
              {appliesSended.map((apply: any) => (
                <ApplyCard key={apply.id_aplicacao} apply={apply} state={2} userId={parseInt(params.id)}>
                  <p>
                    <strong>{apply.eventoDescricao}</strong>
                  </p>
                  <h1>Contrato: {apply.contratoValor}</h1>
                </ApplyCard>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      }
    </div>
  )
}

