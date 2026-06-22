const MusicPlayer = {
  audio: null,
  isPlaying: false,
  hasInteracted: false,
  currentTrack: "main", // "main" | "gallery"

  init() {
    this.audio = new Audio();
    this.audio.src = "assets/audio/a-thousand-years.mp3";
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.preload = "auto";

    this.btn = document.getElementById("music-btn");
    this.label = document.getElementById("music-label");

    if (!this.btn) return;

    // 播完自动重播（防浏览器 loop 不稳定）
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

    // 点击"翻阅我们的故事"按钮 → 播放音乐
    const startBtn = document.getElementById("hero-start-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        if (!this.hasInteracted) {
          this.hasInteracted = true;
          this.syncAndPlay();
        }
      });
    }

    // 滚动经过首屏（40%）→ 播放音乐
    let scrollTriggered = false;
    window.addEventListener("scroll", () => {
      if (!this.hasInteracted && !scrollTriggered && window.scrollY > window.innerHeight * 0.4) {
        scrollTriggered = true;
        this.hasInteracted = true;
        this.syncAndPlay();
      }
    }, { passive: true });

    // 页面任意位置首次点击 → 播放音乐 + 记录交互状态
    const markInteracted = () => {
      if (!this.hasInteracted) {
        this.hasInteracted = true;
        this.syncAndPlay();
      }
    };
    document.addEventListener("click", markInteracted);
    document.addEventListener("touchstart", markInteracted);
  },

  // 记录状态到 sessionStorage 并播放
  syncAndPlay() {
    sessionStorage.setItem("music_has_interacted", "true");
    this.play();
  },

  // 切换曲目（首页 / 相册）
  switchTrack(track) {
    const isGallery = track === "gallery";
    const newSrc = isGallery
      ? "assets/audio/手写的从前.mp3"
      : "assets/audio/a-thousand-years.mp3";
    const newLabel = isGallery
      ? "手写的从前 — 周杰伦"
      : "A Thousand Years";

    if (this.currentTrack === track) return; // 已是当前曲目

    const wasPlaying = this.isPlaying;
    this.audio.pause();
    this.audio.src = newSrc;
    this.audio.currentTime = 0;
    this.audio.load();
    this.currentTrack = track;

    if (this.label) {
      this.label.textContent = newLabel;
    }

    if (wasPlaying) {
      this.play();
    }
  },

  play() {
    if (!this.audio) return;
    const promise = this.audio.play();
    if (promise !== undefined) {
      promise.then(() => {
        this.isPlaying = true;
        this.updateUI(true);
      }).catch(() => {
        this.isPlaying = false;
      });
    } else {
      this.isPlaying = true;
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
      if (this.label) { this.label.classList.add("show"); }
    } else {
      this.btn.classList.remove("playing");
      this.btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      if (this.label) { this.label.classList.remove("show"); }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => MusicPlayer.init());
