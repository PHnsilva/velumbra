import assert from 'node:assert/strict';
import test from 'node:test';
import { openCabin } from './helpers/open-cabin.mjs';
import { drawPlayableLenormand, guidedQuestions, interpretGuided, lenormandPreview } from '../src/playable-lenormand.ts';
import { validateCardCatalogBatch } from '../src/card-catalog.ts';
import { drawReading } from '../src/reading.ts';

function draw(app, size = 3, question = 'general') {
  const { $ } = app;
  $('[data-panel="play"]').click();
  $(`#reading-question`).value = question;
  $(`input[name="spread-size"][value="${size}"]`).checked = true;
  app.submit('#reading-form'); app.flushTimers();
}
function reveal(app, size = 3) { for (let index = 0; index < size; index++) app.$(`#reveal-${index}`).click(); }

test('Lenormand completo de teste não fabrica revisão editorial nem libera o sorteio estrito', () => {
  const validation = validateCardCatalogBatch(lenormandPreview);
  assert.equal(validation.valid, true); assert.equal(validation.editoriallyReady, false);
  assert.equal(lenormandPreview.records.length, 36);
  assert.throws(() => drawReading(lenormandPreview, 1), /revisão editorial/);
  const rng = () => ({ getRandomValues(values) { values[0] = 17; return values; } });
  const spread = drawPlayableLenormand(3, rng());
  assert.equal(new Set(spread.cards.map(card => card.id)).size, 3);
  assert.ok(spread.cards.every(card => card.orientation === 'upright'));
  const original = JSON.stringify(spread);
  for (const question of Object.keys(guidedQuestions)) assert.ok(interpretGuided(spread, question).verdict.length > 40);
  assert.equal(JSON.stringify(spread), original);
  assert.deepEqual(drawPlayableLenormand(3, rng()), spread);
});

test('jornada sem nome revela três cartas e salva uma única consulta recuperável após recarregar', async t => {
  const app = await openCabin(t); const { $ } = app;
  draw(app);
  assert.equal($('#reading-interpretation').hidden, true);
  assert.equal($('#save-reading'), null);
  assert.ok(app.sceneGestures.includes('shuffle')); assert.ok(app.sceneGestures.includes('deal'));
  reveal(app);
  assert.equal($('#reading-interpretation').hidden, false);
  assert.match($('#reading-interpretation').textContent, /O Veredito/);
  assert.equal($('.reading-cards').querySelectorAll('img').length, 3);
  $('#save-reading').click(); $('#save-reading').click();
  const raw = app.window.localStorage.getItem('velumbra.reading-journal');
  const data = JSON.parse(raw); assert.equal(data.entries.length, 1);
  assert.equal(new Set(data.entries[0].spread.cards.map(card => card.id)).size, 3);
  assert.equal(app.saved(), null);
  const reloaded = await openCabin(t, { initialJournal: raw });
  reloaded.$('[data-panel="journal"]').click();
  assert.equal(reloaded.$('#journal-entries').querySelectorAll('article').length, 1);
  reloaded.$('#journal-entries button').click();
  assert.equal(reloaded.$('#entry-cards').querySelectorAll('img').length, 3);
  assert.equal(reloaded.$('#entry-question').textContent, data.entries[0].question);
  assert.equal(reloaded.$('#entry-interpretation p:last-child').textContent, data.entries[0].interpretation.verdict);
});

test('bundle publicado executa a jornada e ignora imagem arbitrária em diário importado', async t => {
  const app = await openCabin(t, { compiledConsultation: true });
  draw(app, 1); reveal(app, 1); app.$('#save-reading').click();
  const data = JSON.parse(app.window.localStorage.getItem('velumbra.reading-journal'));
  data.entries[0].spread.cards[0].assetPath = '/art/cards/untrusted.svg';
  data.entries[0].spread.cards[0].name = '<img src=x onerror=alert(1)>';
  const loaded = await openCabin(t, { initialJournal: JSON.stringify(data), compiledConsultation: true });
  loaded.$('[data-panel="journal"]').click(); loaded.$('#journal-entries button').click();
  assert.equal(loaded.$('#entry-cards img'), null);
  assert.match(loaded.$('#entry-cards h3').textContent, /<img/);
  assert.equal(loaded.$('#entry-interpretation p:last-child').textContent, data.entries[0].interpretation.verdict);
});

test('confirmação repetida durante embaralhamento mantém uma única tiragem', async t => {
  const app = await openCabin(t);
  app.$('[data-panel="play"]').click(); app.submit('#reading-form'); app.submit('#reading-form'); app.flushTimers();
  assert.equal(app.sceneGestures.filter(name => name === 'shuffle').length, 1);
});

test('uma carta, biblioteca completa e retorno de foco funcionam sem trocar tradições', async t => {
  const app = await openCabin(t); const { $ } = app;
  $('[data-panel="play"]').click(); $('#reading-library').click();
  assert.equal($('#full-library').children.length, 36);
  const first = $('#full-library button'); const id = first.dataset.cardId; first.click();
  assert.ok($('#enlarged-card img').getAttribute('src').startsWith('/art/cards/lenormand-preview/'));
  $('#library-return').click(); assert.equal(app.window.document.activeElement.dataset.cardId, id);
  $('#library-play').click(); app.submit('#reading-form'); app.flushTimers(); reveal(app, 1);
  assert.equal($('#spread-cards').querySelectorAll('img').length, 1);
  assert.match($('#reading-interpretation').textContent, /O Veredito/);
});

test('fechar durante o embaralhamento cancela transição e reduzido não impõe espera', async t => {
  const app = await openCabin(t); const { $ } = app;
  $('[data-panel="play"]').click(); app.submit('#reading-form'); $('#close-panel').click(); app.flushTimers();
  assert.equal($('#panel').open, false); assert.equal($('#spread-cards'), null);
  $('[data-panel="settings"]').click(); $('#setting-motion').checked = true; $('#setting-motion').dispatchEvent(new app.window.Event('change'));
  $('[data-panel="play"]').click(); app.submit('#reading-form'); app.flushTimers(0);
  assert.ok($('#spread-cards'));
});

test('diário inválido permanece intacto e pode ser copiado antes de exclusão confirmada', async t => {
  const raw = '{"schemaVersion":99,"secret":"<img src=x onerror=alert(1)>"}';
  const app = await openCabin(t, { initialJournal: raw }); const { $ } = app;
  draw(app, 1); reveal(app, 1); $('#save-reading').click();
  assert.match($('#reading-status').textContent, /incompatíveis/);
  assert.equal(app.window.localStorage.getItem('velumbra.reading-journal'), raw);
  $('#close-panel').click(); $('[data-panel="journal"]').click(); $('#journal-export').click();
  assert.equal($('#journal-backup').value, raw); assert.equal($('img[src="x"]'), null);
  $('#backup-return').click(); $('#journal-clear').click(); $('#cancel-clear').click();
  assert.equal(app.window.localStorage.getItem('velumbra.reading-journal'), raw);
  $('#journal-clear').click(); $('#confirm-clear').click();
  assert.equal(app.window.localStorage.getItem('velumbra.reading-journal'), null);
});

test('cota e leitura bloqueadas não impedem consulta nem anunciam salvamento', async t => {
  for (const storageFailure of ['read', 'write']) {
    const app = await openCabin(t, { storageFailure }); const { $ } = app;
    draw(app, 1); reveal(app, 1); $('#save-reading').click();
    assert.match($('#reading-status').textContent, /Não foi possível salvar/);
    assert.equal($('#save-reading').disabled, false); assert.ok($('#reading-interpretation'));
  }
});

test('restauração requer confirmação, recusa JSON inválido e preserva preferências ao limpar', async t => {
  const app = await openCabin(t); const { $ } = app;
  draw(app, 1); reveal(app, 1); $('#save-reading').click();
  const raw = app.window.localStorage.getItem('velumbra.reading-journal');
  $('#close-panel').click(); $('[data-panel="journal"]').click(); $('#journal-import').click();
  $('#journal-import-data').value = raw; app.submit('#journal-import-form');
  assert.match($('#reading-status').textContent, /Confirme/);
  $('#confirm-restore').checked = true; $('#journal-import-data').value = '{ broken'; app.submit('#journal-import-form');
  assert.equal(app.window.localStorage.getItem('velumbra.reading-journal'), raw);
  $('#journal-import-data').value = raw; app.submit('#journal-import-form');
  assert.match($('#reading-status').textContent, /restaurada/);
  app.window.localStorage.setItem('velumbra.prologue.v1', '{"sound":false}');
  $('#journal-clear').click(); $('#confirm-clear').click();
  assert.equal(app.window.localStorage.getItem('velumbra.prologue.v1'), '{"sound":false}');
  assert.equal(app.window.localStorage.getItem('velumbra.reading-journal'), null);
});
