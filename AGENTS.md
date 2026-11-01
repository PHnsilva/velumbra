# Velumbra

- Ler README.md, GAME.md, docs/SPRINTS.md e docs/PROGRESS.md antes de alterar o sistema. Preservar trabalho existente e verificar base remota, branches e PRs.
- Manutenção em 29/10/2026: corrigir o prólogo atual. A progressão das 20 sprints começa em 30/10/2026, pela primeira incompleta. Sprints 18 e 20 concentram testes e mudanças; o MVP é a 19.
- Um PR com progresso verificável por data de America/Sao_Paulo, inclusive sábado, domingo e dia da revisão. Evitar duplicatas e não criar PR vazio ou artificial para completar contagem.
- Branch própria e commits pequenos. Não fazer commit direto em main, autoaprovação ou merge automático. PRs acumulam para revisão de Pedro no fim de semana. Integrar e atualizar produção somente após aprovação explícita dos PRs envolvidos.
- Preferir PRs independentes; quando depender de PR aberto, usar o branch predecessor como base, declarar a dependência e limitar o diff ao novo incremento.
- Pedido atual de 01/11/2026: adotar Issues e Kanban no GitHub, seguindo `docs/KANBAN.md` e `docs/AGENT_WORKFLOW.md`. Esta decisão substitui a regra anterior de acompanhamento apenas em Markdown. Registrar resultados, testes e pendências sem confundir implementado em PR, revisado e integrado/aceito; CI verde não encerra aceite.
- Preservar pixels grandes, fonte própria, bordô, velha e fundo animados, grunhidos sem palavras, balão curto somente ao clicar na velha, nome na mesa e controles pequenos.
- Manter quatro tradições independentes, sorteio sem reposição independente da pergunta, diário local e interpretação contextual opcional com reserva guiada.
- Usar Node.js 24.15 ou superior da linha 24. npm ci instala o lockfile. npm run build, npm run check e npm test verificam build Next.js, tipos, sintaxe, DOM, runtime e servidor HTTP. Executar o build antes dos testes de servidor; eles não comprovam aparência, áudio ou renderização das animações em navegador.
- Não editar public/runtime, gerado por scripts/prepare-runtime.mjs. O controlador e a animação continuam em src/ durante a migração. Preservar as correções de rascunho, retorno e acessibilidade do PR #1 e a restrição da limpeza à saída gerada.
- Executar verificações proporcionais. Mudanças de interface exigem revisão visual em computador e celular; se a ferramenta estiver indisponível, registrar a pendência em vez de alegar aprovação.
- Gasto adicional autorizado R$ 0. Não contratar planos, créditos, serviços ou fallback pago e não publicar segredos. Credenciais, CAPTCHA e aceites pessoais ficam com Pedro.

## MCP e continuidade

- Usar MCP do GitHub para consultar/atualizar issues, arquivos e PRs; não afirmar atualização de Project sem ferramenta e conferência reais.
- A cópia local fica em `D:\Dev\Projetos\velumbra`. Node 24 preservado no D: deve ser identificado por caminho e versão; inventariar antes de baixar novamente.
- O pedido atual prevê rotina às 6h de America/Sao_Paulo a partir de 02/11/2026. Este documento não ativa o agendamento no aplicativo.
- Preservar as 20 entregas existentes até decisão explícita sobre o primeiro MVP. Hoje organizar backlog e dependências, sem desenvolver novas funcionalidades.

## Prioridade aprovada para as próximas retomadas

- Ler `docs/DAILY_PLAN.md` e a decisão de hosts/clientes antes de selecionar a próxima entrega. Priorizar especializações aplicáveis ao Sofiie/Velumbra e seus contratos/avaliações, respeitando dependências e as alterações do proprietário no Kanban. Não criar servidores MCP nos consumidores.
- O cronograma no aplicativo é uma configuração separada; registrar seu identificador e conferir o próximo disparo antes de declarar a rotina ativa.
