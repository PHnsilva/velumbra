# Velumbra — validação de 07/11/2026, issue #6

**Entrega:** validar preservação do prólogo e limpeza restrita de build (S1, M / 4 unidades). Reutiliza o código existente do PR #1; não altera fontes, assets ou comportamento.

## Base e ambiente

- Branch da evidência: `codex/2026-11-07-6-prologue-validation`.
- SHA testado: `023acd1faffdda344fdd6a1203949b0cbbbe80ed`, cabeça do PR #1, baseado em `main` em `06e202951aa857171b4b8e3c201c5d10673f79d1`.
- Node `24.19.0`, npm `11.17.0`; dependências instaladas do lockfile, com cache em `C:\DevCache\npm` e módulos no worktree em C:.
- A fixture de build usa `C:\Users\peecs\AppData\Local\Temp`; `npm run build` produziu `dist/` no worktree isolado.

## Verificações executadas

- `npm run build` — passou: recriou somente `dist/` e exibiu `Prólogo preparado em dist/.`.
- `npm test` — 6/6 passaram. Inclui substituição de artefatos antigos e execução fora da pasta esperada, preservação de nome/tratamento ao explorar e trocar de baralho, retorno da biblioteca sem perder rascunho, erros de nome, descarte de rascunho sem apagar dados confirmados e texto literal exibido com segurança.
- `node --check src/prologue.js` e `node --check scripts/build.mjs` — passaram.
- `git status --short` após build: limpo; `dist/` é saída gerada/ignorada. A fixture mantém sentinelas fora de `dist/` e verifica que fontes/arte permanecem quando a saída é recriada.
- CI do PR #1 no mesmo SHA: checks “Regressões e build”, “Vercel” e “Vercel Preview Comments” passaram. A nova execução local complementa a evidência para a issue #6.

## Estado e limites

A preservação de identificação/preferências e a restrição da limpeza a `dist/` têm evidência automatizada local no SHA indicado. Nenhuma fonte ou asset do worktree principal foi alterada. O PR #1 permanece aberto e sem aceite. Não houve revisão visual em navegador, computador/celular, áudio ou animação nesta execução; os testes usam DOM simulado e não demonstram esses aspectos. O aviso do Node sobre módulos VM experimentais apareceu, sem falha nos testes.

Próximo passo: Pedro revisar o PR #1 e a evidência desta issue; a sequência de integração #1 → #2 → #3 permanece preservada. Issue #6 fica em revisão, não aceita.
