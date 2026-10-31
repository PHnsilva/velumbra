# Acompanhamento do Velumbra

## Ciclo diário

Autorizado em 29/10/2026: um PR por dia com alteração verificável, inclusive sábado, domingo e o dia da revisão. Sete por semana completa; a primeira semana, iniciada na quinta-feira, tem quatro datas previstas.

Rotinas cadastradas no aplicativo: desenvolvimento às 10h e preparação da revisão aos domingos às 18h, America/Sao_Paulo. Primeira execução diária em 30/10 e primeira revisão em 01/11. As rotinas locais dependem de computador e aplicativo disponíveis. Falha de acesso não conta como entrega; nenhum PR artificial deve ser criado para completar a contagem.

PRs aguardam revisão conjunta de Pedro antes de integrar e atualizar produção. As sprints não correspondem a dias. A progressão começa em 30/10/2026; o PR de 29/10 é exclusivamente manutenção do prólogo. As 20 sprints continuam sem aceite de conclusão.

## Produção

Prólogo 0.0.3, commit `06e2029`, em https://velumbra-hazel.vercel.app/. Verificado em 29/10/2026: HTTP 200 e implantação Vercel com status `success`. O sistema ainda não contém tiragem, interpretação ou catálogo completo.

## 29/10/2026: manutenção do prólogo

Branch: `daily/2026-10-29-prologue-fixes`. Estado: alterações propostas para revisão, sem merge ou atualização da produção.

Problemas identificados:

- Nome e tratamento editados no formulário eram perdidos ao visitar os baralhos e escolher uma tradição.
- O botão de voltar dos baralhos fechava a identificação em vez de retornar ao formulário que abriu a biblioteca.
- Erros de nome não marcavam o campo como inválido e podiam continuar visíveis após correção ou limpeza dos dados.
- O build reutilizava arquivos antigos em `dist/` e dependia da pasta de execução.

Correções:

- Rascunho em memória durante a exploração dos baralhos, sem gravar alterações não confirmadas. Ao fechar o painel, o rascunho é descartado; os dados confirmados continuam preservados.
- Retorno contextual à identificação, mantido também ao navegar pelas abas com teclado.
- Estado `aria-invalid` e limpeza dos erros ao editar o nome ou apagar a identificação.
- Build usa a raiz do projeto e recria somente a pasta gerada `dist/`, verificando antes seu destino absoluto.
- Regressões de DOM e build pelo Node.js/jsdom, com lockfile e workflow de PR. O jsdom é usado só nos testes e não é enviado como dependência do jogo.

Verificação inicial: os testes reproduziram perda do rascunho, retorno incorreto, ausência do estado inválido e falha do build fora da pasta esperada. Após correção, seis testes aprovados com Node.js 24.19.0, além de sintaxe do controlador e do build, build estático e `git diff --check`. A cobertura inclui troca de baralho, retorno pelo teclado, descarte de rascunho, nome tratado como texto e remoção de artefatos obsoletos sem alterar fontes. O runner emite o aviso de API experimental de módulos VM do Node; isso não é um erro do jogo.

Limite: neste atendimento, a criação de abas foi bloqueada pelo modo lateral do aplicativo. Os testes usam o HTML e o controlador reais com DOM simulado; animação, áudio, layout e interação em navegador real não receberam nova aprovação visual. Essa conferência fica pendente para a revisão do PR. Arte, CSS, áudio e lógica de animação não foram alterados nesta manutenção.

PR de manutenção: [#1](https://github.com/PHnsilva/velumbra/pull/1), ainda aberto para revisão. Nenhuma alteração foi integrada na produção.

## 30/10/2026: sprint 1, fundação Next.js

Branch: `daily/2026-10-30-s01-foundation`. Base: `daily/2026-10-29-prologue-fixes`, do PR #1. Este incremento depende da manutenção; o diff é apenas o trabalho de 30/10 e a integração deve respeitar essa ordem. Estado: implementado na branch e proposto para revisão, ainda sem integração ou aceite da sprint.

PR: [#2](https://github.com/PHnsilva/velumbra/pull/2). Commits da implementação e evidência: `bf3bbc0` e `64910f4`.

Entrega:

- Aplicação Next.js 16.4.3 e React 19.3.1, com rota, layout, metadados e estrutura da cabana em TypeScript estrito. Versões fixadas no lockfile e execução na linha 24 do Node.js.
- Estrutura da cabana compartilhada entre a aplicação e os testes, sem cópia paralela de HTML. O controlador aprovado carrega depois da hidratação; arte, áudio, fonte e algoritmos de animação são preservados.
- Correções de rascunho, retorno, identificação e acessibilidade do PR #1 mantidas. Os módulos JS continuam como camada de compatibilidade; a migração do domínio não é declarada concluída.
- Publicação restrita a três módulos em `public/runtime/`, com limpeza do conteúdo gerado e resolução da raiz pelo script. A correção contra artefatos obsoletos é mantida nessa nova preparação.
- Configuração Next.js na Vercel e CI com build, tipos, sintaxe e testes de regressão. Nenhuma API ou serviço pago foi adicionado.

Validação local em 30/10/2026, Node.js 24.19.0:

- Build Next.js e `npm run check` aprovados; sete testes de DOM, empacotamento e servidor HTTP aprovados.
- Os testes de DOM renderizam o componente real e preservam os cenários de rascunho, retorno por teclado, erros, descarte e nome tratado como texto.
- O servidor do build real respondeu pela rota e por fonte, imagens, áudio e módulos; o conteúdo dos três módulos publicados corresponde às fontes atuais. Scripts internos, `src/` e arquivos Git não são servidos como recursos públicos.
- Edge: entrada em silêncio, nome vazio, rascunho de nome/tratamento, navegação até Thoth e Lenormand, confirmação, persistência após recarga e limpeza dos dados de teste conferidos. Balão da velha e fonte própria carregados. Ativação do som produziu o estado de reação da personagem; silêncio e redução de movimento refletidos na interface.
- Layout inspecionado em 1000 × 597 e 390 × 844, incluindo diário e posição do balão, sem transbordamento horizontal. Nenhum erro ou aviso do jogo observado no console desses fluxos. O viewport temporário foi restaurado e os dados de teste apagados.
- CI do commit `64910f4`: build, tipos, sintaxe e testes aprovados no GitHub Actions. Preview Vercel gerado com status de sucesso. O acesso externo ao preview redireciona para o login Vercel; a verificação visual desta rodada ocorreu no build local, e a revisão remota requer a sessão de Pedro. A proteção do preview não foi alterada.

Limites e pendências:

- Os sete testes não representam o jogo completo. A qualidade auditiva dos grunhidos e a aceitação da experiência continuam sujeitas à revisão humana; as verificações de áudio desta rodada cobrem ativação, silêncio e reação visual.
- Sprint 1 ainda exige a estrutura compartilhada e tipada dos quatro sistemas, revisão dos limites entre módulos, preview, integração e critério de aceite. Sprints 2–20 permanecem pendentes.
- A produção continua no commit `06e2029`; nenhum PR recebeu merge ou autoaprovação.

Próxima ação: revisar os PRs na ordem de dependência e fechar os limites entre módulos da sprint 1 antes de avançar para a sprint 2.

## 31/10/2026: sprint 1, catálogo tipado dos quatro sistemas

Branch: `daily/2026-10-31-s01-deck-types`. Base: `daily/2026-10-30-s01-foundation`, PR #2. Este incremento depende dos PRs #2 e #1; seu diff contém apenas o modelo compartilhado dos baralhos, a adaptação do runtime e a validação correspondente. Proposto para revisão no PR #3, ainda sem integração ou aceite.

Entrega:

- Catálogo compartilhado em TypeScript com identificadores, modelos discriminados e regras estruturais diferentes para os três tarôs e o Petit Lenormand.
- Rider–Waite–Smith, Marselha e Thoth registram naipes e figuras de corte próprios; Lenormand registra 36 símbolos, combinações e leitura sem inversões.
- A interface consome `samples`, com exatamente três prévias por sistema. As 270 cartas permanecem como contagens planejadas; não são apresentadas como conteúdo já cadastrado.
- O preparador compila o catálogo tipado para o módulo JavaScript público, sem expor compilador, scripts ou arquivos TypeScript ao navegador.
- Testes verificam identidade, contagens, diferenças de estrutura e o limite entre amostras e catálogo.

Validação em 31/10/2026:

- `npm run check` e `npm run build` aprovados localmente; `npm test` passou com 10 testes, incluindo navegação pelas quatro amostras e publicação do runtime compilado.
- Inspeção visual desktop/celular não executada: o uso de navegador local está desativado nas configurações atuais do Work. O preview da Vercel exige a sessão autenticada de Pedro; registrar a revisão visual como pendência, sem declarar aceite.
- Produção permanece no commit `06e2029`; nenhum PR foi integrado.

Limites e pendências:

- O modelo tipado não contém as 270 cartas, não implementa sorteio, orientação, combinações ou interpretação. As amostras continuam meramente editoriais.
- A sprint 1 segue em execução. A revisão dos limites entre módulos, a revisão humana dos PRs #1–#3, integração e aceite do critério da sprint ainda estão pendentes.

Próxima ação: revisar os PRs encadeados e continuar a separação dos contratos do domínio antes de iniciar as entregas da sprint 2.
