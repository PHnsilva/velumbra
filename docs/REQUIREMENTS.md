# Requisitos e escopo vigente — ciclo inicial

Cartomancia interativa com quatro tradições, 270 cartas, personagem/cabana animadas, tiragens e diário local, com IA opcional.

Este documento especifica os resultados e restrições do ciclo inicial. Os registros de progresso e pull requests identificam quais requisitos foram implementados e validados; esta especificação não representa, por si só, evidência de implementação ou aceite.

## Requisitos funcionais

| ID  | Resultado exigido                                                                                                            |
| --- | ---------------------------------------------------------------------------------------------------------------------------- |
| F01 | Preservar prólogo, identificação, preferências, navegação e identidade visual e concluir fundação responsiva.                |
| F02 | Manter cabana/mesa, luz/áudio e personagem original com estados de repouso/fala/reação/gestos.                               |
| F03 | Oferecer entrada de nome/tratamento opcional e biblioteca com ampliação e descrição das cartas.                              |
| F04 | Sortear sem reposição e distribuir/revelar tiragens de uma/três cartas, independentemente da pergunta.                       |
| F05 | Interpretar tradição, pergunta/intenção, posições/orientação e conjunto, com veredito coerente e modalidade identificada.    |
| F06 | Funcionar sem IA com consultas guiadas editoriais, sem simular compreensão livre por palavras-chave.                         |
| F07 | Publicar catálogo original/revisado completo: Rider-Waite-Smith 78, Marselha 78, Thoth 78 e Lenormand 36.                    |
| F08 | Preservar regras próprias por tradição, numeração/símbolos/cortes e Lenormand sem inversões.                                 |
| F09 | Persistir diário e preferências no navegador com versão, recuperação/exclusão e sem conta/banco obrigatório.                 |
| F10 | Atender computador/celular, teclado, legibilidade, redução de movimento e controle de som/texto.                             |
| F11 | Ser host/cliente dos agentes adequados por contrato, com transporte realmente alcançável pela implantação e fallback guiado. |
| F12 | Publicar ciclo integrado na Vercel dentro das condições/cotas autorizadas, somente após autorização/ação de Pedro.           |

## Requisitos não funcionais

| ID  | Critério                                                                                                                                                                                                                                                                                                              |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| N01 | Cada alteração é rastreável por issue, branch e PR. Pedro responde pela revisão/aprovação dos PRs e pelo aceite das issues. Artefatos tecnicamente validados podem ser usados provisoriamente em PRs empilhados quando base, SHA, ordem e validação combinada são registrados. |
| N02 | Contratos versionados, entradas/saídas validadas e erros explícitos; dados externos nunca concedem permissões.                                                                                                                                                                                                        |
| N03 | O funcionamento previsto não depende de serviço pago, faturamento automático nem fallback remoto não declarado.                                                                                                                                                                                        |
| N04 | Testes de sucesso/erro e avaliações reais reproduzíveis; registrar versões e distinguir mock, execução e aceite humano.                                                                                                                                                                                               |
| N05 | Minimização de dados, credenciais fora do Git, acesso mínimo e retenção/exclusão definidas; não publicar dados reais de usuários.                                                                                                                                                                                     |
| N06 | Limites de entrada, memória, concorrência e tempo configuráveis, cancelamento e falha fechada; medir desempenho no hardware disponível.                                                                                                                                                                               |
| N07 | Documentação operacional coerente com código e evidências; disponibilidade ou qualidade não podem ser inferidas de um perfil ou schema.                                                                                                                                                                               |
| N08 | O ciclo inicial contém até cinco sprints de entrega e uma sprint de validação extra e mudanças, cada uma com duração máxima de uma semana. As entregas usam estimativas relativas PP/P/M/L de 1/2/4/8 unidades.                                                                                                                                              |

## Fora do ciclo

- Cruz Celta, Grand Tableau, conta/sincronização e conversa ilimitada.
- Dublagem dinâmica paga e monetização no ciclo inicial.
- Copiar arte sem licença ou apresentar leitura simbólica como previsão factual.
- Deploy sem a autorização necessária para o ambiente de publicação.

## Verificação e aceite

A matriz de rastreabilidade associa cada requisito às issues responsáveis. Cada issue contém critérios e evidências adequados ao comportamento esperado. Testes com dados conhecidos ou sintéticos verificam propriedades determinísticas; comportamento generativo requer casos separados e avaliação pertinente. Cobertura de contrato, qualidade semântica e disponibilidade de ambiente são dimensões diferentes e permanecem identificadas como tal.