const GalleryMusicPlayer = {
  audio: null,
  isPlaying: false,
  autoPlayed: false,

  init() {
    this.audio = new Audio();
    this.audio.src = "assets/audio/手写的从前.mp3";
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.preload = "auto";

    this.btn = document.getElementById("gallery-music-btn");
    this.label = document.getElementById("gallery-music-label");

    if (!this.btn) return;

    // 播完自动重播
    this.audio.addEventListener("ended", () => {
      this.audio.currentTime = 0;
      this.audio.play().catch(() => {});
    });

    // 加载失败自动重试
    this.audio.addEventListener("error", () => {
      setTimeout(() => { this.audio.load(); }, 3000);
    });

    // 点击音乐按钮切换播放/暂停
    this.btn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // 如果首页已交互过（sessionStorage），自动播放
    if (sessionStorage.getItem("music_has_interacted") === "true") {
      this.tryAutoPlay();
    }

    // 页面内首次点击 → 播放（以防自动播放失败）
    const markInteracted = () => {
      if (!this.autoPlayed) {
        this.autoPlayed = true;
        this.play();
      }
    };
    document.addEventListener("click", markInteracted);
    document.addEventListener("touchstart", markInteracted);
  },

  tryAutoPlay() {
    // 延迟一点等页面渲染完
    setTimeout(() => {
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise.then(() => {
          this.autoPlayed = true;
          this.isPlaying = true;
          this.updateUI(true);
        }).catch(() => {
          // 自动播放被阻止，等待用户点击
          this.autoPlayed = false;
        });
      } else {
        this.autoPlayed = true;
        this.isPlaying = true;
        this.updateUI(true);
      }
    }, 300);
  },

  play() {
    if (!this.audio) return;
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        this.isPlaying = true;
        this.autoPlayed = true;
        this.updateUI(true);
      }).catch(() => {
        this.isPlaying = false;
      });
    } else {
      this.isPlaying = true;
      this.autoPlayed = true;
      this.updateUI(true);
    }
  },

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  },

  toggle() {
    this.isPlaying ? this.pause() : this.play();
  },

  updateUI(playing) {
    if (!this.btn) return;
    if (playing) {
      this.btn.classList.add("playing");
      this.btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
      if (this.label) { this.label.textContent = "手写的从前 — 周杰伦"; this.label.classList.add("show"); }
    } else {
      this.btn.classList.remove("playing");
      this.btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      if (this.label) { this.label.classList.remove("show"); }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => GalleryMusicPlayer.init());
