import type { CardCatalogBatch, CardCatalogRecord } from '../card-catalog';
import { CARD_CATALOG_SCHEMA_VERSION } from '../card-catalog';

const references = ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://lenormand.dk/cards'];
const author = 'Codex (assistente de IA; revisão editorial pendente)';
const pendingChecklist = { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } as const;

function draftCard(position: number, slug: string, numberLabel: string, name: string, summary: string, symbols: string[], filename: string): CardCatalogRecord {
  return {
    id: `lenormand:${slug}`,
    deckId: 'lenormand',
    position,
    numberLabel,
    name,
    content: { summary, symbols, origin: 'original', provenance: { state: 'pending', author, references } },
    art: { assetPath: `/art/cards/lenormand/${filename}`, origin: 'original', provenance: { state: 'pending', creator: author, license: null, evidence: [] } },
    review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: pendingChecklist },
  };
}

/** Editorial drafts only: rights and human review must be completed before publication. */
export const lenormandThirdFourDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'lenormand',
  batchId: 'lenormand-third-four-draft',
  scope: 'batch',
  records: [
    draftCard(15, 'bear', 'XV', 'O Urso', 'Uma presença forte pode proteger, administrar recursos ou exercer autoridade. O contexto ajuda a distinguir apoio de controle.', ['urso', 'força', 'recursos'], '15-bear.svg'),
    draftCard(16, 'stars', 'XVI', 'As Estrelas', 'Um rumo ganha clareza quando visão e planejamento se alinham. Considere inspiração, orientação ou reconhecimento sem tratar a imagem como garantia.', ['estrelas', 'direção', 'inspiração'], '16-stars.svg'),
    draftCard(17, 'stork', 'XVII', 'A Cegonha', 'Uma transição pode alterar a rotina e trazer melhora gradual. Observe o que está mudando e o que ainda depende de cuidado.', ['cegonha', 'transição', 'mudança'], '17-stork.svg'),
    draftCard(18, 'dog', 'XVIII', 'O Cão', 'Uma amizade ou aliança confiável se mostra em presença e atitudes consistentes; as cartas vizinhas especificam o apoio em questão.', ['cão', 'amizade', 'apoio'], '18-dog.svg'),
  ],
};

/** SVG sources stay outside public assets until attribution and license are approved. */
export const lenormandThirdFourArtwork = ['15-bear.svg', '16-stars.svg', '17-stork.svg', '18-dog.svg'] as const;
