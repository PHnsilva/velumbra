import type { CardCatalogBatch, CardCatalogRecord } from "../card-catalog";
import { CARD_CATALOG_SCHEMA_VERSION } from "../card-catalog";
const reference = "A. E. Waite, The Pictorial Key to the Tarot (1910), trunfos VII–XIII; consultado para sequência e vocabulário, sem reprodução de frases ou imagens. https://www.willemwitteveen.com/wp-content/uploads/2018/12/The-Pictorial-Key-to-the-Tarot.pdf";
const author = "Codex (assistente de IA; rascunho, revisão editorial pendente)";
const pendingReview = { state:"pending", reviewer:null, reviewedAt:null, checklist:{identity:false,numbering:false,tradition:false,content:false,art:false,provenance:false} } as const satisfies CardCatalogRecord["review"];
function draft(position:number,numberLabel:string,slug:string,name:string,summary:string,symbols:string[],artFile:string):CardCatalogRecord{return{id:"rws:"+slug,deckId:"rws",position,numberLabel,name,content:{summary,symbols,origin:"original",provenance:{state:"pending",author,references:[reference]}},art:{assetPath:"/art/cards/rws/"+artFile,origin:"original",provenance:{state:"pending",creator:author,license:null,evidence:[]}},review:pendingReview}}
export const rwsSecondSevenDraft:CardCatalogBatch={schemaVersion:CARD_CATALOG_SCHEMA_VERSION,deckId:"rws",batchId:"rws-major-arcana-positions-8-14-draft",scope:"batch",records:[
    draft(8,"VII","chariot","O Carro","Direção e disciplina podem ajudar a atravessar forças que puxam para lados diferentes. Observe se o ritmo escolhido ainda respeita seus limites.",["direção","disciplina","limites"],"08-chariot.svg"),
    draft(9,"VIII","strength","A Força","Coragem também pode aparecer como presença paciente diante do que assusta. Gentileza e firmeza não precisam se excluir.",["coragem","presença","gentileza"],"09-strength.svg"),
    draft(10,"IX","hermit","O Eremita","Recolhimento pode abrir espaço para escutar uma pergunta com menos ruído. Uma luz pequena já ajuda a escolher o próximo passo.",["recolhimento","escuta","orientação"],"10-hermit.svg"),
    draft(11,"X","wheel-of-fortune","A Roda da Fortuna","Circunstâncias mudam e nem tudo está sob controle. Perceber padrões pode ajudar a responder ao movimento sem tratar acaso como promessa.",["mudança","ciclos","resposta"],"11-wheel-of-fortune.svg"),
    draft(12,"XI","justice","A Justiça","Uma decisão pede atenção a fatos, responsabilidades e consequências. Buscar equilíbrio pode incluir reconhecer diferenças e corrigir o que for possível.",["discernimento","responsabilidade","equilíbrio"],"12-justice.svg"),
    draft(13,"XII","hanged-one","O Enforcado","Uma pausa ou mudança de perspectiva pode revelar aspectos antes ignorados. Esperar também é uma escolha, embora não resolva tudo por si só.",["pausa","perspectiva","espera"],"13-hanged-one.svg"),
    draft(14,"XIII","death","A Morte","Encerramentos podem liberar espaço para reorganizar o que continua. A carta não anuncia morte literal nem determina um desfecho.",["encerramento","transição","renovação"],"14-death.svg")
]};
export const rwsSecondDraftArtwork=["08-chariot.svg","09-strength.svg","10-hermit.svg","11-wheel-of-fortune.svg","12-justice.svg","13-hanged-one.svg","14-death.svg"] as const;
