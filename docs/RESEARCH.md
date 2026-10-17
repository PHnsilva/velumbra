# Pesquisas recuperadas

## Origem e estado

Em 17/10/2026 foram recuperados o pacote original `Velumbra-Projeto-Inicial.zip`, seus oito arquivos e o registro de pesquisa da conversa de definição do projeto. O ícone foi extraído do pacote original, sem nova geração ou edição. A instrução de geração está em [ASSETS.md](ASSETS.md).

O registro inclui 14 chamadas à ferramenta de pesquisa, com consultas sobre cartomancia, direção visual e infraestrutura. As consultas e URLs explícitas estão em [research-log.json](research-log.json). Esse registro preserva a trilha da pesquisa, não uma cópia integral das páginas ou dos resultados retornados.

O pacote inicial continha planejamento e um ícone estático. Não continha aplicação executável, catálogo completo, personagens animados ou integração de IA.

## Conteúdo e tiragens

| Fonte | Uso na pesquisa | Verificação em 17/10/2026 |
| --- | --- | --- |
| [V&A: história do tarô](https://www.vam.ac.uk/articles/tarot-cards) | História e estrutura de 78 cartas. | Página recuperada novamente. |
| [Horniman: conjunto Lenormand](https://www.horniman.ac.uk/object/1970.18/) | Origem documentada e identidade própria do Lenormand. | Página recuperada novamente. |
| [Waite: método celta](https://sacred-texts.com/tarot/pkt/pkt0307.htm) | Exemplo histórico de posições e sequência de leitura. | Texto recuperado novamente. |
| [Labyrinthos: tradições de tarô](https://labyrinthos.co/blogs/learn-tarot-with-labyrinthos-academy/tarot-deck-types-rider-waite-smith-vs-marseille-vs-thoth) | Referência didática para diferenças de nomes, ordem, naipes e corte. | Página recuperada novamente. |

Os três catálogos de tarô terão 78 cartas cada; o Lenormand terá 36, totalizando 270 registros. RWS, Marselha e Thoth precisam de identificadores e referências próprios. As diferenças de numeração e corte impedem tratar os três como uma troca de imagens do mesmo catálogo.

Uma tiragem precisa definir previamente o papel das posições. A interpretação relacionará pergunta, tradição, posição, orientação permitida e conjunto. O Veredito é uma escolha de produto para sintetizar a leitura, sem exigir uma carta adicional ou representar uma regra universal da cartomancia.

Fontes didáticas complementares recuperadas do registro, sem nova revisão integral:

- [Llewellyn: artigo sobre Lenormand](https://www.llewellyn.com/journal/print.php?id=2377).
- [Llewellyn: introdução ao Lenormand](https://www.llewellyn.com/blog/2012/05/lenormand/).
- [Divine Muses: guia Antiquarian Lenormand](https://www.divinemuses.net/uploads/2/1/6/1/2161377/antiquarian_lenormand_extended_lwb.pdf).
- [Personare: nomes e significados do baralho cigano](https://www.personare.com.br/conteudo/baralho-cigano-significado-das-cartas-m214131).
- [Labyrinthos: arcanos maiores](https://labyrinthos.co/blogs/tarot-card-meanings-list/tagged/major-arcana).

Essas referências documentam tradições e interpretações. A pesquisa inicial não substitui a revisão editorial individual das 270 cartas nas sprints previstas.

## Direção visual

O [site oficial de Inscryption](https://www.inscryption.com/) foi consultado novamente. A cabana e a apresentação das cartas são referências de atmosfera para [ART_DIRECTION.md](ART_DIRECTION.md); o projeto prevê arte, personagem e animações próprias.

O registro também contém a [apresentação do criador na GDC](https://www.gdcvault.com/play/1027609/Independent-Games-Summit-Sacrifices-Were), os [slides do post-mortem](https://media.gdcvault.com/GDC%2B2022/Speaker%2BSlides/GDC22_Inscryption_Post-Mortem.pdf) e a [página na Steam](https://store.steampowered.com/app/1092790/Inscryption/). O PDF da GDC não pôde ser recuperado nesta verificação; seu endereço foi preservado como referência histórica.

## Hospedagem e IA

| Fonte oficial | Resultado da consulta em 17/10/2026 |
| --- | --- |
| [Vercel Hobby](https://vercel.com/docs/plans/hobby) | Plano gratuito com cotas, restrito a uso pessoal e não comercial. |
| [Vercel AI Gateway](https://vercel.com/docs/ai-gateway/pricing) | A documentação anuncia US$ 5 mensais de créditos no nível gratuito, para modelos elegíveis e com limites. |
| [Groq: limites](https://console.groq.com/docs/rate-limits) | Os limites dependem do modelo e da conta; a documentação permite consultar os limites efetivos da organização. |

As páginas foram verificadas, mas não a elegibilidade ou o saldo de uma conta Vercel/Groq específica. Não foi contratado serviço, ativada recarga ou configurada credencial. A gratuidade é uma condição de execução a validar na sprint 6, sem promessa de capacidade ilimitada.

O registro original também contém pesquisas de Gemini. Essa opção não foi escolhida para a arquitetura inicial.

## Decisões preservadas

- Quatro baralhos completos e biblioteca antes da consulta.
- Nome e forma de tratamento, velha misteriosa animada, explicação de cada carta e veredito contextual.
- Perguntas livres quando a IA estiver disponível; consultas guiadas quando estiver indisponível.
- Aplicação e função de servidor na Vercel, dentro da viabilidade gratuita.
- 20 sprints, testes e mudanças nas sprints 18 e 20 e MVP na sprint 19.
- README técnico separado de [GAME.md](../GAME.md).
- Planejamento em Markdown, sem Issues ou GitHub Projects.

Todas as sprints continuam pendentes. A recuperação e a publicação da documentação são preparação para a sprint 1.
