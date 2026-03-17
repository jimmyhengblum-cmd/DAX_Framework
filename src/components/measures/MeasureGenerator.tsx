'use client'

import { useState } from 'react'
import { Copy, Check, Wand2 } from 'lucide-react'
import type { Parameter } from '@/types'
import { incrementCopyCount } from '@/lib/data'
import { DaxCode } from '@/components/ui/DaxCode'

interface MeasureGeneratorProps {
  measureId: string
  parameters: Parameter[]
  scriptTemplate: string
}

export function MeasureGenerator({ measureId, parameters, scriptTemplate }: MeasureGeneratorProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(parameters.map((p) => [p.key, '']))
  )
  const [copied, setCopied] = useState(false)

  const generated = parameters.reduce((script, param) => {
    const val = values[param.key]?.trim() || `<${param.key}>`
    return script.replace(new RegExp(`<${param.key}>`, 'g'), val)
  }, scriptTemplate)

  const isFilled = parameters
    .filter((p) => p.required)
    .every((p) => values[p.key]?.trim())

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generated)
    setCopied(true)
    await incrementCopyCount(measureId)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-700 bg-gray-800/50 px-5 py-3">
        <Wand2 className="h-4 w-4 text-blue-400" />
        <span className="font-medium text-white text-sm">Générateur de mesure</span>
        <span className="ml-auto text-xs text-gray-500">Remplissez les paramètres ci-dessous</span>
      </div>

      <div className="p-5 space-y-5">
        {/* Parameters */}
        <div className="grid gap-4 sm:grid-cols-2">
          {parameters.map((param) => (
            <div key={param.key}>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                {param.label}
                {param.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-gray-600">
                  &lt;{param.key}&gt;
                </span>
                <input
                  type="text"
                  value={values[param.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [param.key]: e.target.value }))}
                  placeholder={param.placeholder ?? ''}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-3 pr-3 py-2
                             text-white placeholder-gray-600 font-mono text-sm
                             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                             pt-6 pb-2"
                />
              </div>
              {param.description && (
                <p className="text-xs text-gray-500 mt-1">{param.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Result */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Mesure générée
            </span>
            {!isFilled && (
              <span className="text-xs text-yellow-600">
                Remplissez les champs obligatoires (*)
              </span>
            )}
          </div>

          <div className="relative group rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
            <pre className="dax-code p-4 text-sm overflow-x-auto">
              <code className={isFilled ? 'text-gray-100' : 'text-gray-500'}>
                {generated}
              </code>
            </pre>

            <button
              onClick={handleCopy}
              disabled={!isFilled}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md px-3 py-1.5
                         text-xs font-medium transition-all
                         disabled:opacity-30 disabled:cursor-not-allowed
                         bg-blue-600 hover:bg-blue-500 text-white"
            >
              {copied ? (
                <><Check className="h-3.5 w-3.5" />Copié !</>
              ) : (
                <><Copy className="h-3.5 w-3.5" />Copier</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
