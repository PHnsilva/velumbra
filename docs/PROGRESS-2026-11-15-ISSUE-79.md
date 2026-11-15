# Velumbra — rodada de 15/11/2026, issue #79

**Issue:** [#79, produzir lote 3 de Petit Lenormand (cartas 19–36)](https://github.com/PHnsilva/velumbra/issues/79), S2, tamanho M (4 unidades). **Estado:** rascunho em PR empilhado; issue aberta e não aceita.

## Base e dependências

- Branch `codex/2026-11-15-79-lenormand-lot33-36`, baseada provisoriamente no PR #99 @ `071866a`; #99 parte do PR #98 @ `782e0cf`, sobre `main` @ `2ae7f27`.
- Commit de implementação `bdb43fe9c0d6e561d72a804c9eaf59a7c4af02f7`; PR [#100](https://github.com/PHnsilva/velumbra/pull/100) aberto em rascunho para revisão, sem merge ou aceite.
- Empilhamento apenas para testar sequência 19–36 e manter o registro diário. Os lotes não são pré-requisitos funcionais entre si. #36 e #37 integradas em `main` por #89 e #90.

## Trabalho produzido

- Quatro resumos originais, quatro SVGs e quatro exemplos de combinações de rascunho para Chave, Peixes, Âncora e Cruz, posições 33–36.
- Registros tipados mantêm IDs e posições estáveis, trilhas separadas de texto/arte, licença pendente e checklist de revisão sem aceite.
- Teste agregado confere os 18 registros das posições 19–36, IDs únicos, Lenormand sem inversões, proveniência pendente e ausência da arte em `public/`.
- Todo o material fica em documentação/código-fonte tipado, fora do runtime público.

## Validação

- Node `24.19.0`, npm `11.17.0`; instalação `npm ci --offline` usando `C:\DevCache\npm`.
- `npm run check` e `npm run build` passaram; `npm test` passou **23/23**; parsing XML dos quatro SVGs e `git diff --check` passaram.
- A primeira execução dos testes apontou quatro SVGs ausentes; os arquivos foram adicionados e a suíte completa foi repetida com sucesso. O relatório não oculta essa correção.
- Não foi feita inspeção de navegador nem revisão editorial humana.

## Limites, pontos e próxima ação

A issue depende da decisão de licença/atribuição e revisão editorial/visual de Pedro. **0/4 pontos** até completar os critérios. A sequência 19–36 está rascunhada, mas não é catálogo pronto nem substitui os lotes 1–18 ou o aceite final das 36 cartas.

Próxima ação: concluir licença e revisão dos lotes em conjunto, corrigir eventuais observações, e só então considerar integração/publicação com aceite humano. Issue #79 permanece aberta.
