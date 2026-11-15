import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import { lenormandDraftArtwork, lenormandFirstSevenDraft } from '../src/card-catalog-drafts/lenormand-first-seven.ts';
import { lenormandSecondSevenArtwork, lenormandSecondSevenDraft } from '../src/card-catalog-drafts/lenormand-second-seven.ts';
import { lenormandThirdFourArtwork, lenormandThirdFourDraft } from '../src/card-catalog-drafts/lenormand-third-four.ts';
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

test('lote Lenormand 8–14 é estruturalmente válido, mas mantém licença e revisão pendentes', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandSecondSevenDraft), {
    valid: true,
    editoriallyReady: false,
    issues: [],
  });
  assert.equal(lenormandSecondSevenDraft.records.length, 7);
  assert.deepEqual(lenormandSecondSevenDraft.records.map(record => record.position), [8, 9, 10, 11, 12, 13, 14]);
  assert.deepEqual(lenormandSecondSevenDraft.records.map(record => record.name), [
    'O Caixão', 'O Buquê', 'A Foice', 'O Chicote', 'Os Pássaros', 'A Criança', 'A Raposa',
  ]);
  const combinedRecords = [...lenormandFirstSevenDraft.records, ...lenormandSecondSevenDraft.records];
  assert.equal(new Set(combinedRecords.map(record => record.id)).size, 14);
  assert.deepEqual(combinedRecords.map(record => record.position), Array.from({ length: 14 }, (_, index) => index + 1));
  assert.deepEqual(lenormandSecondSevenDraft.records.map(record => record.numberLabel), ['VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV']);
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  assert.deepEqual(lenormandSecondSevenArtwork.length, 7);

  for (const [index, record] of lenormandSecondSevenDraft.records.entries()) {
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

    const draftPath = path.join(root, 'docs', 'card-drafts', 'lenormand', 'second-seven', lenormandSecondSevenArtwork[index]);
    const svg = await readFile(draftPath, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    assert.equal(record.art.assetPath.split('/').at(-1), lenormandSecondSevenArtwork[index]);
    const futurePublicPath = path.join(root, 'public', record.art.assetPath.slice(1));
    await assert.rejects(access(futurePublicPath), { code: 'ENOENT' });
  }
});

test('lote Lenormand 15–18 completa posições 1–18 sem duplicar IDs, sem declarar aceite', async () => {
  assert.deepEqual(validateCardCatalogBatch(lenormandThirdFourDraft), {
    valid: true,
    editoriallyReady: false,
    issues: [],
  });
  assert.equal(lenormandThirdFourDraft.records.length, 4);
  assert.deepEqual(lenormandThirdFourDraft.records.map(record => record.position), [15, 16, 17, 18]);
  assert.deepEqual(lenormandThirdFourDraft.records.map(record => record.name), [
    'O Urso', 'As Estrelas', 'A Cegonha', 'O Cão',
  ]);
  assert.deepEqual(lenormandThirdFourDraft.records.map(record => record.numberLabel), ['XV', 'XVI', 'XVII', 'XVIII']);
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  assert.deepEqual(lenormandThirdFourArtwork, ['15-bear.svg', '16-stars.svg', '17-stork.svg', '18-dog.svg']);

  const allDraftRecords = [
    ...lenormandFirstSevenDraft.records,
    ...lenormandSecondSevenDraft.records,
    ...lenormandThirdFourDraft.records,
  ];
  assert.equal(new Set(allDraftRecords.map(record => record.id)).size, 18);
  assert.deepEqual(allDraftRecords.map(record => record.position), Array.from({ length: 18 }, (_, index) => index + 1));

  for (const [index, record] of lenormandThirdFourDraft.records.entries()) {
    assert.equal(record.deckId, 'lenormand');
    assert.equal(record.content.provenance.state, 'pending');
    assert.equal(record.art.provenance.state, 'pending');
    assert.equal(record.art.provenance.license, null);
    assert.equal(record.review.state, 'pending');
    assert.deepEqual(Object.values(record.review.checklist), [false, false, false, false, false, false]);

    const draftPath = path.join(root, 'docs', 'card-drafts', 'lenormand', 'third-four', lenormandThirdFourArtwork[index]);
    const svg = await readFile(draftPath, 'utf8');
    assert.match(svg, /^<svg\s/);
    assert.match(svg, /<title id="title">/);
    assert.match(svg, /viewBox="0 0 240 336"/);
    const futurePublicPath = path.join(root, 'public', record.art.assetPath.slice(1));
    await assert.rejects(access(futurePublicPath), { code: 'ENOENT' });
  }
});
