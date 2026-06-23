/* ========================================
   Enhanced Interactions — 杨珊的故事
   ======================================== */

document.addEventListener("DOMContentLoaded", function() {

  /* ===== 1. 花瓣、蝴蝶、星光、飘叶 (全页背景) ===== */
  (function() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* --- 花瓣容器 --- */
    var petalContainer = document.createElement("div");
    petalContainer.className = "petal-container";
    petalContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(petalContainer);

    /* --- 蝴蝶容器 --- */
    var butterflyContainer = document.createElement("div");
    butterflyContainer.className = "butterfly-container";
    butterflyContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(butterflyContainer);

    /* --- 星光容器 --- */
    var sparkleContainer = document.createElement("div");
    sparkleContainer.className = "sparkle-container";
    sparkleContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(sparkleContainer);

    /* --- 飘叶容器 --- */
    var leafContainer = document.createElement("div");
    leafContainer.className = "leaf-container";
    leafContainer.setAttribute("aria-hidden", "true");
    document.body.appendChild(leafContainer);

    var isMobile = window.innerWidth < 768;
    var petalChars = ["🌸", "💮", "🌺", "🌷", "✿", "🌼", "🏵"];
    var butterflyChars = ["🦋"];
    var leafChars = ["🍃", "🌿", "🍂", "🍁"];
    var active = true;

    document.addEventListener("visibilitychange", function() {
      active = !document.hidden;
    });

    /* --- 花瓣: 手机2种模式8个，桌面全部12个 --- */
    var petalModes = isMobile ? ["petal", "petal-gentle"] : ["petal", "petal-spiral", "petal-gentle"];
    var petalTotal = isMobile ? 8 : 12;
    function createPetal() {
      var el = document.createElement("span");
      var mode = petalModes[Math.floor(Math.random() * petalModes.length)];
      el.className = mode;
      el.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
      el.style.left = Math.random() * 100 + "%";
      el.style.fontSize = (10 + Math.random() * 16) + "px";
      el.style.opacity = (0.35 + Math.random() * 0.4);
      el.style.setProperty("--petal-drift", (Math.random() * 100 - 50) + "px");
      el.style.setProperty("--petal-rot", (Math.random() * 360) + "deg");
      el.style.animationDuration = (10 + Math.random() * 14) + "s";
      el.style.animationDelay = Math.random() * 10 + "s";
      petalContainer.appendChild(el);

      el.addEventListener("animationiteration", function() {
        el.style.left = Math.random() * 100 + "%";
        el.style.fontSize = (10 + Math.random() * 16) + "px";
        el.style.opacity = (0.35 + Math.random() * 0.4);
        el.className = petalModes[Math.floor(Math.random() * petalModes.length)];
        el.style.setProperty("--petal-drift", (Math.random() * 50 - 25) + "px");
        el.style.animationDuration = (10 + Math.random() * 14) + "s";
      });
    }
    for (var i = 0; i < petalTotal; i++) createPetal();
    setInterval(function() { if (active && petalContainer.children.length < petalTotal + 2) createPetal(); }, 2500);

    /* --- 蝴蝶: 手机1只，桌面3只 --- */
    var butterflyCount = isMobile ? 1 : 3;
    for (var b = 0; b < butterflyCount; b++) {
      var bf = document.createElement("span");
      bf.className = "butterfly";
      bf.textContent = butterflyChars[b % butterflyChars.length];
      bf.style.left = (10 + Math.random() * 80) + "%";
      bf.style.top = (50 + Math.random() * 40) + "%";
      bf.style.animationDuration = (16 + Math.random() * 12) + "s";
      bf.style.animationDelay = Math.random() * 8 + "s";
      bf.style.fontSize = (1.2 + Math.random() * 0.8) + "rem";
      butterflyContainer.appendChild(bf);

      bf.addEventListener("animationiteration", function() {
        this.style.left = (10 + Math.random() * 80) + "%";
        this.style.animationDuration = (12 + Math.random() * 10) + "s";
        this.style.fontSize = (1.2 + Math.random() * 0.8) + "rem";
      });
    }

    /* --- 星光: 手机8个，桌面15个 --- */
    var sparkleCount = isMobile ? 8 : 15;
    for (var s = 0; s < sparkleCount; s++) {
      var sp = document.createElement("div");
      sp.className = "sparkle";
      sp.style.left = Math.random() * 95 + "%";
      sp.style.top = Math.random() * 90 + "%";
      sp.style.width = (2 + Math.random() * 4) + "px";
      sp.style.height = sp.style.width;
      sp.style.animationDuration = (3.5 + Math.random() * 4) + "s";
      sp.style.animationDelay = Math.random() * 3 + "s";
      sparkleContainer.appendChild(sp);

      sp.addEventListener("animationiteration", function() {
        this.style.left = Math.random() * 95 + "%";
        this.style.top = Math.random() * 90 + "%";
        this.style.animationDuration = (3.5 + Math.random() * 4) + "s";
      });
    }

    /* --- 飘叶: 手机3片，桌面5片 --- */
    var leafCount = isMobile ? 3 : 5;
    for (var l = 0; l < leafCount; l++) {
      var le = document.createElement("span");
      le.className = "leaf";
      le.textContent = leafChars[l % leafChars.length];
      le.style.left = Math.random() * 100 + "%";
      le.style.fontSize = (16 + Math.random() * 14) + "px";
      le.style.opacity = (0.35 + Math.random() * 0.35);
      le.style.setProperty("--leaf-drift", (Math.random() * 50 - 25) + "px");
      le.style.animationDuration = (14 + Math.random() * 14) + "s";
      le.style.animationDelay = Math.random() * 10 + "s";
      leafContainer.appendChild(le);

      le.addEventListener("animationiteration", function() {
        this.style.left = Math.random() * 100 + "%";
        this.style.fontSize = (16 + Math.random() * 14) + "px";
        this.style.opacity = (0.35 + Math.random() * 0.35);
        this.style.setProperty("--leaf-drift", (Math.random() * 50 - 25) + "px");
        this.style.animationDuration = (14 + Math.random() * 14) + "s";
      });
    }
  })();

  /* ===== 2. Golden Particles (Hero Banner) — visibility-aware ===== */
  (function() {
    var particleContainer = document.getElementById("golden-particles");
    if (!particleContainer) return;
    var active = false;
    var timer = null;

    function createParticle() {
      var p = document.createElement("div");
      p.className = "golden-particle";
      var size = 3 + Math.random() * 5;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 6 + Math.random() * 8 + "s";
      p.style.animationDelay = Math.random() * 5 + "s";
      p.style.opacity = 0.3 + Math.random() * 0.5;
      particleContainer.appendChild(p);
    }

    function startParticles() {
      if (active) return;
      active = true;
      for (var i = 0; i < 35; i++) createParticle();
      // Periodically add more
      timer = setInterval(function() {
        if (active) createParticle();
      }, 2000);
    }

    function stopParticles() {
      active = false;
      if (timer) { clearInterval(timer); timer = null; }
    }

    var hero = document.querySelector(".hero");
    if (hero) {
      new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) startParticles();
          else stopParticles();
        });
      }, { threshold: 0 }).observe(hero);
      // Start if already visible
      var r = hero.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) startParticles();
    }
  })();

  /* ===== 3. Golden Fireworks (Chapter 12) ===== */
  (function() {
    var fireworks = document.getElementById("golden-fireworks");
    if (!fireworks) return;
    var active = false;
    var timer = null;

    function burstFirework() {
      if (!active) return;
      var cx = 20 + Math.random() * 60;
      var cy = 20 + Math.random() * 50;
      var count = 20 + Math.floor(Math.random() * 20);
      var colors = ["var(--gold)", "var(--gold-light)", "var(--amber)", "var(--orange-warm)"];
      for (var i = 0; i < count; i++) {
        var p = document.createElement("div");
        p.className = "firework-particle";
        var angle = (i / count) * 360;
        var dist = 30 + Math.random() * 80;
        var rad = angle * Math.PI / 180;
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
        setTimeout(function() { p.remove(); }, 4000);
      }
    }

    new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          if (!active) {
            active = true;
            // Burst 3 times on entry
            for (var b = 0; b < 3; b++) {
              setTimeout(function() { burstFirework(); }, b * 800);
            }
            timer = setInterval(function() { burstFirework(); }, 4000);
          }
        } else {
          active = false;
          if (timer) { clearInterval(timer); timer = null; }
        }
      });
    }, { threshold: 0.3 }).observe(fireworks);
  })();

  /* ===== 4. Guitar note interaction ===== */
  var guitarCard = document.getElementById("guitar-card");
  if (guitarCard) {
    guitarCard.addEventListener("click", function() {
      var notes = this.querySelectorAll(".note-note");
      notes.forEach(function(n, i) {
        n.style.animation = "none";
        n.offsetHeight;
        n.style.animation = "noteFloat 0.5s ease-in-out " + (i * 0.1) + "s";
        n.style.color = "var(--coral-deep)";
        setTimeout(function() { n.style.color = ""; }, 800);
      });
    });
  }

  /* ===== 5. Off-key visual toggle ===== */
  var offkeyCard = document.getElementById("offkey-card");
  if (offkeyCard) {
    offkeyCard.addEventListener("click", function() {
      var path = this.querySelector(".offkey-path.her");
      if (path) {
        path.style.animationDuration = "0.3s";
        setTimeout(function() { path.style.animationDuration = ""; }, 500);
      }
    });
  }

});
