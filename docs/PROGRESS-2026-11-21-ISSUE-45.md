# Velumbra — rodada de 21/11/2026, issue #45

**Issue:** [#45 — Rider–Waite–Smith, Copas e Paus, lote 4](https://github.com/PHnsilva/velumbra/issues/45), S4, tamanho M (4 unidades). Rascunhos produzidos e validados tecnicamente; revisão e aceite humanos pendentes.

## Base e dependências

Branch codex/2026-11-21-45-rws-wands-2, baseada no PR #10 em daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb (base main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c). Essa árvore contém o schema #36/#89 e o guia #37/#90 já validados. Issue #45 consome #37 e é independente das issues #38–44; nenhuma carta desses PRs foi reutilizada.

## Entrega

Criados sete registros de Paus, posições 44–50: Oito, Nove, Dez, Pajem, Cavaleiro, Rainha e Rei de Paus. Os quatro nomes de corte seguem Pajem, Cavaleiro, Rainha e Rei, sujeitos à revisão editorial. Cada registro guarda identificador, rank, símbolos, resumo original contextual, origem e proveniência de texto e arte, licença sem definição e checklist pendente.

Sete SVGs originais permanecem em docs/card-drafts/rws, fora do runtime e da pasta public/. Na revisão raster, ajustei Oito, Nove e Dez para que 8, 9 e 10 bastões apareçam de forma distinta e contável; também revisei a moldura e a leitura dos quatro courts. A referência textual foi A. E. Waite, The Pictorial Key to the Tarot (1910), Wands 8–King; não copiei texto ou imagem.

## Validação

C:, Node 24.19.0/npm 11.17.0. npm ci instalou 66 pacotes, auditou 67 e apontou zero vulnerabilidades. npm run build, npm run check e npm test passaram; 23/23 testes, incluindo três novos para posições/ranks, proveniência e ausência de publicação. git diff --check passou e os sete SVGs são XML válidos com viewBox 240×336. Prévia raster inspecionada após as correções de contagem.

Essa evidência não confirma licenças, precisão histórica, legibilidade em dispositivos reais, integração ao sorteio ou aceite editorial. Nenhum código de interface/runtime foi alterado.

## Pendências e próxima ação

Abrir PR draft; Pedro revisa traduções, conteúdo e direitos das artes. A issue continua aberta. Esta rodada soma #41–45 (M cada): 20/24 unidades; ainda há até 4 unidades autorizadas se existir issue executável e validação adequada.
