# Velumbra — rodada de 09/11/2026, issue #11

**Issue:** [#11, validar cabana, iluminação e áudio ambiente](https://github.com/PHnsilva/velumbra/issues/11), S1, tamanho L (8 unidades). **Estado:** evidência e testes novos propostos para revisão; a issue continua aberta, sem aceite humano.

## Base e ordem

- Branch: `codex/2026-11-09-11-cabin-audio-validation`.
- Base: branch `codex/2026-11-08-14-library-enlargement` do PR #92, SHA `57bd00211fdb157ce6679380eea0ff5cccaa4fdf`. O PR #92 parte do PR #3, SHA `14fc529e8dd355afeb66afb01d6a7c67734f41e1`; a sequência técnica permanece #11 → #92 → #3 → #2 → #1.
- A issue #11 depende de #7. PR #3 já está tecnicamente validado e usa a cadeia #1 → #2 → #3; consumo provisório foi usado conforme a liberação semanal, sem declarar aceite. Esta entrega não altera a sequência predecessora.
- Os testes visuais e de som previamente registrados no PR #2 foram executados em Edge nos tamanhos 1000×597 e 390×844. Comparei o caminho da evidência visual `64910f435d564c1290bb1b479c3ad892f6c12133` ao HEAD #3: `src/scene.js`, `src/cabin.css`, `public/audio/` e `public/art/` não mudaram. Portanto as imagens e verificações antigas continuam aplicáveis à cena/áudio que esta rodada valida; não alego uma nova inspeção visual nesta data.

## Trabalho novo

- O teste do controlador usa um AudioContext de teste para verificar ligar/desligar, estado e rótulo acessíveis, ajuste de volume e propagação do ajuste de movimento reduzido.
- Outro teste verifica a resposta acessível quando o navegador não oferece AudioContext; não anuncia som ativo nem grava essa preferência como habilitada.
- O teste de `src/scene.js` executa o renderizador real com canvas/RAF de teste: movimento reduzido desenha sem manter o loop de quadros; modo completo agenda animação e voltar a reduzido interrompe os próximos quadros.
- O teste do servidor Next.js verifica que os quatro WAV usados pelo controlador retornam 200, `audio/wav` e cabeçalhos RIFF/WAVE válidos.
- Nenhum código de produto, asset, iluminação ou áudio foi refeito; a entrega acrescenta validação automatizada e evidência para os recursos já existentes.

## Ambiente e validação local

- C:, Node `24.19.0`, npm `11.17.0`; `npm ci --offline --no-audit --no-fund --cache C:\DevCache\npm` instalou 66 pacotes pelo lockfile. O script opcional do esbuild permaneceu bloqueado por configuração do npm; build/testes passaram com os binários disponíveis.
- Na árvore combinada com PR #92: `npm run check` — passou; `npm run build` — passou antes dos testes HTTP; `npm test` — 13/13 passaram, incluindo os casos de #14 e os novos casos de movimento, controle/fallback de som e os quatro arquivos WAV; `git diff --check` — passou.
- Commit inicial da entrega: `19262062d4e95019314e6f1254d3118bcc2386f5`; relatório e diário foram ajustados na sequência sem alterar o escopo dos testes.
- PR #93: https://github.com/PHnsilva/velumbra/pull/93, aberto e empilhado sobre #92. CI do HEAD publicado `d7d7853793fe42386b4eaad88f143bd70803dabe` passou: Actions run `42589276480`, Vercel e preview. Essa validação não equivale a revisão/aceite.

## Limites e próxima ação

Os casos automatizados de som usam um AudioContext simulado e não avaliam qualidade auditiva; a qualidade do áudio não foi re-ouvida hoje. A inspeção manual em Edge e as imagens existentes são evidência histórica de 30/10 sobre os mesmos assets e código de cena, não uma nova inspeção desta rodada. PR #3 e #7 continuam sem aceite de Pedro; manter o bloqueio nativo #7. Próxima ação: Pedro revisar a evidência/testes e concluir a revisão visual/sonora humana que desejar antes de aceitar a issue.

PR #93 e seus predecessores seguem sem aceite de Pedro; o bloqueio nativo #7 foi preservado. Próxima ação: Pedro revisar a evidência/testes e concluir a revisão visual/sonora humana que desejar antes de aceitar a issue.
