import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {rwsThirdSevenDraft,rwsThirdDraftArtwork} from "../src/card-catalog-drafts/rws-positions-15-21.ts";
import {validateCardCatalogBatch} from "../src/card-catalog.ts";
test("lote RWS posições 15–21 é parcial, válido e editorialmente pendente",()=>{const v=validateCardCatalogBatch(rwsThirdSevenDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsThirdSevenDraft.records.map(x=>x.position),[15,16,17,18,19,20,21]);assert.deepEqual(rwsThirdSevenDraft.records.map(x=>x.numberLabel),["XIV","XV","XVI","XVII","XVIII","XIX","XX"])});
test("origem, licença e revisão seguem pendentes; linguagem não determinística",()=>{for(const x of rwsThirdSevenDraft.records){assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/Pictorial Key/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending")}assert.match(rwsThirdSevenDraft.records.find(x=>x.id==="rws:devil").content.summary,/alternativas/);assert.match(rwsThirdSevenDraft.records.find(x=>x.id==="rws:tower").content.summary,/evidências/)});
test("sete SVGs ficam em docs, ausentes do runtime",()=>{assert.equal(rwsThirdDraftArtwork.length,7);for(const f of rwsThirdDraftArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
