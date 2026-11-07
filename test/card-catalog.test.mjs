import assert from 'node:assert/strict';
import test from 'node:test';
import { CARD_CATALOG_SCHEMA_VERSION, validateCardCatalogBatch } from '../src/card-catalog.ts';

const pendingCard = (id = 'lenormand:rider', position = 1) => ({
  id,
  deckId: 'lenormand',
  position,
  numberLabel: 'I',
  name: 'O Cavaleiro',
  content: {
    summary: 'Chegada, movimento e notícia em contexto.',
    symbols: ['cavaleiro', 'movimento'],
    origin: 'original',
    provenance: { state: 'pending', author: null, references: [] },
  },
  art: {
    assetPath: '/art/cards/lenormand/rider.svg',
    origin: 'original',
    provenance: { state: 'pending', creator: null, license: null, evidence: [] },
  },
  review: {
    state: 'pending',
    reviewer: null,
    reviewedAt: null,
    checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false },
  },
});

const batch = (records = [pendingCard()], scope = 'batch') => ({
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'lenormand',
  batchId: 'lenormand-first-seven',
  scope,
  records,
});

test('aceita lote tipado como rascunho sem declarar catálogo editorialmente pronto ou carta revisada', () => {
  assert.deepEqual(validateCardCatalogBatch(batch()), { valid: true, editoriallyReady: false, issues: [] });
});

test('rejeita versão, IDs, tradição, posição e proveniência documentada incompletos', () => {
  const invalid = pendingCard('Lenormand:Rider', 37);
  invalid.deckId = 'rws';
  invalid.content.provenance.state = 'documented';
  const versionResult = validateCardCatalogBatch({ ...batch(), schemaVersion: '2.0.0' });
  assert.equal(versionResult.valid, false);
  assert.ok(versionResult.issues.some(issue => issue.code === 'batch.version'));

  const result = validateCardCatalogBatch(batch([invalid]));
  assert.equal(result.valid, false);
  assert.equal(result.editoriallyReady, false);
  assert.deepEqual(new Set(result.issues.map(issue => issue.code)), new Set([
    'record.id', 'record.deck-id', 'record.position', 'provenance.incomplete',
  ]));
});

test('rejeita caminhos de arte fora da árvore pública de cartas', () => {
  const invalid = pendingCard();
  invalid.art.assetPath = '/art/cards/../../private.svg';
  const result = validateCardCatalogBatch(batch([invalid]));
  assert.equal(result.valid, false);
  assert.ok(result.issues.some(issue => issue.code === 'art.path'));
});

test('recusa IDs e posições duplicados no mesmo lote', () => {
  const result = validateCardCatalogBatch(batch([pendingCard(), pendingCard('lenormand:rider-copy', 1)]));
  assert.equal(result.valid, false);
  assert.ok(result.issues.some(issue => issue.code === 'batch.duplicate-position'));
});

test('não permite chamar um registro parcial de baralho completo', () => {
  const result = validateCardCatalogBatch(batch([pendingCard()], 'complete-deck'));
  assert.equal(result.valid, false);
  assert.ok(result.issues.some(issue => issue.code === 'batch.incomplete-deck'));
});

test('marca lote como pronto somente com proveniência documentada e revisão rastreável', () => {
  const card = pendingCard();
  card.content.provenance = { state: 'documented', author: 'Equipe editorial Velumbra', references: ['docs/cards/lenormand/rider.md'] };
  card.art.provenance = { state: 'documented', creator: 'Equipe visual Velumbra', license: 'Licença fictícia usada apenas no teste', evidence: ['docs/cards/lenormand/rider-art.md'] };
  card.review = {
    state: 'reviewed',
    reviewer: 'revisora editorial',
    reviewedAt: '2026-11-07T12:00:00.000Z',
    checklist: { identity: true, numbering: true, tradition: true, content: true, art: true, provenance: true },
  };
  assert.deepEqual(validateCardCatalogBatch(batch([card])), { valid: true, editoriallyReady: true, issues: [] });
});

test('não transforma as prévias atuais em registros sem campos de proveniência', () => {
  const samples = [
    { n: 'I', name: 'O Cavaleiro', symbol: '♞', text: 'Notícia.' },
    { n: 'XXVI', name: 'O Livro', symbol: '▥', text: 'Estudo.' },
    { n: 'XXXII', name: 'A Lua', symbol: '☾', text: 'Imagem.' },
  ];
  const result = validateCardCatalogBatch(batch(samples));
  assert.equal(result.valid, false);
  assert.ok(result.issues.some(issue => issue.path === 'records[0].art'));
});
