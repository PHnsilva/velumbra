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

A interface 0.0.3 usa a fonte própria **Velumbra**, em `public/fonts/velumbra.ttf`. Alfabeto original desenhado em grade, com 147 caracteres incluindo acentos portugueses, letras minúsculas e maiúsculas. A fonte é reproduzível por `scripts/make-type.py`, que usa fontTools somente na produção do arquivo. Nenhuma fonte remota é carregada pelo jogo.

Cormorant Garamond e IBM Plex Mono, usadas nas versões anteriores, permanecem preservadas com suas licenças SIL OFL em `public/fonts/`. Não são usadas na interface atual. Ainda não foi escolhida uma licença de distribuição para a fonte própria ou o conjunto do projeto.

## A velha como entidade

- Arquivo: `public/art/the-elder.png`, 1086 × 1448, RGBA com transparência real.
- Origem: ferramenta integrada de geração de imagens, em 18/10/2026. A cabana e o ícone original foram referências de estilo e identidade.
- Uso: personagem incorporada à cena; respiração e reação visual são aplicadas pelo jogo. A cabana e o ícone originais foram preservados.
- O recorte da personagem não tem moldura de carta. Ainda não é um modelo corporal com membros animados separadamente.

### Instrução de geração da personagem

```text
Use case: stylized-concept. Asset type: transparent-background character sprite illustration for the browser horror game VELUMBRA. Input image 1 is reference ONLY for pixel art style, candlelight palette and the perspective of the cabin in which the character will be composited. Input image 2 is reference for the elderly fortune-teller's face and identity ONLY. Create the actual woman out of the card: no card, no card border, no rectangle, no surrounding scene. Depict her as a large, powerful, terrifying yet refined female supernatural elder seated facing the viewer across a table, from the top of her towering headpiece to below the waist including both complete forearms and hands. She has the recognizable deeply wrinkled angular face, long pointed nose, commanding almost still expression, ancient dark eyes with tiny pale cold catchlights. Elegant pitch-black high-collared mourning gown, worn charcoal lace veil and an imposing elongated layered headdress with an antique oxidized-silver diadem, no gold trim. A huge mantle of black cloth rises in solemn sharp shoulder shapes, with ragged smoky edges suggesting her immense supernatural presence. Her thin elegant fingers and long nails extend forward and rest at the bottom of the sprite as though on a table, one hand slightly lifted to invite the player. Upright majestic posture, never hunched or frail, terrifying intelligence, almost regal elegance. Black lace, faded burgundy underlayers, dark oxidized silver jewelry and rings, subtle bone-color details. Candlelight from below left and right warms her face and fingertips; cold moonlit rim at the back. Composition: centered single isolated upper-body character, vertical 3:4 framing, silhouette occupies most of image with safe margins for hands and tall headpiece. Crisp chunky pixel clusters, painterly pixel art, rough woodcut texture, matching the cabin reference. She should feel like an original supernatural sovereign inhabiting this cabin, not a generic wizard or skeleton or cartoon witch. Transparent actual alpha background. No scenery, no table itself, no frame, no text, no watermarks, no extra characters, no floating symbols, no shiny gold jewelry. Preserve old-woman identity and pixel art; do not depict a young glamorous woman.
```

## Vocalizações sem palavras

Os cochichos em português da versão anterior foram removidos. A versão 0.0.3 usa quatro grunhidos criados do zero por síntese de pulsos glotais, ruído, ressonâncias variáveis e reflexões de sala. Não há texto de entrada, idioma real, voz Microsoft, pessoa gravada ou clonagem de voz. O script reproduzível é `scripts/make-murmurs.py`.

| Arquivo | Formato | Duração |
| --- | --- | ---: |
| `public/audio/murmur-0.wav` | PCM mono, 22050 Hz, 16 bits | 2,2 s |
| `public/audio/murmur-1.wav` | PCM mono, 22050 Hz, 16 bits | 2,6 s |
| `public/audio/murmur-2.wav` | PCM mono, 22050 Hz, 16 bits | 1,8 s |
| `public/audio/murmur-3.wav` | PCM mono, 22050 Hz, 16 bits | 2,4 s |

O navegador mistura esses arquivos com vento, ressonância grave e ruído de papel. Nenhum serviço de voz ou crédito externo é chamado.

## Revisão visual 0.0.3

Recursos produzidos pela ferramenta integrada de geração de imagens em 18/10/2026, sem CLI ou API externa. Os arquivos originais acima foram referências de edição e permanecem preservados.

| Arquivo final | Uso |
| --- | --- |
| `public/art/cabin-pixel.png` | Cabana com formas simplificadas, 1672 × 941. Renderizada em canvas com pixels maiores. |
| `public/art/elder-pixel.png` | Velha com manto preto e bordô, 1087 × 1447, RGBA. Renderizada em 180 × 240 antes da ampliação. |

A animação é aplicada por `src/scene.js`, separadamente para cabeça, corpo, mãos, piscadas, boca, chamas, fumaça, cortina e névoa. As imagens não contêm moldura, UI ou frases. O ícone original foi preservado.

### Instrução final: cabana

```text
Edit target: the attached cabin background for Velumbra. Keep the same first-person composition, table across the entire lower third, shelves at sides, central narrow moonlit window, burgundy curtain, two candles at outer sides, and small cards/notebook on the right. Repaint EVERYTHING as deliberately LOW RESOLUTION horror game pixel art, roughly a 320x180 pixel game framebuffer enlarged by nearest neighbor. Strong large square pixel clusters, coarse simple shapes, only about 20 muted colors, tiny sparse dithering, flat shadow masses. Much LESS DETAIL than the original: remove fine wood grain, lace, ornament, tiny objects and gold. Dark brown-black wood, desaturated green-grey night, muted bone light, dark burgundy cloth. Eerie intimate tabletop cabin mood reminiscent of the coarse lo-fi look of Inscryption, but original composition and assets; no copied logos, characters or UI. No person. No text. No smooth gradient, no fine noise, no photorealism. Preserve the clear middle of table for a name entry; make the table's far horizontal edge exactly at about 66% of image height. Wide landscape 16:9 background plate.
```

### Instrução final: velha

```text
Edit target: this isolated elder sprite for Velumbra. REDRAW with dramatically simplified coarse pixel clusters as a true LOW RESOLUTION game sprite, approximately 150x210 pixels enlarged with nearest neighbor. Limited 18-24 colors, huge square pixel clusters, flat shadow masses, very few details, no fine texture, no smooth gradients. Original elderly supernatural female entity, elegant, immense and commanding, frightening angular OLD woman's face, long nose, hollow cheeks, thin tight mouth, tiny pale grey eyes. Strong black mourning veil with a pointed upper silhouette, broad black mantle, simple muted burgundy underlayers. Remove all the gold, jewelry chains, embroidery and busy detail. Only one simple dull bone clasp. Entire upper body including both full forearms, her long fingers at bottom, one raised slightly. Straight frontal seated pose. Face lit dimly from candles below, much of body black. Not a card, no frame, no scenery, no letters, no symbols. Match coarse ominous pixel art / low-poly retro horror mood of Inscryption without copying its characters. Keep stern terrifying elegant old woman identity. Centered tall 3:4 isolated sprite with actual TRANSPARENT alpha background and safe margins. Purpose is animation in a low resolution scene, so clear simple face and silhouette, not a detailed painting.
```

## Interface atual

Desenhos vetoriais simples representam baralhos, diário, ajustes e som. Bordô identifica controles e superfícies; não há dourado decorativo na UI. O nome é informado em um campo sobre a mesa. O balão curto está dentro da área da velha e só aparece ao clicar nela.
