# Plano diário — Velumbra

## Objetivo do próximo ciclo

Preservar a sequência da fundação e preparar a fronteira de interpretação como host com cliente MCP. Manter as 20 entregas existentes; discutir o escopo completo por último, conforme pedido de Pedro.

## Fila inicial, revista com o estado vivo

1. [#6 Prólogo](https://github.com/PHnsilva/velumbra/issues/6) e [#7 Fundação](https://github.com/PHnsilva/velumbra/issues/7): continuar pelas lacunas reais de aceite, preservando PR #1 → #2 → #3. Não reimplementar o que já está correto nem integrar sem revisão.
2. [#5 Decisão MCP](https://github.com/PHnsilva/velumbra/issues/5): host/cliente aprovado. A especialização e o contrato estão em [Agents #16](https://github.com/PHnsilva/sofiie-agents/issues/16).
3. [#9 Cliente MCP](https://github.com/PHnsilva/velumbra/issues/9): adaptador de servidor com validação e fallback definido, depois de contrato/fundação disponíveis. Não expor SDK/credenciais no navegador nem implementar servidor MCP no jogo.

## Saída do ciclo de preparação

Estado da entrega 1 e lacunas de revisão reproduzíveis; contrato proposto de interpretação e riscos de topologia/indisponibilidade explícitos. Integração funcional é parte da evolução da interpretação, não conclusão automática da entrega 6.

Sorteio sem reposição continua independente da pergunta e fora do modelo. Preservar quatro tradições, diário local, conteúdo editorial, identidade visual e alternativa guiada. O cliente não deve mudar o baralho ou o sorteio para acomodar uma resposta do especialista. Novas datas/recortes de produto dependem da conversa de escopo.

## Rotina acordada

Executar diariamente às 6h de America/Sao_Paulo, a partir de 02/11/2026, no mesmo chat do projeto. Hoje, 01/11, organizar e documentar; não antecipar implementação de produto. O registro deste arquivo não cria a automação: conferir o agendamento efetivo no aplicativo.

Cada retomada lê AGENTS, README, issue e PRs atuais, considera as mudanças de Pedro no Kanban e seleciona uma entrega pequena e desbloqueada. Preservar branches/autoria e trabalho em andamento. Preferir MCP do GitHub para operações suportadas e CLI para Projects, sem depender do Edge. Uma implementação por projeto de cada vez.

Progresso significa resultado novo e verificável: código/contrato/evidência que satisfaz um critério ou resolve uma decisão necessária. Registrar data/fuso, issue, branch/PR e SHA, o que mudou, como foi validado, limites, bloqueios e próximo passo. Não criar PR vazio nem repetir diagnóstico como avanço. Abrir PR quando houver alteração concreta; ao continuar uma entrega, preservar seu PR e documentar o incremento diário.

Revisão/aceite por Pedro no fim de semana, inclusive quando o dia da rotina cair no fim de semana. Não fazer autoaprovação, auto-merge ou deploy. Em PR empilhado declarar a base e a ordem; não trabalhar sobre dependência aberta como se estivesse aceita.

Trabalhar no D:, inventariar antes de baixar ferramentas/modelos, respeitar versões e registrar limitações do disco lento. Gasto adicional R$ 0. Não publicar chaves, conversas reais ou casos de reserva. Com bloqueio, registrar motivo, quem resolve, próxima ação e evidência de desbloqueio; avançar uma parte independente autorizada.

## Uso de especializações e MCP

Sofiie e Velumbra serão hosts com clientes MCP dentro de suas arquiteturas. Sofiie Agents mantém o servidor como adaptador de seu núcleo e o cliente de saída já existente; a conexão de saída só é usada com necessidade e peer definidos. Não criar novos servidores/repositórios para os consumidores, nem conectar o Agents a um servidor de produto inexistente.

O servidor atual do Agents usa stdio e o modo padrão handoff não executa inferência. Backend remoto do Sofiie/Vercel não alcança um processo no PC por stdio. A topologia e o transporte devem ser definidos/validados antes da integração final, sem contratar hospedagem. Um cliente de teste, SDK instalado ou PR aberto não comprova interpretação especializada em produção.

Priorizar especialistas e avaliações que ajudem nos dois produtos. Primeiro, contrato de entrada/saída, contexto, limites e rubrica; depois baseline real e melhoria comparada. Reutilizar perfis adequados e propor especialização nova apenas por lacuna demonstrada. Não chamar mudança de prompt, roteamento ou mock de treinamento de pesos ou ganho medido.
