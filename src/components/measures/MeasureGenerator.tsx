'use client'

import { useState } from 'react'
import { Copy, Check, Zap } from 'lucide-react'
import type { Parameter } from '@/types'
import { incrementCopyCount } from '@/lib/data'

interface Props {
  measureId: string
  parameters: Parameter[]
  scriptTemplate: string
}

export function MeasureGenerator({ measureId, parameters, scriptTemplate }: Props) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(parameters.map(p => [p.key, '']))
  )
  const [copied, setCopied] = useState(false)

  const generated = parameters.reduce((script, param) => {
    const val = values[param.key]?.trim() || `<${param.key}>`
    return script.replace(new RegExp(`<${param.key}>`, 'g'), val)
  }, scriptTemplate)

  const isFilled = parameters.filter(p => p.required).every(p => values[p.key]?.trim())

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    await incrementCopyCount(measureId)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden" style={{
      border: '0.5px solid var(--line)',
      borderRadius: 'var(--radius-panel)',
      background: 'var(--bg-panel)',
    }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-5 py-3.5" style={{
        borderBottom: '0.5px solid var(--line)',
        background: 'var(--bg-warm)',
      }}>
        <Zap size={14} style={{ color: 'var(--teal)' }} />
        <span className="font-serif text-base font-semibold" style={{ color: 'var(--tx-title)' }}>
          Générateur de mesure
        </span>
        <span className="ml-auto text-xs" style={{ color: 'var(--tx-light)' }}>
          Remplissez les paramètres ci-dessous
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Parameters */}
        <div className="grid gap-4 sm:grid-cols-2">
          {parameters.map(param => (
            <div key={param.key}>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--tx-label)' }}>
                {param.label}
                {param.required && <span style={{ color: 'var(--coral)' }} className="ml-1">*</span>}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1.5 font-mono text-xs pointer-events-none select-none"
                  style={{ color: 'var(--fg-soft)', fontSize: '10px' }}>
                  &lt;{param.key}&gt;
                </span>
                <input
                  type="text"
                  value={values[param.key]}
                  onChange={e => setValues(v => ({ ...v, [param.key]: e.target.value }))}
                  placeholder={param.placeholder ?? ''}
                  className="w-full font-mono text-sm outline-none transition-all"
                  style={{
                    background: 'var(--bg-warm)',
                    border: '0.5px solid var(--line)',
                    borderRadius: 'var(--radius-inner)',
                    padding: '20px 12px 6px 12px',
                    color: 'var(--tx-title)',
                    fontFamily: '"JetBrains Mono", Consolas, monospace',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--teal)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--line)')}
                />
              </div>
              {param.description && (
                <p className="text-xs mt-1" style={{ color: 'var(--tx-light)' }}>{param.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Result */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--tx-light)' }}>
              Mesure générée
            </span>
            {!isFilled && (
              <span className="text-xs" style={{ color: 'var(--coral)' }}>
                Champs obligatoires (*) manquants
              </span>
            )}
          </div>
          <div className="relative overflow-hidden" style={{
            background: 'var(--bg-warm)',
            border: `0.5px solid ${isFilled ? 'var(--teal)' : 'var(--line)'}`,
            borderRadius: 'var(--radius-inner)',
            transition: 'border-color 0.2s ease',
          }}>
            <pre className="dax-code p-4 pr-28 text-sm overflow-x-auto"
              style={{ color: isFilled ? 'var(--tx-title)' : 'var(--tx-light)' }}>
              {generated}
            </pre>
            <button
              onClick={handleCopy}
              disabled={!isFilled}
              className="absolute right-3 top-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded transition-all"
              style={{
                background: isFilled ? 'var(--teal)' : 'var(--bg-neutral)',
                color: isFilled ? '#fff' : 'var(--tx-light)',
                border: 'none',
                cursor: isFilled ? 'pointer' : 'not-allowed',
                opacity: isFilled ? 1 : 0.5,
              }}
            >
              {copied ? <><Check size={12} />Copié !</> : <><Copy size={12} />Copier</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
