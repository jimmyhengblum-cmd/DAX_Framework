'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import clsx from 'clsx'

const DAX_FUNCTIONS = [
  'CALCULATE','SUM','SUMX','AVERAGE','AVERAGEX','COUNT','COUNTA','COUNTX','COUNTROWS',
  'DISTINCTCOUNT','MIN','MAX','MINX','MAXX','DIVIDE','IF','IFERROR','SWITCH','AND','OR','NOT',
  'ALL','ALLEXCEPT','ALLSELECTED','FILTER','RELATED','RELATEDTABLE','LOOKUPVALUE',
  'VALUES','DISTINCT','HASONEVALUE','SELECTEDVALUE','ISBLANK','BLANK',
  'DATESYTD','DATESMTD','DATESQTD','SAMEPERIODLASTYEAR','DATEADD','DATESBETWEEN',
  'STARTOFYEAR','ENDOFYEAR','STARTOFMONTH','ENDOFMONTH','RANKX','TOPN',
  'EARLIER','EARLIEST','VAR','RETURN','IN','TRUE','FALSE',
  'CONCATENATE','FORMAT','LEFT','RIGHT','MID','LEN','TRIM','UPPER','LOWER',
  'DATE','YEAR','MONTH','DAY','TODAY','NOW','WEEKDAY','EOMONTH',
]

function highlightDax(code: string): string {
  // Escape HTML
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // Comments
  html = html.replace(/(--[^\n]*)/g, '<span class="dax-comment">$1</span>')

  // Strings
  html = html.replace(/"([^"]*)"/g, '<span class="dax-string">"$1"</span>')

  // Functions (case-insensitive, followed by '(')
  const fnPattern = new RegExp(`\\b(${DAX_FUNCTIONS.join('|')})\\b(?=\\s*\\()`, 'gi')
  html = html.replace(fnPattern, '<span class="dax-function">$1</span>')

  // VAR / RETURN keywords
  html = html.replace(/\b(VAR|RETURN)\b/g, '<span class="dax-keyword">$1</span>')

  // Table[Column] pattern
  html = html.replace(/([A-Za-z_][A-Za-z0-9_ ]*)\[([^\]]+)\]/g,
    '<span class="dax-table">$1</span><span class="dax-operator">[</span><span class="dax-column">$2</span><span class="dax-operator">]</span>'
  )

  // Template placeholders <param>
  html = html.replace(/(&lt;[^&]+&gt;)/g, '<span class="dax-string">$1</span>')

  // Operators
  html = html.replace(/([=<>!+\-*/,])/g, '<span class="dax-operator">$1</span>')

  // Numbers
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="dax-number">$1</span>')

  return html
}

interface DaxCodeProps {
  code: string
  onCopy?: () => void
  label?: string
  className?: string
}

export function DaxCode({ code, onCopy, label, className }: DaxCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={clsx('group relative rounded-lg border border-gray-700 bg-gray-900', className)}>
      {label && (
        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-2">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
          >
            {copied ? (
              <><Check className="h-3 w-3 text-green-400" /><span className="text-green-400">Copié !</span></>
            ) : (
              <><Copy className="h-3 w-3" /><span>Copier</span></>
            )}
          </button>
        </div>
      )}
      {!label && (
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded px-2 py-1 text-xs
                     text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white transition-colors
                     opacity-0 group-hover:opacity-100"
        >
          {copied ? <><Check className="h-3 w-3 text-green-400" />Copié</> : <><Copy className="h-3 w-3" />Copier</>}
        </button>
      )}
      <pre className={clsx('dax-code overflow-x-auto p-4 text-sm', !label && 'pt-4')}>
        <code dangerouslySetInnerHTML={{ __html: highlightDax(code) }} />
      </pre>
    </div>
  )
}
