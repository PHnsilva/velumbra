# Requisitos e escopo vigente — ciclo inicial

Cartomancia interativa com quatro tradições, 270 cartas, personagem/cabana animadas, tiragens e diário local, com IA opcional.

Definido a partir das decisões de Pedro até 06/11/2026. Documento de planejamento; não comprova implementação, treinamento, revisão ou aceite. As alterações são propostas no PR de organização, sem merge por agente.

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
| N01 | Contribuição rastreável por issue/branch/PR; somente Pedro revisa/aprova PRs e aceita issues, sem merge/auto-merge/deploy de agentes. Durante a semana, dependência tecnicamente disponível em branch/PR validado pode ser consumida provisoriamente em PR empilhado; revisão/aceite/merge ficam com Pedro no sábado. |
| N02 | Contratos versionados, entradas/saídas validadas e erros explícitos; dados externos nunca concedem permissões.                                                                                                                                                                                                        |
| N03 | Sem serviço pago obrigatório, faturamento ou fallback remoto automático; executar ferramentas/caches no C: e respeitar pausas.                                                                                                                                                                                        |
| N04 | Testes de sucesso/erro e avaliações reais reproduzíveis; registrar versões e distinguir mock, execução e aceite humano.                                                                                                                                                                                               |
| N05 | Minimização de dados, credenciais fora do Git, acesso mínimo e retenção/exclusão definidas; não publicar dados reais de usuários.                                                                                                                                                                                     |
| N06 | Limites de entrada, memória, concorrência e tempo configuráveis, cancelamento e falha fechada; medir desempenho no hardware disponível.                                                                                                                                                                               |
| N07 | Documentação operacional coerente com código e evidências; disponibilidade ou qualidade não podem ser inferidas de um perfil ou schema.                                                                                                                                                                               |
| N08 | Até 5 + 1 sprints de até uma semana, PP/P/M/L=1/2/4/8; meta mínima 1 L por dia ativo e autorização para acelerar até 3 L equivalentes (24 unidades) por dia no Velumbra.                                                                                                                                              |

## Fora do ciclo

- Cruz Celta, Grand Tableau, conta/sincronização e conversa ilimitada.
- Dublagem dinâmica paga e monetização no ciclo inicial.
- Copiar arte sem licença ou apresentar leitura simbólica como previsão factual.
- Publicação automática por agente.

## Verificação e aceite

Cada requisito é rastreado em TRACEABILITY.md, com critérios concretos no corpo das issues. Dados conhecidos/sintéticos e ferramentas determinísticas verificam resultados quando possível; comportamento generativo exige casos separados e revisão apropriada. Não usar um teste de roteamento, presença de perfil ou metadado para alegar competência ou treino. Não declarar cobertura completa quando há pendência de ambiente/fonte.

A meta de 8 unidades/dia é um mínimo desejado por projeto ativo, não um teto de esforço nem uma medição de inteligência. A duração semanal é o objetivo do plano; a capacidade real e os bloqueios precisam ser observados e reportados. Não fabricar tarefa/estimativa/aceite para cumprir calendário.
