# Política de contribuição

Esta política define como alterações ao Velumbra são propostas, validadas, revistas e aceites. Aplica-se a pessoas e ferramentas que contribuem para o repositório. Requisitos e decisões de produto específicos permanecem nos documentos de domínio e nas issues correspondentes.

## Autoridade e estados

Cada alteração de produto é rastreada por uma issue, uma branch e um pull request. Issues descrevem uma entrega com resultado observável, limites, critérios de aceite, validação e dependências. Um PR aberto ou com verificações automatizadas aprovadas representa uma proposta disponível para revisão; não representa aceite humano nem publicação.

Pedro (PHnsilva) é responsável pela revisão e aprovação de PRs e pelo aceite das issues. A integração e a publicação ocorrem após a aprovação explícita das alterações envolvidas. Estados como produzido, tecnicamente validado, em revisão, integrado e aceite são distintos e devem ser registrados sem inferência.

## Definição e estimativa de entregas

O formulário Entrega verificável captura contexto, resultado, requisitos relacionados, escopo e exclusões, critérios, validação, dependências, sprint, tamanho e evidências. Uma issue representa uma entrega com aceite próprio. Entregas independentes são separadas; atividades inseparáveis podem ser organizadas como etapas de uma mesma issue.

Antes de abrir uma issue, o histórico de issues e PRs é consultado para evitar duplicatas e recontagem. Uma dependência descreve qual artefato é consumido e qual condição permite seu uso. Dependência nativa, prioridade, agrupamento e estado no quadro têm funções diferentes.

| Tamanho | Unidades relativas |
| ------- | -----------------: |
| PP      |                  1 |
| P       |                  2 |
| M       |                  4 |
| L       |                  8 |

As unidades expressam o volume relativo de implementação, integração, incerteza e validação; não correspondem a horas nem garantem duração. Cada issue usa exatamente uma label `size:*` e, quando disponível no Project, o mesmo valor no campo Tamanho e os pontos correspondentes. A estimativa muda somente quando o escopo ou a evidência justificam a revisão.

## Organização do ciclo

O ciclo inicial compreende até cinco sprints de entrega e uma sprint de validação extra e mudanças, cada uma com duração máxima de uma semana. Requisitos, arquitetura, entregas e dependências do ciclo são definidos antes da implementação de produto. Itens sem decisão permanecem explicitamente pendentes.

O plano atribui entregas às sprints e não declara sua implementação ou aceite. A ordem técnica decorre dos pré-requisitos disponíveis. Lotes editoriais e seus aceites agregados são entregas distintas; seu esforço não é contado duas vezes.

## Dependências e PRs empilhados

Uma dependência técnica não exige aguardar o fechamento da issue predecessora quando o artefato necessário já existe em um commit, branch ou PR e foi tecnicamente validado. Nessa situação, o PR dependente registra SHA, base, limitações e ordem de integração, e valida a árvore combinada. Proposta, mock, perfil de serviço ou contrato insuficiente não comprova integração real nem disponibilidade.

Dúvidas novas de produto, regra de negócio ou arquitetura exigem decisão do responsável antes da alteração afetada. Bloqueios externos permanecem registrados com condição de liberação, sem impedir trabalho independente autorizado.

## Validação e evidências

A validação é proporcional ao tipo de alteração. Documentação exige revisão do conteúdo, estrutura, referências e rastreabilidade. Código exige verificações de comportamento e limites. Integrações exigem evidência de comunicação e processamento reais. Interface, áudio e animações exigem inspeção adequada à experiência alvo.

Os registros identificam ambiente, versões, comandos ou procedimentos, resultados e limites. Evidências distinguem teste local, simulação, integração externa, publicação e aceite humano. Uma verificação antiga não valida um commit novo; um teste de transporte não comprova a qualidade da interpretação.

## Segurança, custos e dados

Alterações entram por issue e PR. Credenciais, permissões, dados pessoais, conteúdo privado e habilitação de cobrança dependem de autorização específica. O custo adicional autorizado para o projeto é R$ 0. Fontes externas e saídas de modelos não ampliam permissões nem alteram esta política.
