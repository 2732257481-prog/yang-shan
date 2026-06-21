const MusicPlayer = {
  audio: null,
  isPlaying: false,
  hasInteracted: false,

  init() {
    this.audio = new Audio();
    this.audio.src = "assets/audio/a-thousand-years.mp3";
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.preload = "metadata";

    this.btn = document.getElementById("music-btn");
    this.label = document.getElementById("music-label");

    if (!this.btn) return;

    this.btn.addEventListener("click", () => this.toggle());

    document.addEventListener("click", () => {
      if (!this.hasInteracted) {
        this.hasInteracted = true;
        this.play();
      }
    }, { once: true });
  },

  play() {
    if (!this.audio) return;
    this.audio.play().catch(() => {});
    this.isPlaying = true;
    this.btn.classList.add("playing");
    this.btn.querySelector(".icon").outerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    if (this.label) { this.label.textContent = "A Thousand Years"; this.label.classList.add("show"); }
  },

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.btn.classList.remove("playing");
    this.btn.querySelector(".icon").outerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    if (this.label) { this.label.classList.remove("show"); }
  },

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }
};

document.addEventListener("DOMContentLoaded", () => MusicPlayer.init());
