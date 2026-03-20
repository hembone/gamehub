import { useState, useCallback, useEffect } from 'react'

const KEY = 'arcade-void-favorites'

function readSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useFavorites() {
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    setSlugs(readSlugs())
  }, [])

  const toggle = useCallback((slug: string) => {
    setSlugs(prev => {
      const next = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [slug, ...prev]
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const isFavorite = useCallback((slug: string) => slugs.includes(slug), [slugs])

  return { slugs, toggle, isFavorite }
}
