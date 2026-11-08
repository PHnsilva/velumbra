# Velumbra — incremento de 08/11/2026, issue #14

**Issue:** [#14, identificação, tratamento e biblioteca](https://github.com/PHnsilva/velumbra/issues/14), S1, tamanho L (8 unidades no plano). **Estado:** implementação proposta para revisão; issue permanece aberta e sem aceite.

## Base e dependências

- Branch: `codex/2026-11-08-14-library-enlargement`.
- Base: PR #3, branch `daily/2026-10-31-s01-deck-types`, SHA `14fc529e8dd355afeb66afb01d6a7c67734f41e1`.
- PR #3 depende de PR #2; PR #2 depende de PR #1. Esta alteração usa provisoriamente o código disponível e validado da cadeia #1 → #2 → #3. Não altera as branches predecessoras.
- Node `24.19.0`, npm `11.17.0`; dependências do lockfile instaladas em C: usando o cache `C:\DevCache\npm` em modo offline.

## Incremento produzido

- Cada amostra continua mostrando número, símbolo e descrição na biblioteca.
- O botão nativo “Ampliar” abre a amostra em uma apresentação maior, mantendo a descrição e a identidade de cores da cabana.
- “Voltar às amostras” restaura a lista da tradição escolhida e o foco ao botão que abriu a amostra, inclusive quando a biblioteca veio da identificação.
- A ação é um botão de teclado com nome acessível. O layout do detalhe reduz a escala em telas estreitas; nenhuma carta ou arte nova foi criada, e as amostras seguem identificadas como amostras.

## Validação

- `npm ci --offline --no-audit --no-fund --cache C:\DevCache\npm` — concluído, 66 pacotes do lockfile. O npm informou que o script opcional do esbuild não foi autorizado; build e testes funcionaram com os binários já empacotados.
- `npm run check` — aprovado.
- `npm run build` — aprovado antes dos testes de servidor.
- `npm test` — 12/12 aprovados; os novos casos conferem tradição, número e descrição, botão acessível, restauração do foco e preservação do rascunho após confirmar a escolha.
- Inspeção visual real em computador/celular não concluída: não foi possível controlar o navegador pelo ambiente de computador desta execução, que encerrou a operação por não conseguir determinar a URL ativa. O DOM simulado e as regras CSS não são apresentados como aprovação visual.

## Limites e próxima ação

O incremento fecha a lacuna técnica de ampliação das amostras sobre a identificação e os dados tipados já disponíveis em PRs anteriores. Não inclui cartas completas, arte, sorteio ou consulta. A cadeia #1 → #2 → #3 e a revisão visual de desktop/celular permanecem pendentes; somente Pedro revisa/aprova o PR e aceita a issue. Próxima ação: revisar a interface no navegador real, integrar pela ordem de dependência após aprovação e reavaliar os bloqueios de S1.
