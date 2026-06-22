/* ========================================
   Enhanced Interactions — 杨珊的故事
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {

  /* ===== 1. Golden Particles (Hero Banner) ===== */
  const particleContainer = document.getElementById("golden-particles");
  if (particleContainer) {
    function createParticle() {
      const p = document.createElement("div");
      p.className = "golden-particle";
      const size = 3 + Math.random() * 5;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 6 + Math.random() * 8 + "s";
      p.style.animationDelay = Math.random() * 5 + "s";
      p.style.opacity = 0.3 + Math.random() * 0.5;
      particleContainer.appendChild(p);
    }
    for (let i = 0; i < 35; i++) createParticle();
  }

  /* ===== 2. Golden Fireworks (Chapter 12) ===== */
  const fireworks = document.getElementById("golden-fireworks");
  if (fireworks) {
    function burstFirework() {
      const cx = 20 + Math.random() * 60;
      const cy = 20 + Math.random() * 50;
      const count = 20 + Math.floor(Math.random() * 20);
      const colors = ["var(--gold)", "var(--gold-light)", "var(--amber)", "var(--orange-warm)"];
      for (let i = 0; i < count; i++) {
        const p = document.createElement("div");
        p.className = "firework-particle";
        const angle = (i / count) * 360;
        const dist = 30 + Math.random() * 80;
        const rad = angle * Math.PI / 180;
        p.style.left = cx + "%";
        p.style.top = cy + "%";
        p.style.setProperty("--fx", Math.cos(rad) * dist + "px");
        p.style.setProperty("--fy", Math.sin(rad) * dist + "px");
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.width = (2 + Math.random() * 4) + "px";
        p.style.height = p.style.width;
        p.style.animationDuration = 2 + Math.random() * 2 + "s";
        p.style.animationDelay = Math.random() * 0.5 + "s";
        fireworks.appendChild(p);
        // Clean up after animation
        setTimeout(() => p.remove(), 4000);
      }
    }
    // Initial bursts
    for (let b = 0; b < 3; b++) {
      setTimeout(() => burstFirework(), b * 800);
    }
    // Periodic bursts while chapter 12 is visible
    let fireworkTimer = null;
    const obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          fireworkTimer = setInterval(burstFirework, 4000);
          // Burst on first view
          burstFirework();
        } else {
          if (fireworkTimer) { clearInterval(fireworkTimer); fireworkTimer = null; }
        }
      });
    }, { threshold: 0.3 });
    obs.observe(fireworks);
  }

  /* ===== 3. Guitar note interaction ===== */
  const guitarCard = document.getElementById("guitar-card");
  if (guitarCard) {
    guitarCard.addEventListener("click", function() {
      const notes = this.querySelectorAll(".note-note");
      notes.forEach(function(n, i) {
        n.style.animation = "none";
        n.offsetHeight; // force reflow
        n.style.animation = "noteFloat 0.5s ease-in-out " + (i * 0.1) + "s";
        n.style.color = "var(--coral-deep)";
        setTimeout(function() { n.style.color = ""; }, 800);
      });
    });
  }

  /* ===== 4. Off-key visual toggle ===== */
  const offkeyCard = document.getElementById("offkey-card");
  if (offkeyCard) {
    offkeyCard.addEventListener("click", function() {
      const path = this.querySelector(".offkey-path.her");
      if (path) {
        path.style.animationDuration = "0.3s";
        setTimeout(function() { path.style.animationDuration = ""; }, 500);
      }
    });
  }

});
