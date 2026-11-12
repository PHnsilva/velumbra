import { transformSync } from 'esbuild';

export function compileDeckCatalog(source, fileName = 'src/decks.ts') {
  const result = transformSync(source, {
    sourcefile: fileName,
    loader: 'ts',
    format: 'esm',
    target: 'es2022',
    logLevel: 'silent',
  });
  return result.code;
}
