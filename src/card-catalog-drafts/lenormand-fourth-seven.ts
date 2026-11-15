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

/** Editorial drafts only: distribution rights and human review remain pending. */
export const lenormandFourthSevenDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'lenormand',
  batchId: 'lenormand-fourth-seven-draft',
  scope: 'batch',
  records: [
    draftCard(19, 'tower', 'XIX', 'A Torre', 'Uma instituição, estrutura ou limite ganha destaque. O entorno ajuda a distinguir proteção e estabilidade de distância ou isolamento.', ['torre', 'instituição', 'limite'], '19-tower.svg'),
    draftCard(20, 'garden', 'XX', 'O Jardim', 'Um espaço compartilhado, encontro ou rede social reúne pessoas. Observe quem participa e o que se torna público na situação.', ['jardim', 'encontro', 'comunidade'], '20-garden.svg'),
    draftCard(21, 'mountain', 'XXI', 'A Montanha', 'Um obstáculo ou demora exige contorno e persistência. As cartas próximas indicam o que bloqueia o caminho e onde há margem de ação.', ['montanha', 'obstáculo', 'demora'], '21-mountain.svg'),
    draftCard(22, 'crossroads', 'XXII', 'Os Caminhos', 'Uma escolha entre alternativas pede comparação de consequências. A leitura mostra opções e contexto, sem retirar da pessoa a decisão.', ['caminhos', 'escolha', 'alternativas'], '22-crossroads.svg'),
    draftCard(23, 'mice', 'XXIII', 'Os Ratos', 'Pequenas perdas, desgaste ou preocupação podem se acumular. Procure o que está sendo consumido e evite transformar o símbolo em previsão literal.', ['ratos', 'desgaste', 'perda gradual'], '23-mice.svg'),
    draftCard(24, 'heart', 'XXIV', 'O Coração', 'Afeto, interesse ou vínculo emocional ocupa o centro da questão. As cartas vizinhas especificam a relação sem prometer reciprocidade ou resultado.', ['coração', 'afeto', 'vínculo'], '24-heart.svg'),
    draftCard(25, 'ring', 'XXV', 'O Anel', 'Um acordo, compromisso ou ciclo recorrente conecta pessoas ou responsabilidades. O contexto esclarece se o vínculo é escolhido, renovado ou precisa de revisão.', ['anel', 'acordo', 'compromisso'], '25-ring.svg'),
  ],
};

/** Keep SVG files in documentation until licensing and editorial approval are complete. */
export const lenormandFourthSevenArtwork = [
  '19-tower.svg', '20-garden.svg', '21-mountain.svg', '22-crossroads.svg', '23-mice.svg', '24-heart.svg', '25-ring.svg',
] as const;

export const lenormandFourthSevenCombinations = [
  { leftId: 'lenormand:tower', rightId: 'lenormand:house', reading: 'Uma estrutura ou limite institucional influencia a vida doméstica.' },
  { leftId: 'lenormand:garden', rightId: 'lenormand:bouquet', reading: 'Um convite ou gesto agradável acontece em um encontro social.' },
  { leftId: 'lenormand:mountain', rightId: 'lenormand:rider', reading: 'Uma notícia ou avanço encontra demora ou um obstáculo.' },
  { leftId: 'lenormand:crossroads', rightId: 'lenormand:clover', reading: 'Uma oportunidade breve pode surgir entre alternativas.' },
  { leftId: 'lenormand:mice', rightId: 'lenormand:house', reading: 'Desgaste gradual pede atenção a recursos e tarefas da casa.' },
  { leftId: 'lenormand:heart', rightId: 'lenormand:ring', reading: 'Um vínculo afetivo ou compromisso emocional ganha destaque.' },
  { leftId: 'lenormand:ring', rightId: 'lenormand:letter', reading: 'Um compromisso ou acordo é comunicado por escrito.' },
] as const;
