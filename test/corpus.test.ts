/**
 * Corpus validation tests
 * Run with: npm test
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { classic } from '../src/corpora/classic.js';
import { tech } from '../src/corpora/tech.js';
import { startup } from '../src/corpora/startup.js';
import { concise } from '../src/corpora/concise.js';
import { musk } from '../src/corpora/musk.js';

const corpora = [
  { name: 'classic', corpus: classic },
  { name: 'tech', corpus: tech },
  { name: 'startup', corpus: startup },
  { name: 'concise', corpus: concise },
  { name: 'musk', corpus: musk },
];

corpora.forEach(({ name, corpus }) => {
  test(`${name} corpus is not empty`, () => {
    assert.ok(corpus.length > 0, `${name} corpus should have at least one word`);
  });

  test(`${name} corpus has no empty strings`, () => {
    corpus.forEach((word, index) => {
      assert.ok(
        word && word.length > 0,
        `${name} corpus has empty string at index ${index}`
      );
    });
  });

  test(`${name} corpus has no duplicate entries`, () => {
    const uniqueWords = new Set(corpus);
    assert.strictEqual(
      uniqueWords.size,
      corpus.length,
      `${name} corpus has duplicate entries`
    );
  });

  test(`${name} corpus words have reasonable length`, () => {
    corpus.forEach((word, index) => {
      assert.ok(
        word.length >= 1 && word.length <= 50,
        `${name} corpus word at index ${index} has unreasonable length: ${word.length}`
      );
    });
  });

  test(`${name} corpus words are strings`, () => {
    corpus.forEach((word, index) => {
      assert.strictEqual(
        typeof word,
        'string',
        `${name} corpus item at index ${index} is not a string`
      );
    });
  });

  test(`${name} corpus has sufficient size`, () => {
    // At least 50 words for variety
    assert.ok(
      corpus.length >= 50,
      `${name} corpus should have at least 50 words for variety, has ${corpus.length}`
    );
  });
});

test('classic corpus contains lorem ipsum words', () => {
  assert.ok(classic.includes('lorem'));
  assert.ok(classic.includes('ipsum'));
  assert.ok(classic.includes('dolor'));
});

test('tech corpus contains programming terms', () => {
  assert.ok(tech.includes('function'));
  assert.ok(tech.includes('api'));
  assert.ok(tech.includes('async'));
});

test('startup corpus contains business buzzwords', () => {
  assert.ok(startup.includes('synergy'));
  assert.ok(startup.includes('disrupt'));
  assert.ok(startup.includes('leverage'));
});

test('concise corpus contains common short words', () => {
  assert.ok(concise.includes('the'));
  assert.ok(concise.includes('is'));
  assert.ok(concise.includes('and'));
});

test('musk corpus contains characteristic terms', () => {
  assert.ok(musk.includes('mars'));
  assert.ok(musk.includes('rocket'));
  assert.ok(musk.includes('tesla'));
});

