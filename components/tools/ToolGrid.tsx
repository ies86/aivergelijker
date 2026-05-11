import type { Tool } from '@/lib/types'
import ToolCard from './ToolCard'

interface Props {
  tools: Tool[]
  emptyMessage?: string
}

export default function ToolGrid({ tools, emptyMessage = 'Geen tools gevonden.' }: Props) {
  if (tools.length === 0) {
    return <p className="text-gray-500 text-sm">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
}
