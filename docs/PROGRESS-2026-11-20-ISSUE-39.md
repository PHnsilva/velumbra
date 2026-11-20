# Velumbra — rodada de 20/11/2026, issue #39

**Issue:** [#39 — Rider–Waite–Smith, lote 2, posições 8–14](https://github.com/PHnsilva/velumbra/issues/39), S3, tamanho M (4 unidades). **Estado:** lote estruturalmente validado e proposto para revisão; não aceito editorialmente.

## Base e ordem

Branch codex/2026-11-20-39-rws-major-2, iniciada em fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb (PR #10, daily/2026-11-02-s01-validation, Next.js 16.4.5), cuja base é main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. Schema #36/#89 e guia editorial #37/#90 já são ancestrais tecnicamente validados. PR #39 é independente do lote #38 conforme dependências direcionais; não incorpora conteúdo do #38. Requer #37 e usa o contrato disponível provisoriamente. Nenhuma dependência é declarada aceita.

## Trabalho novo

Criados sete registros originais para as posições editoriais 8–14, números VII–XIII: O Carro, A Força, O Eremita, A Roda da Fortuna, A Justiça, O Enforcado e A Morte. Cada item tem ID estável, resumo não determinístico/fatalista, símbolos, referência textual separada da ilustração e licença/revisão pendentes. Criadas sete composições SVG próprias, mantidas em docs/card-drafts/rws, fora do runtime e de public/. O resumo de A Morte explicita que não anuncia morte literal.

A sequência e vocabulário foram conferidos contra A. E. Waite, The Pictorial Key to the Tarot (1910), sem reproduzir texto ou imagens: [fonte consultada](https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf). O relatório e testes específicos estão neste PR; sem afirmar baralho completo nem integração no sorteio.

## Ambiente e validação

C:, Node 24.19.0/npm 11.17.0, instalação pelo lockfile: npm ci instalou 66 pacotes, auditou 67 e reportou zero vulnerabilidades. Build Next.js 16.4.5 passou; npm run check passou; npm test passou 23/23 incluindo os três testes do lote, testes da aplicação e servidor HTTP após build; git diff --check passou. Os SVGs do lote são XML bem formados, com viewBox 240×336; prévia raster de sete cartas inspecionada localmente. A inspeção confere composição visual de rascunho, não legibilidade final em dispositivo nem revisão humana de tradição/licença.

## Limites e próxima ação

Autoria e licença ainda precisam de revisão e decisão do proprietário; os campos permanecem pendentes, e as cartas não estão liberadas para publicação ou sorteio. Falta comparação acumulada dos lotes por Pedro, integração no catálogo utilizável e aceite da issue. Próxima ação: PR draft para revisão humana, preservando issue aberta.

**Pontos desta issue:** 4/4. **Total de hoje até este lote:** 8/24 (issues #38 e #39, M cada), sem crédito de aceite.
