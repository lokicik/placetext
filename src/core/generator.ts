/**
 * Core text generation engine - corpus agnostic
 */

import { createRandom, type RandomGenerator } from './random.js';
import type { Generator, GeneratorOptions } from './types.js';

const DEFAULT_MIN_WORDS_PER_SENTENCE = 5;
const DEFAULT_MAX_WORDS_PER_SENTENCE = 15;
const DEFAULT_SENTENCES_PER_PARAGRAPH = 4;

/**
 * Creates a text generator from a corpus
 * @param corpus - Array of words to use for generation
 * @param options - Optional configuration
 * @returns Generator instance with words(), sentences(), and paragraphs() methods
 * @throws Error if corpus is empty
 */
export function createGenerator(
  corpus: string[],
  options: GeneratorOptions = {}
): Generator {
  // Validate corpus
  if (!corpus || corpus.length === 0) {
    throw new Error('Corpus cannot be empty');
  }

  const {
    seed,
    minWordsPerSentence = DEFAULT_MIN_WORDS_PER_SENTENCE,
    maxWordsPerSentence = DEFAULT_MAX_WORDS_PER_SENTENCE,
    sentencesPerParagraph = DEFAULT_SENTENCES_PER_PARAGRAPH,
  } = options;

  // Create random generator (deterministic if seed provided)
  const random: RandomGenerator = createRandom(seed);

  /**
   * Pick a random word from the corpus
   */
  const pickWord = (): string => {
    return corpus[random.nextInt(corpus.length)];
  };

  /**
   * Generate a specified number of words
   */
  const words = (count: number): string => {
    if (count <= 0) {
      return '';
    }

    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(pickWord());
    }

    return result.join(' ');
  };

  /**
   * Generate a single sentence with random length
   */
  const generateSentence = (): string => {
    const wordCount =
      minWordsPerSentence +
      random.nextInt(maxWordsPerSentence - minWordsPerSentence + 1);

    const sentenceWords: string[] = [];
    for (let i = 0; i < wordCount; i++) {
      sentenceWords.push(pickWord());
    }

    // Capitalize first letter and add period
    const sentence = sentenceWords.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  /**
   * Generate a specified number of sentences
   */
  const sentences = (count: number): string => {
    if (count <= 0) {
      return '';
    }

    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSentence());
    }

    return result.join(' ');
  };

  /**
   * Generate a specified number of paragraphs
   */
  const paragraphs = (count: number): string => {
    if (count <= 0) {
      return '';
    }

    const result: string[] = [];
    for (let i = 0; i < count; i++) {
      result.push(sentences(sentencesPerParagraph));
    }

    return result.join('\n\n');
  };

  return {
    words,
    sentences,
    paragraphs,
  };
}

