import assert from 'node:assert/strict';
import test from 'node:test';
import { deckIds, decks } from '../src/decks.ts';

test('os quatro sistemas mantêm identidades, estruturas e contagens próprias', () => {
  assert.deepEqual(Object.keys(decks), deckIds);
  assert.deepEqual(deckIds, ['rws', 'marseille', 'thoth', 'lenormand']);

  for (const id of ['rws', 'marseille', 'thoth']) {
    const deck = decks[id];
    assert.equal(deck.kind, 'tarot');
    assert.equal(deck.count, 78);
    assert.equal(deck.structure.majorArcana + deck.structure.minorArcana, deck.count);
    assert.equal(deck.orientation, 'upright-or-reversed');
    assert.equal(deck.samples.length, 3);
  }

  assert.deepEqual(decks.rws.structure.suits, ['cups', 'wands', 'swords', 'pentacles']);
  assert.deepEqual(decks.marseille.structure.suits, ['cups', 'batons', 'swords', 'coins']);
  assert.deepEqual(decks.marseille.structure.courtRanks, ['valet', 'cavalier', 'reine', 'roi']);
  assert.deepEqual(decks.thoth.structure.suits, ['cups', 'wands', 'swords', 'disks']);
  assert.deepEqual(decks.thoth.structure.courtRanks, ['knight', 'queen', 'prince', 'princess']);

  assert.equal(decks.lenormand.kind, 'lenormand');
  assert.equal(decks.lenormand.count, 36);
  assert.deepEqual(decks.lenormand.structure, { symbols: 36 });
  assert.equal(decks.lenormand.orientation, 'upright-only');
  assert.equal(decks.lenormand.reading, 'symbol-combinations');
  assert.equal(decks.lenormand.samples.length, 3);
  assert.equal(Object.values(decks).reduce((total, deck) => total + deck.count, 0), 270);
});

test('a interface recebe três amostras e não confunde a contagem com o catálogo disponível', () => {
  for (const deck of Object.values(decks)) {
    assert.equal(deck.samples.length, 3);
    assert.ok(deck.samples.every(({ name, text }) => name.length > 0 && text.length > 0));
    assert.ok(deck.count > deck.samples.length);
  }
});
