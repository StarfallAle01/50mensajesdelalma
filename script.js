const KEY_VOLTEADAS = 'alma50-volteadas-v1';
const TOTAL = window.RAZONES.length;

let volteadas;
try {
  volteadas = new Set(JSON.parse(localStorage.getItem(KEY_VOLTEADAS) || '[]'));
} catch (e) {
  volteadas = new Set();
}

/* ---------- particulas ---------- */
function crearParticulas() {
  const cont = document.getElementById('particles');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 3 + Math.random() * 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay = (Math.random() * 12) + 's';
    cont.appendChild(p);
  }
}

/* ---------- razon del dia ---------- */
function mostrarRazonDelDia() {
  const hoy = new Date();
  const seed = hoy.getFullYear() * 372 + (hoy.getMonth() + 1) * 31 + hoy.getDate();
  const idx = seed % TOTAL;
  const el = document.getElementById('featuredText');
  el.textContent = '“' + window.RAZONES[idx].razon + '”';
}

/* ---------- tarjetas ---------- */
function crearGrid() {
  const grid = document.getElementById('grid');
  window.RAZONES.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    if (volteadas.has(i)) card.classList.add('flipped');

    card.innerHTML =
      '<div class="card-inner">' +
        '<div class="card-face card-front">' +
          '<span class="num">' + (i + 1) + '</span>' +
          '<span class="simbolo">💜</span>' +
        '</div>' +
        '<div class="card-face card-back">' +
          '<p class="razon">' + item.razon + '</p>' +
          '<span class="mini-corazon">✦</span>' +
        '</div>' +
      '</div>';

    card.addEventListener('click', () => voltearCard(card, i));
    grid.appendChild(card);
  });
}

function voltearCard(card, i) {
  if (card.classList.contains('flipped')) return;
  card.classList.add('flipped');
  volteadas.add(i);
  localStorage.setItem(KEY_VOLTEADAS, JSON.stringify([...volteadas]));
  actualizarProgreso();
  if (volteadas.size === TOTAL) {
    setTimeout(mostrarFinal, 900);
  }
}

/* ---------- progreso ---------- */
function actualizarProgreso() {
  const pct = (volteadas.size / TOTAL) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent =
    volteadas.size + ' / ' + TOTAL + ' 💜';
}

/* ---------- final + confeti ---------- */
const overlay = document.getElementById('finalOverlay');

function mostrarFinal() {
  overlay.classList.remove('hidden');
  lanzarConfeti(120);
}

function lanzarConfeti(cantidad) {
  const colores = ['#f7b2c4', '#e8799a', '#b79ae0', '#ffffff', '#ffd9e2'];
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    const w = 6 + Math.random() * 7;
    c.style.width = w + 'px';
    c.style.height = w * (0.5 + Math.random()) + 'px';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colores[Math.floor(Math.random() * colores.length)];
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.animationDuration = (2.5 + Math.random() * 2.5) + 's';
    c.style.animationDelay = (Math.random() * 1.5) + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7000);
  }
}

document.getElementById('btnCerrarFinal').addEventListener('click', () => {
  overlay.classList.add('hidden');
});

document.getElementById('firma').addEventListener('click', () => {
  if (volteadas.size === TOTAL) {
    overlay.classList.remove('hidden');
    lanzarConfeti(60);
  }
});

/* ---------- init ---------- */
crearParticulas();
mostrarRazonDelDia();
crearGrid();
actualizarProgreso();
