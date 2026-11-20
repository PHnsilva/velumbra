# Velumbra — rodada de 20/11/2026, issue #40

**Issue:** [#40 — Rider–Waite–Smith, lote 3, posições 15–21](https://github.com/PHnsilva/velumbra/issues/40), S3, tamanho M (4 unidades). Estado: rascunho técnico validado, submetido em PR draft; revisão editorial/licença/aceite seguem pendentes.

## Base e dependências

Branch codex/2026-11-20-40-rws-major-3 iniciada em PR #10, daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb, base main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. O contrato schema #36/#89 e o guia #37/#90 são ancestrais validados. A issue #40 depende do guia #37, disponível por uso técnico provisório, e é independente das issues #38–39. Não inclui conteúdo das outras branches.

## Entrega

Criados registros para posições 15–21, números XIV–XX: Temperança, Diabo, Torre, Estrela, Lua, Sol e Julgamento. Os textos originais evitam predizer desfechos; explicam que A Morte (lote #38) não é literal, e este lote também trata símbolos potencialmente sensíveis sem determinismo. Cada entrada tem símbolos, ID estável, referência de texto, arte separada, licença sem definição e revisão pending.

Sete ilustrações SVG originais estão em docs/card-drafts/rws/, fora do runtime e de public/. As composições foram comparadas em uma prévia raster do lote, além de verificar XML e viewBox 240×336. Essa inspeção não é revisão histórica, de legibilidade em dispositivo ou aceite editorial.

Fonte textual primária usada para sequência e vocabulário: A. E. Waite, The Pictorial Key to the Tarot (1910); não foram copiados trechos ou imagens. [Fonte consultada](https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf).

## Validação e limites

Node 24.19.0, npm 11.17.0, C:. npm ci instalou 66 pacotes, auditou 67 e encontrou zero vulnerabilidades. Build Next.js 16.4.5, npm run check e npm test passaram; suíte completa 23/23, incluindo os três novos casos do lote e o teste HTTP após build. git diff --check passou. Os testes provam validade do formato/posições, estado pendente e não publicação; não provam acerto histórico, licença ou qualidade editorial.

Próximo passo: PR draft e revisão de Pedro. O lote não está pronto para sorteio, publicação ou aceite.

**Pontos da issue:** 4/4. **Total de implementação nesta rodada:** 12/24 (issues #38, #39 e #40, M cada).
PR draft #107: https://github.com/PHnsilva/velumbra/pull/107; branch codex/2026-11-20-40-rws-major-3, commit do lote 94ded848eaef65d32916de467485d37eb12e307c. PR contra daily/2026-11-02-s01-validation; CI remoto pendente na criação. Issue aberta e registrada em Em andamento no Kanban.
