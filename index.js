// Theme toggle functionality: Handles switching between light and dark modes
const themeBtn = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️"; 
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";  
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";  
    localStorage.setItem("theme", "light");
  }
});

// Typing effect: Simulates typing animation for rotating text lines
(function typingEffect() {
  const el = document.getElementById('type-target'); 
  const lines = [
    'Workshops • Hack nights • Mentorship',
    'Open-source sprints and chapter tools',
    'Grow skill — ship impact — mentor others'
  ];
  let idx = 0, char = 0, forward = true; 

  function tick() {
    const line = lines[idx];
    if (forward) {
      char++;
      if (char > line.length) {
        forward = false;
        setTimeout(tick, 1000);  
        return;
      }
    } else {
      char--;
      if (char === 0) {
        forward = true;
        idx = (idx + 1) % lines.length;
        setTimeout(tick, 400);  
        return;
      }
    }
    el.textContent = line.slice(0, char) + (forward ? '▌' : '');
    setTimeout(tick, forward ? 60 : 30);  
  }
  tick();  
})();

// Hero scroll handler: Animates hero figure on scroll and reveals sections
(function heroScrollHandler() {
  const hero = document.getElementById('hero-figure');
  const revealSection = document.getElementById('main-revealed');

  if (!hero || !revealSection) return; 

  let ticking = false;  

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      const t = Math.max(-60, (rect.top / vh) * 60);
      hero.style.transform = `translateY(${Math.max(t, -60)}%)`;

      if (rect.bottom < vh * 0.2) {
        revealSection.classList.remove('hidden-off');
        revealSection.classList.add('revealed');
        revealSection.setAttribute('aria-hidden', 'false');
      } else {
        revealSection.classList.add('hidden-off');
        revealSection.classList.remove('revealed');
        revealSection.setAttribute('aria-hidden', 'true');
      }

      ticking = false;
    });
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();

(function mobileMenu() {
  const open = document.getElementById('mobile-open');
  if (!open) return;  

  open.addEventListener('click', () => {
    const menu = document.createElement('div');
    menu.className = 'fixed inset-0 z-50 bg-black/60 flex items-center justify-center';
    menu.innerHTML = `
      <div class="bg-linear-to-br from-slate-900/90 to-slate-800/90 p-6 rounded-xl w-11/12 max-w-sm text-center">
        <div class="flex justify-between items-center mb-4">
          <strong class="text-lg">GDG Menu</strong>
          <button id="close-menu" class="p-1 rounded hover:bg-white/6">✕</button>
        </div>
        <nav class="flex flex-col gap-3 text-sm">
          <a href="#about" class="py-2 rounded hover:bg-white/4">About</a>
          <a href="#events" class="py-2 rounded hover:bg-white/4">Events</a>
          <a href="#projects" class="py-2 rounded hover:bg-white/4">Projects</a>
          <a href="#join" class="py-2 rounded hover:bg-white/4">Join</a>
        </nav>
      </div>
    `;
    document.body.appendChild(menu);

    menu.querySelector('#close-menu').addEventListener('click', () => menu.remove());
    menu.addEventListener('click', (e) => {
      if (e.target === menu) menu.remove();  
    });
  });
})();

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.documentElement.classList.remove('no-focus-outline');
});
