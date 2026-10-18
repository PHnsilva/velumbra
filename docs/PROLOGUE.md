# Prólogo funcional

Entrega preparatória anterior à sprint 1. Todas as 20 sprints continuam pendentes. A versão 0.0.3 revisa arte, interface, animação e áudio conforme o pedido de 18/10/2026.

Publicado em [velumbra-hazel.vercel.app](https://velumbra-hazel.vercel.app/).

## Implementado

- Abertura com o ícone original, nome na fonte própria e transição. Entrada com som ou em silêncio; repetição pelos ajustes.
- Cabana e velha redesenhadas com formas mais simples e pixels maiores. Os arquivos anteriores e o ícone original foram preservados.
- Cena em canvas de baixa resolução, ampliada sem suavização, a 12 quadros por segundo no modo completo.
- Velha com respiração, movimento distinto de cabeça, manto e mãos, piscadas e reação de boca e cabeça durante as vocalizações.
- Cenário com chamas e luz oscilantes, fumaça, cortina em movimento, névoa, poeira e reação discreta ao ponteiro.
- Fonte original Velumbra, com letras minúsculas, maiúsculas e acentos portugueses, usada na interface inteira.
- Baralhos, diário, ajustes e silêncio em controles compactos no canto superior. Detalhes e superfícies em bordô.
- Nome informado diretamente sobre a mesa. Clique no tampo leva o foco ao campo; Enter ou a seta confirma. Nenhum botão visual de sentar à mesa.
- Um único balão, “Diga seu nome.”, ancorado na velha, exibido apenas ao clicar na personagem. Ele desaparece após cinco segundos, ao focar o nome, abrir um painel ou pressionar Escape. Não há slogans, subtítulos ou falas automáticas na cena.
- Quatro grunhidos sintéticos sem palavras, misturados com vento e ressonância ambiente. Sem síntese de texto, gravação de voz real ou API externa.
- Preferências de nome, tratamento e tradição, quatro prévias com três amostras textuais cada, e diário vazio.
- Volume, silêncio, redução de movimento e limpeza da identificação. Reduzir movimento pausa tanto a velha quanto o cenário e as animações da interface.
- Diálogos com foco gerenciado e fechamento por Escape; abas de baralho navegáveis pelo teclado.

## Limites

Ainda não há tiragem, interpretação, veredito ou coleção de 270 ilustrações. Os movimentos são uma animação procedural do sprite e do cenário em canvas; não incluem um esqueleto corporal, gestos de distribuição ou manipulação de cartas. Os sons são quatro variações preparadas, não uma língua real ou voz gerada dinamicamente.

## Organização

| Caminho | Responsabilidade |
| --- | --- |
| `index.html` | Abertura, controles, personagem, campo de nome e diálogos. |
| `src/cabin.css` | Interface, fonte, bordô, estados e responsividade. |
| `src/prologue.js` | Navegação, preferências e áudio. |
| `src/scene.js` | Desenho e animação da cabana e da velha. |
| `src/decks.js` | Amostras textuais dos quatro baralhos. |
| `public/art/cabin-pixel.png` | Revisão simplificada da cabana. |
| `public/art/elder-pixel.png` | Sprite simplificado da velha com transparência. |
| `public/fonts/velumbra.ttf` | Fonte própria da interface. |
| `public/audio/murmur-0.wav` a `murmur-3.wav` | Vocalizações sem palavras. |
| `scripts/make-type.py` | Fonte reproduzível a partir do alfabeto original; requer fontTools somente para regeneração. |
| `scripts/make-murmurs.py` | Síntese reproduzível dos grunhidos; requer numpy somente para regeneração. |

O build e o jogo não executam Python nem precisam dessas dependências de produção de recursos.

## Execução

```sh
npm run dev
npm run build
```

Pré-requisito: Node.js 22 ou superior. Servidor local em `http://127.0.0.1:4173`; publicação estática em `dist/`. Sem dependências npm, credenciais ou CDNs.

## Dados, som e movimento

Preferências ficam na chave `velumbra.prologue.v1`, somente no navegador. Nomes são normalizados e inseridos como texto seguro. O fluxo continua em memória se o armazenamento estiver indisponível.

Som só começa por um controle explícito: “Entrar com som”, “Ouvir a cabana” ou o ajuste de som. Clicar na velha respeita o silêncio atual. Com som ativo, o clique emite um grunhido; vocalizações ocasionais também podem ocorrer no ambiente, sem abrir balões. Não se sobrepõem nem interrompem painéis. A aba oculta suspende o áudio e a renderização. Silenciar interrompe a vocalização atual.

A preferência de reduzir movimento do sistema vale na primeira visita. O controle local pausa as animações e redesenha a cena imóvel, sem depender de desativar o áudio.

## Validação

Sintaxe e build verificados com Node.js 24.19.0. Revisão visual e funcional no Microsoft Edge, em computador e em 390 × 844:

- Carregamento da arte, transparência e fonte própria.
- Balão somente após clique, dentro da área da personagem.
- Nome com apenas espaços rejeitado; nome válido confirmado pela mesa.
- Tratamento e Lenormand salvos, persistência após recarga e limpeza dos dados de teste.
- Amostras e navegação por teclado entre os baralhos.
- Entrada com som, vocalização com reação visual, silêncio e redução de movimento.
- Comparação de capturas nas regiões da personagem e do cenário: ambas mudam no modo completo e permanecem idênticas no modo reduzido.
- Sem balão automático após permanência com som ativo; nenhum erro de JavaScript observado nos fluxos conferidos.
- Layout sem transbordamento horizontal.

Essas verificações se referem ao prólogo e não comprovam os recursos planejados para o jogo completo.
