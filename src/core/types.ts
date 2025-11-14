/**
 * Core type definitions for placetext
 */

/**
 * Options for configuring the text generator
 */
export interface GeneratorOptions {
  /**
   * Seed for deterministic output (optional)
   */
  seed?: number;
  
  /**
   * Minimum words per sentence (default: 5)
   */
  minWordsPerSentence?: number;
  
  /**
   * Maximum words per sentence (default: 15)
   */
  maxWordsPerSentence?: number;
  
  /**
   * Sentences per paragraph (default: 4)
   */
  sentencesPerParagraph?: number;
}

/**
 * Text generator interface
 */
export interface Generator {
  /**
   * Generate a specified number of words
   */
  words(count: number): string;
  
  /**
   * Generate a specified number of sentences
   */
  sentences(count: number): string;
  
  /**
   * Generate a specified number of paragraphs
   */
  paragraphs(count: number): string;
}

/**
 * Built-in corpus types
 */
export enum Corpus {
  Classic = 'classic',
  Tech = 'tech',
  Startup = 'startup',
  Concise = 'concise',
  Musk = 'musk',
}

/**
 * High-level API options
 */
export interface GenerateOptions {
  /**
   * Corpus to use - either a built-in corpus or custom word array
   */
  corpus?: Corpus | string[];
  
  /**
   * Number of words to generate (mutually exclusive with sentences/paragraphs)
   */
  words?: number;
  
  /**
   * Number of sentences to generate (mutually exclusive with words/paragraphs)
   */
  sentences?: number;
  
  /**
   * Number of paragraphs to generate (mutually exclusive with words/sentences)
   */
  paragraphs?: number;
  
  /**
   * Seed for deterministic output (optional)
   */
  seed?: number;
  
  /**
   * Minimum words per sentence (default: 5)
   */
  minWordsPerSentence?: number;
  
  /**
   * Maximum words per sentence (default: 15)
   */
  maxWordsPerSentence?: number;
  
  /**
   * Sentences per paragraph (default: 4)
   */
  sentencesPerParagraph?: number;
}

