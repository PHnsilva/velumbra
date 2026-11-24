import { drawPlayableLenormand, guidedQuestions, interpretGuided, lenormandPreview } from './playable-lenormand.ts';
import { ReadingJournal } from './journal.ts';

export function createConsultation({ document, setPanel, closePanel, scene, getMotion }) {
  const view = document.defaultView;
  const $ = selector => document.querySelector(selector);
  let pending = null;
  let current = null;
  const unavailableStorage = { getItem() { throw new Error('unavailable'); }, setItem() { throw new Error('unavailable'); }, removeItem() { throw new Error('unavailable'); } };
  let storage;
  try { storage = view.localStorage; } catch { storage = unavailableStorage; }
  const journal = new ReadingJournal(storage);
  const button = (id, text, secondary = false) => `<button type="button" class="action-button${secondary ? ' secondary' : ''}" id="${id}">${text}</button>`;
  function text(tag, value, parent, className = '') {
    const element = document.createElement(tag);
    element.textContent = value;
    element.className = className;
    parent.append(element);
    return element;
  }
  function status(message) { $('#reading-status').textContent = message; }
  function cancelPending() { if (pending !== null) view.clearTimeout(pending); pending = null; }
  function showSetup() {
    current = null;
    setPanel('Uma consulta na cabana', `<p class="edition-label">Petit Lenormand · 36 cartas · edição de teste</p>
      <p class="panel-lead">Pense na situação que deseja observar. Escolha uma pergunta e deixe os símbolos se encontrarem.</p>
      <form id="reading-form"><label class="field" for="reading-question">Pergunta guiada<select id="reading-question"></select></label>
      <fieldset class="spread-choice"><legend>Quantas cartas?</legend><label><input type="radio" name="spread-size" value="1" checked> Uma carta · um ponto de atenção</label><label><input type="radio" name="spread-size" value="3"> Três cartas · uma leitura em conjunto</label></fieldset>
      <p class="scope-note">Leitura guiada, sem IA. Texto e ilustrações desta edição ainda estão em revisão. Os outros baralhos continuam disponíveis como amostras.</p>
      <p id="reading-status" role="status" aria-live="polite"></p><div class="actions"><button type="submit" class="action-button" id="start-draw">Embaralhar e tirar</button>${button('reading-library', 'Examinar as 36 cartas', true)}</div></form>`);
    for (const [id, value] of Object.entries(guidedQuestions)) {
      const option = document.createElement('option'); option.value = id; option.textContent = value.question; $('#reading-question').append(option);
    }
    $('#reading-library').addEventListener('click', showLibrary);
    $('#reading-form').addEventListener('submit', event => {
      event.preventDefault();
      const size = Number($('input[name="spread-size"]:checked')?.value);
      const questionId = $('#reading-question').value;
      if (![1, 3].includes(size) || !Object.hasOwn(guidedQuestions, questionId)) { status('Escolha uma tiragem e uma pergunta válidas.'); return; }
      try {
        const spread = drawPlayableLenormand(size, view.crypto);
        current = { id: view.crypto.randomUUID(), createdAt: new Date().toISOString(), question: guidedQuestions[questionId].question, spread, questionId, revealed: new Set(), saved: false };
      } catch {
        status('Não foi possível sortear com segurança. Atualize a página e tente novamente.'); return;
      }
      $('#start-draw').disabled = true;
      $('#reading-library').disabled = true;
      status('A velha embaralha as cartas…');
      scene.performGesture('shuffle');
      pending = view.setTimeout(() => { pending = null; showSpread(); scene.performGesture('deal'); }, getMotion() === 'reduced' ? 0 : 650);
    });
  }
  function renderCard(card, parent) {
    const article = document.createElement('article'); article.className = 'reading-card'; parent.append(article);
    const image = document.createElement('img'); image.src = card.assetPath; image.alt = `Ilustração de ${card.name}`; image.width = 180; image.height = 280; image.loading = 'lazy'; article.append(image);
    text('p', card.numberLabel, article, 'card-number'); text('h3', card.name, article); text('p', card.summary ?? card.content.summary, article);
    return article;
  }
  function showSpread() {
    if (!current) return showSetup();
    setPanel('Sua tiragem', `<p class="edition-label">Lenormand · leitura guiada · edição de teste</p><p id="draw-question" class="panel-lead"></p><p id="reading-status" role="status" aria-live="polite">Toque nas cartas para revelá-las.</p><div class="reading-cards" id="spread-cards"></div><section id="reading-interpretation" hidden></section><div class="actions" id="reading-actions">${button('reading-again', 'Nova consulta', true)}</div>`);
    $('#draw-question').textContent = current.question;
    current.spread.cards.forEach((card, index) => {
      const slot = document.createElement('div'); slot.className = 'reading-slot'; $('#spread-cards').append(slot);
      const reveal = document.createElement('button'); reveal.type = 'button'; reveal.className = 'card-back'; reveal.id = `reveal-${index}`; reveal.setAttribute('aria-label', `Revelar carta ${index + 1}`); reveal.textContent = `Carta ${index + 1}`; slot.append(reveal);
      reveal.addEventListener('click', () => {
        if (!current || current.revealed.has(index)) return;
        current.revealed.add(index); slot.replaceChildren(); const article = renderCard(card, slot); article.tabIndex = -1;
        scene.performGesture('reveal'); article.focus({ preventScroll: true });
        status(`${current.revealed.size} de ${current.spread.cards.length} cartas reveladas.`);
        if (current.revealed.size === current.spread.cards.length) showInterpretation();
      });
    });
    $('#reading-again').addEventListener('click', showSetup);
  }
  function showInterpretation() {
    const interpretation = interpretGuided(current.spread, current.questionId);
    const area = $('#reading-interpretation'); area.hidden = false;
    text('h3', 'Os símbolos em conjunto', area);
    for (const line of interpretation.links) text('p', line, area);
    if (!interpretation.links.length) text('p', current.spread.cards[0].summary, area);
    text('h3', 'O Veredito', area); text('p', interpretation.verdict, area);
    $('#reading-actions').insertAdjacentHTML('afterbegin', button('save-reading', 'Guardar no diário'));
    $('#save-reading').addEventListener('click', () => {
      if (!current || current.saved) return;
      const { id, createdAt, question, spread } = current;
      const result = journal.tryAppend({ id, createdAt, question, spread });
      if (result.status === 'saved') { current.saved = true; $('#save-reading').disabled = true; $('#save-reading').textContent = 'Guardada'; status('Consulta salva somente neste navegador.'); }
      else if (result.status === 'invalid-data') status('Seu diário contém dados incompatíveis. Abra o Diário para recuperar uma cópia antes de limpar; esta consulta continua na tela.');
      else status('Não foi possível salvar. O armazenamento pode estar bloqueado ou cheio. Sua leitura continua nesta tela; tente novamente.');
    });
  }
  function showLibrary() {
    setPanel('Petit Lenormand', `<p class="edition-label">36 cartas · edição de teste</p><p>Textos e ilustrações originais em revisão. Toque numa carta para ampliar.</p><div class="full-library" id="full-library"></div><div class="actions">${button('library-play', 'Fazer uma consulta')}</div>`);
    for (const card of lenormandPreview.records) {
      const item = document.createElement('button'); item.type = 'button'; item.className = 'library-card'; item.dataset.cardId = card.id;
      const image = document.createElement('img'); image.src = card.art.assetPath; image.alt = ''; image.width = 110; image.height = 170; image.loading = 'lazy'; item.append(image);
      text('span', `${card.numberLabel} · ${card.name}`, item); $('#full-library').append(item);
      item.addEventListener('click', () => {
        setPanel(card.name, `<div id="enlarged-card"></div><div class="actions">${button('library-return', 'Voltar às 36 cartas', true)}${button('library-play', 'Fazer uma consulta')}</div>`);
        renderCard({ ...card, assetPath: card.art.assetPath }, $('#enlarged-card'));
        $('#library-return').addEventListener('click', () => { showLibrary(); [...document.querySelectorAll('[data-card-id]')].find(node => node.dataset.cardId === card.id)?.focus(); });
        $('#library-play').addEventListener('click', showSetup);
      });
    }
    $('#library-play').addEventListener('click', showSetup);
  }
  function showJournal() {
    const result = journal.read();
    setPanel('Diário', `<p class="scope-note">Leituras guardadas somente neste navegador. Exporte uma cópia para conservar o histórico.</p><p id="reading-status" role="status" aria-live="polite"></p><div id="journal-entries"></div><div class="actions" id="journal-actions">${button('journal-import', 'Restaurar cópia', true)}${button('journal-back', 'Voltar', true)}</div>`);
    $('#journal-back').addEventListener('click', closePanel);
    $('#journal-import').addEventListener('click', showImport);
    if (result.status === 'unavailable') { status('O armazenamento está indisponível. As leituras não foram apagadas. Verifique as permissões do navegador.'); return; }
    if (result.status === 'invalid') {
      status('Há dados incompatíveis neste diário. Eles foram preservados. Copie os dados antes de limpar para tentar recuperá-los depois.');
      backupActions(result.raw); return;
    }
    if (!result.document.entries.length) text('p', 'Nenhuma leitura registrada. Faça uma consulta e escolha Guardar no diário.', $('#journal-entries'));
    for (const entry of [...result.document.entries].reverse()) {
      const article = document.createElement('article'); article.className = 'journal-entry'; $('#journal-entries').append(article);
      text('h3', entry.question, article); text('p', new Date(entry.createdAt).toLocaleString('pt-BR'), article, 'scope-note');
      text('p', entry.spread.cards.map(card => card.name).join(' → '), article);
      const open = document.createElement('button'); open.type = 'button'; open.className = 'action-button secondary'; open.textContent = 'Abrir leitura'; article.append(open);
      open.addEventListener('click', () => showEntry(entry));
    }
    if (result.document.entries.length) backupActions(journal.export());
  }
  function backupActions(serialized) {
    $('#journal-actions').insertAdjacentHTML('afterbegin', button('journal-export', 'Exportar cópia', true) + button('journal-clear', 'Limpar diário', true));
    $('#journal-export').addEventListener('click', () => {
      setPanel('Cópia do diário', `<p>Copie e guarde este conteúdo em um arquivo .json. Ele pode ser restaurado neste navegador.</p><label class="field" for="journal-backup">Dados do diário<textarea id="journal-backup" rows="8" readonly></textarea></label><div class="actions">${button('backup-return', 'Voltar ao diário', true)}</div>`);
      $('#journal-backup').value = serialized; $('#journal-backup').select(); $('#backup-return').addEventListener('click', showJournal);
    });
    $('#journal-clear').addEventListener('click', () => {
      setPanel('Limpar o diário?', `<p>Essa ação apaga todas as leituras deste navegador. Exporte uma cópia antes de continuar. Nome, som e outras preferências serão preservados.</p><p id="reading-status" role="status"></p><div class="actions">${button('confirm-clear', 'Apagar todas as leituras')}${button('cancel-clear', 'Cancelar', true)}</div>`);
      $('#cancel-clear').addEventListener('click', showJournal);
      $('#confirm-clear').addEventListener('click', () => { if (journal.tryClear().status === 'cleared') showJournal(); else status('Não foi possível apagar. Os dados foram preservados.'); });
    });
  }
  function showImport() {
    setPanel('Restaurar diário', `<p>A restauração substitui o diário atual por uma cópia válida. Exporte as leituras atuais antes de continuar. Dados incompatíveis devem ser copiados e limpos primeiro.</p><form id="journal-import-form"><label class="field" for="journal-import-data">Conteúdo da cópia .json<textarea id="journal-import-data" rows="8" maxlength="1000000" required></textarea></label><label class="restore-confirm"><input type="checkbox" id="confirm-restore" required> Quero substituir as leituras deste navegador pela cópia.</label><p id="reading-status" role="status" aria-live="polite"></p><div class="actions"><button type="submit" class="action-button">Restaurar cópia</button>${button('import-back', 'Cancelar', true)}</div></form>`);
    $('#import-back').addEventListener('click', showJournal);
    $('#journal-import-form').addEventListener('submit', event => {
      event.preventDefault();
      const raw = $('#journal-import-data').value;
      if (!$('#confirm-restore').checked || raw.length > 1000000) { status('Confirme a substituição e use uma cópia de até 1 MB.'); return; }
      const result = journal.tryRestore(raw);
      if (result.status === 'restored') { showJournal(); status('Cópia restaurada neste navegador.'); }
      else status(result.status === 'invalid-data' ? 'A cópia ou o diário atual é incompatível. Os dados atuais não foram alterados.' : 'Não foi possível restaurar. O armazenamento pode estar bloqueado ou cheio.');
    });
  }
  function showEntry(entry) {
    setPanel('Leitura guardada', `<p id="entry-question" class="panel-lead"></p><p class="edition-label">Leitura simbólica guardada · edição de teste</p><div class="reading-cards" id="entry-cards"></div><div class="actions">${button('entry-back', 'Voltar ao diário', true)}</div>`);
    $('#entry-question').textContent = entry.question;
    for (const card of entry.spread.cards) renderCard(card, $('#entry-cards'));
    $('#entry-back').addEventListener('click', showJournal);
  }
  return { showSetup, showJournal, showLibrary, cancelPending };
}
