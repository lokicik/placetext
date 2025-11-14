/**
 * Basic usage examples for placetext
 * Run with: npx tsx examples/basic-usage.ts
 */

import { generateText, Corpus } from '../src/index.js';

console.log('=== placetext examples ===\n');

// Example 1: Basic usage with default options
console.log('1. Default (3 sentences, classic corpus):');
console.log(generateText());
console.log();

// Example 2: Generate words
console.log('2. Generate 10 words:');
console.log(generateText({ words: 10 }));
console.log();

// Example 3: Tech corpus
console.log('3. Tech corpus (2 sentences):');
console.log(generateText({ corpus: Corpus.Tech, sentences: 2 }));
console.log();

// Example 4: Startup buzzwords
console.log('4. Startup corpus (3 sentences):');
console.log(generateText({ corpus: Corpus.Startup, sentences: 3 }));
console.log();

// Example 5: Concise words
console.log('5. Concise corpus (2 sentences):');
console.log(generateText({ corpus: Corpus.Concise, sentences: 2 }));
console.log();

// Example 6: Musk corpus
console.log('6. Musk corpus (2 sentences):');
console.log(generateText({ corpus: Corpus.Musk, sentences: 2 }));
console.log();

// Example 7: Paragraphs
console.log('7. Two paragraphs with classic corpus:');
console.log(generateText({ corpus: Corpus.Classic, paragraphs: 2 }));
console.log();

// Example 8: Deterministic with seed
console.log('8. Deterministic output (seed=42):');
console.log(generateText({ corpus: Corpus.Tech, sentences: 2, seed: 42 }));
console.log('Same seed again:');
console.log(generateText({ corpus: Corpus.Tech, sentences: 2, seed: 42 }));
console.log();

// Example 9: Custom corpus
console.log('9. Custom corpus:');
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape'];
console.log(generateText({ corpus: fruits, sentences: 2, seed: 100 }));
console.log();

// Example 10: Custom sentence length
console.log('10. Custom sentence length (3-6 words per sentence):');
console.log(generateText({ 
  corpus: Corpus.Concise, 
  sentences: 3,
  minWordsPerSentence: 3,
  maxWordsPerSentence: 6,
  seed: 50
}));

