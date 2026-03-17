import type { ExampleTable as T } from '@/types'

export function ExampleTable({ data }: { data: T }) {
  return (
    <div className="overflow-x-auto" style={{ border: '0.5px solid var(--line)', borderRadius: 'var(--radius-inner)' }}>
      <table className="w-full text-xs font-mono">
        <thead>
          <tr style={{ borderBottom: '0.5px solid var(--line)', background: 'var(--bg-panel)' }}>
            {data.headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left font-medium tracking-wider uppercase"
                style={{ color: 'var(--tx-light)', fontSize: '10px' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ background: 'var(--bg-warm)' }}>
          {data.rows.map((row, ri) => {
            const isHighlighted = data.highlight_last && ri === data.rows.length - 1
            const isEmpty = row.every(c => c === '')
            if (isEmpty) return (
              <tr key={ri} style={{ borderBottom: '0.5px solid var(--line)' }}>
                {row.map((_, ci) => <td key={ci} className="px-4 py-1" />)}
              </tr>
            )
            return (
              <tr key={ri}
                style={{
                  borderBottom: ri < data.rows.length - 1 ? '0.5px solid var(--line)' : 'none',
                  background: isHighlighted ? 'var(--teal-xlight)' : 'transparent',
                }}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5"
                    style={{ color: isHighlighted ? 'var(--teal)' : 'var(--tx-label)', fontWeight: isHighlighted ? '500' : '400' }}>
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
