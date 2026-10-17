# Velumbra — o jogo

Velumbra é uma experiência de cartomancia em uma cabana de horror, conduzida por uma velha misteriosa. O nome mistura véu, vela e umbra (sombra). O jogador escolhe seu nome, forma de tratamento e baralho, examina as cartas se desejar e recebe uma consulta explicada pela personagem.

A direção visual usa papel envelhecido, madeira escura, luz de velas e aparência pixelizada. A velha respira, fala, reage, embaralha e revela cartas; O Veredito encerra a leitura.

---

## Jornada

Entrar na cabana → informar nome e tratamento → escolher um dos quatro baralhos → examinar cartas, se desejar → escolher tiragem e pergunta → selecionar cartas → assistir à distribuição e revelação → ouvir/ler a velha → receber O Veredito → salvar a consulta no diário local.

## Conteúdo do MVP — sprint 19

- Quatro baralhos completos: 78 Rider–Waite–Smith, 78 Marselha, 78 Thoth e 36 Lenormand.
- Biblioteca acessível antes da consulta, com ampliação e descrição individual.
- Personagem misteriosa original, animada e presente durante a jornada.
- Nome e gênero/forma de tratamento; possibilidade de não informar gênero.
- Tiragens de uma e três cartas.
- Perguntas livres com IA disponível; consultas guiadas de reserva.
- Interpretação por tradição, pergunta, intenção, posição, orientação e conjunto.
- Veredito construído depois da leitura completa, coerente com as cartas e a pergunta.
- Diário no navegador, sem cadastro obrigatório nem sincronização entre dispositivos.
- Áudio ambiente, sons curtos de fala, controles de volume e velocidade de texto.
- Redução de movimento e operação por teclado.
- Layout adaptado a computador e celular.
- Deploy do aplicativo e backend na Vercel, respeitando cotas e elegibilidade gratuitas.

## Interpretação contextual

A descrição-base de uma carta é uma referência. A fala da velha precisa relacionar essa referência à pergunta e à posição ocupada. Perguntas diferentes dentro do mesmo tema também exigem respostas diferentes.

Uma consulta tem pelo menos: tradição, pergunta, intenção, tiragem, cartas sorteadas, posições e orientação quando permitida. A leitura deve preservar todos esses dados.

O Veredito contém: resposta contextual à pergunta, conexão entre as cartas, ponto de atenção e conselho simbólico final. Não precisa sortear uma carta adicional.

## Reserva sem IA

Oferecer temas e perguntas predefinidas, com interpretações editoriais e regras de combinação. Identificar claramente a modalidade guiada. Não simular compreensão de texto livre por simples correspondência de palavras.

## Posterior ao primeiro ciclo

- Cruz Celta.
- Mesa Real / Grand Tableau.
- Cadastro e sincronização de histórico.
- Conversa aberta e ilimitada com a velha.
- Dublagem dinâmica com serviço pago.
- Monetização e mudanças necessárias na hospedagem.

## Critério de MVP

Uma pessoa consegue abrir o jogo, examinar um baralho completo, fazer uma consulta com animações, compreender a explicação de cada carta e chegar ao veredito. A experiência também oferece um percurso funcional quando a IA falha.

---

## Referências de conteúdo

- [V&A: história e estrutura do tarô](https://www.vam.ac.uk/articles/tarot-cards)
- [Horniman: origem documentada do Lenormand](https://www.horniman.ac.uk/object/1970.18/)
- [Labyrinthos: tradições de tarô](https://labyrinthos.co/blogs/learn-tarot-with-labyrinthos-academy/tarot-deck-types-rider-waite-smith-vs-marseille-vs-thoth)

As leituras são experiências simbólicas, sem promessa de previsão comprovada.
