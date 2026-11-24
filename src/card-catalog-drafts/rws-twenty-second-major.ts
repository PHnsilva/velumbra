import type { CardCatalogBatch, CardCatalogRecord } from "../card-catalog";
import { CARD_CATALOG_SCHEMA_VERSION } from "../card-catalog";

const author = "Codex (assistente de IA; rascunho, revisão editorial pendente)";
const reference = "A. E. Waite, The Pictorial Key to the Tarot (1910), seção The World; consultado para numeração e vocabulário, sem reprodução de frases ou imagens. https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf";
const pendingReview = {
  state: "pending",
  reviewer: null,
  reviewedAt: null,
  checklist: { identity: false, numbering: false, tradition: false, content: false, art: false, provenance: false },
} as const satisfies CardCatalogRecord["review"];

/** Rascunho isolado da posição 22. Não representa um baralho RWS completo. */
export const rwsTwentySecondMajorDraft: CardCatalogBatch = {
  schemaVersion: CARD_CATALOG_SCHEMA_VERSION,
  deckId: "rws",
  batchId: "rws-major-arcana-position-22-draft",
  scope: "batch",
  records: [{
    id: "rws:world",
    deckId: "rws",
    position: 22,
    numberLabel: "XXI",
    name: "O Mundo",
    content: {
      summary: "Concluir uma etapa pode ajudar a integrar o que foi aprendido e abrir espaço para o que vem depois. Reconhecer o percurso não exige considerar tudo encerrado.",
      symbols: ["integração", "conclusão", "continuidade"],
      origin: "original",
      provenance: { state: "pending", author, references: [reference] },
    },
    art: {
      assetPath: "/art/cards/rws/22-world.svg",
      origin: "original",
      provenance: { state: "pending", creator: author, license: null, evidence: [] },
    },
    review: pendingReview,
  }],
};
