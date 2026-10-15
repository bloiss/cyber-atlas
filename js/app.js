/* =============================================================
   Cyber Atlas — logique du site
   Les contenus vivent dans /data/*.json : pour ajouter un outil,
   un terme ou une plateforme, modifie le JSON, pas ce fichier.
   ============================================================= */

const FICHIERS = ['plateformes', 'toolbox', 'bibliotheque', 'veille', 'parcours',
  'metiers', 'certifications', 'lexique', 'anki', 'projets'];
const D = {};

/* ---------- Petits utilitaires ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const lien = (url, texte) => url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(texte)}</a>` : esc(texte);
const NIVEAU_CLASSE = { 'Débutant': 'lvl-1', 'Essentiel': 'lvl-1', 'Intermédiaire': 'lvl-2', 'Utile': 'lvl-2', 'Avancé': 'lvl-3', 'Tous niveaux': 'lvl-0' };
const niv = n => NIVEAU_CLASSE[n] || '';

/* Stockage local (progression, thème) : par visiteur, dans son navigateur */
const store = {
  get(k, d) { try { const v = localStorage.getItem('atlas:' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('atlas:' + k, JSON.stringify(v)); } catch { /* stockage indisponible */ } }
};

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t); setTimeout(() => t.remove(), 2400);
}

/* Rangée de filtres « puces » */
function chipRow(el, valeurs, courant, onPick) {
  el.innerHTML = valeurs.map(v => `<button class="chip" aria-pressed="${v === courant}" data-v="${esc(v)}">${esc(v)}</button>`).join('');
  el.onclick = e => { const b = e.target.closest('.chip'); if (b) onPick(b.dataset.v); };
}

/* ---------- Thème clair / sombre ---------- */
function initTheme() {
  const saved = store.get('theme', null);
  if (saved) document.documentElement.dataset.theme = saved;
  $('#themeBtn').onclick = () => {
    const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next; store.set('theme', next);
  };
}

/* ---------- Navigation par ancre (#toolbox, #lexique…) ---------- */
function initNav() {
  const nav = $('#nav'), btn = $('#menuBtn');
  btn.onclick = () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', o); };
  nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); } });
  addEventListener('hashchange', () => show(location.hash.slice(1)));
}
function show(id) {
  const pages = $$('[data-page]');
  if (!pages.some(p => p.dataset.page === id)) id = 'accueil';
  pages.forEach(p => { p.hidden = p.dataset.page !== id; });
  $$('.nav a').forEach(a => a.getAttribute('href') === '#' + id ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  window.scrollTo(0, 0);
}

/* ---------- Compteurs affichés dans la page ---------- */
function renderCounts() {
  const n = { ...Object.fromEntries(FICHIERS.map(k => [k, D[k].length])), etapes: D.parcours.reduce((s, p) => s + p.etapes.length, 0) };
  $$('[data-count]').forEach(el => { el.textContent = n[el.dataset.count] ?? ''; });
}

/* ---------- Parcours 6 mois ---------- */
function renderParcours() {
  const done = store.get('parcours', {});
  let total = 0, fait = 0;
  $('#phases').innerHTML = D.parcours.map(ph => `
    <div class="phase"><div class="phase-label"><span class="mono">${esc(ph.periode)}</span><strong>${esc(ph.titre)}</strong></div>
    <div>${ph.etapes.map(e => {
      total++; if (done[e.id]) fait++;
      return `<div class="task ${done[e.id] ? 'done' : ''}"><input type="checkbox" id="p${esc(e.id)}" data-id="${esc(e.id)}" ${done[e.id] ? 'checked' : ''}>
        <div><label for="p${esc(e.id)}">${esc(e.titre)}</label>
        <div class="muted">Livrable : ${esc(e.livrable)}${e.lien ? ` · ${lien(e.lien, 'ressource')}` : ''}</div></div></div>`;
    }).join('')}</div></div>`).join('');
  $('#progFill').style.width = (total ? fait / total * 100 : 0) + '%';
  $('#progTxt').textContent = `${fait} / ${total}`;
  $('#navProg').textContent = fait ? `${fait}/${total}` : '';
}

/* ---------- Checklist du jour (Routine) ---------- */
const JOUR = ['Oral du matin (5 min)', 'Veille (15 min)', 'Anki (15 min)', 'Rappel des cours (20 min)',
  'Théorie (30 min)', 'Pratique + write-up (50–60 min)', 'Couché avant 23 h'];
function renderToday() {
  const key = 'jour:' + new Date().toISOString().slice(0, 10);
  const st = store.get(key, {});
  const n = JOUR.filter((_, i) => st[i]).length;
  $('#today').innerHTML = JOUR.map((t, i) => `<label><input type="checkbox" data-i="${i}" ${st[i] ? 'checked' : ''}> ${esc(t)}</label>`).join('') +
    `<div class="score" style="padding-top:8px;border-top:1px solid var(--line);margin-top:4px">Score du jour : ${Math.round(n / JOUR.length * 100)} %</div>`;
  $('#today').onchange = e => { const s = store.get(key, {}); s[e.target.dataset.i] = e.target.checked; store.set(key, s); renderToday(); };
}

/* ---------- Plateformes ---------- */
let platF = 'Tous';
function renderPlat() {
  chipRow($('#platChips'), ['Tous', ...new Set(D.plateformes.flatMap(p => p.domaines))], platF, v => { platF = v; renderPlat(); });
  const rows = D.plateformes.filter(p => platF === 'Tous' || p.domaines.includes(platF));
  $('#platCount').textContent = `${rows.length} / ${D.plateformes.length}`;
  $('#platList').innerHTML = rows.map(p => `<div class="row"><h3>${lien(p.lien, p.nom)}</h3>
    <div class="meta"><span class="tag ${niv(p.niveau)}">${esc(p.niveau)}</span><span class="tag">${esc(p.langue)}</span><span class="tag">${esc(p.cout)}</span></div>
    <p>${esc(p.pourquoi)}</p></div>`).join('');
}

/* ---------- Toolbox ---------- */
let toolLvl = 'Tous', toolCat = 'Toutes';
function renderTool() {
  chipRow($('#toolLvl'), ['Tous', 'Essentiel', 'Utile', 'Avancé'], toolLvl, v => { toolLvl = v; renderTool(); });
  chipRow($('#toolCat'), ['Toutes', ...new Set(D.toolbox.map(t => t.categorie))], toolCat, v => { toolCat = v; renderTool(); });
  const q = norm($('#toolQ').value);
  const rows = D.toolbox.filter(t => (toolLvl === 'Tous' || t.niveau === toolLvl) && (toolCat === 'Toutes' || t.categorie === toolCat)
    && (!q || norm(`${t.nom} ${t.description} ${t.categorie}`).includes(q)));
  $('#toolCount').textContent = `${rows.length} / ${D.toolbox.length}`;
  const groupes = [...new Set(rows.map(t => t.categorie))];
  $('#toolList').innerHTML = rows.length ? groupes.map(g => `<div class="group-title">${esc(g)}</div>` +
    rows.filter(t => t.categorie === g).map(t => `<div class="row"><h3>${lien(t.lien, t.nom)}</h3>
      <div class="meta"><span class="tag ${niv(t.niveau)}">${esc(t.niveau)}</span></div><p>${esc(t.description)}</p></div>`).join('')).join('')
    : '<div class="empty">Aucun outil ne correspond.</div>';
}

/* ---------- Bibliothèque ---------- */
let bibF = 'Tout';
function renderBib() {
  const vu = store.get('vu', {});
  chipRow($('#bibChips'), ['Tout', ...new Set(D.bibliotheque.map(b => b.format))], bibF, v => { bibF = v; renderBib(); });
  const rows = D.bibliotheque.filter(b => bibF === 'Tout' || b.format === bibF);
  const nVu = D.bibliotheque.filter(b => vu[b.titre]).length;
  $('#bibCount').textContent = `${nVu} vu${nVu > 1 ? 's' : ''} sur ${D.bibliotheque.length}`;
  $('#bibList').innerHTML = rows.map(b => `<div class="row"><h3>${lien(b.lien, b.titre)}</h3>
    <div class="meta"><span class="tag">${esc(b.format)}</span><span class="tag">${esc(b.langue)}</span>
    <label class="tag" style="cursor:pointer;gap:6px"><input type="checkbox" data-k="${esc(b.titre)}" ${vu[b.titre] ? 'checked' : ''} style="accent-color:var(--ok)"> vu</label></div>
    <p>${esc(b.pourquoi)} <span class="mono" style="font-size:.75rem">${b.themes.map(esc).join(' · ')}</span></p></div>`).join('');
}

/* ---------- Lexique ---------- */
let lexF = 'Tous';
function renderLex() {
  chipRow($('#lexChips'), ['Tous', ...[...new Set(D.lexique.map(l => l.domaine))].sort()], lexF, v => { lexF = v; renderLex(); });
  const q = norm($('#lexQ').value);
  const rows = D.lexique.filter(l => (lexF === 'Tous' || l.domaine === lexF) && (!q || norm(`${l.terme} ${l.definition}`).includes(q)));
  $('#lexCount').textContent = `${rows.length} / ${D.lexique.length}`;
  let lettre = '';
  $('#lexList').innerHTML = rows.length ? rows.map(l => {
    const L = norm(l.terme)[0].toUpperCase();
    const titre = L !== lettre ? `<div class="group-title">${(lettre = L)}</div>` : '';
    return titre + `<div class="row"><h3>${esc(l.terme)}</h3><div class="meta"><span class="tag">${esc(l.domaine)}</span></div><p>${esc(l.definition)}</p></div>`;
  }).join('') : '<div class="empty">Aucun terme ne correspond.</div>';
}

/* ---------- Cartes Anki ---------- */
let ankiF = 'Tous';
function renderAnki() {
  chipRow($('#ankiChips'), ['Tous', ...new Set(D.anki.map(a => a.theme))], ankiF, v => { ankiF = v; renderAnki(); });
  const rows = D.anki.filter(a => ankiF === 'Tous' || a.theme === ankiF);
  $('#ankiCount').textContent = `${rows.length} cartes`;
  $('#ankiList').innerHTML = rows.map(a => `<details class="row" style="display:block"><summary style="cursor:pointer;font-weight:500">${esc(a.question)}</summary>
    <p style="margin-top:6px;color:var(--accent);font-weight:600">${esc(a.reponse)}</p></details>`).join('');
}

/* ---------- Veille ---------- */
function renderVeille() {
  const cls = f => f === 'Chaque jour' ? 'lvl-3' : f === 'Hebdo' ? 'lvl-1' : 'lvl-2';
  $('#veiList').innerHTML = D.veille.map(v => `<div class="row"><h3>${lien(v.lien, v.source)}</h3>
    <div class="meta"><span class="tag ${cls(v.frequence)}">${esc(v.frequence)}</span><span class="tag">${esc(v.langue)}</span><span class="tag">${esc(v.type)}</span></div>
    <p>${esc(v.contenu)}</p></div>`).join('');
}

/* ---------- Projets ---------- */
let projType = 'Tous';
function renderProjets() {
  chipRow($('#projChips'), ['Tous', ...new Set(D.projets.map(p => p.type))], projType, v => { projType = v; renderProjets(); });
  const rows = D.projets.filter(p => projType === 'Tous' || p.type === projType).sort((a, b) => b.date.localeCompare(a.date));
  $('#projCount').textContent = `${rows.length} / ${D.projets.length}`;
  $('#projList').innerHTML = rows.length ? rows.map(p => `<div class="row"><h3>${lien(p.lien, p.titre)}</h3>
    <div class="meta"><span class="tag ${niv(p.niveau)}">${esc(p.niveau)}</span><span class="tag">${esc(p.type)}</span><span class="tag mono">${esc(p.date)}</span></div>
    <p>${esc(p.resume)}${p.outils && p.outils.length ? ` <span class="mono" style="font-size:.75rem">${p.outils.map(esc).join(' · ')}</span>` : ''}</p></div>`).join('')
    : '<div class="empty">Aucun projet pour l’instant. Ajoute ton premier write-up dans data/projets.json.</div>';
}

/* ---------- Métiers ---------- */
let metF = 'Tous';
function renderMet() {
  chipRow($('#metChips'), ['Tous', ...new Set(D.metiers.map(m => m.equipe))], metF, v => { metF = v; renderMet(); });
  $('#metList').innerHTML = D.metiers.filter(m => metF === 'Tous' || m.equipe === metF).map(m => `<div class="card">
    <div style="display:flex;justify-content:space-between;gap:8px;align-items:start"><h3>${esc(m.metier)}</h3><span class="tag">${esc(m.equipe)}</span></div>
    <p class="muted">${esc(m.quotidien)}</p>
    <dl><dt>Compétences</dt><dd>${esc(m.competences)}</dd>
    <dt>Salaire débutant</dt><dd class="tnum"><strong>${esc(m.salaire)}</strong> · sortie d'école : ${esc(m.sortieEcole)}</dd>
    <dt>Certifs utiles</dt><dd>${esc(m.certifs)}</dd></dl></div>`).join('');
}

/* ---------- Certifications ---------- */
function renderCert() {
  const noms = ['', 'Premier pas', 'Junior', 'Confirmé', 'Expert'];
  $('#certList').innerHTML = [1, 2, 3, 4].map(n => `<div class="phase"><div class="phase-label"><span class="mono">NIVEAU ${n}</span><strong>${noms[n]}</strong></div><div>` +
    D.certifications.filter(c => c.niveau === n).map(c => `<div class="task" style="grid-template-columns:minmax(0,1fr)"><div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;justify-content:space-between"><strong>${lien(c.lien, c.nom)}</strong>
      <span class="meta"><span class="tag">${esc(c.voie)}</span><span class="tag">${esc(c.format)}</span><span class="tag ${c.cout === 'Gratuit' ? 'lvl-1' : ''}">${esc(c.cout)}</span></span></div>
      <div class="muted">${esc(c.organisme)} · ${esc(c.quand)}</div></div></div>`).join('') + '</div></div>').join('');
}

/* ---------- Recherche globale ---------- */
function runSearch() {
  const brut = $('#q').value.trim(), q = norm(brut);
  if (!q) { if (location.hash === '#recherche') history.back(); return; }
  const hits = [];
  const add = (cat, ancre, titre, texte, url) => hits.push({ cat, ancre, titre, texte, url });
  D.toolbox.forEach(t => norm(`${t.nom} ${t.description}`).includes(q) && add('Toolbox', '#toolbox', t.nom, t.description, t.lien));
  D.lexique.forEach(l => norm(`${l.terme} ${l.definition}`).includes(q) && add('Lexique', '#lexique', l.terme, l.definition));
  D.plateformes.forEach(p => norm(`${p.nom} ${p.pourquoi}`).includes(q) && add('Plateforme', '#plateformes', p.nom, p.pourquoi, p.lien));
  D.bibliotheque.forEach(b => norm(`${b.titre} ${b.pourquoi}`).includes(q) && add('Bibliothèque', '#bibliotheque', b.titre, b.pourquoi, b.lien));
  D.metiers.forEach(m => norm(`${m.metier} ${m.quotidien}`).includes(q) && add('Métier', '#metiers', m.metier, m.quotidien));
  D.certifications.forEach(c => norm(`${c.nom} ${c.quand}`).includes(q) && add('Certification', '#certifications', c.nom, c.quand, c.lien));
  $('#searchTitle').textContent = `${hits.length} résultat${hits.length > 1 ? 's' : ''} pour « ${brut} »`;
  $('#searchList').innerHTML = hits.length ? hits.map(h => `<div class="row"><h3>${h.url ? lien(h.url, h.titre) : `<a href="${h.ancre}">${esc(h.titre)}</a>`}</h3>
    <div class="meta"><a class="tag" href="${h.ancre}">${esc(h.cat)}</a></div><p>${esc(h.texte)}</p></div>`).join('')
    : '<div class="empty">Rien trouvé. Essaie « réseau », « SQL » ou « forensic ».</div>';
  if (location.hash !== '#recherche') location.hash = 'recherche'; else show('recherche');
}

/* ---------- Petits modules ---------- */
const MOTS = ['pare-feu', 'mot de passe', 'sommeil', 'Rennes', 'confiance', 'mise à jour', 'curiosité', 'équipe', 'échec', 'clé USB',
  'vie privée', 'phishing', 'discipline', 'réseau', 'courage', 'sauvegarde', 'Internet', 'hacker', 'vérité', 'avenir'];

function initEvents() {
  $('#phases').addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;
    const done = store.get('parcours', {}); done[e.target.dataset.id] = e.target.checked; store.set('parcours', done); renderParcours();
  });
  $('#bibList').addEventListener('change', e => { const s = store.get('vu', {}); s[e.target.dataset.k] = e.target.checked; store.set('vu', s); renderBib(); });
  $('#toolQ').addEventListener('input', renderTool);
  $('#lexQ').addEventListener('input', renderLex);
  let t; $('#q').addEventListener('input', () => { clearTimeout(t); t = setTimeout(runSearch, 180); });

  $('#csTabs').onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('#csTabs button').forEach(x => x.setAttribute('aria-selected', x === b));
    $$('[data-csp]').forEach(p => { p.hidden = p.dataset.csp !== b.dataset.cs; });
  };
  $('#wordBtn').onclick = () => { $('#word').textContent = MOTS[Math.floor(Math.random() * MOTS.length)]; };

  $('#propForm').addEventListener('submit', async e => {
    e.preventDefault();
    const n = $('#pName').value.trim();
    if (!n) { $('#pMsg').textContent = 'Indique au moins le nom de la ressource.'; $('#pName').focus(); return; }
    const texte = `Proposition pour Cyber Atlas\nRessource : ${n}\nLien : ${$('#pLink').value.trim() || '—'}\nPourquoi : ${$('#pWhy').value.trim() || '—'}`;
    try { await navigator.clipboard.writeText(texte); $('#pMsg').textContent = 'Proposition copiée. Colle-la dans un message au créateur du site.'; }
    catch { $('#pMsg').textContent = 'Copie impossible : sélectionne le texte et copie-le à la main.'; }
  });

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => { const c = $('#cursor'); if (c) c.style.opacity = c.style.opacity === '0' ? '1' : '0'; }, 600);
  }
}

/* ---------- Démarrage ---------- */
async function chargerDonnees() {
  await Promise.all(FICHIERS.map(async nom => {
    const r = await fetch(`data/${nom}.json`);
    if (!r.ok) throw new Error(`data/${nom}.json introuvable (${r.status})`);
    D[nom] = await r.json();
  }));
}

(async function init() {
  initTheme(); initNav();
  try {
    await chargerDonnees();
  } catch (err) {
    console.error(err);
    $('#main').insertAdjacentHTML('afterbegin', `<p class="note warn" style="margin-bottom:20px"><strong>Données non chargées.</strong>
      Ouvre le site avec un serveur local (extension Live Server dans VS Code) plutôt qu'en double-cliquant sur index.html. Détail : ${esc(err.message)}</p>`);
    show(location.hash.slice(1) || 'accueil');
    return;
  }
  renderCounts(); renderParcours(); renderToday(); renderPlat(); renderTool(); renderBib();
  renderLex(); renderAnki(); renderVeille(); renderMet(); renderCert(); renderProjets();
  initEvents();
  show(location.hash.slice(1) || 'accueil');
})();
