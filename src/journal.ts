import type { ReadingSpread } from './reading';

export const JOURNAL_KEY = 'velumbra.reading-journal';
export const JOURNAL_SCHEMA_VERSION = 1 as const;

export interface JournalEntry {
  readonly id: string;
  readonly createdAt: string;
  readonly question: string;
  readonly spread: ReadingSpread;
}

export interface JournalDocument {
  readonly schemaVersion: typeof JOURNAL_SCHEMA_VERSION;
  readonly entries: readonly JournalEntry[];
}

export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export type JournalReadResult =
  | { readonly status: 'ready'; readonly document: JournalDocument }
  | { readonly status: 'empty'; readonly document: JournalDocument }
  | { readonly status: 'invalid'; readonly raw: string };

const emptyDocument = (): JournalDocument => ({ schemaVersion: JOURNAL_SCHEMA_VERSION, entries: [] });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!isRecord(value) || !isRecord(value.spread)) return false;
  const spread = value.spread;
  return typeof value.id === 'string' && value.id.length > 0
    && typeof value.createdAt === 'string' && !Number.isNaN(Date.parse(value.createdAt))
    && typeof value.question === 'string'
    && spread.schemaVersion === 1
    && ['rws', 'marseille', 'thoth', 'lenormand'].includes(String(spread.deckId))
    && Array.isArray(spread.cards) && (spread.cards.length === 1 || spread.cards.length === 3)
    && spread.cards.every((card, index) => isRecord(card)
      && typeof card.id === 'string' && card.id.startsWith(`${String(spread.deckId)}:`)
      && card.deckId === spread.deckId
      && Number.isInteger(card.position) && card.position === index + 1
      && typeof card.numberLabel === 'string' && typeof card.name === 'string' && card.name.length > 0
      && typeof card.summary === 'string' && Array.isArray(card.symbols) && card.symbols.every(symbol => typeof symbol === 'string')
      && typeof card.assetPath === 'string' && card.assetPath.startsWith('/art/cards/')
      && (card.orientation === 'upright' || (spread.deckId !== 'lenormand' && card.orientation === 'reversed')))
    && new Set(spread.cards.map(card => isRecord(card) ? card.id : null)).size === spread.cards.length;
}

function parseDocument(raw: string): JournalDocument | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || value.schemaVersion !== JOURNAL_SCHEMA_VERSION || !Array.isArray(value.entries)) return null;
    if (!value.entries.every(isJournalEntry)) return null;
    const ids = new Set<string>();
    for (const entry of value.entries) {
      if (ids.has(entry.id)) return null;
      ids.add(entry.id);
    }
    return value as unknown as JournalDocument;
  } catch {
    return null;
  }
}

/** Local-only, versioned persistence. Invalid/unknown data is returned intact and never overwritten. */
export class ReadingJournal {
  constructor(private readonly storage: KeyValueStorage, private readonly key = JOURNAL_KEY) {}

  read(): JournalReadResult {
    const raw = this.storage.getItem(this.key);
    if (raw === null) return { status: 'empty', document: emptyDocument() };
    const document = parseDocument(raw);
    return document ? { status: 'ready', document } : { status: 'invalid', raw };
  }

  append(entry: JournalEntry): JournalDocument {
    if (!isJournalEntry(entry)) throw new TypeError('Registro de diário inválido.');
    const current = this.read();
    if (current.status === 'invalid') throw new Error('Diário incompatível; exporte ou remova os dados antes de substituir.');
    if (current.document.entries.some(existing => existing.id === entry.id)) throw new Error('ID de registro já existe.');
    const next: JournalDocument = { schemaVersion: JOURNAL_SCHEMA_VERSION, entries: [...current.document.entries, entry] };
    this.storage.setItem(this.key, JSON.stringify(next));
    return next;
  }

  remove(id: string): JournalDocument {
    const current = this.read();
    if (current.status === 'invalid') throw new Error('Diário incompatível; não foi alterado.');
    const next: JournalDocument = { schemaVersion: JOURNAL_SCHEMA_VERSION, entries: current.document.entries.filter(entry => entry.id !== id) };
    this.storage.setItem(this.key, JSON.stringify(next));
    return next;
  }

  clear(): void {
    this.storage.removeItem(this.key);
  }

  export(): string {
    const current = this.read();
    if (current.status === 'invalid') throw new Error('Diário incompatível; conteúdo bruto disponível para recuperação.');
    return JSON.stringify(current.document, null, 2);
  }

  restore(serialized: string): JournalDocument {
    const document = parseDocument(serialized);
    if (!document) throw new TypeError('Arquivo de diário inválido ou de versão incompatível.');
    this.storage.setItem(this.key, JSON.stringify(document));
    return document;
  }
}
