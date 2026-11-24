import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {rwsWandsEightToKingDraft,rwsWandsEightToKingArtwork} from "../src/card-catalog-drafts/rws-wands-eight-to-king.ts";
import {validateCardCatalogBatch} from "../src/card-catalog.ts";
test("lote RWS Paus posições 44–50 cobre 8–10 e os quatro ranks",()=>{const v=validateCardCatalogBatch(rwsWandsEightToKingDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsWandsEightToKingDraft.records.map(x=>x.position),[44,45,46,47,48,49,50]);assert.deepEqual(rwsWandsEightToKingDraft.records.map(x=>x.numberLabel),["8","9","10","PAJEM","CAVALEIRO","RAINHA","REI"])});
test("símbolos e proveniência preservam a tradição e revisão/licença ficam pendentes",()=>{for(const x of rwsWandsEightToKingDraft.records){assert.ok(x.content.symbols.includes("paus"));assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/naipe Wands/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending")}});
test("sete artes estão em docs e ausentes do runtime público",()=>{assert.equal(rwsWandsEightToKingArtwork.length,7);for(const f of rwsWandsEightToKingArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
