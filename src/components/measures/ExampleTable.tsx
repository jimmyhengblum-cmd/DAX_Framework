import type { ExampleTable as ExampleTableType } from '@/types'

export function ExampleTable({ data }: { data: ExampleTableType }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-900">
            {data.headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-900/50">
          {data.rows.map((row, ri) => {
            const isHighlighted = data.highlight_last && ri === data.rows.length - 1
            const isEmpty = row.every(c => c === '')
            if (isEmpty) return (
              <tr key={ri} className="border-b border-gray-800/50">
                {row.map((_, ci) => <td key={ci} className="px-4 py-1" />)}
              </tr>
            )
            return (
              <tr
                key={ri}
                className={`border-b border-gray-800/50 last:border-0 transition-colors
                  ${isHighlighted ? 'bg-blue-950/40' : 'hover:bg-gray-800/40'}`}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2.5 font-mono text-xs
                      ${isHighlighted ? 'text-blue-300 font-medium' : 'text-gray-300'}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
