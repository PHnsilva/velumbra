# Arquitetura planejada

Este documento descreve decisões para a aplicação completa e o início da fundação da sprint 1. A rota e o layout passam a usar Next.js App Router com TypeScript, preservando o runtime aprovado do [prólogo](PROLOGUE.md). O motor de tiragens, backend de interpretação e IA ainda não existem.

## Aplicação

- Next.js e TypeScript, em um repositório.
- Interface, conteúdo editorial e recursos de arte distribuídos pela Vercel.
- Função de servidor como host do cliente MCP de interpretação; credenciais e transporte ficam exclusivamente no servidor.
- Diário local no navegador, com exportação a considerar posteriormente.
- Sem necessidade inicial de banco, autenticação, servidor dedicado ou serviços de cobrança.

## Fundação em revisão

`app/layout.tsx` concentra idioma, metadados, recursos e CSS global. `app/cabin.tsx` fornece a estrutura da cabana; o mesmo componente é renderizado nos testes de DOM. `app/page.tsx` compõe essa estrutura com o carregamento do controlador por Next Script depois da hidratação.

`src/prologue.js` e `src/scene.js` continuam como módulos de compatibilidade durante a migração. O catálogo compartilhado parte agora de `src/decks.ts`, com tipos distintos para Rider–Waite–Smith, Marselha, Thoth e Petit Lenormand. `scripts/prepare-runtime.mjs` resolve a raiz pela própria localização e recria exclusivamente `public/runtime/`, verificando o destino antes de remover os arquivos gerados. Copia os dois módulos JavaScript e compila o catálogo tipado para `public/runtime/decks.js`; scripts, fontes TypeScript e arquivos privados não são publicados. O preparador roda antes do desenvolvimento e do build. Esta migração incremental evita reescrever a navegação e a animação ao mesmo tempo que se muda a hospedagem; o motor de cartas ainda não existe.

Dependências e Node.js da linha 24 são fixados para execução reproduzível. O CI constrói a aplicação, confere tipos e sintaxe e executa regressões. O teste de servidor inicia o build real, verifica a rota e o conteúdo exato dos módulos servidos e confere que scripts e arquivos do repositório não são publicados como recursos públicos.

Este incremento depende do PR #1 de manutenção, ainda pendente de revisão. Não duplica suas correções nem as considera integradas. A produção permanece no prólogo 0.0.3 até aprovação explícita e integração na ordem dos PRs.

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

Decisão aprovada por Pedro em 01/11/2026 e acompanhada pela [issue #5](https://github.com/PHnsilva/velumbra/issues/5): Sofiie e Velumbra são hosts com clientes MCP; a interface servidora e as especializações permanecem no Sofiie Agents. Os consumidores não terão servidores MCP próprios nem repositórios adicionais nesta etapa. O cliente de saída já existente no Agents só será usado quando uma tarefa concreta exigir ferramenta externa.

No Velumbra, a fronteira do produto será uma porta de interpretação no servidor da aplicação e um adaptador MCP atrás dela. O navegador continua sem SDK MCP, credenciais ou acesso direto à ferramenta. O domínio mantém a responsabilidade pelo sorteio sem reposição, pelas quatro tradições, pelo diário local e pela reserva guiada; uma resposta do especialista não pode escolher nem alterar as cartas sorteadas. O formato exato de entrada e saída depende do contrato de [sofiie-agents#16](https://github.com/PHnsilva/sofiie-agents/issues/16) e não é redefinido aqui.

### Limite de transporte e condição de integração

O servidor MCP conhecido do Agents usa stdio local. Esse transporte exige que o host inicie e alcance o processo no mesmo ambiente; uma função hospedada na Vercel não ganha acesso ao processo que roda no computador de Pedro. Logo, stdio local pode validar o protocolo durante desenvolvimento, mas não comprova conectividade de produção. Um endpoint remoto alcançável, sua autenticação, disponibilidade e elegibilidade de custo ainda precisam ser definidos e validados antes de uma integração Vercel. Não contratar hospedagem, crédito ou fallback pago para remover esse bloqueio.

Até que a topologia e a ferramenta especializada sejam comprovadas, a interpretação permanece opcional e a reserva guiada continua disponível. A integração só será considerada validada após chamada real à ferramenta pelo cliente, validação do contrato e confirmação de que o host do ambiente escolhido alcança o servidor. Mock, SDK instalado, CI verde ou resposta simulada não demonstram interpretação especializada nem aceitação de qualidade. Perguntas pessoais não entram em logs por padrão; conteúdo retornado é validado e exibido como texto seguro.

## IA com custo inicial zero

O caminho aprovado para especialização é o cliente MCP do Velumbra consumindo o servidor do Sofiie Agents conforme o contrato #16. Vercel AI Gateway e Groq não estão selecionados como provedores ou fallbacks deste fluxo; qualquer opção futura requer validação de custo, disponibilidade e topologia sem ultrapassar R$ 0 de gasto adicional.

- Uma chamada por consulta para gerar falas das cartas e veredito em conjunto.
- Enviar apenas referências relevantes para as cartas da tiragem e a pergunta.
- Resposta estruturada, validada antes de ser apresentada.
- Limitar entrada, saída, frequência e duração da requisição no servidor.
- Tratar indisponibilidade e cotas com consulta guiada ou aviso de nova tentativa.
- Não ativar recargas, contratação ou fallback para modelos pagos.
- Créditos e cotas não representam capacidade ilimitada nem garantia permanente de gratuidade.

## Validação da interpretação

Conferir tradição, cartas, posições e formato da resposta. Manter um conjunto de consultas de referência para revisar pertinência, contradições e consistência do veredito. Checagem de estrutura não garante qualidade semântica; leituras de exemplo também exigem revisão.

## Animação

Cena em perspectiva com aparência pixelizada e personagem em camadas, sujeita à validação visual das sprints 2 e 3. Separar olhos, rosto, tronco, braços e mãos para permitir gestos controlados. Animações rodam no cliente e não dependem de geração de vídeo durante a consulta.

## Publicação

O deploy é preparado na sprint 1 e o MVP publicado na sprint 19. Configurações externas, credenciais de IA e conexão da conta Vercel são dependências a resolver na execução. Não publicar segredos no GitHub. O plano Hobby só é adequado ao escopo pessoal e não comercial previsto neste ciclo.
