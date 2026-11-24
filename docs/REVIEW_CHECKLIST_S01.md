# Roteiro de revisão manual — sprint 1

Este roteiro ajuda Pedro a conferir a experiência em navegador real para as issues [#6](https://github.com/PHnsilva/velumbra/issues/6) e [#7](https://github.com/PHnsilva/velumbra/issues/7). Ele não é resultado de teste nem substitui o aceite do proprietário. Use o preview dos PRs encadeados #1 → #2 → #3, ou o preview do PR #10 quando disponível, sem alterar a proteção do preview.

Use somente dados sintéticos, por exemplo o nome “Teste Velumbra”. Não registre perguntas pessoais. Ao terminar, limpe o perfil de teste em Ajustes → Identificação → Limpar.

## Registro da execução

Preencha antes de marcar os resultados:

- Data e fuso:
- Pessoa revisora:
- Preview e commit:
- Sistema, navegador e versão:
- Zoom:
- Desktop — viewport 1000 × 597:
- Celular — viewport 390 × 844:

Marque cada verificação como **Passou**, **Falhou** ou **Não executada**. Anote o passo, resultado observado e evidência local sem dados pessoais. Uma etapa não executada continua pendente.

## Entrada, identidade e acessibilidade

Execute em desktop e celular:

- [ ] A abertura e a entrada em silêncio chegam à cabana sem iniciar som.
- [ ] O título recebe o foco após a transição; a ordem de Tab e o foco visível permitem usar os controles.
- [ ] Clicar na mesa leva o foco ao campo de nome. Submeter vazio ou um caractere apresenta erro acessível; corrigir o campo limpa o erro.
- [ ] Um nome sintético entre 2 e 32 caracteres é salvo. Texto como `Teste <img>` aparece como texto, sem criar elementos ou executar conteúdo.
- [ ] Clicar na velha mostra somente o balão curto previsto; o balão não aparece sem clique e desaparece sozinho.
- [ ] A janela de diálogo recebe foco, mantém a navegação por teclado e fecha por Escape ou pelo botão de voltar ao ponto de origem.

## Rascunho, tradição e amostras

- [ ] Depois de confirmar o nome, altere o nome e o tratamento no formulário. Abra os baralhos, percorra as quatro tradições e volte; o rascunho e o baralho escolhido permanecem.
- [ ] Fechar o painel sem salvar descarta somente o rascunho; as preferências já confirmadas permanecem.
- [ ] Salvar confirma nome, tratamento e tradição. Recarregar a página mantém os valores no navegador.
- [ ] Em cada tradição, os quatro controles de tab funcionam por mouse e pelas setas; Home e End chegam à primeira e à última.
- [ ] Cada sistema é identificado pelo próprio nome, mostra exatamente três cartas como **amostra** e informa que o catálogo completo ainda está em preparação.
- [ ] A interface não apresenta tiragem, consulta ou leitura como se já estivessem disponíveis.

## Som, movimento e diário

- [ ] A entrada silenciosa permanece muda. Os ajustes permitem ativar/silenciar o ambiente e alterar o volume.
- [ ] Com o som ativado, os sons da personagem não contêm palavras. Registre falha audível ou reprodução inesperada, sem avaliar por teste automatizado.
- [ ] Reduzir movimento pausa os elementos indicados na interface; a preferência persiste após recarga.
- [ ] O diário informa que ainda não há leituras e que nome/baralho são preferências locais, sem sugerir sincronização ou envio remoto.

## Apresentação em computador e celular

Em cada viewport, confira a cabana, a personagem, o balão, a mesa de nome, o painel e os ajustes:

- [ ] A arte mantém os pixels nítidos, a fonte local e a paleta bordô; nenhum recurso fica quebrado ou borrado.
- [ ] O nome continua associado à mesa e os controles cabem na tela sem sobreposição ou rolagem horizontal.
- [ ] O painel e as amostras permanecem legíveis, com rolagem interna quando necessária.
- [ ] As animações continuam visíveis no modo normal e respeitam a redução de movimento.
- [ ] O console não mostra erros do jogo durante o fluxo.

## Fechamento

- [ ] Limpei o perfil sintético de teste e confirmei que não ficou salvo.
- [ ] Registrei falhas separadas por dispositivo, passo e resultado observado.
- [ ] Registrei itens não executados como pendências, sem marcá-los como aprovados.

A revisão é evidência para as issues #6/#7; só Pedro pode aceitar a experiência e a sprint. O roteiro não autoriza integrar PRs, publicar produção ou iniciar a sprint 2 antes de resolver as pendências reais.