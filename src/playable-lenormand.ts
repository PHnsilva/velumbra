import type { CardCatalogBatch } from './card-catalog';
import { validateCardCatalogBatch } from './card-catalog';
import { drawLenormandPreview, type ReadingSpread, type SpreadSize } from './reading';
import { lenormandFirstSevenDraft } from './card-catalog-drafts/lenormand-first-seven';
import { lenormandSecondSevenDraft } from './card-catalog-drafts/lenormand-second-seven';
import { lenormandThirdFourDraft } from './card-catalog-drafts/lenormand-third-four';
import { lenormandFourthSevenDraft, lenormandFourthSevenCombinations } from './card-catalog-drafts/lenormand-fourth-seven';
import { lenormandFifthSevenDraft, lenormandFifthSevenCombinations } from './card-catalog-drafts/lenormand-fifth-seven';
import { lenormandLastFourDraft, lenormandLastFourCombinations } from './card-catalog-drafts/lenormand-last-four';

export const lenormandPreview: CardCatalogBatch = {
  schemaVersion: '1.0.0', deckId: 'lenormand', batchId: 'lenormand-playtest-2026-11-24', scope: 'complete-deck',
  records: [lenormandFirstSevenDraft, lenormandSecondSevenDraft, lenormandThirdFourDraft,
    lenormandFourthSevenDraft, lenormandFifthSevenDraft, lenormandLastFourDraft]
    .flatMap(batch => batch.records).sort((a, b) => a.position - b.position)
    .map(card => ({ ...card, art: { ...card.art, assetPath: card.art.assetPath.replace('/lenormand/', '/lenormand-preview/') } })),
};
if (!validateCardCatalogBatch(lenormandPreview).valid) throw new Error('Catálogo Lenormand de teste incompleto ou inválido.');

export const guidedQuestions = {
  general: { question: 'O que merece minha atenção neste momento?', advice: 'Escolha uma ação pequena que ajude a observar a situação com mais clareza.' },
  work: { question: 'Como posso cuidar dos meus próximos passos no trabalho?', advice: 'Transforme a reflexão em um próximo passo possível e confira as informações antes de decidir.' },
  relationships: { question: 'O que posso observar nas minhas relações?', advice: 'Considere uma conversa cuidadosa, sem atribuir intenções a outra pessoa apenas pelos símbolos.' },
} as const;
export type GuidedQuestionId = keyof typeof guidedQuestions;

export function drawPlayableLenormand(size: SpreadSize, random?: Pick<Crypto, 'getRandomValues'>): ReadingSpread {
  return drawLenormandPreview(lenormandPreview, size, random);
}

/** Editorial prompts, not free-text understanding or a prediction. Order remains meaningful. */
export function interpretGuided(spread: ReadingSpread, questionId: GuidedQuestionId) {
  const question = guidedQuestions[questionId];
  if (!question || spread.deckId !== 'lenormand' || ![1, 3].includes(spread.cards.length)) throw new Error('Consulta guiada inválida.');
  const combinations = [...lenormandFourthSevenCombinations, ...lenormandFifthSevenCombinations, ...lenormandLastFourCombinations];
  const links = spread.cards.slice(0, -1).map((card, index) => {
    const next = spread.cards[index + 1]!;
    const known = combinations.find(pair => pair.leftId === card.id && pair.rightId === next.id);
    return known?.reading ?? `${card.name} traz o tema de ${card.symbols[0] ?? card.name}; ${next.name} acrescenta ${next.symbols[0] ?? next.name}. Observe como o segundo símbolo modifica o primeiro na situação escolhida.`;
  });
  return {
    question: question.question,
    links,
    verdict: `${spread.cards.map(card => card.name).join(' → ')}. ${question.advice} Use os símbolos como convite à reflexão, sem tratar a leitura como uma certeza sobre o futuro.`,
  };
}
