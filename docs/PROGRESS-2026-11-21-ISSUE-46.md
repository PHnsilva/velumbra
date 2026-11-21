# Velumbra — rodada de 21/11/2026, issue #46

**Issue:** [#46 — Rider–Waite–Smith, Espadas e Ouros, lote 1](https://github.com/PHnsilva/velumbra/issues/46), S3, tamanho M (4 unidades). Implementação original e validação técnica propostas em PR draft; conteúdo e licença aguardam revisão.

## Base e dependências

Branch codex/2026-11-21-46-rws-swords-1, baseada em PR #10: daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb, cuja base é main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. PR #10 traz Next.js 16.4.5 validado; schema #36/#89 e guia #37/#90 são ancestrais. Issue #46 depende somente de #37 e é independente dos PRs dos lotes #38–45.

## Entrega

Produzidos sete registros de Espadas para posições 51–57: Ás, Dois, Três, Quatro, Cinco, Seis e Sete. Cada registro declara ID estável, número/rank, símbolos, resumo original sem promessas, fonte textual, trilha de arte separada e checklist de revisão. Sete composições SVG geométricas originais usam lâminas e guardas sem reproduzir as cenas famosas do RWS.

A referência foi A. E. Waite, The Pictorial Key to the Tarot (1910), naipe Swords, Ás–Sete; nenhum trecho ou imagem foi copiado. As artes permanecem em docs/card-drafts/rws, fora do runtime e de public/. Proveniência, licença e revisão editorial ficam pending.

## Validação

No C:, Node 24.19.0/npm 11.17.0: npm ci instalou 66 pacotes e auditou 67, sem vulnerabilidades; build, check e testes passaram (23/23); git diff --check passou. Sete SVGs XML válidos com viewBox 240×336. A prévia raster foi inspecionada e ajustei as composições de Quatro, Cinco, Seis e Sete para deixar mais claras quatro, cinco, seis e sete espadas. Testes cobrem posições/ranks, tradição, proveniência, revisão/licença pendentes e ausência de publicação.

Isso não atesta direitos autorais, correção histórica ou aceitação por Pedro. Nenhuma integração no catálogo sorteável foi feita.

## Próximo passo

PR draft para revisão humana; issue permanece aberta. Total de 21/11/2026: issues #41–46, seis entregas M de 4 unidades cada, 24/24 unidades autorizadas. Documentação #101 continua em revisão no PR #102, sem feedback novo; não computada como entrega hoje.
