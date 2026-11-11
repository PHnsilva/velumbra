import type { CardCatalogBatch } from '../card-catalog';
import { CARD_CATALOG_SCHEMA_VERSION } from '../card-catalog';

/** Editorial drafts only: the delivery license and human review are unresolved. */
export const lenormandFirstSevenDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'lenormand',
  batchId: 'lenormand-first-seven-draft',
  scope: 'batch',
  records: [
    {
      id: 'lenormand:rider', deckId: 'lenormand', position: 1, numberLabel: 'I', name: 'O Cavaleiro',
      content: { summary: 'Uma aproximação põe algo em movimento: notícia, visita ou chegada. As cartas vizinhas mostram o tema e o rumo da mudança.', symbols: ['cavaleiro', 'chegada', 'movimento'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/01-rider.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:clover', deckId: 'lenormand', position: 2, numberLabel: 'II', name: 'O Trevo',
      content: { summary: 'Uma oportunidade pequena e breve pode aliviar o caminho. O contexto ajuda a distinguir uma abertura de uma certeza.', symbols: ['trevo', 'oportunidade', 'alívio'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/02-clover.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:ship', deckId: 'lenormand', position: 3, numberLabel: 'III', name: 'O Navio',
      content: { summary: 'Algo se desloca para longe do conhecido. A imagem pode falar de viagem, troca ou de um horizonte que pede tempo.', symbols: ['navio', 'distância', 'travessia'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/03-ship.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:house', deckId: 'lenormand', position: 4, numberLabel: 'IV', name: 'A Casa',
      content: { summary: 'A leitura volta ao espaço íntimo e à base da rotina: lar, família ou segurança construída.', symbols: ['casa', 'lar', 'fundação'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/04-house.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:tree', deckId: 'lenormand', position: 5, numberLabel: 'V', name: 'A Árvore',
      content: { summary: 'O que tem raízes cresce devagar. Considere continuidade, amadurecimento e cuidado; o símbolo não é diagnóstico de saúde.', symbols: ['árvore', 'raízes', 'crescimento'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/05-tree.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:clouds', deckId: 'lenormand', position: 6, numberLabel: 'VI', name: 'As Nuvens',
      content: { summary: 'Há sinais difíceis de distinguir; uma conversa pode estar atravessada por dúvida ou informação incompleta. Espere por mais clareza.', symbols: ['nuvens', 'dúvida', 'incerteza'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/06-clouds.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
    {
      id: 'lenormand:snake', deckId: 'lenormand', position: 7, numberLabel: 'VII', name: 'A Serpente',
      content: { summary: 'O caminho faz uma curva: estratégia, desejo ou complicação pede atenção e tempo. Não conclua traição ou ameaça só pelo símbolo.', symbols: ['serpente', 'desvio', 'estratégia'], origin: 'original', provenance: { state: 'pending', author: 'Codex (assistente de IA; revisão editorial pendente)', references: ['https://www.tarotassociation.net/lenormand-lexicon/', 'https://www.lenormand.dk/cards'] } },
      art: { assetPath: '/art/cards/lenormand/07-snake.svg', origin: 'original', provenance: { state: 'pending', creator: 'Codex (assistente de IA; revisão editorial pendente)', license: null, evidence: [] } },
      review: { state: 'pending', reviewer: null, reviewedAt: null, checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false } },
    },
  ],
};

/** Source SVGs stay in docs until rights, editorial review and publication are approved. */
export const lenormandDraftArtwork = [
  '01-rider.svg', '02-clover.svg', '03-ship.svg', '04-house.svg', '05-tree.svg', '06-clouds.svg', '07-snake.svg',
] as const;
