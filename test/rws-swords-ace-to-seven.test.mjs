import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {rwsSwordsAceToSevenDraft,rwsSwordsAceToSevenArtwork} from "../src/card-catalog-drafts/rws-swords-ace-to-seven.ts";
import {validateCardCatalogBatch} from "../src/card-catalog.ts";
test("lote RWS Espadas posições 51–57 preserva Ás–Sete e é parcial",()=>{const v=validateCardCatalogBatch(rwsSwordsAceToSevenDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsSwordsAceToSevenDraft.records.map(x=>x.position),[51,52,53,54,55,56,57]);assert.deepEqual(rwsSwordsAceToSevenDraft.records.map(x=>x.numberLabel),["ÁS","2","3","4","5","6","7"])});
test("tradição, proveniência, licença e revisão estão explicitamente registradas",()=>{for(const x of rwsSwordsAceToSevenDraft.records){assert.ok(x.content.symbols.includes("espadas"));assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/naipe Swords/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending")}});
test("sete SVGs existem em docs e não são publicados",()=>{assert.equal(rwsSwordsAceToSevenArtwork.length,7);for(const f of rwsSwordsAceToSevenArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
