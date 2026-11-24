# Guia editorial e visual para cartas

Versão do guia: 1.0. Revisão preparada para a issue #37. Aplica-se às 270 cartas planejadas; este guia não é um catálogo, não cria cartas e não registra aceite de nenhuma delas.

## 1. Identidade visual

Partir da direção já registrada em [`ART_DIRECTION.md`](ART_DIRECTION.md): papel envelhecido, moldura coerente, carvão, madeira escura, osso e bordô, com âmbar reservado à luz de vela. Usar pixels grandes, silhuetas simples, poucas cores e contornos legíveis. Evitar detalhe fino, dourado decorativo, textura excessiva, molduras carregadas e símbolos pequenos demais para ler na mesa ou na ampliação.

Cada ilustração precisa de composição própria para a carta e a tradição. A referência estética pode orientar a atmosfera; não copiar arte, traçado, composição característica, moldura, verso ou lettering de um baralho publicado. Não digitalizar cartas existentes nem produzir uma cópia por rastreamento. Recursos compartilhados (fundo de papel e moldura do Velumbra) não devem apagar os elementos que distinguem uma carta ou tradição.

## 2. Identidade e regras por tradição

Manter o `deckId` próprio em cada registro e aplicar os limites atuais de [`CARD_CATALOG_SCHEMA.md`](CARD_CATALOG_SCHEMA.md) e `src/decks.ts`. Nomes, símbolos, numeração e figuras de corte não são normalizados entre tradições; aplicar a política de orientação declarada para o sistema.

| Tradição | Estrutura que precisa ser conferida | Pontos de revisão |
| --- | --- | --- |
| Rider–Waite–Smith | 22 arcanos maiores, 56 menores; naipes de copas, paus, espadas e ouros; Page, Knight, Queen e King conforme o modelo atual. | Nome, símbolo, número e elemento retratado pertencem à edição selecionada. Não substituir a iconografia por uma carta de Marselha/Thoth por equivalência presumida. |
| Marselha | 22 maiores, 56 menores; copas, bastões, espadas e moedas; Valet, Cavalier, Reine e Roi. | Preservar a numeração e o tratamento visual próprios; conferir separadamente o Louco, que pode aparecer sem número na amostra atual. Não atribuir cena ilustrada de outro sistema. |
| Thoth | 22 maiores, 56 menores; copas, bastões, espadas e discos; Knight, Queen, Prince e Princess. | Preservar nomes e cortes próprios, inclusive Ajustamento, Arte e Aeon conforme a edição. Não os renomear para fazer equivalência automática com RWS ou Marselha. |
| Petit Lenormand | 36 símbolos numerados, organizados para leitura combinada. | Manter número, nome e símbolo correspondentes; não aplicar inversões. A vizinhança e as combinações pertencem à leitura, não à renomeação do registro. |

Os nomes de figuras de corte na tabela refletem o modelo tipado vigente, não uma decisão sobre toda edição histórica possível. Se a edição de conteúdo selecionada exigir variante que não caiba no modelo, registrar a diferença e esclarecer antes de alterar o contrato.

## 3. IDs, nomes e numeração

- Dar a cada carta um ID persistente no formato `<deckId>:<slug>`; o slug não depende de tradução ou texto editorial. Corrigir nome, tradução ou ilustração sem trocar o ID.
- Usar `position` para a posição editorial de 1 a 78 ou 1 a 36. Usar `numberLabel` para o número impresso/tradicional. Não converter automaticamente numeral romano, zero ou ausência de número.
- Conferir grafia, acentos, apóstrofos, idioma e rank da figura contra a referência da tradição e edição utilizada. Registrar a referência no campo de proveniência do conteúdo.
- Uma correspondência entre duas cartas de tradições distintas pode ser uma nota comparativa revisada; não juntar os registros, IDs, significados-base ou imagens.

## 4. Proveniência e direitos

Texto e arte precisam de registros separados no schema. Para cada arte, registrar origem, criador, licença e evidência. Para texto, registrar origem, autoria e referências. `pending` indica que a evidência ainda falta; não mudar para `documented` por inferência, por resultado de modelo ou por aparência de domínio público. Domínio público exige referência verificável. Uma licença documentada deve cobrir o uso planejado; a presença de um nome de licença não prova esse alcance.

Não escolher licença global para o projeto neste guia. Em dúvida sobre titularidade, derivação, restrições da licença ou autorização de publicação, deixar a proveniência pendente e pedir decisão/revisão de Pedro antes de tratar o recurso como pronto. Não incorporar recursos protegidos enquanto isso estiver pendente.

## 5. Checklist por carta

Copiar esta lista para a evidência de cada carta ou lote. Marcar uma caixa somente após inspecionar o registro/arte correspondente; `false`, ausente ou sem evidência continua pendente.

### Identidade e tradição

- [ ] ID persistente e único no catálogo acumulado, com prefixo igual ao `deckId`; comparar com os lotes anteriores.
- [ ] Posição editorial dentro da contagem e número tradicional registrado separadamente.
- [ ] Nome e grafia conferidos na referência da tradição/edição informada.
- [ ] Naipe ou figura de corte, quando aplicável, segue esta tradição.
- [ ] Símbolos e elementos visuais correspondem ao sistema; não foram importados por equivalência presumida.
- [ ] Política de orientação é a do sistema; Lenormand permanece sem inversões.

### Conteúdo e arte

- [ ] Resumo original/revisado contextual e símbolos descritos sem prometer previsão factual.
- [ ] Ilustração original ou licenciada; não copia composição ou arte de deck protegido.
- [ ] Silhueta, símbolo e número são legíveis no tamanho normal e ampliado.
- [ ] Caminho e formato do arquivo conferidos; arquivo abre e corresponde ao registro.
- [ ] Criador, origem, licença e evidência de direitos estão documentados; pendências permanecem `pending`.
- [ ] Autoria, referência e estado de revisão editorial estão preenchidos no registro.

### Revisão do lote

- [ ] IDs e posições não se repetem; contagem e sequência do lote correspondem à issue.
- [ ] Comparação de variantes não fundiu dois sistemas nem apagou divergência documentada.
- [ ] Arte foi inspecionada individualmente, e sua proveniência não foi presumida pelo resultado do build.
- [ ] O relato separa criado, validado, revisado, integrado e aceito.

## 6. Evidência e status

O validador estrutural pode apontar campos ausentes, duplicatas ou posições inválidas. Ele não verifica se o símbolo é historicamente correto, se o significado é bom, se a imagem existe ou está legível, nem se a licença concede direitos. Para esse critério, revisar as fontes e abrir a imagem real.

Usar estes estados com significado explícito:

1. **Rascunho** — conteúdo/arte em elaboração; campos de proveniência podem estar `pending`.
2. **Estruturalmente validado** — schema e limites técnicos passaram, sem conclusão editorial.
3. **Proveniência documentada** — fontes e direitos foram registrados; ainda precisam da revisão definida para o lote.
4. **Revisado editorialmente** — checklist foi executada e o revisor/data foram registrados.
5. **Integrado** — o lote foi ligado à biblioteca e a integração foi verificada; isso não significa que todo o deck existe.
6. **Aceito** — somente Pedro pode aceitar o PR/issue; CI, `editoriallyReady` e preview não substituem essa decisão.

## 7. Verificação por lote

Antes de enviar um lote, validar contra a versão de schema declarada, verificar IDs/posições únicos no lote e contra lotes anteriores e conferir o total esperado; abrir cada imagem e comparar cada registro com sua evidência de origem. Para uma entrega parcial, usar `scope: "batch"`; reservar `complete-deck` para contagem e posições completas. Não anunciar um deck completo por ter atingido a contagem planejada ou por ter agregado apenas amostras.

Anotar tradição, intervalo/posições, referências consultadas, arquivos de arte, ferramenta/versão de validação, resultado, limitações e quem ainda precisa revisar. Conteúdo e conversas privados não entram nos registros nem no histórico público.
