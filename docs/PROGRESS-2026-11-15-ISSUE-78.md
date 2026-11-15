# Velumbra — rodada de 15/11/2026, issue #78

**Issue:** [#78, produzir lote 2 de Petit Lenormand (cartas 19–36)](https://github.com/PHnsilva/velumbra/issues/78), S2, tamanho M (4 unidades). **Estado:** rascunho parcial em PR empilhado; issue aberta e não aceita.

## Base e dependências

- Branch `codex/2026-11-15-78-lenormand-lot26-32`, baseada provisoriamente no PR #98, HEAD `0065578`; #98 é baseado em `main` @ `2ae7f27`. A pilha registra cronologia em `docs/PROGRESS.md` e testa lotes 19–32 combinados; não há dependência funcional de #77.
- PR [#99](https://github.com/PHnsilva/velumbra/pull/99) em rascunho; commit do lote #78 `f940722`, merge da atualização de #77 `02fbb21` e update de relatório `c8f317a`.
- PR #98 inclui as cartas 19–25; o schema #36 e guia #37 estão integrados em `main` por #89 e #90.

## Trabalho produzido

- Sete resumos editoriais originais, sete SVGs e sete exemplos de combinações nas posições 26–32: Livro, Carta, Homem, Mulher, Lírios, Sol e Lua.
- IDs, símbolos e trilhas separadas de proveniência de texto/arte; licença de distribuição e revisão estão explicitamente pendentes.
- Arte guardada apenas em `docs/card-drafts/`; nenhuma carta foi publicada ou ligada ao runtime.
- Teste estrutural confere os sete registros e exemplos combinatórios, a sequência/IDs das posições 19–32, orientação Lenormand sem inversões, validação não pronta e exclusão dos assets do caminho público.

## Validação

- Node `24.19.0`, npm `11.17.0`; `npm ci --offline` passou, usando o cache em `C:\DevCache\npm`.
- `npm run check` passou; `npm run build` passou; `npm test` passou **22/22**; parsing XML dos sete SVGs e `git diff --check` passaram.
- Build não publica os arquivos de rascunho. Nenhuma inspeção em navegador ou revisão humana foi feita.

## Limites, pontos e próxima ação

A licença/atribuição depende da decisão de Pedro, e os textos e imagens aguardam revisão humana individual. A issue requer revisão, origem/licença e inspeção antes de concluir; por isso **0/4 pontos** até satisfazer todos os critérios. O lote não representa o Petit Lenormand completo.

Próxima ação: aguardar/obter decisão de licença e revisão, então completar proveniência, revisar visualmente na interface e integrar somente após o aceite devido. A issue #78 continua aberta.
