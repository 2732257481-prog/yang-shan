const MusicPlayer = {
  audio: null,
  isPlaying: false,
  hasInteracted: false,

  init() {
   this.audio = new Audio();
   this.audio.src = "assets/audio/a-thousand-years.mp3";
   this.audio.loop = true;
   this.audio.volume = 0.4;
   this.audio.preload = "auto";

   this.btn = document.getElementById("music-btn");
   this.label = document.getElementById("music-label");

   if (!this.btn) return;

   // Reliable loop: reset and replay when the track ends
   this.audio.addEventListener("ended", () => {
     this.audio.currentTime = 0;
     this.audio.play().catch(() => {});
   });

   this.btn.addEventListener("click", (e) => {
     e.stopPropagation();
     this.toggle();
   });

   document.addEventListener("click", () => {
     if (!this.hasInteracted) {
       this.hasInteracted = true;
       this.play();
     }
   });
   document.addEventListener("touchstart", () => {
     if (!this.hasInteracted) {
       this.hasInteracted = true;
       this.play();
     }
   });
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
      this.btn.querySelector(".icon").outerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
      if (this.label) { this.label.textContent = "A Thousand Years"; this.label.classList.add("show"); }
    } else {
      this.btn.classList.remove("playing");
      this.btn.querySelector(".icon").outerHTML = `<svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      if (this.label) { this.label.classList.remove("show"); }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => MusicPlayer.init());
