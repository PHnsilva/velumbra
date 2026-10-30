export default function Cabin() {
  return (
    <>
<svg className="object-drawings" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs>
    <symbol id="cards" viewBox="0 0 24 24"><path d="M7 3h13v17H7zM3 7v16h13M10 7h7v9h-7z"/></symbol>
    <symbol id="journal" viewBox="0 0 24 24"><path d="M4 3h16v19H4zM8 3v19M11 8h6M11 12h6M11 16h4"/></symbol>
    <symbol id="tuning" viewBox="0 0 24 24"><path d="M5 3v18M12 3v18M19 3v18M2 8h6M9 16h6M16 6h6"/></symbol>
    <symbol id="speaker" viewBox="0 0 24 24"><path d="M3 9h4l6-5v16l-6-5H3zM17 8v8M21 5v14"/></symbol>
  </defs></svg>
  <div className="scene" aria-hidden="true"><canvas id="room"></canvas><div className="vignette"></div></div>
  <section className="intro" id="intro" aria-label="Abertura de Velumbra">
    <div className="intro-mark"><img src="/brand/velumbra-icon.png" alt="Ícone de Velumbra: uma velha sob um véu e uma vela" width="1254" height="1254" /></div>
    <h1 className="intro-title">VELUMBRA</h1>
    <div className="entrance"><button id="skip-intro">Entrar com som</button><button id="silent-entry">Entrar em silêncio</button></div>
  </section>
  <main className="menu" id="menu" inert hidden>
    <header className="topbar">
      <h1 id="game-title" tabIndex={-1}>VELUMBRA</h1>
      <nav className="tools" aria-label="Controles da cabana">
        <button className="tool" data-panel="decks" aria-label="Baralhos" title="Baralhos"><svg aria-hidden="true"><use href="#cards"/></svg><span>Baralhos</span></button>
        <button className="tool diary-tool" data-panel="journal" aria-label="Diário" title="Diário"><svg aria-hidden="true"><use href="#journal"/></svg><span>Diário</span></button>
        <button className="tool" data-panel="settings" aria-label="Som e movimento" title="Som e movimento"><svg aria-hidden="true"><use href="#tuning"/></svg><span>Ajustes</span></button>
        <button className="tool audio-toggle" id="audio-toggle" aria-pressed="false" aria-label="Ouvir a cabana" title="Ouvir a cabana"><svg aria-hidden="true"><use href="#speaker"/></svg><span id="audio-label">Som</span></button>
      </nav>
    </header>
    <div className="entity-stage" id="entity-stage">
      <button className="entity" id="portrait" aria-label="Falar com a velha"><canvas id="elder" width="180" height="240" aria-hidden="true"></canvas></button>
      <div className="whisper" id="whisper" role="status" aria-live="polite" hidden><p>Diga seu nome.</p></div>
    </div>
    <button className="table-area" id="table-area" aria-label="Mesa: informar seu nome" tabIndex={-1}></button>
    <form id="table-form" className="table-form">
      <label className="sr-only" htmlFor="table-name">Qual seu nome?</label>
      <div className="name-line"><input id="table-name" name="name" placeholder="Qual seu nome?" autoComplete="given-name" minLength={2} maxLength={32} required aria-describedby="name-error" /><button type="submit" className="name-enter" aria-label="Confirmar nome" title="Confirmar nome">→</button></div>
      <p className="error" id="name-error" role="alert" hidden></p>
    </form>
  </main>
  <p className="sr-only" id="audio-status" role="status" aria-live="polite"></p>
  <dialog id="panel" aria-labelledby="panel-title"><div className="dialog-shell"><header className="dialog-header"><h2 id="panel-title" tabIndex={-1}></h2><button id="close-panel" className="close-button" aria-label="Voltar à cabana">×</button></header><div id="panel-content"></div><footer className="dialog-footer"><span>VELUMBRA</span><kbd>ESC</kbd></footer></div></dialog>
  <noscript><div className="noscript">Ative o JavaScript para abrir Velumbra.</div></noscript>

    </>
  );
}
