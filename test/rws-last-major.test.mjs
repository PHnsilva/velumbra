import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { rwsTwentySecondMajorDraft } from "../src/card-catalog-drafts/rws-twenty-second-major.ts";
import { validateCardCatalogBatch } from "../src/card-catalog.ts";

test("O Mundo ocupa a posição 22 com rótulo XXI e permanece lote parcial não pronto", () => {
  const result = validateCardCatalogBatch(rwsTwentySecondMajorDraft);
  assert.equal(result.valid, true);
  assert.equal(result.editoriallyReady, false);
  assert.equal(rwsTwentySecondMajorDraft.scope, "batch");
  assert.deepEqual(rwsTwentySecondMajorDraft.records.map(card => [card.id, card.position, card.numberLabel]), [["rws:world", 22, "XXI"]]);
});
test("arte, texto, fonte e revisão mantêm trilhas separadas e não são publicadas", () => {
  const [card] = rwsTwentySecondMajorDraft.records;
  assert.equal(card.content.provenance.state, "pending");
  assert.match(card.content.provenance.references.join(" "), /The Pictorial Key/);
  assert.equal(card.art.provenance.license, null);
  assert.equal(card.review.state, "pending");
  assert.ok(existsSync("docs/card-drafts/rws/22-world.svg"));
  assert.equal(existsSync("public/art/cards/rws/22-world.svg"), false);
  assert.match(readFileSync("docs/card-drafts/rws/22-world.svg", "utf8"), /<svg/);
});
