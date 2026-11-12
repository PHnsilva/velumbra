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

Próxima ação: revisão do PR de manutenção e, a partir de 30/10, primeiro incremento da sprint 1 preservando essas correções. Não integrar a preparação da sprint 1 automaticamente.
