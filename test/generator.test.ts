/**
 * Core generator tests
 * Run with: npm test
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { createGenerator } from '../src/core/generator.js';
import { generateText, Corpus } from '../src/index.js';

const testCorpus = ['hello', 'world', 'test', 'code', 'javascript'];

test('createGenerator throws error for empty corpus', () => {
  assert.throws(
    () => createGenerator([]),
    /Corpus cannot be empty/
  );
});

test('createGenerator throws error for null corpus', () => {
  assert.throws(
    // @ts-expect-error - testing invalid input
    () => createGenerator(null),
    /Corpus cannot be empty/
  );
});

test('words() generates correct number of words', () => {
  const generator = createGenerator(testCorpus);
  const result = generator.words(10);
  const words = result.split(' ');
  assert.strictEqual(words.length, 10);
});

test('words() returns empty string for count <= 0', () => {
  const generator = createGenerator(testCorpus);
  assert.strictEqual(generator.words(0), '');
  assert.strictEqual(generator.words(-5), '');
});

test('sentences() generates correct number of sentences', () => {
  const generator = createGenerator(testCorpus);
  const result = generator.sentences(3);
  const sentences = result.split('. ').filter(s => s.length > 0);
  assert.strictEqual(sentences.length, 3);
});

test('sentences() capitalizes first letter and adds period', () => {
  const generator = createGenerator(testCorpus, { seed: 42 });
  const result = generator.sentences(1);
  assert.strictEqual(result[0], result[0].toUpperCase());
  assert.ok(result.endsWith('.'));
});

test('sentences() returns empty string for count <= 0', () => {
  const generator = createGenerator(testCorpus);
  assert.strictEqual(generator.sentences(0), '');
  assert.strictEqual(generator.sentences(-3), '');
});

test('paragraphs() generates correct number of paragraphs', () => {
  const generator = createGenerator(testCorpus);
  const result = generator.paragraphs(3);
  const paragraphs = result.split('\n\n');
  assert.strictEqual(paragraphs.length, 3);
});

test('paragraphs() returns empty string for count <= 0', () => {
  const generator = createGenerator(testCorpus);
  assert.strictEqual(generator.paragraphs(0), '');
  assert.strictEqual(generator.paragraphs(-2), '');
});

test('seeded runs produce identical output', () => {
  const generator1 = createGenerator(testCorpus, { seed: 12345 });
  const generator2 = createGenerator(testCorpus, { seed: 12345 });

  const result1 = generator1.sentences(5);
  const result2 = generator2.sentences(5);

  assert.strictEqual(result1, result2);
});

test('seeded runs produce identical output for words', () => {
  const generator1 = createGenerator(testCorpus, { seed: 99 });
  const generator2 = createGenerator(testCorpus, { seed: 99 });

  const result1 = generator1.words(20);
  const result2 = generator2.words(20);

  assert.strictEqual(result1, result2);
});

test('seeded runs produce identical output for paragraphs', () => {
  const generator1 = createGenerator(testCorpus, { seed: 777 });
  const generator2 = createGenerator(testCorpus, { seed: 777 });

  const result1 = generator1.paragraphs(2);
  const result2 = generator2.paragraphs(2);

  assert.strictEqual(result1, result2);
});

test('unseeded runs produce different output', () => {
  const generator1 = createGenerator(testCorpus);
  const generator2 = createGenerator(testCorpus);

  const result1 = generator1.sentences(10);
  const result2 = generator2.sentences(10);

  // With high probability, these should be different
  assert.notStrictEqual(result1, result2);
});

test('custom minWordsPerSentence and maxWordsPerSentence work', () => {
  const generator = createGenerator(testCorpus, {
    seed: 42,
    minWordsPerSentence: 3,
    maxWordsPerSentence: 5,
  });

  const result = generator.sentences(1);
  const words = result.replace('.', '').split(' ');
  
  assert.ok(words.length >= 3 && words.length <= 5);
});

test('generateText() with default options works', () => {
  const result = generateText();
  assert.ok(result.length > 0);
  assert.ok(result.includes('.'));
});

test('generateText() with words option works', () => {
  const result = generateText({ words: 5 });
  const words = result.split(' ');
  assert.strictEqual(words.length, 5);
});

test('generateText() with sentences option works', () => {
  const result = generateText({ sentences: 2 });
  const sentences = result.split('. ').filter(s => s.length > 0);
  assert.strictEqual(sentences.length, 2);
});

test('generateText() with paragraphs option works', () => {
  const result = generateText({ paragraphs: 2 });
  const paragraphs = result.split('\n\n');
  assert.strictEqual(paragraphs.length, 2);
});

test('generateText() with custom corpus works', () => {
  const customCorpus = ['foo', 'bar', 'baz'];
  const result = generateText({ corpus: customCorpus, words: 10, seed: 42 });
  
  // All words should be from custom corpus
  const words = result.split(' ');
  words.forEach(word => {
    assert.ok(customCorpus.includes(word));
  });
});

test('generateText() throws error for multiple output types', () => {
  assert.throws(
    () => generateText({ words: 5, sentences: 3 }),
    /Only one of words, sentences, or paragraphs can be specified/
  );
});

test('generateText() throws error for invalid corpus', () => {
  assert.throws(
    // @ts-expect-error - testing invalid input
    () => generateText({ corpus: 'invalid' }),
    /Invalid corpus/
  );
});

test('generateText() with seed produces deterministic output', () => {
  const result1 = generateText({ corpus: Corpus.Tech, sentences: 3, seed: 100 });
  const result2 = generateText({ corpus: Corpus.Tech, sentences: 3, seed: 100 });
  
  assert.strictEqual(result1, result2);
});

test('generateText() works with all built-in corpora', () => {
  const corpora = [Corpus.Classic, Corpus.Tech, Corpus.Startup, Corpus.Concise, Corpus.Musk];
  
  corpora.forEach(corpus => {
    const result = generateText({ corpus, sentences: 2 });
    assert.ok(result.length > 0);
  });
});

test('generator respects sentencesPerParagraph option', () => {
  const generator = createGenerator(testCorpus, {
    seed: 42,
    sentencesPerParagraph: 2,
  });

  const result = generator.paragraphs(1);
  const sentences = result.split('. ').filter(s => s.length > 0);
  
  // Should have 2 sentences in the paragraph
  assert.strictEqual(sentences.length, 2);
});

