# Interfaces de engenharia e gestão do repositório

Este documento descreve as interfaces de engenharia ligadas ao repositório. A [política de contribuição](CONTRIBUTION_POLICY.md) define a proposta, validação e revisão de alterações; a [organização do trabalho](KANBAN.md) define os campos e estados do Project.

## GitHub

O conector MCP do GitHub oferece operações sobre arquivos, issues, comentários e pull requests. A GitHub CLI complementa a gestão do Project, incluindo campos e dependências que não estejam disponíveis pelo conector MCP. A disponibilidade de uma busca ou de um arquivo é evidência de presença, não evidência de execução, integração ou aceite.

O Project #7 mantém os estados de trabalho e os atributos das issues. Issues e pull requests do repositório são a fonte do conteúdo e da discussão; o quadro não substitui seus critérios e comentários. Campos nativos de dependência registram relações técnicas quando a plataforma os oferece, enquanto a issue descreve o artefato e a condição de uso.

## Fronteira de integração do produto

O acesso de engenharia ao GitHub é independente da integração MCP oferecida pelo produto. Os provedores especializados da linha Sofiee expõem suas ferramentas; Velumbra atua como consumidor conforme contrato e disponibilidade reais, sem exigir o antigo Sofiie Agents. Uma implantação hospedada na Vercel não alcança por suposição um servidor stdio executado no computador local. Perfis de implantação e respostas simuladas não comprovam conexão ou homologação.

Velumbra não contém servidor MCP próprio. Um transporte, ferramenta ou serviço adicional requer uma capacidade de produto definida, contrato suficiente e evidência do ambiente alvo.
