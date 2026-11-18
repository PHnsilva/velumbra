import assert from 'node:assert/strict';
import test from 'node:test';
import { CARD_CATALOG_SCHEMA_VERSION } from '../src/card-catalog.ts';
import { drawReading, DrawError } from '../src/reading.ts';
import { JOURNAL_KEY, ReadingJournal } from '../src/journal.ts';
import { decks } from '../src/decks.ts';

// Synthetic, non-production fixture used only to exercise the complete-catalog gate and draw algorithm.
const completeCatalog = (deckId = 'rws', reviewed = true) => ({
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId,
  batchId: `synthetic-test-${deckId}`,
  scope: 'complete-deck',
  records: Array.from({ length: decks[deckId].count }, (_, index) => ({
    id: `${deckId}:test-card-${index + 1}`,
    deckId,
    position: index + 1,
    numberLabel: String(index + 1),
    name: `Carta sintética ${index + 1}`,
    content: {
      summary: 'Fixture sintético sem significado editorial.',
      symbols: ['teste'],
      origin: 'original',
      provenance: { state: 'documented', author: 'fixture', references: ['test-only'] },
    },
    art: {
      assetPath: `/art/cards/${deckId}/test-card-${index + 1}.svg`,
      origin: 'original',
      provenance: { state: 'documented', creator: 'fixture', license: 'test-only', evidence: ['test-only'] },
    },
    review: {
      state: reviewed ? 'reviewed' : 'pending',
      reviewer: reviewed ? 'fixture' : null,
      reviewedAt: reviewed ? '2026-01-01T00:00:00Z' : null,
      checklist: Object.fromEntries(['identity', 'numbering', 'tradition', 'content', 'art', 'provenance'].map(key => [key, reviewed])),
    },
  })),
});

const sequenceRandom = (...values) => {
  let index = 0;
  return { getRandomValues(array) { array[0] = values[index++] ?? 0; return array; } };
};

test('sorteia uma ou três cartas distintas e atribui posições neutras sem receber pergunta', () => {
  const catalog = completeCatalog();
  const one = drawReading(catalog, 1, sequenceRandom(5, 0));
  const three = drawReading(catalog, 3, sequenceRandom(5, 0, 9, 0, 13, 1));
  assert.equal(one.cards.length, 1);
  assert.equal(three.cards.length, 3);
  assert.equal(new Set(three.cards.map(card => card.id)).size, 3);
  assert.deepEqual(three.cards.map(card => card.position), [1, 2, 3]);
  assert.ok(three.cards.every(card => card.name.startsWith('Carta sintética')));
});

test('falha fechada para lote parcial, catálogo não revisado e quantidade não suportada', () => {
  const incomplete = completeCatalog();
  incomplete.scope = 'batch';
  incomplete.records.pop();
  assert.throws(() => drawReading(incomplete, 1, sequenceRandom()), error => error instanceof DrawError && error.code === 'catalog-incomplete');
  assert.throws(() => drawReading(completeCatalog('rws', false), 1, sequenceRandom()), error => error instanceof DrawError && error.code === 'catalog-unreviewed');
  assert.throws(() => drawReading(completeCatalog(), 2, sequenceRandom()), error => error instanceof DrawError && error.code === 'unsupported-spread');
  assert.throws(() => drawReading(completeCatalog(), 1, null), error => error instanceof DrawError && error.code === 'secure-random-unavailable');
});

test('Lenormand nunca recebe orientação invertida, inclusive em tiragem múltipla', () => {
  const result = drawReading(completeCatalog('lenormand'), 3, sequenceRandom(0, 1, 0, 1, 0, 1));
  assert.ok(result.cards.every(card => card.orientation === 'upright'));
});

test('Tarô pode registrar carta invertida e o sorteio rejeita valores fora da faixa sem viés modular', () => {
  const result = drawReading(completeCatalog('rws'), 1, sequenceRandom(0xffff_ffff, 4, 1));
  assert.equal(result.cards[0].id, 'rws:test-card-5');
  assert.equal(result.cards[0].orientation, 'reversed');
});

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, value); }
  removeItem(key) { this.values.delete(key); }
}

const entry = (id = 'entry-1') => ({
  id,
  createdAt: '2026-11-18T12:00:00.000Z',
  question: 'Pergunta sintética de teste',
  spread: {
    schemaVersion: 1,
    deckId: 'lenormand',
    cards: [{ id: 'lenormand:test-card-1', deckId: 'lenormand', position: 1, numberLabel: '1', name: 'Carta sintética', summary: 'Teste', symbols: ['teste'], assetPath: '/art/cards/lenormand/test.svg', orientation: 'upright' }],
  },
});

test('diário local versionado grava, exporta, restaura, remove e apaga entradas', () => {
  const storage = new MemoryStorage();
  const journal = new ReadingJournal(storage);
  assert.equal(journal.read().status, 'empty');
  assert.equal(journal.append(entry()).entries.length, 1);
  assert.equal(JSON.parse(storage.getItem(JOURNAL_KEY)).schemaVersion, 1);
  const exported = journal.export();
  const restoredStorage = new MemoryStorage();
  const restored = new ReadingJournal(restoredStorage);
  assert.equal(restored.restore(exported).entries[0].id, 'entry-1');
  assert.equal(restored.remove('entry-1').entries.length, 0);
  restored.append(entry('entry-2'));
  restored.clear();
  assert.equal(restored.read().status, 'empty');
});

test('preserva dados corrompidos ou de versão futura sem sobrescrever e valida restauração', () => {
  const storage = new MemoryStorage();
  storage.setItem(JOURNAL_KEY, '{"schemaVersion":2,"entries":[]}');
  const original = storage.getItem(JOURNAL_KEY);
  const journal = new ReadingJournal(storage);
  assert.deepEqual(journal.read(), { status: 'invalid', raw: original });
  assert.throws(() => journal.append(entry()), /incompatível/);
  assert.throws(() => journal.restore('{"schemaVersion":99,"entries":[]}'), /incompatível/);
  assert.equal(storage.getItem(JOURNAL_KEY), original);
});

test('rejeita IDs duplicados e registros do diário malformados', () => {
  const storage = new MemoryStorage();
  const journal = new ReadingJournal(storage);
  journal.append(entry());
  assert.throws(() => journal.append(entry()), /já existe/);
  assert.throws(() => journal.restore(JSON.stringify({ schemaVersion: 1, entries: [{ ...entry(), spread: { ...entry().spread, cards: [] } }] })), /inválido/);
  const invertedLenormand = entry('entry-3');
  invertedLenormand.spread.cards[0].orientation = 'reversed';
  assert.throws(() => journal.restore(JSON.stringify({ schemaVersion: 1, entries: [invertedLenormand] })), /inválido/);
});
