# Velumbra — rodada de 10/11/2026, issue #13

**Issue:** [#13, criar estados e gestos da personagem original](https://github.com/PHnsilva/velumbra/issues/13), S1, tamanho L (8 unidades). **Estado:** implementação parcial, enviada para revisão; a issue permanece aberta e sem aceite.

## Base e dependências

- Branch: `codex/2026-11-10-13-character-gestures`.
- Commit de código após empilhamento: `4b17ed7e1f32da57a5f39761836ebb74aa31d7af`; registro diário: `32d08fe97009e9c31897b1cea2f81d286a7ed351`; atualização do registro/PR: `8161492823e8d73e944f0b65aef1afb7ec10fec5`. PR [#94](https://github.com/PHnsilva/velumbra/pull/94) aberto como rascunho para manter explícito que falta decisão de escopo e integração. No HEAD `8161492`, CI e preview passaram: workflow Regressões e build, Vercel e Vercel Preview Comments.
- Pré-requisito nativo: `velumbra#7`. O contrato/código técnico necessário das quatro tradições já existe no PR #3 (`14fc529e8dd355afeb66afb01d6a7c67734f41e1`); a validação técnica provisória foi documentada no PR #10. Isso não conclui a revisão visual nem o aceite humano de #7.
- A branch foi empilhada sobre o PR #93 (`761b58eee041957dc08a799644a5e31e5b784e09`) para evitar conflito nos testes `test/prologue.test.mjs` e `test/scene.test.mjs`; #93 por sua vez parte do PR #92 (`57bd00211fdb157ce6679380eea0ff5cccaa4fdf`), que parte do PR #3. Ordem de revisão: #13 → #93 → #92 → #3 → #2 → #1. O empilhamento resolve sobreposição de testes, não altera as dependências de produto.

## Trabalho produzido

- `src/scene.js` conserva o repouso e a fala e passa a mover as mãos com a voz. Adiciona gestos temporizados de reação, embaralhamento, distribuição e revelação usando o sprite original e o framebuffer existente.
- `src/prologue.js` liga o clique na velha à reação animada e mantém o balão curto “Diga seu nome.” restrito a esse clique.
- `test/scene.test.mjs` executa o renderizador com canvas e relógio controlados, verifica os deslocamentos das mãos durante a distribuição, reconhece gestos válidos/inválidos e confirma que movimento reduzido não mantém um loop.
- `test/prologue.test.mjs` confirma que o clique conserva o texto breve e aciona reação.
- Nenhuma arte foi refeita. Nenhum recurso pago foi usado.

## Validação local

- Node `24.19.0`, npm `11.17.0`; `npm ci --offline --no-audit --no-fund --cache C:\DevCache\npm` instalou 66 pacotes pelo lockfile. O script opcional do esbuild não foi autorizado pelo npm; build/testes usaram os binários disponíveis.
- Na árvore combinada PR #93 + este incremento: `npm run check` passou; `npm run build` passou antes dos testes HTTP; `npm test` passou 15/15; `git diff --check` passou.
- Build regenerou a saída `public/runtime/` por meio do script previsto; nenhum arquivo gerado foi editado manualmente.

## Limites, decisão pendente e pontos

A issue exige sincronizar entrega de cartas com o fluxo. A jornada atual ainda não tem tiragem/distribuição. O método `scene.performGesture('deal')` prepara a animação, mas ainda não é chamado pelo produto. Não inventei o gatilho e perguntei se ele deve ocorrer ao ampliar uma amostra ou esperar a consulta da issue #15; aguarda resposta de Pedro. A direção de arte também separa examinar amostra de distribuir uma carta.

A validação visual em Edge foi tentada, mas o controle do navegador interrompeu a automação porque não conseguiu determinar a URL ativa. Não houve inspeção visual em computador/celular nem escuta de áudio nesta rodada. Os gestos não foram aprovados visualmente.

**Pontos contados para a meta diária: 0/8.** Houve alteração e testes novos, mas a issue L não cumpre ainda a integração do gesto de distribuição nem a inspeção visual em execução. Manter o bloqueio nativo #7 e o status de revisão sem tratá-los como aceite.

Próxima ação: Pedro definir o evento que chama o gesto de entrega e validar a animação em navegador desktop/celular; então concluir a issue e recalcular pontos pelo tamanho existente, sem fracionamento artificial.
