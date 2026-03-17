import { NextRequest, NextResponse } from 'next/server'
import { getMeasures } from '@/lib/data'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  try {
    const measures = await getMeasures({
      search: searchParams.get('q') ?? undefined,
      categorySlug: searchParams.get('category') ?? undefined,
      tag: searchParams.get('tag') ?? undefined,
    })
    return NextResponse.json(measures)
  } catch (error) {
    console.error('[API /measures]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
