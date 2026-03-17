export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="h-10 w-64 rounded mb-3" style={{ background: 'var(--bg-neutral)', animation: 'pulse 1.5s infinite' }} />
      <div className="h-6 w-96 rounded mb-10" style={{ background: 'var(--bg-neutral)', animation: 'pulse 1.5s infinite' }} />
      <div className="h-10 w-full max-w-2xl mx-auto rounded mb-5" style={{ background: 'var(--bg-neutral)', animation: 'pulse 1.5s infinite' }} />
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-7 w-20 rounded-full" style={{ background: 'var(--bg-neutral)', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-52 rounded-panel" style={{ background: 'var(--bg-neutral)', borderRadius: 'var(--radius-panel)', animation: 'pulse 1.5s infinite' }} />
        ))}
      </div>
    </div>
  )
}
