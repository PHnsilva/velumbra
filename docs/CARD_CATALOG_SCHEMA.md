# Schema do catálogo editorial de cartas

Estado: contrato `1.0.0` implementado em `src/card-catalog.ts`; nenhuma carta completa foi publicada por esta entrega. A aceitação da issue e do ciclo continua com Pedro.

## Fronteira

O contrato guarda registros editoriais, proveniência e revisão. Ele fica fora do runtime público: `scripts/prepare-runtime.mjs` só compila `src/decks.ts`. A estrutura dos quatro sistemas e as prévias da interface continuam em `src/decks.ts`; elas não são convertidas em cartas do catálogo.

Um lote usa `schemaVersion`, `deckId`, `batchId`, `scope` (`batch` ou `complete-deck`) e `records`. Cada registro tem ID persistente, posição editorial, número tradicional, nome, resumo/símbolos, origem do texto, caminho de arte, proveniência separada de texto e imagem e uma checklist de revisão com revisor/data.

## Identidade e regras das tradições

- O ID segue `<deckId>:<slug>`, em minúsculas, e não deriva do nome traduzido. Renomear conteúdo não muda a identidade.
- `position` é a ordem editorial de 1 a 78 ou 1 a 36. `numberLabel` guarda o número próprio da carta (`0`, romano, arábico ou `SEM NÚMERO`) sem confundir as duas coisas.
- O lote e cada registro precisam usar a mesma tradição. A estrutura esperada vem das definições de `src/decks.ts`: Rider–Waite–Smith, Marselha e Thoth têm 78 cartas e podem ser orientados; Petit Lenormand tem 36 símbolos, leitura por combinações e orientação somente em pé.
- IDs e posições são únicos dentro do lote. `complete-deck` precisa ter a contagem e cobrir todas as posições; `batch` permite entregas editoriais parciais sem alegar que o baralho está completo.

## Origem, licença e revisão

Texto e arte possuem trilhas independentes. A origem do texto pode ser original, adaptada ou licenciada; a arte pode ser original, licenciada ou de domínio público. Proveniência `pending` permite registrar rascunhos, com campos ausentes explicitamente nulos. `documented` exige autor/criador, licença e pelo menos uma referência ou evidência. O schema não escolhe licença do projeto, não concede direitos sobre material de terceiros e não transforma uma indicação de origem em autorização.

A checklist cobre identidade, numeração, tradição, conteúdo, arte e proveniência. O estado `reviewed` exige todas as verificações, nome do revisor e data ISO. Isso é rastreabilidade editorial, não aceite de issue/PR, revisão de Pedro ou publicação. Dados marcados como pendentes nunca resultam em `editoriallyReady: true`.

## Validador e limites

`validateCardCatalogBatch(unknown)` retorna erros com caminho e código estáveis; rejeita versão desconhecida, campos inválidos, IDs/tradições incompatíveis, números/posições fora do baralho, duplicatas, proveniência documentada incompleta e catálogo completo com lacunas. Para lote parcial válido, `editoriallyReady` só fica verdadeiro quando cada registro tem proveniência documentada e revisão completa. Essa flag vale para o lote descrito; não prova que as 270 cartas foram produzidas, integradas ou aceitas.

O validador confere o formato do caminho de imagem, mas não lê o arquivo nem verifica sua aparência ou se a licença declarada concede direitos. Essas evidências exigem inspeção dos artefatos e revisão humana.

O contrato não fornece conteúdo, ilustrações, licença global, aprovação, sorteio, interpretação, equivalência automática entre tradições ou acesso a ferramentas. Os registros existentes seguem sendo apenas três amostras por sistema.

## Verificação

Os testes em `test/card-catalog.test.mjs` cobrem lote rascunho, versão/posição/tradição/proveniência inválidas, duplicatas, contagem incompleta, revisão e a tentativa de tratar as prévias atuais como registros. Foram executados no worktree isolado com Node 24.19.0; confira o resultado atualizado no PR vinculado à issue #36.
