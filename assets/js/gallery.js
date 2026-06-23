// ===== Gallery Data =====
let photos = [];
let currentIndex = 0;
let isViewerOpen = false;

// Touch state
let touchStartX = 0;
let touchStartY = 0;
let touchCurrentX = 0;
let isDragging = false;
let currentTranslate = 0;
let isZoomed = false;
let zoomScale = 1;
let lastPinchDist = 0;

// ===== Load Photos =====
async function loadPhotos() {
  try {
    const res = await fetch("photos.json");
    photos = await res.json();
    renderGrid();
  } catch (e) {
    console.warn("photos.json not found, using demo data");
    photos = [];
    for (let i = 1; i <= 10; i++) {
      photos.push({
        id: i,
        file: "assets/images/photos/photo_" + String(i).padStart(2, "0") + ".jpg",
        fallback: "assets/images/photos/photo_" + String(i).padStart(2, "0") + ".jpg",
        title: "回忆 #" + i,
        description: "我们的美好时光 #" + i,
        category: i <= 3 ? "basketball" : i <= 6 ? "daily" : i <= 8 ? "activity" : "other"
      });
    }
    renderGrid();
  }
}

// ===== Render Grid with Pagination =====
const PAGE_SIZE = 12;
let renderedCount = 0;

function renderGrid() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  renderedCount = 0;
  grid.innerHTML = '';
  renderPage(grid);
  // Infinite scroll
  grid.addEventListener('scroll', () => {
    if (renderedCount >= photos.length) return;
    const nearBottom = grid.scrollHeight - grid.scrollTop - grid.clientHeight < 300;
    if (nearBottom) renderPage(grid);
  }, { passive: true });
}

function renderPage(grid) {
  const batch = photos.slice(renderedCount, renderedCount + PAGE_SIZE);
  batch.forEach((photo, i) => {
    const idx = renderedCount + i;
    const div = document.createElement('div');
    div.className = 'gallery-grid-item';
    div.setAttribute('data-index', idx);
    div.onclick = () => openViewer(idx);
    div.innerHTML = '<img src="' + (photo.thumb || photo.file) + '" alt="' + photo.title + '" loading="lazy" decoding="async" onerror="this.src=\'' + photo.fallback + '\'; this.onerror=null;"><div class="item-overlay"><span>' + photo.title + '</span></div>';
    grid.appendChild(div);
  });
  renderedCount += batch.length;
}

// ===== Open Viewer =====
function openViewer(index) {
  currentIndex = index;
  isViewerOpen = true;
  isZoomed = false;
  zoomScale = 1;
  const viewer = document.getElementById("viewer");
  if (!viewer) return;
  viewer.classList.add("active");
  updateViewerImage();
  updateDots();
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  isViewerOpen = false;
  const viewer = document.getElementById("viewer");
  if (!viewer) return;
  viewer.classList.remove("active");
  if (!document.getElementById('gallery-overlay')?.classList.contains('active')) {
    document.body.style.overflow = '';
  }
}

function updateViewerImage() {
  const img = document.getElementById("viewer-image");
  const title = document.getElementById("viewer-title");
  const desc = document.getElementById("viewer-desc");
  const photo = photos[currentIndex];
  if (!img || !photo) return;
  img.src = photo.file;
  img.alt = photo.title;
  img.style.transform = "scale(1)";
  if (title) title.textContent = photo.title;
  if (desc) desc.textContent = photo.description;
  zoomScale = 1;
  isZoomed = false;
}

function updateDots() {
  const dots = document.getElementById("viewer-dots");
  if (!dots) return;
  dots.innerHTML = photos.map((_, i) =>
    `<span class="viewer-dot ${i === currentIndex ? "active" : ""}"></span>`
  ).join("");
}

function navigateViewer(direction) {
  const newIndex = currentIndex + direction;
  if (newIndex < 0 || newIndex >= photos.length) return;
  currentIndex = newIndex;
  updateViewerImage();
  updateDots();
}

// ===== Touch Events for Swipe =====
const imageWrap = document.getElementById("viewer-image-wrap");
if (imageWrap) {
  imageWrap.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
      lastPinchDist = getPinchDistance(e);
      return;
    }
    if (isZoomed) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging = true;
    touchCurrentX = touchStartX;
    currentTranslate = 0;
    const img = document.getElementById("viewer-image");
    if (img) img.style.transition = "none";
  }, { passive: true });

  imageWrap.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2 && isZoomed) {
      const dist = getPinchDistance(e);
      const scaleDiff = dist / lastPinchDist;
      lastPinchDist = dist;
      zoomScale = Math.max(1, Math.min(3, zoomScale * scaleDiff));
      const img = document.getElementById("viewer-image");
      if (img) img.style.transform = `scale(${zoomScale})`;
      return;
    }
    if (!isDragging || isZoomed) return;
    e.preventDefault();
    touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX;
    currentTranslate = diff;
    const img = document.getElementById("viewer-image");
    if (img) img.style.transform = `translateX(${diff}px) scale(1)`;
  }, { passive: false });

  imageWrap.addEventListener("touchend", (e) => {
    if (isZoomed) return;
    if (!isDragging) return;
    isDragging = false;
    const diff = touchCurrentX - touchStartX;
    const threshold = 60;
    const img = document.getElementById("viewer-image");
    if (img) img.style.transition = "transform 0.3s ease";
    if (Math.abs(diff) > threshold) {
      navigateViewer(diff > 0 ? -1 : 1);
    } else {
      if (img) img.style.transform = "translateX(0) scale(1)";
    }
  }, { passive: true });

  // Double tap to zoom
  let lastTap = 0;
  imageWrap.addEventListener("touchend", (e) => {
    const now = Date.now();
    const timeDiff = now - lastTap;
    if (timeDiff < 300 && timeDiff > 0 && e.changedTouches.length === 1) {
      toggleZoom();
    }
    lastTap = now;
  }, { passive: true });
}

function getPinchDistance(e) {
  const dx = e.touches[0].clientX - e.touches[1].clientX;
  const dy = e.touches[0].clientY - e.touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function toggleZoom() {
  isZoomed = !isZoomed;
  zoomScale = isZoomed ? 2 : 1;
  const img = document.getElementById("viewer-image");
  if (img) img.style.transform = `scale(${zoomScale})`;
}

// ===== Keyboard Navigation =====
document.addEventListener("keydown", (e) => {
  if (!isViewerOpen) return;
  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowLeft") navigateViewer(-1);
  if (e.key === "ArrowRight") navigateViewer(1);
});

// ===== Init =====
document.addEventListener("DOMContentLoaded", () => {
  loadPhotos();
  // Page transition on load
  const transition = document.getElementById("page-transition");
  if (transition) setTimeout(() => transition.classList.remove("active"), 100);
});


