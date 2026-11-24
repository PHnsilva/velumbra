import type { CardCatalogBatch, CardCatalogRecord } from '../card-catalog';
import { CARD_CATALOG_SCHEMA_VERSION } from '../card-catalog';

const reference = 'A. E. Waite, The Pictorial Key to the Tarot (1910), Trumps Major; texto original consultado para sequência e vocabulário, sem reprodução de frases ou imagens. https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf';
const author = 'Codex (assistente de IA; rascunho, revisão editorial pendente)';
const pendingReview = {
  state: 'pending',
  reviewer: null,
  reviewedAt: null,
  checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false },
} as const satisfies CardCatalogRecord['review'];

function draft(position: number, numberLabel: string, slug: string, name: string, summary: string, symbols: string[], artFile: string): CardCatalogRecord {
  return {
    id: `rws:${slug}`,
    deckId: 'rws',
    position,
    numberLabel,
    name,
    content: {
      summary,
      symbols,
      origin: 'original',
      provenance: { state: 'pending', author, references: [reference] },
    },
    art: {
      assetPath: `/art/cards/rws/${artFile}`,
      origin: 'original',
      provenance: { state: 'pending', creator: author, license: null, evidence: [] },
    },
    review: pendingReview,
  };
}

/** Editorial drafts only. They are not public assets, licensed, accepted or ready to draw. */
export const rwsFirstSevenDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: 'rws',
  batchId: 'rws-major-arcana-first-seven-draft',
  scope: 'batch',
  records: [
    draft(1, '0', 'fool', 'O Louco', 'Abertura para experimentar algo novo pode trazer frescor e descoberta. Curiosidade ajuda quando caminha junto de atenção aos próprios limites.', ['abertura', 'curiosidade', 'cuidado'], '01-fool.svg'),
    draft(2, 'I', 'magician', 'O Mago', 'Recursos dispersos podem ganhar direção quando intenção e habilidade se alinham. A carta também convida a distinguir domínio real de mera aparência.', ['iniciativa', 'habilidade', 'direção'], '02-magician.svg'),
    draft(3, 'II', 'high-priestess', 'A Sacerdotisa', 'Nem toda informação está visível; silêncio e observação podem revelar o que ainda não foi nomeado. Reserve espaço para ouvir antes de concluir.', ['silêncio', 'observação', 'conhecimento reservado'], '03-high-priestess.svg'),
    draft(4, 'III', 'empress', 'A Imperatriz', 'Criatividade e cuidado podem sustentar crescimento quando recebem tempo e condições. O convite é nutrir sem confundir abundância com resultado garantido.', ['cuidado', 'criação', 'crescimento'], '04-empress.svg'),
    draft(5, 'IV', 'emperor', 'O Imperador', 'Estrutura e responsabilidade ajudam a manter um plano de pé. Observe se regras e limites oferecem segurança ou deixaram pouco espaço para ajuste.', ['estrutura', 'limites', 'responsabilidade'], '05-emperor.svg'),
    draft(6, 'V', 'hierophant', 'O Hierofante', 'Aprendizagem e práticas compartilhadas podem oferecer referências e pertencimento. Considere quais tradições ainda orientam e quais pedem exame.', ['aprendizagem', 'tradição', 'comunidade'], '06-hierophant.svg'),
    draft(7, 'VI', 'lovers', 'Os Enamorados', 'Vínculos e escolhas ganham clareza quando valores são nomeados. A imagem pode convidar à conversa sobre reciprocidade e consequência do compromisso.', ['vínculo', 'escolha', 'reciprocidade'], '07-lovers.svg'),
  ],
};

export const rwsDraftArtwork = [
  '01-fool.svg', '02-magician.svg', '03-high-priestess.svg', '04-empress.svg',
  '05-emperor.svg', '06-hierophant.svg', '07-lovers.svg',
] as const;
