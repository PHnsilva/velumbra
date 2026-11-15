import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import { lenormandLastFourArtwork, lenormandLastFourCombinations, lenormandLastFourDraft } from '../src/card-catalog-drafts/lenormand-last-four.ts';
import { lenormandFifthSevenCombinations, lenormandFifthSevenDraft } from '../src/card-catalog-drafts/lenormand-fifth-seven.ts';
import { lenormandFourthSevenCombinations, lenormandFourthSevenDraft } from '../src/card-catalog-drafts/lenormand-fourth-seven.ts';
import { validateCardCatalogBatch } from '../src/card-catalog.ts';
import { decks } from '../src/decks.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('lote Lenormand 33–36 fecha as posições 19–36 sem declarar o deck pronto', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandLastFourDraft), { valid: true, editoriallyReady: false, issues: [] });
  const records = lenormandLastFourDraft.records;
  assert.equal(records.length, 4);
  assert.deepEqual(records.map(record => record.position), [33, 34, 35, 36]);
  assert.deepEqual(records.map(record => record.numberLabel), ['XXXIII', 'XXXIV', 'XXXV', 'XXXVI']);
  assert.deepEqual(records.map(record => record.name), ['A Chave', 'Os Peixes', 'A Âncora', 'A Cruz']);
  const combined = [...lenormandFourthSevenDraft.records, ...lenormandFifthSevenDraft.records, ...records];
  assert.equal(new Set(combined.map(record => record.id)).size, 18);
  assert.deepEqual(combined.map(record => record.position), Array.from({ length: 18 }, (_, i) => i + 19));
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  const combinations = [...lenormandFourthSevenCombinations, ...lenormandFifthSevenCombinations, ...lenormandLastFourCombinations];
  assert.equal(combinations.length, 18);
  for (const pair of combinations) {
    assert.ok(pair.reading.length > 25);
    assert.match(pair.leftId, /^lenormand:/);
    assert.match(pair.rightId, /^lenormand:/);
  }

  for (const [index, record] of records.entries()) {
    assert.equal(record.deckId, 'lenormand');
    assert.equal(record.content.provenance.state, 'pending');
    assert.equal(record.art.provenance.state, 'pending');
    assert.equal(record.art.provenance.license, null);
    assert.equal(record.review.state, 'pending');
    assert.ok(record.content.summary.length > 40);
    assert.equal(record.art.assetPath.split('/').at(-1), lenormandLastFourArtwork[index]);
    const svg = await readFile(path.join(root, 'docs', 'card-drafts', 'lenormand', 'last-four', lenormandLastFourArtwork[index]), 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    await assert.rejects(access(path.join(root, 'public', record.art.assetPath.slice(1))), { code: 'ENOENT' });
  }
});
