# Organização do trabalho

O [Project #7](https://github.com/users/PHnsilva/projects/7/views/1) organiza as issues do repositório. O [repositório de issues](https://github.com/PHnsilva/velumbra/issues) mantém os critérios, dependências, discussões e vínculos com pull requests. O Project apresenta o estado atual; esta página descreve o significado de seus campos e estados, sem replicar uma fotografia do quadro.

## Estados

| Estado | Significado |
| ------ | ----------- |
| Backlog | Necessidade registrada; refinamento, dependência ou decisão ainda pode faltar. |
| Pronto | Resultado, critérios, validação e pré-requisitos estão definidos. |
| Em andamento | A implementação da entrega está ativa. |
| Em revisão | Um artefato e suas evidências estão disponíveis para revisão humana. |
| Em validação | A revisão foi realizada; ainda falta validar critérios no ambiente ou experiência alvo. |
| Concluído | Critérios e aceite humano foram registrados. |

O estado Em revisão não equivale a aceite. A abertura, atualização ou integração de um PR não fecha uma issue automaticamente. O aceite e o fechamento permanecem ligados à confirmação dos critérios pela pessoa responsável.

## Campos

| Campo | Uso |
| ----- | --- |
| Sprint | Agrupamento planejado da entrega no ciclo. |
| Tamanho | Estimativa PP, P, M ou L; deve corresponder à label `size:*` da issue. |
| Pontos | Valor relativo correspondente ao tamanho: 1, 2, 4 ou 8. |
| Prioridade | Ordem relativa de atenção; não define esforço nem substitui dependências. |
| Área | Domínio principal da entrega. |
| Bloqueio | Condição que impede o próximo passo e a evidência necessária para removê-la. |
| Base técnica | Commit ou PR que fornece o artefato técnico usado provisoriamente, com limitações. |

Uma dependência aponta do consumidor para o pré-requisito. O corpo da issue descreve o artefato necessário e sua condição de liberação; a relação nativa do GitHub fornece rastreabilidade adicional. Agrupamentos, prioridades e posicionamento não substituem dependências.

## Estrutura do ciclo

O ciclo inicial e a correspondência entre suas entregas estão definidos em [DELIVERY_PLAN.md](DELIVERY_PLAN.md) e [SPRINTS.md](SPRINTS.md). O plano mantém cinco sprints de entrega e uma sprint de validação extra e mudanças, sem declarar concluído qualquer item apenas por estar planejado.

As bases de revisão existentes incluem a sequência PR #1 → #2 → #3. Cada PR dependente identifica a base, os predecessores, a ordem de integração e os testes da árvore combinada. Os detalhes de papéis host/cliente e transporte estão em [ARCHITECTURE_PLAN.md](ARCHITECTURE_PLAN.md).
