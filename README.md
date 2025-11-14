# placetext

[![npm](https://img.shields.io/npm/dm/placetext.svg)](https://www.npmjs.com/package/placetext)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A zero dependency corpus based placeholder text generator with deterministic output.

## Quick Start

```ts
import { generateText, Corpus } from "placetext";

const text = generateText({ corpus: Corpus.Classic, sentences: 5 });
console.log(text);
```

## Installation

```bash
npm install placetext
```

## Basic API

### generateText(options)

Generates text using a selected corpus.

**Common options:**

- `corpus` Corpus or string array
- `words` number
- `sentences` number
- `paragraphs` number
- `seed` number

Only one of `words`, `sentences`, or `paragraphs` should be provided.

### createGenerator(corpus, options)

Low level generator for custom flows.

```ts
import { createGenerator } from "placetext";
const g = createGenerator(["alpha", "beta", "gamma"], { seed: 7 });

console.log(g.sentences(2));
```

## Built in Corpora

Short samples so users know what they get.

### Classic

```ts
generateText({ corpus: Corpus.Classic, sentences: 1 });
// "Lorem ipsum dolor sit amet consectetur adipiscing elit."
```

### Tech

```ts
generateText({ corpus: Corpus.Tech, sentences: 1 });
// "Algorithm buffer async backend protocol interface."
```

### Startup

```ts
generateText({ corpus: Corpus.Startup, sentences: 1 });
// "Leverage synergy accelerate innovative paradigm solution."
```

### Concise

```ts
generateText({ corpus: Corpus.Concise, sentences: 1 });
// "Time moves fast people learn quickly things change often."
```

### Musk

```ts
generateText({ corpus: Corpus.Musk, sentences: 1 });
// "Mars starship neural rocket accelerate future."
```

## Custom Corpora

```ts
const words = ["apple", "banana", "cherry"];
generateText({ corpus: words, sentences: 2 });
```

## Deterministic Output

```ts
const a = generateText({ corpus: Corpus.Tech, sentences: 3, seed: 42 });
const b = generateText({ corpus: Corpus.Tech, sentences: 3, seed: 42 });
// a and b are identical
```

## Advanced Usage

Import only what you need to reduce bundle size.

```ts
import { createGenerator } from "placetext/core";
import { tech } from "placetext/corpora/tech";

const g = createGenerator(tech);
```

## Why placetext

Most placeholder generators are tied to lorem ipsum, include unnecessary dependencies, or lack deterministic output. placetext provides:

- zero dependencies
- full TypeScript implementation
- deterministic mode for tests
- multiple built in corpora
- low level and high level APIs

## License

MIT

## Contributing

Pull requests and issues are welcome.
