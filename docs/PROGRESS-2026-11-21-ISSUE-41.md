# Velumbra — rodada de 21/11/2026, issue #41

**Issue:** [#41 — Rider–Waite–Smith, lote 4, posição 22](https://github.com/PHnsilva/velumbra/issues/41), S3, tamanho M (4 unidades). Estado: rascunho estruturalmente validado, enviado para revisão; sem aceite editorial.

## Base e dependências

Branch codex/2026-11-21-41-rws-major-4, sobre PR #10, branch daily/2026-11-02-s01-validation no commit fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb. Base do PR #10: main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. PR #10 permanece aberto/draft; a execução validada de Next.js 16.4.5 está disponível para uso provisório. O guia editorial #37 foi merged no PR #90 (commit b7a355318e07305556e02ef0aedfe9027635e7cc). Schema #36/#89 e guia #37/#90 são ancestrais dessa base. A issue #41 exige o guia #37; o lote final não depende dos lotes RWS #38–40, e não os contém.

## Trabalho entregue

Criado o registro RWS de O Mundo, ID rws:world, posição editorial 22 e número XXI. O texto original enfatiza integrar aprendizados e seguir adiante sem tratar conclusão como encerramento total. Proveniência textual cita A. E. Waite, The Pictorial Key to the Tarot (1910), seção The World, sem reproduzir frases. A arte vetorial é uma composição geométrica original. A origem do texto e da arte estão em trilhas separadas; direitos/licença e checklist de revisão permanecem explicitamente pendentes.

O SVG fica em docs/card-drafts/rws/22-world.svg e o registro em src/card-catalog-drafts/rws-twenty-second-major.ts. A referência de arte no catálogo indica apenas um destino futuro em public/; o asset não foi copiado ao runtime e não está disponível para sorteio. Trata-se de lote parcial de uma carta, não de catálogo completo.

## Validação

C:, Node.js 24.19.0, npm 11.17.0. npm ci instalou 66 pacotes, auditou 67 e reportou zero vulnerabilidades. npm run build e npm run check passaram; npm test passou com 22/22, incluindo dois testes novos de posição, proveniência, licença pendente e ausência de publicação; git diff --check passou. O SVG foi analisado como XML bem formado, viewBox 240×336, e a prévia raster foi inspecionada em tamanho ampliado.

Essas verificações confirmam estrutura e a prévia produzida, não correção histórica, direito de distribuição, experiência no dispositivo ou aceite humano. Nenhuma alteração na interface ou no runtime foi feita.

## Pendências

Proveniência, licença, grafia e conteúdo aguardam revisão de Pedro. A carta não pode ser tratada como editorialmente aceita ou integrada ao sorteio. Próximo passo: PR draft, revisão e decisão de aceite por Pedro.

**Pontos da issue:** 4/4. **Pontos produzidos nesta rodada até aqui:** 4/24.
PR draft #108: https://github.com/PHnsilva/velumbra/pull/108, aberto contra daily/2026-11-02-s01-validation. Commit da implementação: 08a47844ef7a12b2ec24883c14f9e703c7dc7a5b. Actions run 44904847986 (build/regressões) passou; Vercel e Preview Comments passaram no HEAD inicial. Continua aberto/draft para revisão humana.
