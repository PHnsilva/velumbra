import type { CardCatalogBatch, CardCatalogRecord } from '../card-catalog';
import { CARD_CATALOG_SCHEMA_VERSION } from '../card-catalog';

const references = ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://lenormand.dk/cards'];
const author = 'Codex (assistente de IA; revisão editorial pendente)';
const pendingChecklist = { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } as const;

function draftCard(position: number, slug: string, numberLabel: string, name: string, summary: string, symbols: string[], filename: string): CardCatalogRecord {
  return {
    id: `lenormand:${slug}`, deckId: 'lenormand', position, numberLabel, name,
    content: { summary, symbols, origin: 'original', provenance: { state: 'pending', author, references } },
    art: { assetPath: `/art/cards/lenormand/${filename}`, origin: 'original', provenance: { state: 'pending', creator: author, license: null, evidence: [] } },
    review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: pendingChecklist },
  };
}

/** Editorial drafts only: licensing and human review remain pending. */
export const lenormandLastFourDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION, deckId: 'lenormand', batchId: 'lenormand-last-four-draft', scope: 'batch',
  records: [
    draftCard(33, 'key', 'XXXIII', 'A Chave', 'Uma descoberta, solução ou acesso possível se torna central. O contexto mostra o que pode ser destrancado e quais passos ainda cabem à pessoa.', ['chave', 'solução', 'acesso'], '33-key.svg'),
    draftCard(34, 'fish', 'XXXIV', 'Os Peixes', 'Recursos, troca, circulação ou atividade econômica podem estar em pauta. As cartas próximas ajudam a definir o tipo de recurso sem prometer ganho financeiro.', ['peixes', 'recursos', 'circulação'], '34-fish.svg'),
    draftCard(35, 'anchor', 'XXXV', 'A Âncora', 'Estabilidade, continuidade ou um compromisso duradouro dá apoio à situação. O entorno distingue firmeza útil de apego que impede movimento.', ['âncora', 'estabilidade', 'continuidade'], '35-anchor.svg'),
    draftCard(36, 'cross', 'XXXVI', 'A Cruz', 'Um dever, provação ou tema de forte significado pede atenção e cuidado. A combinação contextualiza o peso sem declarar sofrimento inevitável.', ['cruz', 'dever', 'significado'], '36-cross.svg'),
  ],
};

export const lenormandLastFourArtwork = ['33-key.svg', '34-fish.svg', '35-anchor.svg', '36-cross.svg'] as const;

export const lenormandLastFourCombinations = [
  { leftId: 'lenormand:key', rightId: 'lenormand:book', reading: 'Uma solução abre caminho para estudo ou informação reservada.' },
  { leftId: 'lenormand:fish', rightId: 'lenormand:ring', reading: 'Recursos ou trocas se vinculam a um acordo recorrente.' },
  { leftId: 'lenormand:anchor', rightId: 'lenormand:ship', reading: 'Uma jornada ou mudança pode avançar com planejamento e continuidade.' },
  { leftId: 'lenormand:cross', rightId: 'lenormand:mice', reading: 'Deveres acumulados podem aumentar o desgaste; o contexto aponta onde buscar apoio.' },
] as const;
