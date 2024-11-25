import { Button } from "@/components/ui/button"
import { getAplicacoesByArtista } from '@/lib/aplicacoes'
import { ScrollBar } from '@/components/ui/scroll-area'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ApplyCard } from "../components/applyCard"

export default async function AppliesPage({ params }: { params: { id: string } }) {
  const applies = await getAplicacoesByArtista(parseInt(params.id))

  return (
    <div className="space-y-6">
      <ScrollArea>
        <div className="flex w-max gap-x-6 p-4">
          {applies.map((apply: any) => (
            <ApplyCard key={apply.id_aplicacao} apply={apply} />
          ))}
        </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
  )
}

