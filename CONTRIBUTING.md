# Contributing to placetext

Thank you for your interest in contributing to placetext! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, constructive, and professional in all interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)
- Code sample demonstrating the issue

### Suggesting Features

For feature requests, please:

- Check if it's already been requested
- Explain the use case
- Describe the proposed solution
- Consider backward compatibility

### Contributing Code

1. **Fork the repository**

2. **Clone your fork**:

   ```bash
   git clone https://github.com/lokicik/placetext.git
   cd placetext
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes**

6. **Run tests**:

   ```bash
   npm test
   ```

7. **Type check**:

   ```bash
   npm run typecheck
   ```

8. **Build**:

   ```bash
   npm run build
   ```

9. **Commit your changes**:

   ```bash
   git commit -m "feat: add your feature"
   ```

   Use conventional commit messages:

   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `test:` for tests
   - `refactor:` for refactoring
   - `chore:` for maintenance

10. **Push to your fork**:

    ```bash
    git push origin feature/your-feature-name
    ```

11. **Create a Pull Request**

## Development Guidelines

### Code Style

- Use TypeScript
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Write tests for all new features
- Ensure existing tests pass
- Aim for high test coverage
- Test edge cases

### Type Safety

- Avoid `any` types
- Use strict TypeScript settings
- Export types for public APIs
- Document complex types

### Documentation

- Update README for user-facing changes
- Add JSDoc comments to public functions
- Update CHANGELOG.md
- Include code examples

## Project Structure

```
placetext/
  src/
    core/           # Core generation engine
      generator.ts  # Main generator logic
      random.ts     # PRNG implementation
      types.ts      # TypeScript definitions
    corpora/        # Word lists
      classic.ts
      tech.ts
      startup.ts
      concise.ts
      musk.ts
    index.ts        # Public API
  test/             # Test files
    generator.test.ts
    corpus.test.ts
  examples/         # Usage examples
  dist/             # Build output (gitignored)
```

## Adding a New Corpus

To add a new corpus:

1. Create `src/corpora/newcorpus.ts`:

   ```typescript
   export const newcorpus = [
     "word1",
     "word2",
     // ... more words
   ];
   ```

2. Add to `src/core/types.ts`:

   ```typescript
   export enum Corpus {
     // ... existing
     NewCorpus = "newcorpus",
   }
   ```

3. Import in `src/index.ts`:

   ```typescript
   import { newcorpus } from "./corpora/newcorpus.js";
   ```

4. Add to corpus map:

   ```typescript
   const CORPUS_MAP: Record<Corpus, string[]> = {
     // ... existing
     [Corpus.NewCorpus]: newcorpus,
   };
   ```

5. Write tests in `test/corpus.test.ts`

6. Update README.md with corpus description

## Testing

Run all tests:

```bash
npm test
```

Run specific test file:

```bash
node --test test/generator.test.ts
```

## Building

Build the package:

```bash
npm run build
```

This creates ESM and CJS builds in `dist/`.

## Running Examples

After building:

```bash
npm run example
```

## Zero Dependencies Philosophy

This project maintains zero runtime dependencies. When contributing:

- Do NOT add runtime dependencies
- DevDependencies are fine (build tools, testing)
- Implement needed functionality yourself
- Keep the bundle size small

## Performance Considerations

- Keep the PRNG fast
- Avoid unnecessary allocations
- Minimize string concatenations in loops
- Consider bundle size impact

## Backward Compatibility

- Don't break existing APIs
- Deprecate before removing
- Follow semantic versioning
- Document breaking changes

## Getting Help

- Create an issue for questions
- Check existing issues first
- Be specific about your problem
- Provide context and examples

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- Future credits section

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to placetext! 🎉
