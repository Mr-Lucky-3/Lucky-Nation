// ── Copy IP ──
function copyIP(text, type) {
  navigator.clipboard.writeText(text).then(() => {
    const icon = document.getElementById('icon-' + type);
    if (!icon) return;
    const original = icon.textContent;
    icon.textContent = '✓';
    icon.style.color = '#4ade80';
    setTimeout(() => {
      icon.textContent = original;
      icon.style.color = '';
    }, 2000);
  });
}

// ── Server Status ──
function loadServerStatus() {
  const dot  = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  const players = document.getElementById('players-text');

  fetch('https://api.mcsrvstat.us/2/mr-lucky-army.falix.gg:29035')
    .then(res => res.json())
    .then(data => {
      // FalixNodes returns online=true even when stopped.
      // Real online = players.max > 0 AND version doesn't contain "OFFLINE"
      const online = data.online && (data.players?.max ?? 0) > 0 && !data.version?.includes('OFFLINE');

      dot.className = 'status-dot ' + (online ? 'online' : 'offline');
      text.textContent = online ? 'Server Online' : 'Server Offline';

      if (online && data.players) {
        players.textContent = '• ' + data.players.online + '/' + data.players.max + ' players';
      } else {
        players.textContent = '';
      }
    })
    .catch(() => {
      dot.className = 'status-dot offline';
      text.textContent = 'Server Offline';
      players.textContent = '';
    });
}

// ── Scroll-in animations for feature cards ──
function initAnimations() {
  const cards = document.querySelectorAll('.feature-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
}

// ── Footer year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Init ──
loadServerStatus();
initAnimations();
