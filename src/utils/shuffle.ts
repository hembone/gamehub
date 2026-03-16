/** Seeded pseudo-random number generator (mulberry32) */
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

/** Fisher-Yates shuffle using a seeded RNG */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  const rand = mulberry32(seed)
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Returns a shuffled copy of the array, stable for the browser session */
export function sessionShuffle<T>(arr: T[], key = 'arcade-void-shuffle-seed'): T[] {
  if (typeof window === 'undefined') return arr
  let seed: number
  try {
    const stored = sessionStorage.getItem(key)
    seed = stored ? parseInt(stored, 10) : NaN
    if (isNaN(seed)) {
      seed = Math.floor(Math.random() * 2 ** 32)
      sessionStorage.setItem(key, String(seed))
    }
  } catch {
    seed = Date.now()
  }
  return seededShuffle(arr, seed)
}
