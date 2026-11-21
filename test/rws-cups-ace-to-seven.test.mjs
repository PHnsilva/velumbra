import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { rwsCupsAceToSevenDraft, rwsCupsAceToSevenArtwork } from "../src/card-catalog-drafts/rws-cups-ace-to-seven.ts";
import { validateCardCatalogBatch } from "../src/card-catalog.ts";
test("lote RWS Copas usa sete posições e rótulos do Ás ao Sete",()=>{const v=validateCardCatalogBatch(rwsCupsAceToSevenDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsCupsAceToSevenDraft.records.map(x=>x.position),[23,24,25,26,27,28,29]);assert.deepEqual(rwsCupsAceToSevenDraft.records.map(x=>x.numberLabel),["ÁS","2","3","4","5","6","7"]);assert.ok(rwsCupsAceToSevenDraft.records.every(x=>x.content.symbols.includes("copas")))});
test("cada carta tem proveniência separada e campos de direitos/revisão explícitos",()=>{for(const x of rwsCupsAceToSevenDraft.records){assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/naipe Cups/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending")}});
test("sete composições originais ficam em docs, fora dos assets públicos",()=>{assert.equal(rwsCupsAceToSevenArtwork.length,7);for(const f of rwsCupsAceToSevenArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
