import { decks, type DeckId } from './decks';
import { validateCardCatalogBatch, type CardCatalogBatch, type CardCatalogRecord } from './card-catalog';

export type SpreadSize = 1 | 3;
export type CardOrientation = 'upright' | 'reversed';

export interface RevealedCard {
  readonly id: string;
  readonly deckId: DeckId;
  readonly position: number;
  readonly numberLabel: string;
  readonly name: string;
  readonly summary: string;
  readonly symbols: readonly string[];
  readonly assetPath: string;
  readonly orientation: CardOrientation;
}

export interface ReadingSpread {
  readonly schemaVersion: 1;
  readonly deckId: DeckId;
  readonly cards: readonly RevealedCard[];
}

export type DrawErrorCode = 'catalog-invalid' | 'catalog-incomplete' | 'catalog-unreviewed' | 'unsupported-spread' | 'secure-random-unavailable';

export class DrawError extends Error {
  constructor(readonly code: DrawErrorCode, message: string) {
    super(message);
    this.name = 'DrawError';
  }
}

type RandomSource = Pick<Crypto, 'getRandomValues'>;

function secureInteger(maxExclusive: number, random: RandomSource): number {
  if (!Number.isSafeInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > 0x1_0000_0000) {
    throw new RangeError('Limite aleatório inválido.');
  }
  const range = 0x1_0000_0000;
  const ceiling = Math.floor(range / maxExclusive) * maxExclusive;
  const word = new Uint32Array(1);
  let value: number;
  do {
    random.getRandomValues(word);
    value = word[0]!;
  } while (value >= ceiling);
  return value % maxExclusive;
}

/** Draw from an editorially ready complete catalog. The question is deliberately not an input. */
export function drawReading(
  input: CardCatalogBatch,
  size: SpreadSize,
  random: RandomSource = globalThis.crypto,
): ReadingSpread {
  if (size !== 1 && size !== 3) throw new DrawError('unsupported-spread', 'A tiragem aceita uma ou três cartas.');
  if (!random || typeof random.getRandomValues !== 'function') {
    throw new DrawError('secure-random-unavailable', 'Sorteio seguro indisponível neste ambiente.');
  }

  const validation = validateCardCatalogBatch(input);
  if (!validation.valid) throw new DrawError('catalog-invalid', 'O catálogo não passou pela validação estrutural.');
  if (input.scope !== 'complete-deck' || input.records.length !== decks[input.deckId].count) {
    throw new DrawError('catalog-incomplete', 'A tiragem exige o catálogo completo da tradição selecionada.');
  }
  if (!validation.editoriallyReady) {
    throw new DrawError('catalog-unreviewed', 'A tiragem exige conteúdo e arte documentados e revisão editorial concluída.');
  }

  const pool = [...input.records] as CardCatalogRecord[];
  for (let index = 0; index < size; index += 1) {
    const selected = index + secureInteger(pool.length - index, random);
    [pool[index], pool[selected]] = [pool[selected]!, pool[index]!];
  }

  return {
    schemaVersion: 1,
    deckId: input.deckId,
    cards: pool.slice(0, size).map((card, index) => ({
      id: card.id,
      deckId: card.deckId,
      position: index + 1,
      numberLabel: card.numberLabel,
      name: card.name,
      summary: card.content.summary,
      symbols: [...card.content.symbols],
      assetPath: card.art.assetPath,
      orientation: decks[input.deckId].orientation === 'upright-only' || secureInteger(2, random) === 0 ? 'upright' : 'reversed',
    })),
  };
}
