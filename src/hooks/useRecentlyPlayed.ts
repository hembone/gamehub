import { useState, useCallback, useEffect } from 'react'

const KEY = 'arcade-void-recent'
const MAX = 24

function readSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

export function useRecentlyPlayed() {
  const [slugs, setSlugs] = useState<string[]>([])

  useEffect(() => {
    setSlugs(readSlugs())
  }, [])

  const add = useCallback((slug: string) => {
    setSlugs(prev => {
      const next = [slug, ...prev.filter(s => s !== slug)].slice(0, MAX)
      try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  return { slugs, add }
}
