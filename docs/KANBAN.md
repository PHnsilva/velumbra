# Kanban do Velumbra

[Abrir o quadro oficial](https://github.com/users/PHnsilva/projects/7/views/1) · [Issues](https://github.com/PHnsilva/velumbra/issues)

## Estado conferido em 01/11/2026

O Project #7 foi vinculado a `PHnsilva/velumbra` e recebeu 4 issues abertas reais, sem duplicar PRs como entregas. Foram salvos campos Status, Prioridade, Área e Bloqueio e visões de Kanban, backlog/dependências e revisão/validação. Issues e Project são a fonte operacional; esta documentação não replica seu estado em tempo real.

A GitHub CLI foi autenticada pelo proprietário no D: e permite operar o quadro em segundo plano. O MCP do GitHub atende às operações disponíveis de repositório/issues/PRs. Não depende de manter o Edge em primeiro plano.

## Objetivo e decisões de produto

Preservar o escopo vigente de cartomancia interativa com quatro tradições, personagem/cena animadas, diário local e interpretação opcional. O proprietário pediu discutir este escopo por último; as 20 entregas do planejamento continuam registradas sem novas datas ou redução silenciosa.

Escopos e sprints serão discutidos com Pedro um projeto por vez, com Velumbra por último. Nenhum compromisso semanal, prazo final, esforço ou atribuição humana foi inventado. Prioridades iniciais organizam o trabalho já conhecido e serão revisadas nessa conversa.

## Fluxo

| Fase | Critério |
| --- | --- |
| Backlog | Necessidade registrada; podem faltar refinamento ou decisões. |
| Pronto | Escopo, aceite e validação claros; pré-requisitos disponíveis. |
| Em andamento | Entrega selecionada; limite inicial de uma implementação por projeto. |
| Em revisão | PR/artefato concreto e evidências disponíveis para Pedro revisar. |
| Em validação | Revisão realizada; falta aceite no ambiente ou experiência alvo. |
| Concluído | Critérios, integração e aceite humano comprovados. |

Bloqueios preservam a fase e registram motivo, quem resolve, próxima ação e evidência de desbloqueio. O número da issue não define ordem técnica. Agrupamento/subissue não substitui dependência.

Automações de fechar issue, mover por vínculo de PR e mover por merge foram retiradas para preservar o fluxo de revisão/aceite. Fechamento manual de issue aceita pode atualizar o quadro; não usar movimento de cartão como prova de conclusão. Não há autoaprovação ou auto-merge.

## Contratos e dependências iniciais

| Issue | Pré-requisitos/decisões |
| --- | --- |
| [#4](https://github.com/PHnsilva/velumbra/issues/4) | Sem bloqueio técnico registrado; consultar o contrato atual da issue. |
| [#5](https://github.com/PHnsilva/velumbra/issues/5) | Decidir necessidade e arquitetura MCP antes de implementar. |
| [#6](https://github.com/PHnsilva/velumbra/issues/6) | Sem bloqueio técnico registrado; consultar o contrato atual da issue. |
| [#7](https://github.com/PHnsilva/velumbra/issues/7) | Bloqueada por #6. Integrar apenas após aceite do predecessor: PR #1 → #2 → #3. |

Dependências técnicas foram registradas nativamente no GitHub quando há consumo real de um pré-requisito. O campo Bloqueio destaca também decisões/impedimentos externos. As issues seguem contexto/evidência, resultado esperado, escopo, critérios de aceite, validação e dependências; o template ajuda na captura e não substitui refinamento.

Tipo usa a família `type:*` como alternativa explícita enquanto o tipo nativo não estiver configurado. Área, prioridade, tipo, marco e esforço têm propósitos distintos. Marcos existentes não são automaticamente sprints.

## MCP e retomada

MCP não exige outro repositório ou um servidor em cada aplicação. Um sistema consumidor pode usar apenas um cliente; expor ferramentas exige um servidor/adaptador somente quando houver capacidade e consumidor definidos. O Sofiie Agents já tem servidor stdio. A interface MCP fica na arquitetura do Sofiie Agents; sistemas consumidores usam cliente quando necessário. Não será criado servidor próprio no Sofiie/Velumbra nesta organização; os rascunhos separados de contexto do Sofiie/Velumbra foram retirados antes de publicação.

Consultar [AGENTS.md](../AGENTS.md) e [operação por MCP/CLI](AGENT_WORKFLOW.md). A cópia local fica em `D:\Dev\Projetos\velumbra`; inventariar SDKs antes de baixar novamente e manter custo adicional zero.

Pedido de rotina: diariamente às 6h de America/Sao_Paulo, a partir de 02/11/2026, com avanço verificável, registro e PR para revisão no fim de semana. O cadastro dos novos chats e das automações é etapa posterior; este documento não o ativa.

## Bases de revisão preservadas

A sequência existente é [PR #1](https://github.com/PHnsilva/velumbra/pull/1) → [PR #2](https://github.com/PHnsilva/velumbra/pull/2) → [PR #3](https://github.com/PHnsilva/velumbra/pull/3). A issue #6 acompanha manutenção; #7 acompanha o aceite da fundação. Manter bases e diffs restritos e conferir HEAD/checks ao atualizar cada base. Nenhuma sprint é concluída só por PR aberto.

O pedido atual de 01/11 substitui a regra antiga de acompanhamento somente em Markdown. Issues foram ativadas no repositório para atender essa organização. O plano de 20 entregas continua em [SPRINTS.md](SPRINTS.md).
