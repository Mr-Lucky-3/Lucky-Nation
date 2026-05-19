// Function to toggle mobile nav (needs to be global)
window.toggleNav = function() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navHamburger').classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function () {
  // 1. Load Header
  const siteNav = document.querySelector('.site-nav');
  if (siteNav) {
    fetch('header.html')
      .then(r => r.text())
      .then(data => {
        siteNav.innerHTML = data;
        // Run nav updates AFTER header is loaded
        initNavHighlight();
        updateDynamicNav();
      });
  }

  // 2. Load Footer
  const footer = document.querySelector('.footer');
  if (footer) {
    fetch('footer.html')
      .then(r => r.text())
      .then(data => {
        footer.innerHTML = data;
        // Run Minecraft status AFTER footer is loaded
        initServerStatus();
      });
  }
});

function initNavHighlight() {
  var p = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    if(a.getAttribute('href') === p) a.classList.add('active');
  });
}

function updateDynamicNav() {
  const user = JSON.parse(localStorage.getItem('luckyUser'));
  const navBtn = document.getElementById('navActionBtn');
  if (!navBtn) return;

  if (user && user.username) {
    navBtn.innerText = `👤 ${user.username}`;
    navBtn.href = "account.html";
    navBtn.style.background = "rgba(255,255,255,0.1)";
    navBtn.style.border = "1px solid var(--red)";
  } else {
    navBtn.innerText = "🔑 Login";
    navBtn.href = "login.html";
  }
}

function initServerStatus() {
  fetch('https://api.mcsrvstat.us/2/mr-lucky-army.falix.gg:29035')
    .then(r => r.json())
    .then(d => {
      var dot = document.getElementById('fDot'), st = document.getElementById('fSt'), pl = document.getElementById('fPl');
      if (!dot) return;
      if (d.online) {
        dot.className = 'status-dot online';
        st.textContent = 'Online';
        if (pl && d.players) pl.textContent = d.players.online + '/' + d.players.max + ' players';
      } else {
        dot.className = 'status-dot offline';
        st.textContent = 'Offline';
      }
    }).catch(() => {});
}
