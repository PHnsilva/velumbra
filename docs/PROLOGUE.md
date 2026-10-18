# Prólogo funcional

Entrega preparatória solicitada antes da sprint 1. As 20 sprints continuam pendentes; esta versão valida a abertura, a atmosfera e o menu.

Disponível em [velumbra-hazel.vercel.app](https://velumbra-hazel.vercel.app/), no plano Hobby da Vercel. A primeira publicação ocorreu em 17/10/2026. O prólogo recebeu uma revisão de arte, interface e áudio em 18/10/2026.

## Implementado

- Abertura com ícone original, nome Velumbra, animação e transição automática. É possível entrar imediatamente ou rever a abertura.
- Cenário original em pixel art, com paralaxe, luz oscilante, névoa e partículas que reagem ao ponteiro. Cliques no fundo produzem uma ondulação sutil.
- Velha representada por uma ilustração própria com transparência, incorporada ao cenário, com torso, véu e mãos. Respiração sutil, paralaxe e reação visual durante os cochichos.
- Escolhas apresentadas como objetos desenhados, papéis gastos, tecido e lacre. Painéis com papel, tinta e encadernação em vinho escuro, substituindo a ornamentação dourada da primeira versão.
- Menu com preparação de consulta, prévias dos baralhos, diário e ajustes.
- Nome, forma de tratamento e escolha de uma das quatro tradições, com confirmação contextual e armazenamento local.
- Três amostras textuais por tradição. A interface identifica explicitamente a coleção como prévia.
- Diário vazio real, sem criar consultas fictícias.
- Ambiente sonoro no navegador e quatro cochichos em português, com volume, silêncio, redução de movimento e limpeza de identificação.
- Fontes, imagens e código servidos localmente. A abertura não depende de serviços de IA, CDNs ou credenciais.
- Diálogos com foco gerenciado, fechamento por Escape e navegação por teclado nas abas.

## Limites

Ainda não há sorteio, leitura de perguntas, veredito ou 270 ilustrações. A velha usa uma ilustração com movimento global e reação sonora; ainda não há animação independente de boca, olhos ou membros. Os quatro cochichos são frases preparadas, sem geração dinâmica de voz.

## Organização

- `index.html`: estrutura da abertura e menu.
- `src/prologue.css`: estilos básicos da abertura, controles e painéis.
- `src/cabin.css`: direção visual da cabana, objetos de menu, entidade e revisão dos painéis.
- `src/prologue.js`: navegação, prévias, preferências, partículas e áudio.
- `src/fonts.css` e `public/fonts/`: tipografia local e licenças SIL OFL.
- `public/art/cabin.png`: cenário gerado para a abertura.
- `public/art/the-elder.png`: ilustração da velha com canal alfa, incorporada sobre a cabana.
- `public/audio/whisper-0.wav` a `whisper-3.wav`: cochichos preparados em português.
- `scripts/dev-server.mjs`: servidor local restrito a `127.0.0.1`.
- `scripts/build.mjs`: copia somente os recursos públicos da abertura para `dist/`.

## Execução e build

```sh
npm run dev
npm run build
```

Servidor: `http://127.0.0.1:4173`. O build não executa instalação de dependências. O projeto não possui dependências npm externas nesta etapa. O build estático inclui as licenças das fontes.

## Dados e áudio

Nome, tratamento, baralho e ajustes ficam na chave `velumbra.prologue.v1` do armazenamento do navegador. A interface permite esquecer a identificação. Texto informado pelo usuário é inserido como texto, sem execução de HTML. Se o armazenamento estiver bloqueado, a sessão continua em memória.

O som inicia por interação explícita em “Entrar com som”, “Ouvir a cabana” ou na própria velha. Também é possível entrar em silêncio. Depois da ativação, os cochichos aparecem na chegada, ao tocar a personagem e ocasionalmente durante a permanência na cabana. A emissão periódica não interrompe os painéis nem sobrepõe outra fala. Ao ocultar a aba, áudio, fala atual e partículas são suspensos. Redução de movimento respeita a preferência do sistema na primeira visita e pode ser alterada na própria interface.

Os arquivos de voz foram preparados localmente a partir de síntese em português, com processamento espectral para produzir a textura de cochicho. Nenhuma API paga ou serviço de voz é chamado pelo jogo. A origem dos recursos está em [ASSETS.md](ASSETS.md).

## Validação

Verificado em 17/10/2026 com Node.js 24.19.0 e Microsoft Edge:

- Sintaxe dos arquivos JavaScript e build estático aprovados.
- Servidor e cenário respondendo HTTP 200.
- Transição da abertura e repetição da sequência.
- Nome e tratamento feminino aplicados corretamente; Lenormand confirmado como escolha.
- Preferências mantidas após recarregar a página.
- Navegação entre tradições, incluindo setas do teclado.
- Controles de som e redução de movimento refletidos na interface.
- Layout inspecionado em computador e celular de 390 × 844, sem transbordamento horizontal.
- Imagens carregadas e ausência de erros de JavaScript na inspeção do navegador.

Essas verificações se referem ao prólogo. Elas não comprovam funcionamento dos recursos planejados para o jogo completo.

### Revisão de 18/10/2026

- Build e sintaxe aprovados; arquivos de áudio servidos como `audio/wav`.
- Ilustração RGBA carregada com transparência real. O arquivo original da cabana foi preservado.
- Entrada com som, legenda e estado de reação da velha verificados juntos no navegador.
- Silenciar remove a reação de fala; o modo completo mantém a animação de respiração.
- Nome vazio ou contendo somente espaços rejeitado; confirmação de Lenormand e limpeza dos dados de teste verificadas.
- Menu e painéis inspecionados em 1365 × 768 e 390 × 844, sem transbordamento horizontal.
- Nenhum erro de JavaScript observado durante esses fluxos.
