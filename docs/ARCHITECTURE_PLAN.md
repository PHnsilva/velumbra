# Arquitetura e fronteiras do ciclo

Preservar a fundação Next.js/TypeScript e módulos do prólogo conforme PRs reais. Domínio do sorteio e conteúdo editorial pertencem ao produto. Clientes MCP só alcançam servidores efetivamente disponíveis; backend Vercel não alcança stdio no PC por suposição. Interpretação usa contexto editorial do Velumbra e agente adequado, sem criar especialista de tarô no SlothEngineer. Plano de 20 entregas vira mapa de seis sprints, com todos os conteúdos preservados e issues de produção separadas de aceite agregado.

## Execução e capacidades

Escolher dependências/modelos após inventário, licença, compatibilidade e medição. Operações estruturadas que não exigem modelo devem funcionar sem inferência desnecessária. Este produto é host/cliente das capacidades externas. Não criar treinamento de pesos ou especialistas próprios por copiar a infraestrutura dos agentes; inferência e ferramentas de domínio permanecem nos provedores definidos. MCP não substitui raciocínio nem implementação do domínio. Não usar nuvem paga como fallback silencioso.

A implementação deve manter contratos de entradas/saídas/erros e limites de tempo/memória. Contexto, documentos e respostas de ferramentas/modelos são dados não confiáveis; não concedem acesso a disco/rede/contas ou execução. O consumidor mantém as decisões de autorização.

Para integração, primeiro contrato e ferramenta implementada, depois cliente/servidor reais e cenários negativos. Teste entre componentes do próprio repo não prova comunicação com outro agente. Versão/retorno mock não comprova homologação.

## Dados e validação do consumidor

Validar contratos, permissões, privacidade, estados de erro e resultado percebido no produto com dados sanitizados. Separar testes de contrato, integração real e homologação em dispositivo/conta. Registrar quais componentes e versões foram usados; um mock não comprova operação real.

Curadoria de datasets, especialização e eventual treinamento de pesos pertencem aos projetos de agentes. O consumidor pode fornecer casos sanitizados e feedback autorizado, sem recolher conversas privadas automaticamente nem treinar modelos por conta própria. A integração precisa funcionar com erros claros e fallback previsto quando o provedor não estiver disponível.

Execução semanal: ler [WEEKLY_EXECUTION.md](WEEKLY_EXECUTION.md). Espera de revisão/merge não deve impedir PRs dependentes sobre artefatos já disponíveis e tecnicamente validados, com base/ordem explícitas.

Cadência atual do Velumbra: avançar até 3 L equivalentes por dia (24 unidades), sem inflar estimativas ou dispensar validação.
