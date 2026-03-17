import type { ExampleTable as ExampleTableType } from '@/types'

export function ExampleTable({ data }: { data: ExampleTableType }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 bg-gray-800">
            {data.headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => {
            const isLast = data.highlight_last && ri === data.rows.length - 1
            const isEmpty = row.every(c => c === '')
            if (isEmpty) return (
              <tr key={ri} className="border-b border-gray-800">
                {row.map((_, ci) => (
                  <td key={ci} className="px-4 py-1" />
                ))}
              </tr>
            )
            return (
              <tr
                key={ri}
                className={`border-b border-gray-800 ${isLast ? 'bg-blue-900/20 font-semibold' : 'hover:bg-gray-800/50'}`}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className={`px-4 py-2.5 ${isLast && ci === row.length - 1 ? 'text-blue-400' : 'text-gray-300'}`}>
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
