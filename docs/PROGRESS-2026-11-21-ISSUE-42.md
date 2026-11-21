# Velumbra — rodada de 21/11/2026, issue #42

**Issue:** [#42 — Rider–Waite–Smith, Copas e Paus, lote 1](https://github.com/PHnsilva/velumbra/issues/42), S4, tamanho M (4 unidades). Estado: implementação e validação técnica propostas em PR draft; sem aceite editorial.

## Base e dependências

Branch codex/2026-11-21-42-rws-cups-1, baseada no PR #10: daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb, base main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. PR #10 continua aberto/draft; o build/teste da versão Next.js 16.4.5 nessa base passou. Schema #36/#89 e guia editorial #37/#90 são ancestrais; #37/#90 está integrado e validado. Esta issue consome #37 e não depende dos lotes #38–41; o branch não os inclui. A faixa 23–29 da issue e a sequência RWS correspondem ao Ás–7 de Copas; os Paus permanecem fora deste lote.

## Entrega

Criados sete registros originais para Ás, Dois, Três, Quatro, Cinco, Seis e Sete de Copas, nas posições editoriais 23–29. Cada item recebe ID estável, número/rank, resumo contextual não determinístico, símbolos, referência textual, arte separada e checklist. Sete composições SVG originais repetem a moldura/paleta do projeto e variam a quantidade/arranjo das taças conforme o rank. Os textos de proveniência citam A. E. Waite, The Pictorial Key to the Tarot (1910), naipe Cups, sem copiar frases ou imagens. Arte e conteúdo mantêm a licença/revisão como pending.

Os SVGs estão em docs/card-drafts/rws e não em public/. O catálogo mantém scope batch; este conjunto não é baralho completo, integração ao sorteio ou aceite.

## Validação

C:, Node.js 24.19.0, npm 11.17.0. npm ci instalou 66 pacotes, auditou 67 e encontrou zero vulnerabilidades. npm run build e npm run check passaram; npm test passou com 23/23, incluindo os três testes deste lote, schema e servidor HTTP após build; git diff --check passou. Os sete SVGs foram analisados como XML bem formado com viewBox 240×336. A prévia raster das sete composições foi inspecionada; a contagem visual das taças foi corrigida nas cartas Quatro, Seis e Sete antes da validação final.

A validação cobre estrutura e apresentação raster local, não autoriza direitos, prova acerto histórico, confirma legibilidade em tela real ou substitui revisão humana.

## Próximo passo

Abrir PR draft para Pedro; manter issue aberta até revisão/aceite. Produzido nesta rodada: #41 (M=4, PR #108) e #42 (M=4), total 8/24 unidades. Revisão de documentação da issue #101 já está no PR draft #102, em revisão e sem feedback de Pedro até esta consulta; não contei essa revisão como progresso novo.
PR draft #109: https://github.com/PHnsilva/velumbra/pull/109. Implementação em 4c58b161da54884932ae55a7130981897e7a1930, base de destino PR #10. Actions run 44905614901, Vercel e preview passaram no HEAD inicial. Issue #42 movida para Em andamento no Kanban; segue aberta para Pedro.
