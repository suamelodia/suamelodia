import { getAplicacoesByArtista } from '@/lib/aplicacoes'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ApplyCard } from "../components/applyCard"
import { getContratoById } from '@/lib/contrato'
import { getEventoById } from '@/lib/evento'

export default async function AppliesPage({ params }: { params: { id: string } }) {
  const applies = await getAplicacoesByArtista(parseInt(params.id))

  return (
    <div className="space-y-6">
      <ScrollArea>
        <div className="flex w-max gap-x-6 p-4">
          {applies.map(async (apply: any) => (
            <ApplyCard key={apply.id_aplicacao} apply={apply} >
              <p><strong>{await getContratoById(apply.id_contrato).then(async (contrato) => { return await getEventoById(contrato.id_evento).then((evento) => { return evento.descricao }) })}</strong></p>
              <h1>Contrato: {await getContratoById(apply.id_contrato).then(async (contrato) => { return contrato.valor })}</h1>
            </ApplyCard>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

