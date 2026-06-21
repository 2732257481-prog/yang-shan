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
const revealElements = document.querySelectorAll(".reveal, .reveal-scale, .reveal-slide-left, .reveal-slide-right");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
revealElements.forEach((el) => revealObserver.observe(el));

// ===== Heart Lines Reveal =====
const heartLines = document.querySelectorAll(".heart-line");
const heartObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-line");
    }
  });
}, { threshold: 0.5 });
heartLines.forEach((el) => heartObserver.observe(el));

// ===== Particle Canvas =====
const canvas = document.getElementById("particle-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animFrame;

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
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 30 + 20,
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
      ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 70%, ' + p.opacity + ')';
      ctx.fill();
    });
    animFrame = requestAnimationFrame(animateParticles);
  }
  resizeCanvas();
  createParticles(80);
  animateParticles();
  window.addEventListener("resize", () => { resizeCanvas(); createParticles(80); });
}

// ===== Smooth Scroll for Hero Btn =====
document.querySelector(".hero-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.getElementById("story-section");
  if (target) target.scrollIntoView({ behavior: "smooth" });
});

// ===== Gallery Navigation =====
document.getElementById("gallery-link")?.addEventListener("click", () => navigateToGallery());

function navigateToGallery() {
  const transition = document.getElementById("page-transition");
  if (transition) {
    transition.classList.add("active");
    setTimeout(() => { window.location.href = "gallery.html"; }, 500);
  } else {
    window.location.href = "gallery.html";
  }
}

window.addEventListener("pageshow", () => {
  const transition = document.getElementById("page-transition");
  if (transition) transition.classList.remove("active");
});

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
    if (scrollTop > window.innerHeight * 0.5) {
      progressRing.classList.add("visible");
    } else {
      progressRing.classList.remove("visible");
    }
  }, { passive: true });
}

function backToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}



// ===== 3D Tilt Effect on Cards =====
const tiltCards = document.querySelectorAll(".content-card, .memory-card");
tiltCards.forEach(function (card) {
  card.classList.add("tilt-card");
  card.addEventListener("touchmove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = "perspective(500px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
  }, { passive: true });
  card.addEventListener("touchend", function () {
    card.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
  }, { passive: true });
});

// ===== Footer Stars Generator =====
const footerStars = document.getElementById("footer-stars");
if (footerStars) {
  for (let i = 0; i < 30; i++) {
    const star = document.createElement("div");
    star.className = "footer-star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 4 + "s";
    star.style.animationDuration = (2 + Math.random() * 3) + "s";
    star.style.width = (2 + Math.random() * 4) + "px";
    star.style.height = star.style.width;
    footerStars.appendChild(star);
  }
}

// ===== Parallax Hero Effect =====
const heroContent = document.querySelector(".hero-content");
if (heroContent) {
  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = "translateY(" + (scrollY * 0.15) + "px)";
      heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.3;
    }
  }, { passive: true });
}

// ===== Character Reveal for Section Titles =====
const sectionTitles = document.querySelectorAll(".section-title");
sectionTitles.forEach(function (title) {
  const text = title.textContent;
  if (text.length < 6) return;
  title.innerHTML = "";
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "char-reveal";
    span.textContent = text[i];
    span.style.transitionDelay = (i * 0.05) + "s";
    title.appendChild(span);
  }
  const charObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".char-reveal").forEach(function (el) {
          el.classList.add("visible");
        });
      }
    });
  }, { threshold: 0.5 });
  if (title.parentElement) charObserver.observe(title.parentElement);
});
