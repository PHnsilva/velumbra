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

/** Editorial drafts only: distribution rights and human review remain pending. */
export const lenormandFifthSevenDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION, deckId: 'lenormand', batchId: 'lenormand-fifth-seven-draft', scope: 'batch',
  records: [
    draftCard(26, 'book', 'XXVI', 'O Livro', 'Conhecimento reservado, estudo ou algo ainda não revelado pede investigação paciente. O entorno ajuda a diferenciar privacidade de informação faltante.', ['livro', 'estudo', 'segredo'], '26-book.svg'),
    draftCard(27, 'letter', 'XXVII', 'A Carta', 'Uma mensagem, documento ou resposta formal coloca a comunicação em foco. Confira origem e conteúdo antes de tirar conclusões.', ['carta', 'mensagem', 'documento'], '27-letter.svg'),
    draftCard(28, 'man', 'XXVIII', 'O Homem', 'Uma pessoa ou papel significativo na pergunta pode estar representado. Leia a figura conforme o contexto indicado por quem consulta, sem presumir identidade ou relação.', ['figura', 'pessoa', 'papel'], '28-man.svg'),
    draftCard(29, 'woman', 'XXIX', 'A Mulher', 'Uma pessoa ou papel significativo na pergunta pode estar representado. Leia a figura conforme o contexto indicado por quem consulta, sem presumir identidade ou relação.', ['figura', 'pessoa', 'papel'], '29-woman.svg'),
    draftCard(30, 'lilies', 'XXX', 'Os Lírios', 'Calma, maturidade ou harmonia construída podem marcar o tema. As cartas vizinhas especificam se essa serenidade é alcançada, desejada ou desafiada.', ['lírios', 'calma', 'maturidade'], '30-lilies.svg'),
    draftCard(31, 'sun', 'XXXI', 'O Sol', 'Clareza, energia e confiança favorecem uma iniciativa. Leia o símbolo como perspectiva da tiragem, não como garantia de sucesso.', ['sol', 'clareza', 'vitalidade'], '31-sun.svg'),
    draftCard(32, 'moon', 'XXXII', 'A Lua', 'Reconhecimento, imaginação ou oscilação emocional pode ganhar destaque. O contexto distingue reputação pública de vivência íntima.', ['lua', 'reconhecimento', 'imaginação'], '32-moon.svg'),
  ],
};

export const lenormandFifthSevenArtwork = ['26-book.svg', '27-letter.svg', '28-man.svg', '29-woman.svg', '30-lilies.svg', '31-sun.svg', '32-moon.svg'] as const;
