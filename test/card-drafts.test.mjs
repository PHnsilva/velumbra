import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import { lenormandDraftArtwork, lenormandFirstSevenDraft } from '../src/card-catalog-drafts/lenormand-first-seven.ts';
import { validateCardCatalogBatch } from '../src/card-catalog.ts';
import { decks } from '../src/decks.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('lote Lenormand 1–7 é estruturalmente válido, mas segue pendente de proveniência e revisão', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandFirstSevenDraft), {
    valid: true,
    editoriallyReady: false,
    issues: [],
  });
  assert.equal(lenormandFirstSevenDraft.records.length, 7);
  assert.deepEqual(lenormandFirstSevenDraft.records.map(record => record.position), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(lenormandFirstSevenDraft.records.map(record => record.name), [
    'O Cavaleiro', 'O Trevo', 'O Navio', 'A Casa', 'A Árvore', 'As Nuvens', 'A Serpente',
  ]);
  assert.deepEqual(lenormandFirstSevenDraft.records.map(record => record.numberLabel), ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']);
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  assert.deepEqual(lenormandDraftArtwork.length, 7);

  for (const [index, record] of lenormandFirstSevenDraft.records.entries()) {
    assert.equal(record.deckId, 'lenormand');
    assert.match(record.art.assetPath, /^\/art\/cards\/lenormand\//);
    assert.equal(record.content.provenance.state, 'pending');
    assert.equal(record.content.provenance.author, 'Codex (assistente de IA; revisão editorial pendente)');
    assert.equal(record.art.provenance.state, 'pending');
    assert.equal(record.art.provenance.creator, 'Codex (assistente de IA; revisão editorial pendente)');
    assert.equal(record.art.provenance.license, null);
    assert.equal(record.review.state, 'pending');
    assert.deepEqual(Object.values(record.review.checklist), [false, false, false, false, false, false]);
    assert.ok(record.content.summary.length > 40);

    const draftPath = path.join(root, 'docs', 'card-drafts', 'lenormand', lenormandDraftArtwork[index]);
    const svg = await readFile(draftPath, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    const futurePublicPath = path.join(root, 'public', record.art.assetPath.slice(1));
    await assert.rejects(access(futurePublicPath), { code: 'ENOENT' });
  }
});
