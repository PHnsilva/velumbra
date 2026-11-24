import type { ReadingSpread } from './reading';

export const JOURNAL_KEY = 'velumbra.reading-journal';
export const JOURNAL_SCHEMA_VERSION = 1 as const;

export interface JournalEntry {
  readonly id: string;
  readonly createdAt: string;
  readonly question: string;
  readonly spread: ReadingSpread;
  /** Optional snapshot, backwards compatible with existing version-1 entries. */
  readonly interpretation?: {
    readonly mode: 'guided';
    readonly links: readonly string[];
    readonly verdict: string;
  };
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
  | { readonly status: 'invalid'; readonly raw: string }
  | { readonly status: 'unavailable' };

export type JournalOperationResult =
  | { readonly status: 'saved' | 'removed' | 'cleared' | 'restored'; readonly document: JournalDocument }
  | { readonly status: 'invalid-data' | 'invalid-entry' | 'duplicate' | 'unavailable' };

const emptyDocument = (): JournalDocument => ({ schemaVersion: JOURNAL_SCHEMA_VERSION, entries: [] });

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isJournalEntry(value: unknown): value is JournalEntry {
  if (!isRecord(value) || !isRecord(value.spread)) return false;
  const spread = value.spread;
  return typeof value.id === 'string' && value.id.length > 0
    && (value.interpretation === undefined || (isRecord(value.interpretation)
      && value.interpretation.mode === 'guided'
      && typeof value.interpretation.verdict === 'string' && value.interpretation.verdict.length <= 10000
      && Array.isArray(value.interpretation.links) && value.interpretation.links.length <= 2
      && value.interpretation.links.every(link => typeof link === 'string' && link.length <= 10000)))
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
      && !/[\\?#]/.test(card.assetPath) && !card.assetPath.split('/').includes('..')
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
    let raw: string | null;
    try {
      raw = this.storage.getItem(this.key);
    } catch {
      return { status: 'unavailable' };
    }
    if (raw === null) return { status: 'empty', document: emptyDocument() };
    const document = parseDocument(raw);
    return document ? { status: 'ready', document } : { status: 'invalid', raw };
  }

  append(entry: JournalEntry): JournalDocument {
    const result = this.tryAppend(entry);
    if (result.status === 'saved') return result.document;
    if (result.status === 'invalid-entry') throw new TypeError('Registro de diário inválido.');
    if (result.status === 'invalid-data') throw new Error('Diário incompatível; exporte ou remova os dados antes de substituir.');
    if (result.status === 'duplicate') throw new Error('ID de registro já existe.');
    throw new Error(`Não foi possível salvar o diário (${result.status}).`);
  }

  tryAppend(entry: JournalEntry): JournalOperationResult {
    if (!isJournalEntry(entry)) return { status: 'invalid-entry' };
    const current = this.read();
    if (current.status === 'invalid') return { status: 'invalid-data' };
    if (current.status === 'unavailable') return { status: 'unavailable' };
    if (current.document.entries.some(existing => existing.id === entry.id)) return { status: 'duplicate' };
    const next: JournalDocument = { schemaVersion: JOURNAL_SCHEMA_VERSION, entries: [...current.document.entries, entry] };
    try {
      this.storage.setItem(this.key, JSON.stringify(next));
      return { status: 'saved', document: next };
    } catch {
      return { status: 'unavailable' };
    }
  }

  remove(id: string): JournalDocument {
    const result = this.tryRemove(id);
    if (result.status === 'removed') return result.document;
    if (result.status === 'invalid-data') throw new Error('Diário incompatível; não foi alterado.');
    throw new Error(`Não foi possível remover o registro (${result.status}).`);
  }

  tryRemove(id: string): JournalOperationResult {
    const current = this.read();
    if (current.status === 'invalid') return { status: 'invalid-data' };
    if (current.status === 'unavailable') return { status: 'unavailable' };
    const next: JournalDocument = { schemaVersion: JOURNAL_SCHEMA_VERSION, entries: current.document.entries.filter(entry => entry.id !== id) };
    try {
      this.storage.setItem(this.key, JSON.stringify(next));
      return { status: 'removed', document: next };
    } catch {
      return { status: 'unavailable' };
    }
  }

  clear(): void {
    const result = this.tryClear();
    if (result.status !== 'cleared') throw new Error(`Não foi possível excluir o diário (${result.status}).`);
  }

  tryClear(): JournalOperationResult {
    try {
      this.storage.removeItem(this.key);
      return { status: 'cleared', document: emptyDocument() };
    } catch {
      return { status: 'unavailable' };
    }
  }

  export(): string {
    const current = this.read();
    if (current.status === 'invalid') throw new Error('Diário incompatível; conteúdo bruto disponível para recuperação.');
    if (current.status === 'unavailable') throw new Error('Armazenamento local indisponível.');
    return JSON.stringify(current.document, null, 2);
  }

  restore(serialized: string): JournalDocument {
    const result = this.tryRestore(serialized);
    if (result.status === 'restored') return result.document;
    if (result.status === 'invalid-data') throw new TypeError('Arquivo de diário inválido ou de versão incompatível.');
    throw new Error(`Não foi possível restaurar o diário (${result.status}).`);
  }

  tryRestore(serialized: string): JournalOperationResult {
    const document = parseDocument(serialized);
    if (!document) return { status: 'invalid-data' };
    const current = this.read();
    if (current.status === 'invalid') return { status: 'invalid-data' };
    if (current.status === 'unavailable') return { status: 'unavailable' };
    try {
      this.storage.setItem(this.key, JSON.stringify(document));
      return { status: 'restored', document };
    } catch {
      return { status: 'unavailable' };
    }
  }
}
