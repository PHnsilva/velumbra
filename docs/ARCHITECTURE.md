# Arquitetura planejada

Este documento descreve a arquitetura do produto e a separação entre seus módulos. A aplicação usa Next.js App Router com TypeScript e preserva o runtime do [prólogo](PROLOGUE.md). As capacidades previstas para catálogo, tiragens, interpretação e persistência estão delimitadas neste documento e em [ARCHITECTURE_PLAN.md](ARCHITECTURE_PLAN.md); seu estado de implementação está no [registro de progresso](PROGRESS.md).

## Aplicação

- Next.js e TypeScript, em um repositório.
- Interface, conteúdo editorial e recursos de arte distribuídos pela Vercel.
- Função de servidor para interpretação: a chave da IA fica exclusivamente no servidor.
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

## IA com custo inicial zero

O provedor e o modelo de interpretação dependem da disponibilidade técnica e das condições de custo verificadas para a conta e implantação escolhidas. As opções pesquisadas estão registradas em [RESEARCH.md](RESEARCH.md); nenhuma delas implica elegibilidade ou capacidade garantida.

- Uma chamada por consulta para gerar falas das cartas e veredito em conjunto.
- Enviar apenas referências relevantes para as cartas da tiragem e a pergunta.
- Resposta estruturada, validada antes de ser apresentada.
- Limitar entrada, saída, frequência e duração da requisição no servidor.
- Tratar indisponibilidade e cotas com consulta guiada ou aviso de nova tentativa.
- A arquitetura não pressupõe recarga automática, contratação ou fallback para modelos pagos.
- Créditos e cotas não representam capacidade ilimitada nem garantia permanente de gratuidade.

## Validação da interpretação

Conferir tradição, cartas, posições e formato da resposta. Manter um conjunto de consultas de referência para revisar pertinência, contradições e consistência do veredito. Checagem de estrutura não garante qualidade semântica; leituras de exemplo também exigem revisão.

## Animação

Cena em perspectiva com aparência pixelizada e personagem em camadas, sujeita à validação visual das sprints 2 e 3. Separar olhos, rosto, tronco, braços e mãos para permitir gestos controlados. Animações rodam no cliente e não dependem de geração de vídeo durante a consulta.

## Publicação

O deploy usa a Vercel para a interface e a função de servidor. A conexão de uma conta, credenciais e configurações externas são dependências operacionais registradas no progresso e nas issues correspondentes. A configuração de hospedagem precisa respeitar as condições vigentes do provedor e o limite de custo do projeto.
