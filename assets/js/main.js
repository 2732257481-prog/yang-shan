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
const revealElements = document.querySelectorAll(".reveal");
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
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  createParticles(60);
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles(60);
  });
}

// ===== Smooth Scroll for Hero Btn =====
document.querySelector(".hero-btn")?.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.getElementById("story-section");
  if (target) target.scrollIntoView({ behavior: "smooth" });
});

// ===== Gallery Entry Click =====
document.getElementById("gallery-link")?.addEventListener("click", () => {
  navigateToGallery();
});

function navigateToGallery() {
  const transition = document.getElementById("page-transition");
  if (transition) {
    transition.classList.add("active");
    setTimeout(() => {
      window.location.href = "gallery.html";
    }, 500);
  } else {
    window.location.href = "gallery.html";
  }
}

// ===== Page Load Transition =====
window.addEventListener("pageshow", () => {
  const transition = document.getElementById("page-transition");
  if (transition) {
    transition.classList.remove("active");
  }
});
