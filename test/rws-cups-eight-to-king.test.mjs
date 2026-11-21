import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {rwsCupsEightToKingDraft,rwsCupsEightToKingArtwork} from "../src/card-catalog-drafts/rws-cups-eight-to-king.ts";
import {validateCardCatalogBatch} from "../src/card-catalog.ts";
test("lote RWS Copas posições 30–36 preserva números e cortes próprios",()=>{const v=validateCardCatalogBatch(rwsCupsEightToKingDraft);assert.equal(v.valid,true);assert.equal(v.editoriallyReady,false);assert.deepEqual(rwsCupsEightToKingDraft.records.map(x=>x.position),[30,31,32,33,34,35,36]);assert.deepEqual(rwsCupsEightToKingDraft.records.map(x=>x.numberLabel),["8","9","10","PAJEM","CAVALEIRO","RAINHA","REI"])});
test("origem, direitos e revisão ficam pendentes; cartas de corte são distintas",()=>{for(const x of rwsCupsEightToKingDraft.records){assert.equal(x.content.provenance.state,"pending");assert.match(x.content.provenance.references.join(" "),/naipe Cups/);assert.equal(x.art.provenance.license,null);assert.equal(x.review.state,"pending");assert.ok(x.content.symbols.includes("copas"))}assert.notEqual(rwsCupsEightToKingDraft.records[3].id,rwsCupsEightToKingDraft.records[4].id)});
test("sete artes existem fora do runtime público",()=>{assert.equal(rwsCupsEightToKingArtwork.length,7);for(const f of rwsCupsEightToKingArtwork){assert.ok(existsSync("docs/card-drafts/rws/"+f));assert.equal(existsSync("public/art/cards/rws/"+f),false);assert.match(readFileSync("docs/card-drafts/rws/"+f,"utf8"),/<svg/)}})
