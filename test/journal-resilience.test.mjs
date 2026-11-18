import assert from 'node:assert/strict';
import test from 'node:test';
import { JOURNAL_KEY, ReadingJournal } from '../src/journal.ts';

const sampleEntry = (id = 'local-1') => ({
  id,
  createdAt: '2026-11-18T12:00:00.000Z',
  question: 'Teste sintético local',
  spread: {
    schemaVersion: 1,
    deckId: 'lenormand',
    cards: [{ id: 'lenormand:test-card-1', deckId: 'lenormand', position: 1, numberLabel: '1', name: 'Fixture', summary: 'Somente teste', symbols: [], assetPath: '/art/cards/lenormand/test.svg', orientation: 'upright' }],
  },
});

class FaultyStorage {
  values = new Map();
  failure = null;
  getItem(key) { if (this.failure === 'read') throw new DOMException('storage disabled', 'SecurityError'); return this.values.get(key) ?? null; }
  setItem(key, value) { if (this.failure === 'write') throw new DOMException('quota reached', 'QuotaExceededError'); this.values.set(key, value); }
  removeItem(key) { if (this.failure === 'delete') throw new DOMException('storage disabled', 'SecurityError'); this.values.delete(key); }
}

test('armazenamento bloqueado devolve estado explícito em leitura e operações sem interromper o chamador', () => {
  const storage = new FaultyStorage();
  const journal = new ReadingJournal(storage);
  storage.failure = 'read';
  assert.deepEqual(journal.read(), { status: 'unavailable' });
  assert.deepEqual(journal.tryAppend(sampleEntry()), { status: 'unavailable' });
  assert.deepEqual(journal.tryRemove('local-1'), { status: 'unavailable' });
  storage.failure = 'write';
  assert.deepEqual(journal.tryRestore(JSON.stringify({ schemaVersion: 1, entries: [sampleEntry()] })), { status: 'unavailable' });
  storage.failure = 'delete';
  assert.deepEqual(journal.tryClear(), { status: 'unavailable' });
});

test('falha de cota ao salvar preserva o diário anterior e permite continuar sem persistência', () => {
  const storage = new FaultyStorage();
  const journal = new ReadingJournal(storage);
  journal.append(sampleEntry());
  const previous = storage.getItem(JOURNAL_KEY);
  storage.failure = 'write';
  assert.deepEqual(journal.tryAppend(sampleEntry('local-2')), { status: 'unavailable' });
  assert.equal(storage.getItem(JOURNAL_KEY), previous);
});

test('versão desconhecida fica recuperável e não é sobrescrita por gravação, exclusão ou restauração inválida', () => {
  const storage = new FaultyStorage();
  const journal = new ReadingJournal(storage);
  const futureDocument = JSON.stringify({ schemaVersion: 2, entries: [{ futureField: 'preserve' }] });
  storage.setItem(JOURNAL_KEY, futureDocument);
  assert.deepEqual(journal.tryAppend(sampleEntry()), { status: 'invalid-data' });
  assert.deepEqual(journal.tryRemove('local-1'), { status: 'invalid-data' });
  assert.deepEqual(journal.tryRestore('{ malformed'), { status: 'invalid-data' });
  assert.equal(journal.read().raw, futureDocument);
  assert.equal(storage.getItem(JOURNAL_KEY), futureDocument);
});

test('recuperação restaurada pode ser exportada de novo e exclusão integral remove só a chave local', () => {
  const storage = new FaultyStorage();
  const journal = new ReadingJournal(storage);
  storage.setItem('other-local-feature', 'keep');
  const backup = JSON.stringify({ schemaVersion: 1, entries: [sampleEntry()] });
  assert.equal(journal.tryRestore(backup).status, 'restored');
  assert.equal(JSON.parse(journal.export()).entries[0].id, 'local-1');
  assert.equal(journal.tryClear().status, 'cleared');
  assert.equal(storage.getItem(JOURNAL_KEY), null);
  assert.equal(storage.getItem('other-local-feature'), 'keep');
});
