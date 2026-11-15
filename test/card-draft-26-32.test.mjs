import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import { lenormandFifthSevenArtwork, lenormandFifthSevenDraft } from '../src/card-catalog-drafts/lenormand-fifth-seven.ts';
import { lenormandFourthSevenDraft } from '../src/card-catalog-drafts/lenormand-fourth-seven.ts';
import { validateCardCatalogBatch } from '../src/card-catalog.ts';
import { decks } from '../src/decks.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('lote Lenormand 26–32 tem registros únicos e mantém licença/revisão pendentes', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandFifthSevenDraft), { valid: true, editoriallyReady: false, issues: [] });
  const records = lenormandFifthSevenDraft.records;
  assert.equal(records.length, 7);
  assert.deepEqual(records.map(record => record.position), [26, 27, 28, 29, 30, 31, 32]);
  assert.deepEqual(records.map(record => record.numberLabel), ['XXVI', 'XXVII', 'XXVIII', 'XXIX', 'XXX', 'XXXI', 'XXXII']);
  assert.deepEqual(records.map(record => record.name), ['O Livro', 'A Carta', 'O Homem', 'A Mulher', 'Os Lírios', 'O Sol', 'A Lua']);
  assert.equal(new Set(records.map(record => record.id)).size, 7);
  const combined = [...lenormandFourthSevenDraft.records, ...records];
  assert.equal(new Set(combined.map(record => record.id)).size, 14);
  assert.deepEqual(combined.map(record => record.position), Array.from({ length: 14 }, (_, i) => i + 19));
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');

  for (const [index, record] of records.entries()) {
    assert.equal(record.deckId, 'lenormand');
    assert.equal(record.content.provenance.state, 'pending');
    assert.equal(record.art.provenance.state, 'pending');
    assert.equal(record.art.provenance.license, null);
    assert.equal(record.review.state, 'pending');
    assert.ok(record.content.summary.length > 40);
    assert.equal(record.art.assetPath.split('/').at(-1), lenormandFifthSevenArtwork[index]);
    const svg = await readFile(path.join(root, 'docs', 'card-drafts', 'lenormand', 'fifth-seven', lenormandFifthSevenArtwork[index]), 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    await assert.rejects(access(path.join(root, 'public', record.art.assetPath.slice(1))), { code: 'ENOENT' });
  }
});
