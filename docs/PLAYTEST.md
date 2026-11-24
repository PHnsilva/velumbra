# Petit Lenormand — edição jogável de teste

Em 24/11/2026 Pedro solicitou implementar e publicar um fluxo jogável com o baralho mais próximo de implementação. Lenormand foi selecionado porque seus seis lotes já cobrem as 36 posições; RWS possui 57 de 78, e Marselha/Thoth permanecem como amostras.

## Jornada disponível

Consultar → pergunta guiada e uma/três cartas → embaralhamento → revelação individual → símbolos em conjunto e O Veredito → salvamento voluntário no diário. Nome e conta são opcionais. A biblioteca contém as 36 cartas, com ampliação e retorno de foco.

As perguntas editoriais abrangem atenção geral, próximos passos no trabalho e relações. A modalidade é identificada como guiada e não usa IA, texto livre por palavras-chave ou serviço remoto. A pergunta não participa do sorteio. Lenormand não tem inversões; pares conhecidos usam o texto editorial existente e os demais recebem um convite explícito à reflexão sobre a relação entre os dois símbolos, sem afirmar previsão factual.

## Publicação e estado editorial

Esta autorização libera a edição de teste dos rascunhos originais do projeto. Não escolhe licença, não concede direitos de terceiros e não fabrica revisão humana. Os campos pending, checklist e atribuição dos lotes permanecem preservados. Não se declara o catálogo editorialmente aceito nem o MVP das quatro tradições concluído.

`drawReading` mantém a exigência de revisão. A API explícita `drawLenormandPreview` aceita apenas Lenormand completo e estruturalmente válido; o produto consome exclusivamente o conjunto das 36 cartas selecionado em `playable-lenormand.ts`. Nenhuma carta sintética de teste entra no produto.

O build compila o módulo de consulta com esbuild e copia somente 36 SVGs Lenormand para `public/art/cards/lenormand-preview/`. Essa pasta e `public/runtime/` são geradas, ignoradas no Git e limpas com escopo restrito. Os demais rascunhos não são publicados. O catálogo original em src e os SVGs em docs permanecem como fontes versionadas.

## Diário e recuperação

Somente a ação Guardar no diário grava uma consulta. Cartas, pergunta, ligações e veredito são conservados como snapshot; reabrir não recalcula a leitura. O campo opcional de interpretação mantém compatibilidade com registros anteriores do schema 1. A chave versionada é `velumbra.reading-journal`, separada das preferências. Falha de cota ou permissão mantém a leitura na tela e permite tentar novamente; nenhum sucesso é anunciado sem confirmação da gravação.

Dados incompatíveis são preservados e podem ser exportados como arquivo .json ou conteúdo copiável. Imagens de registros importados só são carregadas se corresponderem ao catálogo Lenormand conhecido. A restauração exige confirmação de substituição e uma cópia válida de até 1 MB; um diário atual incompatível deve ser copiado e limpo explicitamente antes da restauração. Limpar exige confirmação e remove somente a chave do diário. Não há conta nem sincronização entre dispositivos.

## Rastreabilidade e limites

Implementação principal na issue #15; integração de gestos em #13, recuperação em #33, biblioteca em #14 e reserva guiada em #34. Os aceites editoriais #26/#27 e lotes #74–#79 continuam separados da edição jogável. O escopo das outras tradições permanece no planejamento.

Verificações de DOM, módulos e HTTP não substituem inspeção visual desktop/celular ou escuta humana. Evidências da rodada são registradas em PROGRESS.md e no PR; uma condição não verificada continua explícita.
