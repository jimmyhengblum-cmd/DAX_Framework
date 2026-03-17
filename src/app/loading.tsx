export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Search skeleton */}
      <div className="max-w-2xl mx-auto h-12 rounded-xl bg-gray-800 animate-pulse mb-6" />
      {/* Filter skeleton */}
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 w-24 rounded-full bg-gray-800 animate-pulse" />
        ))}
      </div>
      {/* Cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="h-52 rounded-xl bg-gray-900 border border-gray-800 animate-pulse" />
        ))}
      </div>
    </div>
  )
}
