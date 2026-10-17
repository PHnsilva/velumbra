# Prólogo funcional

Entrega preparatória solicitada antes da sprint 1. As 20 sprints continuam pendentes; esta versão valida a abertura, a atmosfera e o menu.

Disponível em [velumbra-hazel.vercel.app](https://velumbra-hazel.vercel.app/). A Vercel confirmou o deploy de produção do commit `790102b` no plano Hobby; o endereço publicado foi aberto para conferir a abertura e o menu. Alterações posteriores de documentação não modificam o código desse prólogo.

## Implementado

- Abertura com ícone original, nome Velumbra, animação e transição automática. É possível entrar imediatamente ou rever a abertura.
- Cenário original em pixel art, com paralaxe, luz oscilante, névoa e partículas que reagem ao ponteiro. Cliques no fundo produzem uma ondulação sutil.
- Carta da cartomante flutuando e falas ao tocar a carta.
- Menu com preparação de consulta, prévias dos baralhos, diário e ajustes.
- Nome, forma de tratamento e escolha de uma das quatro tradições, com confirmação contextual e armazenamento local.
- Três amostras textuais por tradição. A interface identifica explicitamente a coleção como prévia.
- Diário vazio real, sem criar consultas fictícias.
- Ambiente sonoro sintetizado no navegador, volume, silêncio, redução de movimento e limpeza de identificação.
- Fontes, imagens e código servidos localmente. A abertura não depende de serviços de IA, CDNs ou credenciais.
- Diálogos com foco gerenciado, fechamento por Escape e navegação por teclado nas abas.

## Limites

Ainda não há sorteio, leitura de perguntas, veredito, 270 ilustrações ou animação corporal da velha. O ícone é uma ilustração estática apresentada com movimento; não é um personagem animado em camadas. A fala aparece em texto; o áudio é ambiente, sem dublagem.

## Organização

- `index.html`: estrutura da abertura e menu.
- `src/prologue.css`: cenário, composição, animações e responsividade.
- `src/prologue.js`: navegação, prévias, preferências, partículas e áudio.
- `src/fonts.css` e `public/fonts/`: tipografia local e licenças SIL OFL.
- `public/art/cabin.png`: cenário gerado para a abertura.
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

O som inicia somente por interação explícita. Ao ocultar a aba, áudio e partículas são suspensos. Redução de movimento respeita a preferência do sistema na primeira visita e pode ser alterada na própria interface.

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
