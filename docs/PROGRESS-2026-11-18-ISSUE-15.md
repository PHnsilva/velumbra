# 18/11/2026 — S2, tiragem e diário local (issue #15)

Issue #15, tamanho L (8 unidades). Esta rodada implementa e valida uma parte do domínio da tiragem e do diário local; não declara a issue concluída. O incremento de domínio foi estimado em M (4 unidades), pois a jornada visual completa e os baralhos editoriais ainda não estão disponíveis.

## Base e dependência

Branch `codex/2026-11-18-15-draw-diary`, commit de implementação `c22387bf68a3ad460bb72c944f0cc0f7bf05cd7a`, no [PR #103](https://github.com/PHnsilva/velumbra/pull/103) draft, empilhado provisoriamente sobre o HEAD `fbbb939e8c508819c9cdc631d7b41a3f34f5b9fb` do PR #10, cuja base é `main` em `2ae7f27c7621c3bc725a67b448b71cf3f9bc7d1c`. A issue #7 segue em revisão e sem aceite de Pedro. O HEAD predecessor do PR #10 passou build, tipos, 20 testes, `npm audit` sem vulnerabilidades e CI `44149697212`; este uso técnico não representa integração nem aceite.

## Alterações

- `src/reading.ts`: sorteio criptográfico sem reposição para uma ou três cartas, posições neutras, orientação aleatória apenas para as três tradições de Tarô e erro explícito para catálogo incompleto, estruturalmente inválido ou ainda não revisado/documentado.
- `src/journal.ts`: persistência local versionada com leitura, inclusão, remoção, exclusão, exportação/restauração; dados malformados ou de versão não suportada permanecem disponíveis em estado `invalid` e não são sobrescritos.
- `test/reading-journal.test.mjs`: fixtures sintéticos apenas de teste para casos válidos e negativos, sem criar conteúdo de produção ou apresentar amostras como baralho completo.

## Validação executada

No worktree isolado em `C:\DevData\Codex\worktrees\velumbra-2026-11-18-issue-15`, Node.js 24.19.0 / npm 11.17.0, dependências instaladas pelo lockfile:

- `npm ci`: 66 pacotes adicionados, 67 auditados; 0 vulnerabilidades.
- `npm run build`: passou em Next.js 16.4.5.
- `npm run check`: passou (TypeScript e sintaxe dos controladores).
- `npm test`: passou, 27/27 testes, incluindo os sete novos testes de domínio/armazenamento e o teste HTTP após build.

Os testes confirmam sorteio 1/3 sem repetição, ausência de entrada de pergunta na API de sorteio, orientação Lenormand apenas em pé, reversão possível no Tarô, rejeição de amostras/lotes incompletos, revisão editorial pendente e restauração/exclusão locais. As fixtures completas são explicitamente sintéticas, usadas somente para provar o algoritmo e o bloqueio editorial.

## Limites e pendências

O aplicativo ainda não integra estes módulos à tela de revelação ou ao `localStorage` do navegador. Não há catálogos editoriais completos/revisados das 270 cartas; por isso a API bloqueia corretamente o sorteio com as três amostras atuais. Posições são neutras (1–3), sem introduzir regra temporal não aprovada. Não houve revisão visual em computador/celular nem teste de persistência em navegador real. A issue #7 permanece sem aceite humano.

**Pontos desta rodada:** 4/8 em #15; saldo do escopo da issue: 4 unidades. Nenhum aceite registrado.

**Próximo passo:** aguardar CI e revisão do PR #103; continuar a integração visual/persistência e os catálogos editoriais somente com conteúdo autorizado e revisado.
