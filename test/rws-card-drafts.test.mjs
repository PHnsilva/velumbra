import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { CARD_CATALOG_SCHEMA_VERSION, validateCardCatalogBatch } from '../src/card-catalog.ts';
import { rwsDraftArtwork, rwsFirstSevenDraft } from '../src/card-catalog-drafts/rws-first-seven.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('lote RWS inicial tem sete posições coerentes e permanece rascunho editorial', () => {
  assert.equal(rwsFirstSevenDraft.schemaVersion, CARD_CATALOG_SCHEMA_VERSION);
  assert.deepEqual(validateCardCatalogBatch(rwsFirstSevenDraft), { valid: true, editoriallyReady: false, issues: [] });
  assert.equal(rwsFirstSevenDraft.scope, 'batch');
  assert.equal(rwsFirstSevenDraft.deckId, 'rws');
  assert.deepEqual(rwsFirstSevenDraft.records.map(card => card.position), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(rwsFirstSevenDraft.records.map(card => card.numberLabel), ['0', 'I', 'II', 'III', 'IV', 'V', 'VI']);
  assert.deepEqual(rwsFirstSevenDraft.records.map(card => card.name), [
    'O Louco', 'O Mago', 'A Sacerdotisa', 'A Imperatriz', 'O Imperador', 'O Hierofante', 'Os Enamorados',
  ]);
  assert.equal(new Set(rwsFirstSevenDraft.records.map(card => card.id)).size, 7);
  assert.equal(rwsDraftArtwork.length, 7);
});

test('cada registro tem origem separada, referências rastreáveis e revisão/proveniência honestamente pendentes', () => {
  for (const [index, card] of rwsFirstSevenDraft.records.entries()) {
    assert.equal(card.deckId, 'rws');
    assert.equal(card.content.origin, 'original');
    assert.equal(card.art.origin, 'original');
    assert.equal(card.content.provenance.state, 'pending');
    assert.match(card.content.provenance.author, /Codex.*revisão editorial pendente/);
    assert.ok(card.content.provenance.references.some(reference => reference.includes('The-Pictorial-Key-to-the-Tarot.pdf')));
    assert.equal(card.art.provenance.state, 'pending');
    assert.equal(card.art.provenance.license, null);
    assert.equal(card.review.state, 'pending');
    assert.ok(Object.values(card.review.checklist).every(value => value === false));
    assert.ok(card.content.summary.length > 40);

    const filename = rwsDraftArtwork[index];
    assert.equal(path.basename(card.art.assetPath), filename);
    assert.match(card.art.assetPath, /^\/art\/cards\/rws\//);
  }
});

test('as sete artes são SVGs locais de rascunho e não são publicadas como assets do runtime', async () => {
  for (const file of rwsDraftArtwork) {
    const source = path.join(root, 'docs', 'card-drafts', 'rws', file);
    const svg = await readFile(source, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /<desc id="desc">/);
    assert.doesNotMatch(svg, /<script\b|<foreignObject\b|href\s*=\s*["']https?:/i);

    const futurePublicAsset = path.join(root, 'public', 'art', 'cards', 'rws', file);
    await assert.rejects(access(futurePublicAsset), { code: 'ENOENT' });
  }
});
