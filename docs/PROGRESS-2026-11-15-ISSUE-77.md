# Velumbra — rodada de 15/11/2026, issue #77

**Issue:** [#77, produzir lote 1 de Petit Lenormand (cartas 19–36)](https://github.com/PHnsilva/velumbra/issues/77), S2, tamanho M (4 unidades). **Estado:** rascunho parcial proposto em PR; não aceito.

## Base e dependências

- Branch: `codex/2026-11-15-77-lenormand-lot19-25`, iniciada em `main` no SHA `2ae7f27`.
- Commit de implementação: `6ea9f6a2ed70ad8c8f1efe99efaef996864e0fd8`. PR [#98](https://github.com/PHnsilva/velumbra/pull/98) aberto em rascunho para revisão; não foi aprovado nem integrado.
- Os artefatos necessários de schema e guia editorial estão integrados em `main` pelos PRs #89 e #90. A issue #77 não depende funcionalmente dos PRs abertos #95–#97; a base é independente para evitar empilhar lotes que não são pré-requisitos entre si.
- Lenormand mantém orientação somente em pé e leitura por combinações, conforme `src/decks.ts`.

## Trabalho produzido

- Sete resumos editoriais em português, sete ilustrações SVG e sete exemplos de combinações Lenormand de rascunho para as posições 19–25: Torre, Jardim, Montanha, Caminhos, Ratos, Coração e Anel.
- Registros tipados usam IDs estáveis e campos distintos de conteúdo, arte e revisão. Origem e referências consultadas estão documentadas; licença de distribuição, atribuição final e revisão humana permanecem pendentes.
- Os SVGs ficam sob `docs/card-drafts/`, fora de `public/` e do runtime. Nenhuma integração ao catálogo público foi feita.
- Adicionado teste estrutural do lote e de seus sete exemplos de combinação: sequência/numeração, IDs únicos, conteúdo, regras Lenormand, validação explícita como não pronto e ausência dos arquivos no caminho público.

## Validação

- Node `24.19.0`, npm `11.17.0`; `npm ci --offline` usou o cache em `C:\DevCache\npm` após confirmar que o worktree não tinha `node_modules`.
- `npm run check` passou; `npm run build` passou; `npm test` passou **21/21**; validação XML dos sete SVGs passou; `git diff --check` passou.
- O build gerou `public/runtime/` pelo processo normal; nenhum draft foi copiado para o runtime.
- Não foi feita inspeção em navegador nem revisão editorial humana. Os testes não validam direitos/licença nem correção histórica dos símbolos.

## Limites, pontos e próxima ação

O pedido anterior a Pedro sobre licença/atribuição continua sem resposta. Portanto, a licença permanece `null`, o checklist continua pendente e `editoriallyReady` é falso. O lote não cumpre ainda todos os critérios da issue.

**Pontos nesta issue: 0/4** enquanto faltarem decisão de licença e revisão editorial/visual. As issues #75, #76 e #77 em 15/11 permanecem propostas como rascunhos; seu total contado é **0/12**, abaixo da meta mínima de 8 unidades. Não há justificativa para contar frações de issues incompletas.

Próxima ação: Pedro define licença/atribuição e revisa os lotes; depois registrar proveniência final, conferir arte em interface real e integrar somente após o aceite devido. A issue #77 permanece aberta.
