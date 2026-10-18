# Recursos visuais

## Ícone inicial

![Ícone do Velumbra](../public/brand/velumbra-icon.png)

| Propriedade | Valor |
| --- | --- |
| Arquivo | `public/brand/velumbra-icon.png` |
| Uso | Identidade do projeto; versões de favicon serão preparadas na implementação. |
| Origem | Gerado com a ferramenta integrada de imagens do ChatGPT, sem CLI ou API externa contratada. |
| Conceito | Carta envelhecida, velha misteriosa sob um véu e vela âmbar em pixel art de horror. |
| Estado | Ícone inicial criado; não representa uma animação ou modelo de personagem pronto. |

---

## Instrução de geração do ícone

```text
Use case: logo-brand. Asset type: square game icon for VELUMBRA, an original browser tarot horror game. Create one production-ready icon, not a mockup, with no text and no watermark. Composition: centered single aged tarot card in a nearly black square background, safe margins on all sides. Within the card, a mysterious elderly fortune-teller woman's hooded face is emerging from deep shadow, recognizable wrinkled eyes and angular cheekbones, lit from below by a single small candle in front of her. Make the candle flame a strong amber focal point and her watchful eyes a second subtle focal point. The hood and curved card frame suggest a veil. Visual language: authentic chunky pixel art with hard pixel clusters, limited charcoal, aged parchment and amber palette, rough woodcut-like marks, dramatic candlelit retro horror mood, intimidating but no gore, crisp readable silhouette at 64px. Flat pixel illustration, not photorealistic or smooth vector, no collage, no multiple icon variations, no surrounding UI. Original character and artwork. Opaque dark background fills the square.
```

## Cenário do prólogo

- Arquivo: `public/art/cabin.png`.
- Origem: geração integrada de imagens, em 17/10/2026; sem contratação de API ou serviço externo.
- Uso: fundo estático original da cabana. Paralaxe, iluminação, névoa e partículas são acrescentadas pelo código.
- O ícone original foi preservado sem edição.

### Instrução de geração do cenário

```text
Use case: stylized-concept. Asset type: ultra-wide 16:9 background plate for the interactive title screen of VELUMBRA, an original browser tarot horror game. Scene: first-person seated view inside a sinister old fortune-teller's wooden cabin at night, an enormous rough dark-wood table across the lower third receding in perspective, shelves with old books and bottles in the shadows, heavy hanging curtains, a narrow central back window with a desaturated pale moon and silhouetted branches. Two melted candles on brass holders near the outer left and right sides of the table illuminate amber pools, a closed old notebook lower right, three face-down aged tarot cards scattered right on the table. Keep the center and left-center shadowy and visually quiet so HTML title and menu remain legible. No people, no face, no character, no letters, no text, no logos or UI, no watermark. Visual style: rich chunky dark pixel art, crisp deliberate pixel clusters, retro low-resolution 3D-like perspective rendered as pixel illustration, rough woodcut marks, tactile worn surfaces, dense moody environment, limited charcoal-black, weathered warm wood, parchment and amber highlights, cold muted gray-green moonlight from behind, strong depth and atmospheric shadows. An original cabin artwork with cinematic eerie atmosphere, not a screenshot or direct recreation from another game. Background must fill all edges. Export a landscape 16:9 image.
```

## Tipografia

Cormorant Garamond, dos autores do Cormorant Project, e IBM Plex Mono, da IBM, obtidas pelo [Google Fonts](https://fonts.google.com/). Arquivos servidos localmente. Licenças SIL Open Font License incluídas em `public/fonts/CormorantGaramond-OFL.txt` e `public/fonts/IBMPlexMono-OFL.txt`.

## A velha como entidade

- Arquivo: `public/art/the-elder.png`, 1086 × 1448, RGBA com transparência real.
- Origem: ferramenta integrada de geração de imagens, em 18/10/2026. A cabana e o ícone original foram referências de estilo e identidade.
- Uso: personagem incorporada à cena; respiração e reação visual são aplicadas pelo jogo. A cabana e o ícone originais foram preservados.
- O recorte da personagem não tem moldura de carta. Ainda não é um modelo corporal com membros animados separadamente.

### Instrução de geração da personagem

```text
Use case: stylized-concept. Asset type: transparent-background character sprite illustration for the browser horror game VELUMBRA. Input image 1 is reference ONLY for pixel art style, candlelight palette and the perspective of the cabin in which the character will be composited. Input image 2 is reference for the elderly fortune-teller's face and identity ONLY. Create the actual woman out of the card: no card, no card border, no rectangle, no surrounding scene. Depict her as a large, powerful, terrifying yet refined female supernatural elder seated facing the viewer across a table, from the top of her towering headpiece to below the waist including both complete forearms and hands. She has the recognizable deeply wrinkled angular face, long pointed nose, commanding almost still expression, ancient dark eyes with tiny pale cold catchlights. Elegant pitch-black high-collared mourning gown, worn charcoal lace veil and an imposing elongated layered headdress with an antique oxidized-silver diadem, no gold trim. A huge mantle of black cloth rises in solemn sharp shoulder shapes, with ragged smoky edges suggesting her immense supernatural presence. Her thin elegant fingers and long nails extend forward and rest at the bottom of the sprite as though on a table, one hand slightly lifted to invite the player. Upright majestic posture, never hunched or frail, terrifying intelligence, almost regal elegance. Black lace, faded burgundy underlayers, dark oxidized silver jewelry and rings, subtle bone-color details. Candlelight from below left and right warms her face and fingertips; cold moonlit rim at the back. Composition: centered single isolated upper-body character, vertical 3:4 framing, silhouette occupies most of image with safe margins for hands and tall headpiece. Crisp chunky pixel clusters, painterly pixel art, rough woodcut texture, matching the cabin reference. She should feel like an original supernatural sovereign inhabiting this cabin, not a generic wizard or skeleton or cartoon witch. Transparent actual alpha background. No scenery, no table itself, no frame, no text, no watermarks, no extra characters, no floating symbols, no shiny gold jewelry. Preserve old-woman identity and pixel art; do not depict a young glamorous woman.
```

## Cochichos

Quatro arquivos WAV mono em 22050 Hz, preparados localmente em 18/10/2026. A base foi sintetizada em português com a voz Microsoft Maria do Windows. O processamento espectral suavizou os harmônicos e reconstruiu a voz com excitação ruidosa, para produzir uma textura de cochicho, seguida de reverberação curta e normalização sem saturação digital. Não é uma gravação de pessoa real ou clonagem de voz.

| Arquivo | Frase | Duração |
| --- | --- | ---: |
| `public/audio/whisper-0.wav` | Chegue mais perto. Eu já estava esperando. | 7,99 s |
| `public/audio/whisper-1.wav` | Escolha com calma. As cartas se lembram. | 7,65 s |
| `public/audio/whisper-2.wav` | Pode olhar. Nada aqui adormece por completo. | 8,31 s |
| `public/audio/whisper-3.wav` | Seu lugar está à mesa. | 4,57 s |

O navegador mistura esses arquivos com vento, ressonâncias graves e ruídos de papel sintetizados localmente. Não há chamada de API de voz ou consumo de créditos externos durante a consulta.

## Objetos da interface

Cadeira, cartas, diário e aparelho de som são desenhos vetoriais próprios feitos no código. As superfícies gastas, o lacre, a costura e os recortes são construídos com CSS. A direção usa papel, carvão, osso e vinho escuro; o âmbar fica na iluminação do cenário.
