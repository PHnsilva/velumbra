# Velumbra — rodada de 21/11/2026, issue #43

**Issue:** [#43 — Rider–Waite–Smith, Copas e Paus, lote 2](https://github.com/PHnsilva/velumbra/issues/43), S4, tamanho M (4 unidades). Implementação e validação local concluídas; revisão/aceite editorial pendentes.

## Base e dependências

Branch codex/2026-11-21-43-rws-cups-2 sobre o PR #10: daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb (base main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c). PR #10 mantém Next.js 16.4.5 e validação existente; schema #36/#89 e guia #37/#90 são ancestrais. Issue #43 depende de #37, não de #42 ou dos lotes #38–41. Este PR usa a base provisória validada diretamente e não incorpora conteúdo de outras issues.

## Entrega

Produzidos sete rascunhos RWS para posições 30–36: Oito, Nove e Dez de Copas, Pajem, Cavaleiro, Rainha e Rei de Copas. A escolha de Pajem traduz “Page” no rascunho e permanece sujeita à conferência editorial. Conteúdo enfatiza movimento, satisfação, pertencimento e aspectos das figuras de corte sem prever resultados ou tratar equilíbrio como supressão emocional.

Cada registro inclui ID, rank, símbolos, resumo original, origem e proveniência textual, arte separada e checklist. Sete composições próprias mostram quantidades de taças correspondentes às cartas numéricas; as figuras de corte têm composições abstratas com sinais de rank, sem reproduzir cenas conhecidas. SVGs estão em docs/card-drafts/rws, fora de public/ e do runtime.

A sequência e o vocabulário foram consultados em A. E. Waite, The Pictorial Key to the Tarot (1910), naipe Cups, sem copiar frases ou imagens. Direitos das artes e revisão do conteúdo continuam pending; o conjunto não está disponível para sorteio.

## Validação

C:, Node.js 24.19.0/npm 11.17.0. npm ci instalou 66 pacotes, auditou 67, zero vulnerabilidades. Build Next.js 16.4.5, check e npm test passaram; testes 23/23, incluindo três casos novos para posições/ranks, proveniência e não publicação. git diff --check passou; sete arquivos foram analisados como XML válido com viewBox 240×336. Prévia raster dos sete SVGs inspecionada após correção do teste de proveniência; sem inspeção de produto em navegador.

Validação estrutural e visual local não comprova licenciamento, precisão histórica, legibilidade em dispositivo nem aceite humano.

## Próximo passo

PR draft para Pedro revisar grafia/tradução das figuras de corte, resumos, símbolos, arte e licenças. A issue continua aberta.

**Pontos desta issue:** 4/4. **Total implementado nesta rodada até aqui:** #41, #42 e #43; 12/24 unidades.
PR draft #110: https://github.com/PHnsilva/velumbra/pull/110; branch codex/2026-11-21-43-rws-cups-2, implementação commit 717efe5b8e5eae2f64d87fefa0e331d7533a20b0. Alvo PR #10. Issue movida para Em andamento no Kanban; CI da revisão remota aguarda.
