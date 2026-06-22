const MusicPlayer = {
  homeAudio: null,
  galleryAudio: null,
  activePlayer: "home",
  isPlaying: false,
  hasInteracted: false,

  getAudio() {
    return this.activePlayer === "home" ? this.homeAudio : this.galleryAudio;
  },

  init() {
    const audioBox = document.createElement("div");
    audioBox.style.display = "none";
    audioBox.style.position = "absolute";
    document.body.appendChild(audioBox);

    this.homeAudio = new Audio();
    this.homeAudio.src = "assets/audio/a-thousand-years.mp3";
    this.homeAudio.loop = true;
    this.homeAudio.volume = 0.4;
    this.homeAudio.preload = "auto";
    this.homeAudio.load();
    audioBox.appendChild(this.homeAudio);
    this.homeAudio.addEventListener("ended", () => {
      this.homeAudio.currentTime = 0;
      this.homeAudio.play().catch(() => {});
    });

    this.galleryAudio = new Audio();
    this.galleryAudio.src = "assets/audio/gallery.mp3";
    this.galleryAudio.loop = true;
    this.galleryAudio.volume = 0.4;
    this.galleryAudio.preload = "auto";
    this.galleryAudio.load();
    audioBox.appendChild(this.galleryAudio);
    this.galleryAudio.addEventListener("ended", () => {
      this.galleryAudio.currentTime = 0;
      this.galleryAudio.play().catch(() => {});
    });

    this.btn = document.getElementById("music-btn");
    this.label = document.getElementById("music-label");
    if (!this.btn) return;

    const retryLoad = (a) => { a.addEventListener("error", () => setTimeout(() => a.load(), 3000)); };
    retryLoad(this.homeAudio);
    retryLoad(this.galleryAudio);

    this.btn.addEventListener("click", (e) => { e.stopPropagation(); this.toggle(); });

    const startBtn = document.getElementById("hero-start-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        if (!this.hasInteracted) { this.hasInteracted = true; this.syncAndPlay(); }
      });
    }

    let scrollTriggered = false;
    window.addEventListener("scroll", () => {
      if (!this.hasInteracted && !scrollTriggered && window.scrollY > window.innerHeight * 0.4) {
        scrollTriggered = true; this.hasInteracted = true; this.syncAndPlay();
      }
    }, { passive: true });

    const markInteracted = () => {
      if (!this.hasInteracted) { this.hasInteracted = true; this.syncAndPlay(); }
    };
    document.addEventListener("click", markInteracted);
    document.addEventListener("touchstart", markInteracted);
  },

  syncAndPlay() {
    sessionStorage.setItem("music_has_interacted", "true");
    this.play();
  },

  play() {
    const a = this.getAudio();
    if (!a) return;
    a.play().catch(() => {});
    this.isPlaying = true;
    this.updateUI(true);
  },

  pause() {
    const a = this.getAudio();
    if (!a) return;
    a.pause();
    this.isPlaying = false;
    this.updateUI(false);
  },

  toggle() {
    if (this.homeAudio && !this.homeAudio.paused) {
      this.homeAudio.pause();
      this.isPlaying = false;
      this.updateUI(false);
      return;
    }
    if (this.galleryAudio && !this.galleryAudio.paused) {
      this.galleryAudio.pause();
      this.isPlaying = false;
      this.updateUI(false);
      return;
    }
    const a = this.getAudio();
    if (!a) return;
    a.play().catch(() => {});
    this.isPlaying = true;
    this.updateUI(true);
  },

  updateUI(playing) {
    if (!this.btn) return;
    if (playing) {
      this.btn.classList.add("playing");
      this.btn.innerHTML = '<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>';
      if (this.label) { this.label.classList.add("show"); }
    } else {
      this.btn.classList.remove("playing");
      this.btn.innerHTML = '<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>';
      if (this.label) { this.label.classList.remove("show"); }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => MusicPlayer.init());
