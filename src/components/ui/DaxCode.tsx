'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

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
  let html = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  html = html.replace(/(--[^\n]*)/g, '<span class="dax-comment">$1</span>')
  html = html.replace(/"([^"]*)"/g, '<span class="dax-string">"$1"</span>')
  const fnPat = new RegExp(`\\b(${DAX_FUNCTIONS.join('|')})\\b(?=\\s*\\()`, 'gi')
  html = html.replace(fnPat, '<span class="dax-function">$1</span>')
  html = html.replace(/\b(VAR|RETURN)\b/g, '<span class="dax-keyword">$1</span>')
  html = html.replace(
    /([A-Za-z_][A-Za-z0-9_ ]*)\[([^\]]+)\]/g,
    '<span class="dax-table">$1</span><span class="dax-placeholder">[</span><span class="dax-column">$2</span><span class="dax-placeholder">]</span>'
  )
  html = html.replace(/(&lt;[^&]+&gt;)/g, '<span class="dax-placeholder">$1</span>')
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="dax-number">$1</span>')
  return html
}

interface DaxCodeProps {
  code: string
  onCopy?: () => void
  label?: string
}

export function DaxCode({ code, onCopy, label }: DaxCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="overflow-hidden" style={{
      border: '0.5px solid var(--line)',
      borderRadius: 'var(--radius-inner)',
      backgroundColor: 'var(--bg-warm)',
    }}>
      <div className="flex items-center justify-between px-4 py-2" style={{
        borderBottom: '0.5px solid var(--line)',
        backgroundColor: 'var(--bg-panel)',
      }}>
        <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--tx-light)' }}>
          {label ?? 'DAX'}
        </span>
        <button onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded transition-all"
          style={{
            border: '0.5px solid var(--line)',
            color: copied ? 'var(--teal)' : 'var(--tx-light)',
            backgroundColor: 'transparent',
          }}
        >
          {copied
            ? <><Check size={11} /><span>Copié</span></>
            : <><Copy size={11} /><span>Copier</span></>
          }
        </button>
      </div>
      <pre className="dax-code overflow-x-auto px-5 py-4 text-sm">
        <code dangerouslySetInnerHTML={{ __html: highlightDax(code) }} />
      </pre>
    </div>
  )
}
