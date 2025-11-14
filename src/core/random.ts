/**
 * Mulberry32 PRNG - a simple, fast, deterministic pseudorandom number generator
 * Works identically in Node and browser environments
 */

export interface RandomGenerator {
  /**
   * Returns a random number between 0 (inclusive) and 1 (exclusive)
   */
  next(): number;
  
  /**
   * Returns a random integer between 0 (inclusive) and max (exclusive)
   */
  nextInt(max: number): number;
}

/**
 * Creates a random number generator
 * @param seed - Optional seed for deterministic output. If not provided, generates a random seed
 * @returns A random generator with next() and nextInt() methods
 */
export function createRandom(seed?: number): RandomGenerator {
  // If no seed provided, generate a random seed using Date.now() and Math.random()
  // This ensures different generators created at the same time get different seeds
  let state = seed ?? (Date.now() * Math.random()) | 0;
  
  // Mulberry32 algorithm
  const next = (): number => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  
  const nextInt = (max: number): number => {
    return Math.floor(next() * max);
  };
  
  return {
    next,
    nextInt,
  };
}

