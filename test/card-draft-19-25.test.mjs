import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import { lenormandFourthSevenArtwork, lenormandFourthSevenDraft } from '../src/card-catalog-drafts/lenormand-fourth-seven.ts';
import { validateCardCatalogBatch } from '../src/card-catalog.ts';
import { decks } from '../src/decks.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('lote Lenormand 19–25 mantém sequência, leitura própria e pendências explícitas', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandFourthSevenDraft), { valid: true, editoriallyReady: false, issues: [] });
  const records = lenormandFourthSevenDraft.records;
  assert.equal(records.length, 7);
  assert.deepEqual(records.map(record => record.position), [19, 20, 21, 22, 23, 24, 25]);
  assert.deepEqual(records.map(record => record.numberLabel), ['XIX', 'XX', 'XXI', 'XXII', 'XXIII', 'XXIV', 'XXV']);
  assert.deepEqual(records.map(record => record.name), ['A Torre', 'O Jardim', 'A Montanha', 'Os Caminhos', 'Os Ratos', 'O Coração', 'O Anel']);
  assert.equal(new Set(records.map(record => record.id)).size, 7);
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  assert.equal(lenormandFourthSevenArtwork.length, 7);

  for (const [index, record] of records.entries()) {
    assert.equal(record.deckId, 'lenormand');
    assert.equal(record.content.origin, 'original');
    assert.equal(record.content.provenance.state, 'pending');
    assert.equal(record.art.provenance.state, 'pending');
    assert.equal(record.art.provenance.license, null);
    assert.equal(record.review.state, 'pending');
    assert.ok(record.content.summary.length > 40);
    assert.equal(record.art.assetPath.split('/').at(-1), lenormandFourthSevenArtwork[index]);

    const artworkPath = path.join(root, 'docs', 'card-drafts', 'lenormand', 'fourth-seven', lenormandFourthSevenArtwork[index]);
    const svg = await readFile(artworkPath, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    await assert.rejects(access(path.join(root, 'public', record.art.assetPath.slice(1))), { code: 'ENOENT' });
  }
});
