# Velumbra — rodada de 20/11/2026, issue #38

**Issue:** [#38 — Rider–Waite–Smith, lote 1 (posições 1–7)](https://github.com/PHnsilva/velumbra/issues/38), S3, tamanho M (4 unidades). **Estado:** implementação e validação técnica propostas para revisão; conteúdo, arte, licença e aceite editorial seguem pendentes de Pedro.

## Base e ordem

Branch codex/2026-11-20-38-rws-major-1, criada sobre o PR #10: daily/2026-11-02-s01-validation em fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb. Base do PR #10: main@2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c. A árvore contém os ancestrais do schema (PR #89/#36, 42f7020c48a58cec730d2e1e16e53af93099c9b3) e do guia editorial (PR #90/#37, b7a355318e07305556e02ef0aedfe9027635e7cc; Actions run 42392652669, checks e preview aprovados). O branch de validação #10 está tecnicamente testado com Next.js 16.4.5; uso provisório não é merge ou aceite. O PR limita seu diff ao lote #38 e ao registro da rodada.

## Trabalho novo

- Criados sete registros RWS de rascunho, posições editoriais 1–7 (Louco 0 a Enamorados VI), com resumos e símbolos originais, IDs estáveis e proveniência textual separada da arte.
- Criadas sete artes vetoriais originais em docs/card-drafts/rws/. Permanecem fora do runtime e de public/; os caminhos públicos no catálogo são destinos futuros, não assets publicados.
- Todos os registros mantêm revisão e licença pending; checklist não marcada. Não é baralho completo nem conteúdo liberado para sorteio.
- Pesquisa primária: A. E. Waite, The Pictorial Key to the Tarot (1910), usado para sequência e vocabulário, sem copiar frases ou figuras. Ver [fonte consultada](https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf).
- Acrescentados testes para estrutura/posições do lote, proveniência e revisão pendentes e ausência das artes em public/.

## Ambiente e validação

C:, Node 24.19.0/npm 11.17.0, dependências do lockfile. npm ci instalou 66 pacotes e auditou 67 sem vulnerabilidades. npm run build passou no Next.js 16.4.5; npm run check passou; npm test passou com 23/23 testes, inclusive servidor HTTP após build; git diff --check passou. Os sete SVGs foram analisados como XML bem formado e conferidos em prévia raster local; a composição da Sacerdotisa foi ajustada para afastar título e figura, e as artes foram inspecionadas individualmente e em contato. Esta não é revisão/aceite de Pedro.

A tentativa inicial na base antiga com Next.js 16.4.3 foi bloqueada pela proteção do build para versão vulnerável. Rebase na branch #10 autorizada e validada (16.4.5) resolveu o bloqueio. A instalação offline falhou porque a configuração C:\DevCache\npm não continha o pacote; npm ci pelo registry, sem custo adicional e usando essa cache no C:, concluiu normalmente. A validação final acima foi repetida na base corrigida.

## Limites e próxima ação

Permanecem pendentes revisão humana de nomes, resumos, símbolos, arte e licenças; integração/publicação; revisão do PR e aceite da issue. Não foi feita inspeção em navegador do produto, pois o incremento não altera a interface. Próxima ação: abrir PR draft empilhado sobre #10 e aguardar revisão de Pedro; os próximos lotes #39/#40 são issues independentes, mas cada um requer sua própria implementação e validação.

**Pontos desta issue:** 4/4. **Total da rodada até este registro:** 4/24; abaixo da meta de 8, portanto seguirei para a próxima issue desbloqueada, se a validação mantiver qualidade.
