# Velumbra — rodada de 15/11/2026, issue #76

**Issue:** [#76, produzir lote 3 de Petit Lenormand (cartas 1–18)](https://github.com/PHnsilva/velumbra/issues/76), S1, tamanho M (4 unidades). **Estado:** rascunho parcial em PR para revisão; issue aberta e não aceita.

## Base e dependências

- Branch: `codex/2026-11-15-76-lenormand-lot3`; commit de implementação `621d65250f013e69b04e30394ee7b309bb04ad72`.
- PR [#97](https://github.com/PHnsilva/velumbra/pull/97), em rascunho para revisão; nenhum merge ou aceite por agente.
- Base direta PR #96 @ `e69a0923d7568eea57cf3af62fcf5eeca1f4e298`, sobre #95 @ `982c18ca57715cea20e1b4e51ee34039ad28b371`, depois #90 @ `b7a355318e07305556e02ef0aedfe9027635e7cc`, #89 @ `42f7020c48a58cec730d2e1e16e53af93099c9b3`, #3 @ `14fc529e8dd355afeb66afb01d6a7c67734f41e1`, #2 e #1. Os HEADs #95 e #96 passaram Actions e Vercel. #76 não depende funcionalmente de #75; a pilha compartilha os lotes e o registro cronológico.
- #76 depende de #37. O guia disponível em #90 foi tecnicamente validado e é consumido provisoriamente. #37, #36 e #7 continuam sem aceite humano. Ordem proposta: PR #97 → #96 → #95 → #90 → #89 → #3 → #2 → #1.

## Trabalho produzido

- Quatro resumos originais em português para as posições editoriais 15–18: Urso, Estrelas, Cegonha e Cão.
- Quatro esboços SVG com moldura/paleta comuns, em `docs/card-drafts/lenormand/third-four/`.
- Proveniência de texto e arte registrada separadamente; licença pendente, checklist sem revisão. Os desenhos permanecem fora de `public/` e do runtime.
- Teste conjunto dos lotes #74–#76: 18 posições consecutivas e 18 IDs únicos, regras Lenormand sem inversões, estrutura válida porém não pronta, e SVGs ausentes do caminho público. Referências e rastreio por carta em `docs/card-drafts/lenormand/third-four/README.md`.

## Validação

- Node `24.19.0`, npm `11.17.0`; dependências do lockfile instaladas offline pelo cache no C:.
- `npm run check` passou; `npm run build` passou e regenerou `public/runtime/` pelo script padrão; após o build, `npm test` passou **20/20**; `git diff --check` passou.
- Montagem PNG local das quatro artes examinada para legibilidade; não é revisão na interface. Nenhuma inspeção em navegador de produto foi feita.

## Limites, pontos e próxima ação

A licença de distribuição continua pendente de decisão de Pedro e os quatro registros aguardam revisão editorial/visual. O lote retorna `editoriallyReady: false`; nada foi integrado nem declarado como carta pronta.

**Pontos desta issue na meta diária: 0/4.** A issue M não está completa porque falta licença/proveniência final e revisão humana. Em 15/11, issues #75 e #76 somam 0/8 pontos contados; déficit para a meta mínima: 8 unidades. Não contei o rascunho de #74 novamente (rodada de 11/11) nem atribuí frações.

Próxima ação: Pedro decidir licença/atribuição e revisar os lotes 1–3; então completar proveniência, validar as artes na interface e preparar integração após revisão/aceite. Lote #77 e aceite agregado #26 permanecem pendentes.
