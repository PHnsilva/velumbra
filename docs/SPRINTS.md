# Plano de execução — 20 sprints

## Regras do ciclo

- Sprints são entregas de execução, sem duração fixa em semanas.
- Estado inicial: todas as sprints pendentes; a criação deste repositório é preparação.
- Cada sprint termina com verificação proporcional, registro do resultado e pendências explícitas.
- Sprints **18 e 20** concentram testes amplos e mudanças.
- O **MVP é a sprint 19**, a penúltima.
- A integração da IA será validada cedo, com cartas de exemplo, antes da produção de todo o catálogo.
- Ciclo autorizado em 29/10/2026: PR diário com revisão conjunta no fim de semana. A manutenção de 29/10 não inicia a sprint 1; a progressão começa em 30/10. Ver [PROGRESS.md](PROGRESS.md). PR aberto ou CI verde não representa aceite ou integração.

## Preparação anterior à sprint 1

Prólogo estático funcional: abertura com ícone e nome, transição para menu, cenário interativo, prévias de baralhos e preferências locais. Essa entrega foi solicitada como preparação separada e não altera a numeração ou conclui nenhuma sprint. Consulte [PROLOGUE.md](PROLOGUE.md).

## Entregas das sprints

| Sprint | Entrega | Critério de conclusão |
| --- | --- | --- |
| 01 | Fundação: aplicação, estrutura dos quatro baralhos, navegação e configuração Vercel. | Aplicação navega sem erros e aceita conteúdo dos quatro sistemas. |
| 02 | Cabana, mesa, iluminação pixelizada, velas e áudio ambiente. | Cena funcional em computador e celular, com controle de áudio. |
| 03 | Velha original: repouso, fala, reação e gestos de entrega. | Estados animados e transições funcionando. |
| 04 | Entrada: nome, forma de tratamento, escolha de baralho e biblioteca. | Fluxo completo com amostras, ampliação e descrição de cartas. |
| 05 | Mesa de consulta: sorteio, escolha, distribuição, revelação, uma/três cartas e histórico local. | Sem repetição na tiragem; posições e resultados persistidos corretamente. |
| 06 | IA opcional, contextualização, falas por carta, veredito e reserva guiada. | Perguntas distintas recebem leituras pertinentes; erros e cotas tratados sem cobrança automática. |
| 07 | Rider–Waite–Smith: 22 maiores. | Arte e conteúdo completos, revisados e integrados. |
| 08 | Rider–Waite–Smith: 28 cartas de Copas e Paus. | Dois naipes completos e revisados. |
| 09 | Rider–Waite–Smith: 28 cartas de Espadas e Ouros. | Baralho completo com 78 cartas. |
| 10 | Marselha: 22 maiores. | Nomes, ordem, símbolos, arte e conteúdo revisados. |
| 11 | Marselha: 28 cartas de Copas e Paus. | Dois naipes completos com desenho numerado apropriado. |
| 12 | Marselha: 28 cartas de Espadas e Ouros. | Baralho completo com 78 cartas. |
| 13 | Thoth: 22 maiores. | Particularidades da tradição preservadas e conteúdo revisado. |
| 14 | Thoth: 28 cartas de Copas e Paus. | Dois naipes completos, com figuras de corte correspondentes. |
| 15 | Thoth: 28 cartas de Espadas e Discos. | Baralho completo com 78 cartas. |
| 16 | Lenormand: cartas 1–18. | Arte, descrição e associações revisadas e disponíveis. |
| 17 | Lenormand: cartas 19–36 e combinações das tiragens oferecidas. | 36 cartas completas; leitura conjunta sem inversões funcionando. |
| 18 | Testes e mudanças 1. | Fluxos completos, conteúdo, contexto, animação, acessibilidade e desempenho revisados; bloqueadores corrigidos. |
| 19 | MVP integrado e publicado na Vercel. | Jornada completa com quatro baralhos, biblioteca, personagem animada, explicações e veredito disponível para experimentar. |
| 20 | Testes e mudanças 2 da versão publicada. | Retorno do usuário analisado, correções verificadas e versão final deste ciclo entregue. |

## Checklist por sprint

1. Revisar dependências e estado anterior.
2. Implementar a entrega prevista.
3. Verificar o critério de conclusão.
4. Registrar arquivos alterados, verificações e limitações reais.
5. Atualizar este plano com o estado correto e publicar o trabalho no GitHub.

## Estado em 31/10/2026

| Sprint | Implementação | Revisão e aceite |
| --- | --- | --- |
| 01 | Em execução: fundação Next.js/TypeScript, preview e modelo tipado que separa Rider–Waite–Smith, Marselha, Thoth e Lenormand. As três cartas da interface estão identificadas como amostras; catálogos completos e motor ainda pendentes. Revisão dos limites entre módulos continua. | PRs #2 e #3 propostos em sequência, dependentes da manutenção #1; sem integração ou aceite. |
| 02–20 | Pendentes. | Não iniciadas como sprints. |

Os recursos já existentes do prólogo não encerram os critérios das sprints futuras. As verificações e pendências de cada incremento ficam em [PROGRESS.md](PROGRESS.md).

## Cobertura das sprints de testes

- Quatro baralhos: contagem, identidade, nomes, símbolos e ordem.
- Uma e três cartas; seleção sem reposição; orientação quando aplicável.
- Amor, dinheiro, trabalho e decisões: pertinência à pergunta e coerência entre explicação e veredito.
- IA disponível, indisponível, resposta inválida, timeout e cota esgotada.
- Cadastro opcional de gênero e tratamento respeitado nas falas.
- Biblioteca completa antes de iniciar; ampliação e descrições.
- Histórico local e dados ausentes ou inválidos.
- Computador, celular, teclado, texto legível e redução de movimento.
- Sincronização das mãos, cartas, diálogos, áudio e transições.
- Publicação sem chaves ou dados privados e sem dependência paga automática.
