import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { rwsSecondSevenDraft, rwsSecondDraftArtwork } from "../src/card-catalog-drafts/rws-positions-8-14.ts";
import { validateCardCatalogBatch } from "../src/card-catalog.ts";
test("lote RWS posições 8–14 é parcial, válido e editorialmente pendente",()=>{const v=validateCardCatalogBatch(rwsSecondSevenDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsSecondSevenDraft.records.map(x=>x.position),[8,9,10,11,12,13,14]);assert.deepEqual(rwsSecondSevenDraft.records.map(x=>x.numberLabel),["VII","VIII","IX","X","XI","XII","XIII"])});
test("origem, revisão e licença continuam pendentes, sem prognóstico fatalista",()=>{for(const r of rwsSecondSevenDraft.records){assert.equal(r.content.provenance.state,"pending");assert.match(r.content.provenance.references.join(" "),/Pictorial Key/);assert.equal(r.art.provenance.license,null);assert.equal(r.review.state,"pending")}assert.match(rwsSecondSevenDraft.records.find(r=>r.id==="rws:death").content.summary,/não anuncia morte literal/)});
test("sete SVGs existem em docs e não no runtime público",()=>{assert.equal(rwsSecondDraftArtwork.length,7);for(const file of rwsSecondDraftArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+file));assert.equal(existsSync("public/art/cards/rws/"+file),false);assert.match(readFileSync("docs/card-drafts/rws/"+file,"utf8"),/<svg/)}})
