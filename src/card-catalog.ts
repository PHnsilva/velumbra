import type { DeckId } from './decks';
import { decks } from './decks';

/** Version of the editorial record contract, independent from app/runtime versions. */
export const CARD_CATALOG_SCHEMA_VERSION = '1.0.0' as const;

export type ProvenanceState = 'pending' | 'documented';
export type ArtOrigin = 'original' | 'licensed' | 'public-domain';
export type ContentOrigin = 'original' | 'adapted' | 'licensed';

export interface EditorialReviewChecklist {
  readonly identity: boolean;
  readonly numbering: boolean;
  readonly tradition: boolean;
  readonly content: boolean;
  readonly art: boolean;
  readonly provenance: boolean;
}

export interface CardCatalogRecord {
  /** Stable key: `<deckId>:<tradition-specific-slug>`. Never derive from translated copy. */
  readonly id: string;
  readonly deckId: DeckId;
  /** Editorial sequence, one based; separate from the tradition's displayed number. */
  readonly position: number;
  /** Printed/traditional number, which may be Roman, Arabic, zero, or absent by tradition. */
  readonly numberLabel: string;
  readonly name: string;
  readonly content: {
    readonly summary: string;
    readonly symbols: readonly string[];
    readonly origin: ContentOrigin;
    readonly provenance: {
      readonly state: ProvenanceState;
      readonly author: string | null;
      readonly references: readonly string[];
    };
  };
  readonly art: {
    /** Repository-relative public asset path, e.g. `/art/cards/rws/the-fool.svg`. */
    readonly assetPath: string;
    readonly origin: ArtOrigin;
    readonly provenance: {
      readonly state: ProvenanceState;
      readonly creator: string | null;
      readonly license: string | null;
      readonly evidence: readonly string[];
    };
  };
  readonly review: {
    readonly state: 'pending' | 'reviewed';
    readonly reviewer: string | null;
    readonly reviewedAt: string | null;
    readonly checklist: EditorialReviewChecklist;
  };
}

export interface CardCatalogBatch {
  readonly schemaVersion: typeof CARD_CATALOG_SCHEMA_VERSION;
  readonly deckId: DeckId;
  readonly batchId: string;
  readonly scope: 'batch' | 'complete-deck';
  readonly records: readonly CardCatalogRecord[];
}

export interface CatalogValidationIssue {
  readonly path: string;
  readonly code: string;
  readonly message: string;
}

export type CatalogValidationResult =
  | { readonly valid: true; readonly editoriallyReady: boolean; readonly issues: readonly [] }
  | { readonly valid: false; readonly editoriallyReady: false; readonly issues: readonly CatalogValidationIssue[] };

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isNonEmpty = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
const isStringList = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every(isNonEmpty);
const isProvenanceState = (value: unknown): value is ProvenanceState =>
  value === 'pending' || value === 'documented';

function validateRecord(value: unknown, path: string, batchDeckId: DeckId, issues: CatalogValidationIssue[]): value is CardCatalogRecord {
  if (!isObject(value)) {
    issues.push({ path, code: 'record.type', message: 'O registro precisa ser um objeto.' });
    return false;
  }

  const start = issues.length;
  const add = (suffix: string, code: string, message: string) => issues.push({ path: `${path}.${suffix}`, code, message });
  if (!isNonEmpty(value.id) || !/^[a-z0-9-]+:[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.id)) {
    add('id', 'record.id', 'Use um identificador estável no formato <tradição>:<slug>.');
  } else if (!value.id.startsWith(`${batchDeckId}:`)) {
    add('id', 'record.deck-id', 'O prefixo do identificador deve corresponder à tradição do lote.');
  }
  if (value.deckId !== batchDeckId) add('deckId', 'record.deck-id', 'A tradição do registro deve corresponder à tradição do lote.');
  const expectedCount = decks[batchDeckId].count;
  if (!Number.isInteger(value.position) || (value.position as number) < 1 || (value.position as number) > expectedCount) {
    add('position', 'record.position', `A posição editorial deve estar entre 1 e ${expectedCount}.`);
  }
  if (!isNonEmpty(value.numberLabel)) add('numberLabel', 'record.number', 'Informe o número tradicional sem substituir a posição editorial.');
  if (!isNonEmpty(value.name)) add('name', 'record.name', 'Informe o nome da carta.');

  if (!isObject(value.content)) {
    add('content', 'content.type', 'O conteúdo precisa ser um objeto.');
  } else {
    if (!isNonEmpty(value.content.summary)) add('content.summary', 'content.summary', 'Informe o texto editorial da carta.');
    if (!isStringList(value.content.symbols)) add('content.symbols', 'content.symbols', 'Use uma lista de símbolos textuais não vazios.');
    if (!['original', 'adapted', 'licensed'].includes(String(value.content.origin))) {
      add('content.origin', 'content.origin', 'A origem do conteúdo deve ser original, adapted ou licensed.');
    }
    if (!isObject(value.content.provenance)) {
      add('content.provenance', 'content.provenance', 'Registre o estado de proveniência do conteúdo.');
    } else {
      const provenance = value.content.provenance;
      if (!isProvenanceState(provenance.state)) add('content.provenance.state', 'provenance.state', 'Use pending ou documented.');
      if (provenance.author !== null && !isNonEmpty(provenance.author)) add('content.provenance.author', 'provenance.author', 'Informe um autor ou null enquanto estiver pendente.');
      if (!isStringList(provenance.references)) add('content.provenance.references', 'provenance.references', 'As referências devem ser uma lista textual.');
      if (provenance.state === 'documented' && (!isNonEmpty(provenance.author) || !isStringList(provenance.references) || provenance.references.length === 0)) {
        add('content.provenance', 'provenance.incomplete', 'Proveniência documentada exige autoria e ao menos uma referência verificável.');
      }
    }
  }

  if (!isObject(value.art)) {
    add('art', 'art.type', 'A arte precisa ser um objeto.');
  } else {
    if (!isNonEmpty(value.art.assetPath) || !value.art.assetPath.startsWith('/art/cards/') || /[\\?#]/.test(String(value.art.assetPath)) || String(value.art.assetPath).split('/').includes('..')) {
      add('art.assetPath', 'art.path', 'Use um caminho público do catálogo em /art/cards/.');
    }
    if (!['original', 'licensed', 'public-domain'].includes(String(value.art.origin))) {
      add('art.origin', 'art.origin', 'Declare arte original, licenciada ou de domínio público.');
    }
    if (!isObject(value.art.provenance)) {
      add('art.provenance', 'art.provenance', 'Registre a proveniência da arte.');
    } else {
      const provenance = value.art.provenance;
      if (!isProvenanceState(provenance.state)) add('art.provenance.state', 'provenance.state', 'Use pending ou documented.');
      if (provenance.creator !== null && !isNonEmpty(provenance.creator)) add('art.provenance.creator', 'provenance.creator', 'Informe o criador ou null enquanto estiver pendente.');
      if (provenance.license !== null && !isNonEmpty(provenance.license)) add('art.provenance.license', 'provenance.license', 'Informe a licença ou null enquanto estiver pendente.');
      if (!isStringList(provenance.evidence)) add('art.provenance.evidence', 'provenance.evidence', 'As evidências devem ser uma lista textual.');
      if (provenance.state === 'documented' && (!isNonEmpty(provenance.creator) || !isNonEmpty(provenance.license) || !isStringList(provenance.evidence) || provenance.evidence.length === 0)) {
        add('art.provenance', 'provenance.incomplete', 'Proveniência documentada exige criador, licença e evidência verificável.');
      }
    }
  }

  if (!isObject(value.review)) {
    add('review', 'review.type', 'O registro precisa guardar o estado da revisão editorial.');
  } else {
    const review = value.review;
    if (review.state !== 'pending' && review.state !== 'reviewed') add('review.state', 'review.state', 'Use pending ou reviewed.');
    if (review.reviewer !== null && !isNonEmpty(review.reviewer)) add('review.reviewer', 'review.reviewer', 'Informe o revisor ou null antes da revisão.');
    if (review.reviewedAt !== null && (typeof review.reviewedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(review.reviewedAt) || Number.isNaN(Date.parse(review.reviewedAt)))) {
      add('review.reviewedAt', 'review.date', 'Informe uma data ISO válida ou null antes da revisão.');
    }
    if (!isObject(review.checklist)) {
      add('review.checklist', 'review.checklist', 'A revisão exige a lista de verificações editoriais.');
    } else {
      const checklist = review.checklist;
      const checks = ['identity', 'numbering', 'tradition', 'content', 'art', 'provenance'] as const;
      for (const check of checks) {
        if (typeof checklist[check] !== 'boolean') add(`review.checklist.${check}`, 'review.checklist-item', 'Cada verificação deve ser true ou false.');
      }
      if (review.state === 'reviewed' && checks.some(check => checklist[check] !== true)) {
        add('review.checklist', 'review.incomplete', 'Revisão concluída exige todas as verificações marcadas.');
      }
    }
    if (review.state === 'reviewed' && (!isNonEmpty(review.reviewer) || !isNonEmpty(review.reviewedAt))) {
      add('review', 'review.attribution', 'Revisão concluída exige revisor identificado e data.');
    }
  }
  return issues.length === start;
}

/** Validate shape and domain boundaries. A valid record is not human acceptance. */
export function validateCardCatalogBatch(input: unknown): CatalogValidationResult {
  const issues: CatalogValidationIssue[] = [];
  if (!isObject(input)) {
    return { valid: false, editoriallyReady: false, issues: [{ path: '$', code: 'batch.type', message: 'O lote precisa ser um objeto.' }] };
  }
  if (input.schemaVersion !== CARD_CATALOG_SCHEMA_VERSION) {
    issues.push({ path: 'schemaVersion', code: 'batch.version', message: `Versão incompatível; esperada ${CARD_CATALOG_SCHEMA_VERSION}.` });
  }
  if (!['rws', 'marseille', 'thoth', 'lenormand'].includes(String(input.deckId))) {
    issues.push({ path: 'deckId', code: 'batch.deck-id', message: 'Tradição não reconhecida.' });
  }
  if (!isNonEmpty(input.batchId)) issues.push({ path: 'batchId', code: 'batch.id', message: 'Informe um identificador estável para o lote.' });
  if (input.scope !== 'batch' && input.scope !== 'complete-deck') {
    issues.push({ path: 'scope', code: 'batch.scope', message: 'Use batch ou complete-deck; não infira completude pelo total planejado.' });
  }
  if (!Array.isArray(input.records) || input.records.length === 0) {
    issues.push({ path: 'records', code: 'batch.records', message: 'O lote precisa conter ao menos um registro.' });
  }
  if (issues.length > 0) return { valid: false, editoriallyReady: false, issues };

  const deckId = input.deckId as DeckId;
  const records = input.records as unknown[];
  const seenIds = new Set<string>();
  const seenPositions = new Set<number>();
  let everyRecordReviewedAndSourced = true;
  records.forEach((record, index) => {
    const before = issues.length;
    validateRecord(record, `records[${index}]`, deckId, issues);
    if (isObject(record)) {
      if (typeof record.id === 'string') {
        if (seenIds.has(record.id)) issues.push({ path: `records[${index}].id`, code: 'batch.duplicate-id', message: 'ID duplicado neste lote.' });
        seenIds.add(record.id);
      }
      if (typeof record.position === 'number') {
        if (seenPositions.has(record.position)) issues.push({ path: `records[${index}].position`, code: 'batch.duplicate-position', message: 'Posição editorial duplicada neste lote.' });
        seenPositions.add(record.position);
      }
      const contentReady = isObject(record.content) && isObject(record.content.provenance) && record.content.provenance.state === 'documented';
      const artReady = isObject(record.art) && isObject(record.art.provenance) && record.art.provenance.state === 'documented';
      const reviewReady = isObject(record.review) && record.review.state === 'reviewed';
      everyRecordReviewedAndSourced &&= contentReady && artReady && reviewReady;
    }
    if (issues.length > before) everyRecordReviewedAndSourced = false;
  });

  if (input.scope === 'complete-deck') {
    const expectedCount = decks[deckId].count;
    if (records.length !== expectedCount) {
      issues.push({ path: 'records', code: 'batch.incomplete-deck', message: `Catálogo completo de ${deckId} exige ${expectedCount} registros únicos.` });
    }
    if (seenPositions.size === expectedCount && Array.from({ length: expectedCount }, (_, index) => index + 1).some(position => !seenPositions.has(position))) {
      issues.push({ path: 'records', code: 'batch.position-gap', message: 'O catálogo completo deve cobrir cada posição editorial uma vez.' });
    }
  }
  if (issues.length > 0) return { valid: false, editoriallyReady: false, issues };
  return { valid: true, editoriallyReady: everyRecordReviewedAndSourced, issues: [] };
}
