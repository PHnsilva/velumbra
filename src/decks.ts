export const deckIds = ['rws', 'marseille', 'thoth', 'lenormand'] as const;

export type DeckId = (typeof deckIds)[number];
export type TarotDeckId = Exclude<DeckId, 'lenormand'>;

export interface DeckSample {
  readonly n: string;
  readonly name: string;
  readonly symbol: string;
  readonly text: string;
}

interface DeckPresentation {
  readonly name: string;
  readonly short: string;
  readonly facts: string;
  readonly description: string;
  readonly samples: readonly [DeckSample, DeckSample, DeckSample];
}

export interface TarotDeckDefinition extends DeckPresentation {
  readonly kind: 'tarot';
  readonly id: TarotDeckId;
  readonly count: 78;
  readonly structure: {
    readonly majorArcana: 22;
    readonly minorArcana: 56;
    readonly suits: readonly [string, string, string, string];
    readonly courtRanks: readonly [string, string, string, string];
  };
  readonly orientation: 'upright-or-reversed';
  readonly reading: 'cards-in-spread-context';
}

export interface LenormandDeckDefinition extends DeckPresentation {
  readonly kind: 'lenormand';
  readonly id: 'lenormand';
  readonly count: 36;
  readonly structure: { readonly symbols: 36 };
  readonly orientation: 'upright-only';
  readonly reading: 'symbol-combinations';
}

export type DeckDefinition = TarotDeckDefinition | LenormandDeckDefinition;
type DeckCatalog = { readonly [Id in DeckId]: DeckDefinition & { readonly id: Id } };

// Estes dados descrevem os sistemas e suas amostras. Não representam os
// catálogos completos nem implementam sorteio ou interpretação.
export const decks = {
  rws: {
    kind: 'tarot',
    id: 'rws',
    name: 'Rider–Waite–Smith',
    short: 'Rider–Waite–Smith',
    count: 78,
    facts: '22 ARCANOS MAIORES · 56 MENORES',
    description: 'Cenas ilustradas transformam cada carta em uma pequena narrativa. Símbolos, gestos e detalhes ajudam a construir a leitura.',
    structure: {
      majorArcana: 22,
      minorArcana: 56,
      suits: ['cups', 'wands', 'swords', 'pentacles'],
      courtRanks: ['page', 'knight', 'queen', 'king'],
    },
    orientation: 'upright-or-reversed',
    reading: 'cards-in-spread-context',
    samples: [
      { n: '0', name: 'O Louco', symbol: '☼', text: 'Começos, liberdade e o passo em direção ao desconhecido.' },
      { n: 'XVIII', name: 'A Lua', symbol: '☾', text: 'Incerteza, imaginação e aquilo que ainda não está claro.' },
      { n: 'XIII', name: 'A Morte', symbol: '✧', text: 'Encerramento de um ciclo e abertura para uma transformação.' },
    ],
  },
  marseille: {
    kind: 'tarot',
    id: 'marseille',
    name: 'Tarô de Marselha',
    short: 'Marselha',
    count: 78,
    facts: '22 ARCANOS MAIORES · 56 MENORES',
    description: 'Uma tradição de formas marcantes e cartas numeradas de naipe. A composição visual, os números e as relações entre cartas orientam a interpretação.',
    structure: {
      majorArcana: 22,
      minorArcana: 56,
      suits: ['cups', 'batons', 'swords', 'coins'],
      courtRanks: ['valet', 'cavalier', 'reine', 'roi'],
    },
    orientation: 'upright-or-reversed',
    reading: 'cards-in-spread-context',
    samples: [
      { n: 'SEM NÚMERO', name: 'O Louco', symbol: '☼', text: 'Movimento, liberdade e caminhos ainda não definidos.' },
      { n: 'II', name: 'A Papisa', symbol: '☾', text: 'Conhecimento reservado, silêncio e atenção ao que se revela aos poucos.' },
      { n: 'VIII', name: 'A Justiça', symbol: '⚖', text: 'Equilíbrio, responsabilidade e avaliação das consequências.' },
    ],
  },
  thoth: {
    kind: 'tarot',
    id: 'thoth',
    name: 'Tarô de Thoth',
    short: 'Thoth',
    count: 78,
    facts: '22 ARCANOS MAIORES · 56 MENORES',
    description: 'Uma linguagem de correspondências esotéricas e símbolos densos. Alguns nomes, figuras de corte e relações diferem das outras tradições.',
    structure: {
      majorArcana: 22,
      minorArcana: 56,
      suits: ['cups', 'wands', 'swords', 'disks'],
      courtRanks: ['knight', 'queen', 'prince', 'princess'],
    },
    orientation: 'upright-or-reversed',
    reading: 'cards-in-spread-context',
    samples: [
      { n: 'VIII', name: 'Ajustamento', symbol: '⚖', text: 'Equilíbrio dinâmico, precisão e responsabilidade pelas escolhas.' },
      { n: 'XIV', name: 'Arte', symbol: '✧', text: 'Integração de opostos e transformação pela combinação.' },
      { n: 'XX', name: 'O Aeon', symbol: '☼', text: 'Reavaliação, passagem e mudança de perspectiva.' },
    ],
  },
  lenormand: {
    kind: 'lenormand',
    id: 'lenormand',
    name: 'Petit Lenormand',
    short: 'Lenormand',
    count: 36,
    facts: '36 SÍMBOLOS · LEITURA POR COMBINAÇÕES',
    description: 'Conhecido no Brasil como baralho cigano. Seus símbolos cotidianos se combinam como palavras de uma frase; a leitura inicial não utiliza inversões.',
    structure: { symbols: 36 },
    orientation: 'upright-only',
    reading: 'symbol-combinations',
    samples: [
      { n: 'I', name: 'O Cavaleiro', symbol: '♞', text: 'Notícias, aproximação e movimento. O contexto vem das cartas vizinhas.' },
      { n: 'XXVI', name: 'O Livro', symbol: '▥', text: 'Conhecimento, estudo ou algo que permanece reservado.' },
      { n: 'XXXII', name: 'A Lua', symbol: '☾', text: 'Reconhecimento, sensibilidade e imagem, conforme a combinação.' },
    ],
  },
} as const satisfies DeckCatalog;
