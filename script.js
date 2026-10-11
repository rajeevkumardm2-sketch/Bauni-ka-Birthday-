const welcome = document.getElementById('welcome');
const birthday = document.getElementById('birthday');
const openSurprise = document.getElementById('openSurprise');
const music = document.getElementById('birthdayMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
}

function makeConfetti(count = 100) {
  const colors = ['#ff75ac', '#ffd77d', '#fff3f8', '#d9a441', '#f6a6cb', '#c5a0e8'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', (Math.random() * 240 - 120) + 'px');
    piece.style.animationDuration = (2.4 + Math.random() * 2.8) + 's';
    piece.style.animationDelay = (Math.random() * .65) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6500);
  }
}

function floatySparkles() {
  const host = document.getElementById('sparkles');
  const symbols = ['♡', '✦', '✧', '♥', '✨'];
  setInterval(() => {
    if (document.hidden) return;
    const item = document.createElement('span');
    item.className = 'sparkle';
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = (12 + Math.random() * 18) + 'px';
    item.style.color = Math.random() > .5 ? '#f17eb0' : '#d7aa50';
    item.style.animationDuration = (7 + Math.random() * 6) + 's';
    host.appendChild(item);
    setTimeout(() => item.remove(), 14000);
  }, 650);
}

openSurprise.addEventListener('click', async () => {
  welcome.classList.add('hidden');
  birthday.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  makeConfetti(90);
  // Browsers require a user gesture before audio can play. If no music file is added,
  // the rest of the surprise still works and a friendly note is shown.
  try {
    await music.play();
    musicLabel.textContent = 'Pause music';
  } catch (_) {
    musicLabel.textContent = 'Play music';
  }
});

musicToggle.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = 'Pause music';
    } catch (_) {
      showToast('Add your music file at music/birthday.mp3 to play a song 🎵');
    }
  } else {
    music.pause();
    musicLabel.textContent = 'Play music';
  }
});

const candles = [...document.querySelectorAll('.candle')];
candles.forEach((candle) => candle.addEventListener('click', () => {
  candle.classList.add('blown');
  if (candles.every((c) => c.classList.contains('blown'))) {
    makeConfetti(45);
    showToast('All candles out! Your birthday wish is on its way! 💫');
  }
}));

document.getElementById('wishButton').addEventListener('click', () => {
  document.getElementById('wishMessage').classList.remove('hidden');
  candles.forEach((candle) => candle.classList.add('blown'));
  makeConfetti(55);
});

document.getElementById('celebrateButton').addEventListener('click', () => {
  makeConfetti(150);
  showToast('Sending Nisha a sky full of birthday sparkles! 💖');
});

floatySparkles();
