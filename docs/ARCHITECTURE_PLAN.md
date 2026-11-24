# Arquitetura e fronteiras do produto

## Componentes

Velumbra é uma aplicação Next.js com TypeScript. A interface apresenta a jornada e as animações; o domínio do produto mantém as regras de cada tradição, a seleção sem reposição, as posições das tiragens e o contexto editorial das cartas. A consulta guiada fornece uma modalidade de reserva quando a interpretação por IA não está disponível.

A arquitetura de destino mantém o cliente de interpretação no lado servidor da aplicação. Velumbra atua como host e cliente das capacidades especializadas disponíveis na linha Sofiee, conforme contrato e disponibilidade reais. O produto não contém um servidor MCP próprio. O transporte deve ser alcançável a partir do ambiente implantado; uma função da Vercel não alcança por suposição um processo stdio no computador local.

## Fronteiras e dados

O cliente envia dados de consulta limitados ao contrato: tradição, cartas selecionadas, posições, orientação permitida e pergunta. O domínio do produto permanece responsável pelo sorteio e pelo conteúdo editorial. A resposta externa é validada antes de ser apresentada como texto seguro.

Contexto, documentos e respostas de ferramentas/modelos são dados não confiáveis. Não concedem acesso a disco, rede, contas ou execução. Decisões de autorização permanecem no consumidor. Perguntas e dados de consulta não são registrados em logs por padrão.

## Integrações e falhas

Contratos definem entradas, saídas, erros e limites de execução. A disponibilidade de um serviço, a conexão com uma ferramenta e a qualidade de interpretação são propriedades distintas e exigem evidências próprias. Testes locais, simulações e mocks não comprovam uma comunicação externa.

Falha, timeout, retorno inválido ou indisponibilidade do agente levam a uma reserva guiada claramente identificada. Serviços pagos não são fallback implícito. Inferência, ferramentas especializadas e eventual curadoria de modelos permanecem nas fronteiras dos projetos responsáveis por essas capacidades.

## Validação

Testes de contrato, integração entre cliente e servidor reais, validação de dados, privacidade, estados de erro e homologação em ambiente alvo são evidências separadas. Relatórios identificam componentes, versões, ambiente e limitações. A experiência final também requer validação editorial e visual por pessoa responsável.
