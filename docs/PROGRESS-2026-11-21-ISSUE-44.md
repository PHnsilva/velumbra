# Velumbra — rodada de 21/11/2026, issue #44

**Issue:** [#44 — Rider–Waite–Smith, Copas e Paus, lote 3](https://github.com/PHnsilva/velumbra/issues/44), S4, tamanho M (4 unidades). Produzido e validado tecnicamente; revisão/aceite editorial pendentes.

## Base e dependências

Branch codex/2026-11-21-44-rws-wands-1, baseada no PR #10: daily/2026-11-02-s01-validation @ fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb, cuja base é main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. PR #10 disponibiliza a versão Next.js 16.4.5 validada. Schema #36/#89 e guia #37/#90 estão nos ancestrais; issue #44 depende de #37. É um branch independente das issues #38–43; nada foi empilhado sobre os PRs de outros lotes.

## Entrega

Criados sete registros de Paus nas posições 37–43: Ás, Dois, Três, Quatro, Cinco, Seis e Sete. Cada um inclui ID estável, rank/número, resumo original contextual, símbolos, proveniência do texto separada da arte e checklist editorial. Sete composições vetoriais próprias em docs/card-drafts/rws usam a paleta e moldura previstas, com número de bastões conferido visualmente. Não reproduzem a iconografia ou composição característica das cartas de Smith.

Fonte consultada: A. E. Waite, The Pictorial Key to the Tarot (1910), naipe Wands, Ás–Sete, usada para conferir vocabulário e sequência sem copiar frases/imagens. Direitos e proveniência permanecem pending; arquivos não estão em public/ nem no runtime.

## Verificação e limites

C:, Node.js 24.19.0, npm 11.17.0; npm ci instalou 66 pacotes e auditou 67, sem vulnerabilidades. Build Next.js 16.4.5, check, suíte 23/23 e git diff --check passaram após a inspeção raster e correção da contagem visual do Seis. Os sete SVGs passaram análise XML e viewBox 240×336. Os testes confirmam posições, ranks, tradição, licença/revisão pendentes e que as artes não são publicadas.

Isso não prova correção editorial/histórica, licença de distribuição ou aceite de Pedro. A interface e integração no sorteio permanecem intocadas.

## Próximo passo

PR draft para revisão humana; manter issue aberta. Pontos: 4/4. Total produzido hoje nas issues #41–44: 16/24 unidades. Permanecem lotes RWS, documentação #101 (PR #102 ainda draft/em revisão) e outras entregas do ciclo.
PR draft #111: https://github.com/PHnsilva/velumbra/pull/111, base PR #10; implementação em 5ebd5f7db5d2817eef9890d041440c2958a2fe78. Kanban atualizado para Em andamento com base e dependência documentadas. Checks remotos pendentes na abertura do PR.
