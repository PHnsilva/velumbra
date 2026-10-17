# Arquitetura planejada

Este documento descreve decisões propostas para a aplicação completa. O [prólogo estático](PROLOGUE.md) é a implementação executável preparatória; ainda não contém motor de tiragens, backend ou IA.

## Aplicação

- Next.js e TypeScript, em um repositório.
- Interface, conteúdo editorial e recursos de arte distribuídos pela Vercel.
- Função de servidor para interpretação: a chave da IA fica exclusivamente no servidor.
- Diário local no navegador, com exportação a considerar posteriormente.
- Sem necessidade inicial de banco, autenticação, servidor dedicado ou serviços de cobrança.

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

Primeira opção a avaliar: Vercel AI Gateway no nível gratuito, com modelo elegível. Alternativa: Groq Free acessada diretamente pela função na Vercel. Provedores e modelos disponíveis devem ser verificados na sprint 6.

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
