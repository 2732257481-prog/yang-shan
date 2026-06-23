// CDN prefix for GitHub-hosted assets
var CDN = 'https://cdn.jsdelivr.net/gh/2732257481-prog/yang-shan@master/';

// ===== Scroll Progress =====
const progressBar = document.getElementById("scroll-progress");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  }, { passive: true });
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll(".reveal, .reveal-scale, .reveal-slide-left, .reveal-slide-right, .reveal-zoom");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
revealElements.forEach((el) => revealObserver.observe(el));

// ===== Heart Lines Reveal =====
document.querySelectorAll(".gift-letter, .story-step-highlight").forEach((container) => {
  const lines = container.querySelectorAll(".heart-line");
  if (!lines.length) return;
  const heartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lines.forEach((line, i) => {
          setTimeout(() => line.classList.add("reveal-line"), i * 220);
        });
        heartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  heartObserver.observe(container);
});

// ===== Reduced Motion =====
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Particle Canvas =====
const canvas = document.getElementById("particle-canvas");
if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    const hero = document.querySelector(".hero");
    if (hero) {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    }
  }

  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.45 + 0.2,
        hue: Math.random() * 25 + 12,
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "hsla(" + p.hue + ", 85%, 65%, " + p.opacity + ")";
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  resizeCanvas();
  createParticles(100);
  animateParticles();
  window.addEventListener("resize", () => { resizeCanvas(); createParticles(100); });
}

// ===== Hero Start Button =====
document.getElementById("hero-start-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("ch01")?.scrollIntoView({ behavior: "smooth" });
});

// ===== Chapter Nav =====
const chapterNav = document.getElementById("chapter-nav");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle?.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

navMenu?.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  if (chapterNav) {
    chapterNav.classList.toggle("scrolled", window.scrollY > 60);
  }
}, { passive: true });

// ===== Active Chapter Highlight =====
const chapters = document.querySelectorAll(".story-chapter[id^='ch']");
const navLinks = document.querySelectorAll(".chapter-nav-menu .nav-link");

if (chapters.length && navLinks.length) {
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: "-20% 0px -55% 0px" });
  chapters.forEach((ch) => chapterObserver.observe(ch));
}

// ===== Gallery Navigation (Overlay) =====


function navigateToGallery() {
  if (MusicPlayer.homeAudio) MusicPlayer.homeAudio.pause();
  var a = new Audio(CDN + "assets/audio/gallery.mp3");
  a.loop = true; a.volume = 0.4;
  a.addEventListener("ended", function(){ a.currentTime = 0; a.play().catch(function(){}); });
  a.play().catch(function(){});
  MusicPlayer.galleryAudio = a;
  MusicPlayer.activePlayer = "gallery";
  MusicPlayer.isPlaying = true;
  if (MusicPlayer.label) { MusicPlayer.label.textContent = "手写的从前 — 周杰伦"; MusicPlayer.label.classList.add("show"); }
  MusicPlayer.btn.classList.add("playing");
  MusicPlayer.btn.innerHTML = "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>";
  document.getElementById("gallery-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeGalleryOverlay() {
  if (typeof closeViewer === "function") closeViewer();
  if (MusicPlayer.galleryAudio) MusicPlayer.galleryAudio.pause();
  var a = new Audio(CDN + "assets/audio/a-thousand-years.mp3");
  a.loop = true; a.volume = 0.4;
  a.addEventListener("ended", function(){ a.currentTime = 0; a.play().catch(function(){}); });
  a.play().catch(function(){});
  MusicPlayer.homeAudio = a;
  MusicPlayer.activePlayer = "main";
  MusicPlayer.isPlaying = true;
  if (MusicPlayer.label) { MusicPlayer.label.textContent = "A Thousand Years"; MusicPlayer.label.classList.add("show"); }
  MusicPlayer.btn.classList.add("playing");
  MusicPlayer.btn.innerHTML = "<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>";
  document.getElementById("gallery-overlay").classList.remove("active");
  document.body.style.overflow = "";
}
async function loadPhotoPreview() {
  var grid = document.getElementById("photo-preview");
  if (!grid) return;
  var photos;
  if (typeof PHOTOS_DATA !== 'undefined') {
    photos = PHOTOS_DATA;
  } else {
    try {
      var res = await fetch("photos.json");
      photos = await res.json();
    } catch (e) { grid.innerHTML = ''; return; }
  }
  if (!photos || !photos.length) { grid.innerHTML = ''; return; }
  var preview = photos.slice(0, 6);
    grid.innerHTML = preview.map(function(photo, i) {
      return '<div class="photo-preview-item" data-index="' + i + '" role="button" tabindex="0" aria-label="' + photo.title + '">' +
        '<img data-src="' + CDN + (photo.thumb || photo.file) + '" alt="' + photo.title + '" decoding="async" onerror="this.src=\'' + CDN + photo.fallback + '\'">' +
        '</div>';
    }).join("");
    // Lazy load preview images
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          var src = img.getAttribute('data-src');
          if (src) { img.src = src; img.removeAttribute('data-src'); }
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    grid.querySelectorAll('img[data-src]').forEach(function(img) { observer.observe(img); });
    grid.querySelectorAll(".photo-preview-item").forEach(function(item) {
      item.addEventListener("click", navigateToGallery);
      item.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigateToGallery(); }
      });
    });
}
loadPhotoPreview();

// ===== Progress Ring =====
const progressRing = document.getElementById("progress-ring");
const progressRingFg = document.getElementById("progress-ring-fg");
if (progressRingFg && progressRing) {
  const circumference = 125.6;
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressRingFg.style.strokeDashoffset = circumference * (1 - progress);
    progressRing.classList.toggle("visible", scrollTop > window.innerHeight * 0.5);
  }, { passive: true });
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== 3D Tilt on Cards =====
function bindTilt(card) {
  card.classList.add("tilt-card");
  function applyTilt(clientX, clientY) {
    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    card.style.transform = "perspective(500px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
  }
  function resetTilt() {
    card.style.transform = "";
  }
  card.addEventListener("touchmove", (e) => applyTilt(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  card.addEventListener("touchend", resetTilt, { passive: true });
  if (window.matchMedia("(hover: hover)").matches) {
    card.addEventListener("mousemove", (e) => applyTilt(e.clientX, e.clientY));
    card.addEventListener("mouseleave", resetTilt);
  }
}
document.querySelectorAll(".content-card, .memory-card, .activity-card, .polaroid, .timeline-node").forEach(bindTilt);

// ===== Footer Stars =====
const footerStars = document.getElementById("footer-stars");
if (footerStars) {
  for (let i = 0; i < 40; i++) {
    const star = document.createElement("div");
    star.className = "footer-star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 3) + "s";
    const size = 2 + Math.random() * 4;
    star.style.width = size + "px";
    star.style.height = size + "px";
    footerStars.appendChild(star);
  }
}

// ===== Parallax Hero =====
const heroContent = document.querySelector(".hero-content");
const heroBg = document.querySelector(".hero-basketball-bg");
if (heroContent && !prefersReducedMotion) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = "translateY(" + (scrollY * 0.12) + "px)";
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.35;
      if (heroBg) heroBg.style.transform = "translateY(" + (scrollY * 0.06) + "px)";
    }
  }, { passive: true });
}

// ===== Character Reveal for Chapter Headings =====
document.querySelectorAll(".chapter-heading").forEach((title) => {
  const text = title.textContent.trim();
  if (text.length < 4 || text.length > 30) return;
  title.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "char-reveal";
    span.textContent = text[i];
    span.style.transitionDelay = (i * 0.04) + "s";
    title.appendChild(span);
  }
  const charObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        title.querySelectorAll(".char-reveal").forEach((el) => el.classList.add("visible"));
      }
    });
  }, { threshold: 0.4 });
  charObserver.observe(title);
});

// ===== Gallery Overlay Event Handlers =====
document.getElementById("gallery-link")?.addEventListener("click", () => navigateToGallery());
document.getElementById("gallery-overlay-close")?.addEventListener("click", () => closeGalleryOverlay());


