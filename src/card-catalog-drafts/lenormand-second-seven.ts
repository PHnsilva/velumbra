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
export const lenormandSecondSevenDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'lenormand',
  batchId: 'lenormand-second-seven-draft',
  scope: 'batch',
  records: [
    draftCard(8, 'coffin', 'VIII', 'O Caixão', 'Um ciclo chega ao repouso ou a uma conclusão; a pergunta e as cartas vizinhas mostram o que precisa ser encerrado.', ['caixão', 'conclusão', 'repouso'], '08-coffin.svg'),
    draftCard(9, 'bouquet', 'IX', 'O Buquê', 'Um gesto agradável, convite ou reconhecimento traz um momento de prazer. O contexto mostra quem oferece e com que intenção.', ['buquê', 'convite', 'apreço'], '09-bouquet.svg'),
    draftCard(10, 'scythe', 'X', 'A Foice', 'Um corte direto muda o ritmo. Pode falar de uma decisão rápida ou separação; as cartas ao redor mostram se algo protege ou interrompe.', ['foice', 'corte', 'decisão'], '10-scythe.svg'),
    draftCard(11, 'whip', 'XI', 'O Chicote', 'Um assunto retorna, trazendo debate, treino ou atrito. Observe repetição e tom para distinguir disciplina de conflito.', ['chicote', 'repetição', 'debate'], '11-whip.svg'),
    draftCard(12, 'birds', 'XII', 'Os Pássaros', 'Conversas em movimento podem trazer preocupação ou troca rápida. O par de aves destaca a interação entre pessoas.', ['pássaros', 'conversa', 'troca'], '12-birds.svg'),
    draftCard(13, 'child', 'XIII', 'A Criança', 'Um começo pequeno, curiosidade ou algo ainda em formação ganha espaço. Só associe a uma criança literal quando a pergunta trouxer esse contexto.', ['criança', 'começo', 'curiosidade'], '13-child.svg'),
    draftCard(14, 'fox', 'XIV', 'A Raposa', 'Atenção prática, trabalho e estratégia pedem leitura dos detalhes e interesses envolvidos; o símbolo sozinho não prova engano.', ['raposa', 'trabalho', 'estratégia'], '14-fox.svg'),
  ],
};

/** SVG sources stay outside public assets until attribution and license are approved. */
export const lenormandSecondSevenArtwork = [
  '08-coffin.svg', '09-bouquet.svg', '10-scythe.svg', '11-whip.svg', '12-birds.svg', '13-child.svg', '14-fox.svg',
] as const;
