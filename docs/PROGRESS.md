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

Limites e pendências:

- Os sete testes não representam o jogo completo. A qualidade auditiva dos grunhidos e a aceitação da experiência continuam sujeitas à revisão humana; as verificações de áudio desta rodada cobrem ativação, silêncio e reação visual.
- Sprint 1 ainda exige a estrutura compartilhada e tipada dos quatro sistemas, revisão dos limites entre módulos, preview, integração e critério de aceite. Sprints 2–20 permanecem pendentes.
- A produção continua no commit `06e2029`; nenhum PR recebeu merge ou autoaprovação.

Próxima ação: revisar os PRs na ordem de dependência e continuar a estrutura dos quatro baralhos no próximo incremento diário da sprint 1.
