/**
 * placetext - Zero-dependency, corpus-based placeholder text generator
 * Main entry point for the high-level API
 */

import { createGenerator } from './core/generator.js';
import type { GenerateOptions } from './core/types.js';
import { Corpus } from './core/types.js';

// Import all corpora
import { classic } from './corpora/classic.js';
import { tech } from './corpora/tech.js';
import { startup } from './corpora/startup.js';
import { concise } from './corpora/concise.js';
import { musk } from './corpora/musk.js';

// Re-export types for consumer convenience
export type { GenerateOptions, GeneratorOptions, Generator } from './core/types.js';
export { Corpus } from './core/types.js';
export { createGenerator } from './core/generator.js';

// Map of built-in corpora
const CORPUS_MAP: Record<Corpus, string[]> = {
  [Corpus.Classic]: classic,
  [Corpus.Tech]: tech,
  [Corpus.Startup]: startup,
  [Corpus.Concise]: concise,
  [Corpus.Musk]: musk,
};

/**
 * High-level function to generate placeholder text
 * @param options - Configuration options
 * @returns Generated text
 * @throws Error if options are invalid
 * 
 * @example
 * ```ts
 * // Generate 3 sentences with the classic corpus
 * const text = generateText({ corpus: Corpus.Classic, sentences: 3 });
 * 
 * // Generate deterministic text with a seed
 * const text = generateText({ corpus: Corpus.Tech, sentences: 2, seed: 42 });
 * 
 * // Use a custom corpus
 * const text = generateText({ 
 *   corpus: ['apple', 'banana', 'orange'], 
 *   words: 10 
 * });
 * ```
 */
export function generateText(options: GenerateOptions = {}): string {
  const {
    corpus = Corpus.Classic,
    words,
    sentences,
    paragraphs,
    seed,
    minWordsPerSentence,
    maxWordsPerSentence,
    sentencesPerParagraph,
  } = options;

  // Validate that only one output type is specified
  const outputTypes = [words, sentences, paragraphs].filter((v) => v !== undefined);
  if (outputTypes.length > 1) {
    throw new Error(
      'Only one of words, sentences, or paragraphs can be specified'
    );
  }

  // Resolve corpus (either built-in or custom array)
  let resolvedCorpus: string[];
  if (Array.isArray(corpus)) {
    resolvedCorpus = corpus;
  } else if (typeof corpus === 'string' && corpus in CORPUS_MAP) {
    resolvedCorpus = CORPUS_MAP[corpus as Corpus];
  } else {
    throw new Error(
      `Invalid corpus: ${corpus}. Must be a Corpus enum value or an array of strings.`
    );
  }

  // Create generator with options
  const generator = createGenerator(resolvedCorpus, {
    seed,
    minWordsPerSentence,
    maxWordsPerSentence,
    sentencesPerParagraph,
  });

  // Generate based on specified output type
  if (words !== undefined) {
    return generator.words(words);
  } else if (paragraphs !== undefined) {
    return generator.paragraphs(paragraphs);
  } else {
    // Default to sentences (default count is 3)
    return generator.sentences(sentences ?? 3);
  }
}

// Default export
export default generateText;

