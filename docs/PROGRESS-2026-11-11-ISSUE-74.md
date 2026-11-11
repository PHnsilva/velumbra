# Velumbra — rodada de 11/11/2026, issue #74

**Issue:** [#74, produzir lote 1 de Petit Lenormand (cartas 1–18)](https://github.com/PHnsilva/velumbra/issues/74), S1, tamanho M (4 unidades). **Estado:** rascunho parcial em PR para revisão; issue aberta e não aceita.

## Base e dependências

- Branch: `codex/2026-11-11-74-lenormand-lot1`; commit de implementação: `96b7e256139ce2d6b7a97d10ae818979d78abae6`.
- PR [#95](https://github.com/PHnsilva/velumbra/pull/95), aberto como rascunho para mostrar que o conteúdo está em revisão e incompleto. Actions e Vercel ainda não haviam concluído em `96b7e25` na primeira checagem; os testes locais completos constam abaixo.
- Base direta: PR #90, HEAD `b7a355318e07305556e02ef0aedfe9027635e7cc`, que depende de PR #89, HEAD `42f7020c48a58cec730d2e1e16e53af93099c9b3`, e PR #3, HEAD `14fc529e8dd355afeb66afb01d6a7c67734f41e1`, seguido dos PRs #2 e #1. #89 e #90 têm Actions e Vercel aprovados em seus HEADs registrados. Esse artefato do guia #37 é consumido provisoriamente; #37, #36 e #7 ainda aguardam aceite humano.
- A issue #74 declara dependência de #37. Não espera pelo merge porque o contrato/editorial e o guia estão disponíveis e tecnicamente validados em PRs; a nova branch registra essa ordem. Não depende de #13 nem do PR #94.
- Próxima cadeia de revisão: PR #95 → #90 → #89 → #3 → #2 → #1. Não houve merge, aprovação ou aceite por agente.

## Trabalho produzido

- Sete registros originais para as posições editoriais 1–7, com nomes em português, numeração em algarismos romanos coerente com a amostra Lenormand atual, símbolos e resumos contextuais. O texto não usa inversões, previsões deterministas ou interpretação médica.
- Sete desenhos vetoriais SVG originais em `docs/card-drafts/lenormand/`, com moldura, paleta e pixels em linha com a direção de arte.
- Lote tipado de rascunho que mantém caminhos de publicação futuros, proveniência/licença pendentes e checklist sem marcar revisão. Os SVGs não estão em `public/`, não foram conectados ao catálogo publicado nem ao runtime.
- Registro editorial e referências de pesquisa em `docs/card-drafts/lenormand/README.md`. A pesquisa conferiu vocabulário e sequência, sem copiar texto ou arte das fontes.

## Validação

- Node `24.19.0`, npm `11.17.0`; dependências do lockfile estavam em cache no C: e foram preparadas offline na worktree.
- `npm run check` passou.
- `npm run build` passou; o script padrão regenerou `public/runtime/` sem edição manual.
- Depois do build, `npm test` passou **18/18**. O teste novo confere posições, nomes, algarismos, estrutura Lenormand sem inversões, lote válido ainda não pronto, sete SVGs, metadados acessíveis e que os caminhos públicos futuros ainda não existem.
- `git diff --check` passou.
- A montagem PNG local dos sete desenhos foi examinada para legibilidade e distinção; é apenas evidência temporária de revisão do rascunho e não faz parte do PR. Não houve teste visual dentro do aplicativo.

## Limites, pontos e próxima ação

O critério da issue exige autoria/licença documentada por carta e revisão editorial e visual. A origem do texto e a autoria assistida foram registradas, mas o projeto ainda não escolheu licença de distribuição. A revisão de Pedro também não aconteceu. Por isso, os desenhos permanecem em documentação e o catálogo retorna `valid: true`, `editoriallyReady: false`; nenhuma carta é anunciada como pronta.

**Pontos da meta diária nesta issue: 0/4.** O lote está parcialmente produzido e tecnicamente validado, mas não conclui a issue M. Déficit de 8 unidades para a meta mínima diária: depende da decisão de licença/atribuição por Pedro e revisão editorial do lote; não arredondei o trabalho parcial.

Próxima ação: Pedro escolher a licença/atribuição de distribuição para estes conteúdos originais e revisar os sete desenhos/textos. Com a decisão, completar proveniência, teste visual na interface, integração somente após autorização e atualizar o lote. O restante das posições 8–18 permanece para sequência posterior; o aceite agregado #26 continua bloqueado pelos lotes #74–76.
