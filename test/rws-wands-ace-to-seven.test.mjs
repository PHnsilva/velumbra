import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {rwsWandsAceToSevenDraft,rwsWandsAceToSevenArtwork} from "../src/card-catalog-drafts/rws-wands-ace-to-seven.ts";
import {validateCardCatalogBatch} from "../src/card-catalog.ts";
test("lote RWS Paus posições 37–43 contém Ás a Sete e permanece lote parcial",()=>{const v=validateCardCatalogBatch(rwsWandsAceToSevenDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsWandsAceToSevenDraft.records.map(x=>x.position),[37,38,39,40,41,42,43]);assert.deepEqual(rwsWandsAceToSevenDraft.records.map(x=>x.numberLabel),["ÁS","2","3","4","5","6","7"])});
test("cada conteúdo é próprio de Paus e mantém licença/revisão pendentes",()=>{for(const x of rwsWandsAceToSevenDraft.records){assert.ok(x.content.symbols.includes("paus"));assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/naipe Wands/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending")}});
test("sete SVGs ficam em docs, fora do runtime",()=>{assert.equal(rwsWandsAceToSevenArtwork.length,7);for(const f of rwsWandsAceToSevenArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
