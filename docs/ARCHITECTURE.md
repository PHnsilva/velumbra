# Arquitetura planejada

Este documento descreve a arquitetura do produto e a separação entre seus módulos. A aplicação usa Next.js App Router com TypeScript e preserva o runtime do [prólogo](PROLOGUE.md). As capacidades previstas para catálogo, tiragens, interpretação e persistência estão delimitadas neste documento e em [ARCHITECTURE_PLAN.md](ARCHITECTURE_PLAN.md); seu estado de implementação está no [registro de progresso](PROGRESS.md).

## Aplicação

- Next.js e TypeScript, em um repositório.
- Interface, conteúdo editorial e recursos de arte distribuídos pela Vercel.
- Função de servidor como host do cliente MCP de interpretação; credenciais e transporte ficam exclusivamente no servidor.
- Diário local no navegador, com exportação a considerar posteriormente.
- Sem necessidade inicial de banco, autenticação, servidor dedicado ou serviços de cobrança.

## Fundação e preparação de recursos

`app/layout.tsx` concentra idioma, metadados, recursos e CSS global. `app/cabin.tsx` fornece a estrutura da cabana; o mesmo componente é renderizado nos testes de DOM. `app/page.tsx` compõe essa estrutura com o carregamento do controlador por Next Script depois da hidratação.

`src/prologue.js` e `src/scene.js` funcionam como módulos de compatibilidade durante a migração. O catálogo compartilhado parte de `src/decks.ts`, com tipos distintos para Rider–Waite–Smith, Marselha, Thoth e Petit Lenormand. `scripts/prepare-runtime.mjs` resolve a raiz pela própria localização e recria exclusivamente `public/runtime/`, verificando o destino antes de remover arquivos gerados. Ele copia os módulos JavaScript e compila o catálogo tipado para `public/runtime/decks.js`; scripts, fontes TypeScript e arquivos privados não são publicados. O preparador é executado antes do desenvolvimento e do build. Essa migração incremental mantém a navegação e a animação separadas da mudança de hospedagem.

Dependências e Node.js da linha 24 são fixados para execução reproduzível. O CI constrói a aplicação, confere tipos e sintaxe e executa regressões. O teste de servidor inicia o build real, verifica a rota e o conteúdo exato dos módulos servidos e confere que scripts e arquivos do repositório não são publicados como recursos públicos.

As alterações que dependem da manutenção do prólogo mantêm a ordem de integração registrada nos pull requests e em [PROGRESS.md](PROGRESS.md).

## Separação de responsabilidades

| Módulo | Responsabilidade |
| --- | --- |
| Catálogo | Identidades das cartas, tradição, símbolos, nomes, descrições, arte e fontes. |
| Tiragens | Posições, sorteio sem reposição e orientação por tradição. |
| Consulta | Pergunta, tema, intenção, cartas sorteadas e estado da sessão. |
| Interpretação | Montagem do contexto, provedor opcional, validação e reserva guiada. |
| Personagem | Diálogos, expressões, gestos e sincronização da apresentação. |
| Diário | Persistência e leitura do histórico no navegador. |

## Decisão de arquitetura: host e cliente MCP

Velumbra atua como host e cliente das capacidades especializadas disponíveis na linha Sofiee. A escolha do fornecedor e da ferramenta depende de contrato publicado, adequação à tarefa e disponibilidade real; o antigo repositório Sofiie Agents e seu contrato #16 não são dependências obrigatórias do produto. O produto não expõe servidor MCP próprio.

A porta de interpretação e seu adaptador MCP pertencem ao servidor da aplicação. O navegador não recebe credenciais nem acessa ferramentas diretamente. O domínio local mantém o sorteio sem reposição, as quatro tradições, o diário e a reserva guiada. O provedor recebe as cartas já sorteadas e não pode alterá-las. O contrato do consumidor deve preservar tradição, pergunta/intenção, posições, orientações e conjunto, validar a resposta e definir limites de tempo, cancelamento e falhas antes da integração.

### Limite de transporte e condição de integração

O transporte stdio local exige que o host inicie e alcance o processo no mesmo ambiente; uma função hospedada na Vercel não ganha acesso ao processo que roda no computador de Pedro. Logo, stdio local pode validar o protocolo durante desenvolvimento, mas não comprova conectividade de produção. Um endpoint remoto alcançável, sua autenticação, disponibilidade e elegibilidade de custo ainda precisam ser definidos e validados antes de uma integração Vercel. Não contratar hospedagem, crédito ou fallback pago para remover esse bloqueio.

Até que a topologia e a ferramenta especializada sejam comprovadas, a interpretação permanece opcional e a reserva guiada continua disponível. A integração só será considerada validada após chamada real à ferramenta pelo cliente, validação do contrato e confirmação de que o host do ambiente escolhido alcança o servidor. Mock, SDK instalado, CI verde ou resposta simulada não demonstram interpretação especializada nem aceitação de qualidade. Perguntas pessoais não entram em logs por padrão; conteúdo retornado é validado e exibido como texto seguro.

## IA com custo inicial zero

O provedor e o modelo de interpretação dependem da disponibilidade técnica e das condições de custo verificadas para a conta e implantação escolhidas. As opções pesquisadas estão registradas em [RESEARCH.md](RESEARCH.md); nenhuma delas implica elegibilidade ou capacidade garantida.
