# Velumbra — rodada de 15/11/2026, issue #75

**Issue:** [#75, produzir lote 2 de Petit Lenormand: cartas 1–18](https://github.com/PHnsilva/velumbra/issues/75), S1, tamanho M (4 unidades). **Estado:** rascunho parcial em PR para revisão; issue aberta e não aceita.

## Base e dependências

- Branch: `codex/2026-11-15-75-lenormand-lot2`; commit de implementação `6301e332512d6f114868d3d098ca526c96b075f2`.
- PR [#96](https://github.com/PHnsilva/velumbra/pull/96), rascunho aberto para revisão. A CI deste HEAD deve executar no GitHub.
- PR empilhado sobre PR #95, HEAD `982c18ca57715cea20e1b4e51ee34039ad28b371`. #75 não depende funcionalmente de #74; o empilhamento mantém o diário cronológico e os testes de lotes comuns na mesma árvore. A base técnica para ambas continua PR #90, HEAD `b7a355318e07305556e02ef0aedfe9027635e7cc` → PR #89, `42f7020c48a58cec730d2e1e16e53af93099c9b3` → PR #3, `14fc529e8dd355afeb66afb01d6a7c67734f41e1` → #2 → #1. Actions e Vercel passaram nos HEADs registrados de #90, #89 e #95.
- A issue #75 depende de #37. O guia de #37 está disponível e tecnicamente validado em PR #90 e é consumido provisoriamente; #37, #36 e #7 não têm aceite humano registrado. A relação nativa da issue permanece, sem remoção de bloqueio.
- Ordem proposta de revisão desta cadeia: PR #96 → #95 → #90 → #89 → #3 → #2 → #1. A pilha de PR é para compartilhar os testes/diário; não declara #74 como dependência de produto para #75.

## Trabalho produzido

- Sete resumos originais em português para posições 8–14, com IDs estáveis, nomes, numeração romana coerente com a amostra existente e símbolos.
- Sete esboços SVG originais em `docs/card-drafts/lenormand/second-seven/`, distinguindo as cartas de forma simples na paleta e moldura do projeto.
- Lote tipado de rascunho com proveniência de conteúdo e arte separadas, licença pendente e checklist editorial sem marcação de revisão.
- Teste conjunto com o primeiro lote: posições 1–14 sem lacunas ou IDs duplicados; validação Lenormand sem inversões; proveniência pendente; SVGs existem apenas na documentação, enquanto os futuros caminhos públicos ainda não existem.
- Referências e rastreio individual das sete posições em `docs/card-drafts/lenormand/second-seven/README.md`.

## Validação

- Node `24.19.0`, npm `11.17.0`; dependências instaladas offline do lockfile, com cache no C:.
- `npm run check` passou; `npm run build` passou e regenerou `public/runtime/` pelo script do projeto; depois do build, `npm test` passou **19/19**; `git diff --check` passou.
- Uma montagem PNG temporária das sete ilustrações foi inspecionada para distinguir motivos e conferir legibilidade em escala de carta. O PNG não faz parte do PR. Não houve inspeção no navegador/aplicativo.

## Limites, pontos e próxima ação

A licença de distribuição do projeto continua sem escolha. A autoria assistida foi registrada, mas a arte permanece em documentação e não foi adicionada ao runtime nem à interface. Nomes e resumos aguardam revisão editorial; `editoriallyReady` permanece falso. A pergunta sobre a licença da issue #74 feita na retomada anterior aguarda resposta de Pedro.

**Pontos contados nesta issue na meta diária: 0/4.** A produção parcial foi validada, mas o critério de licença/proveniência e a revisão humana impedem concluir a issue M. Déficit para a meta mínima diária de 8 unidades: 8 unidades, sem contagem proporcional artificial. O lote anterior #74 também permanece em revisão e não é recontado.

Próxima ação: Pedro escolher a licença/atribuição para conteúdos autorais e revisar os dois lotes. Depois registrar a proveniência final, executar revisão visual na interface e integrar somente após a revisão/aceite necessários. O lote restante 15–18 e o aceite agregado #26 continuam pendentes.
