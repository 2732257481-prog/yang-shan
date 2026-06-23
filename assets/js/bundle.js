const MusicPlayer={
homeAudio:null,
galleryAudio:null,
activePlayer:"home",
isPlaying:false,
hasInteracted:false,
_cdn:'https://cdn.jsdelivr.net/gh/2732257481-prog/yang-shan@master/',
getAudio(){
return this.activePlayer==="home"?this.homeAudio:this.galleryAudio;
},
init(){
const audioBox=document.createElement("div");
audioBox.style.display="none";
audioBox.style.position="absolute";
document.body.appendChild(audioBox);
this.homeAudio=new Audio();
this.homeAudio.src=this._cdn+"assets/audio/a-thousand-years.mp3";
this.homeAudio.loop=true;
this.homeAudio.volume=0.4;
this.homeAudio.preload="auto";
this.homeAudio.load();
audioBox.appendChild(this.homeAudio);
this.homeAudio.addEventListener("ended",()=>{
this.homeAudio.currentTime=0;
this.homeAudio.play().catch(()=>{});
});
this.galleryAudio=new Audio();
this.galleryAudio.src=this._cdn+"assets/audio/gallery.mp3";
this.galleryAudio.loop=true;
this.galleryAudio.volume=0.4;
this.galleryAudio.preload="auto";
this.galleryAudio.load();
audioBox.appendChild(this.galleryAudio);
this.galleryAudio.addEventListener("ended",()=>{
this.galleryAudio.currentTime=0;
this.galleryAudio.play().catch(()=>{});
});
this.btn=document.getElementById("music-btn");
this.label=document.getElementById("music-label");
if(!this.btn)return;
const retryLoad=(a)=>{a.addEventListener("error",()=>setTimeout(()=>a.load(),3000));};
retryLoad(this.homeAudio);
retryLoad(this.galleryAudio);
this.btn.addEventListener("click",(e)=>{e.stopPropagation();this.toggle();});
const startBtn=document.getElementById("hero-start-btn");
if(startBtn){
startBtn.addEventListener("click",()=>{
if(!this.hasInteracted){this.hasInteracted=true;this.syncAndPlay();}
});
}
let scrollTriggered=false;
window.addEventListener("scroll",()=>{
if(!this.hasInteracted &&!scrollTriggered && window.scrollY>window.innerHeight*0.4){
scrollTriggered=true;this.hasInteracted=true;this.syncAndPlay();
}
},{passive:true});
const markInteracted=()=>{
if(!this.hasInteracted){this.hasInteracted=true;this.syncAndPlay();}
};
document.addEventListener("click",markInteracted);
document.addEventListener("touchstart",markInteracted);
},
syncAndPlay(){
sessionStorage.setItem("music_has_interacted","true");
this.play();
},
play(){
const a=this.getAudio();
if(!a)return;
a.play().catch(()=>{});
this.isPlaying=true;
this.updateUI(true);
},
pause(){
const a=this.getAudio();
if(!a)return;
a.pause();
this.isPlaying=false;
this.updateUI(false);
},
toggle(){
if(this.homeAudio &&!this.homeAudio.paused){
this.homeAudio.pause();
this.isPlaying=false;
this.updateUI(false);
return;
}
if(this.galleryAudio &&!this.galleryAudio.paused){
this.galleryAudio.pause();
this.isPlaying=false;
this.updateUI(false);
return;
}
const a=this.getAudio();
if(!a)return;
a.play().catch(()=>{});
this.isPlaying=true;
this.updateUI(true);
},
updateUI(playing){
if(!this.btn)return;
if(playing){
this.btn.classList.add("playing");
this.btn.innerHTML='<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>';
if(this.label){this.label.classList.add("show");}
}else{
this.btn.classList.remove("playing");
this.btn.innerHTML='<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>';
if(this.label){this.label.classList.remove("show");}
}
}
};
document.addEventListener("DOMContentLoaded",()=>MusicPlayer.init());
var CDN='https://cdn.jsdelivr.net/gh/2732257481-prog/yang-shan@master/';
const progressBar=document.getElementById("scroll-progress");
if(progressBar){
window.addEventListener("scroll",()=>{
const scrollTop=window.scrollY;
const docHeight=document.documentElement.scrollHeight-window.innerHeight;
const progress=docHeight>0?(scrollTop/docHeight)*100:0;
progressBar.style.width=progress+"%";
},{passive:true});
}
const revealElements=document.querySelectorAll(".reveal,.reveal-scale,.reveal-slide-left,.reveal-slide-right,.reveal-zoom");
const revealObserver=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting)entry.target.classList.add("visible");
});
},{threshold:0.12,rootMargin:"0px 0px-30px 0px"});
revealElements.forEach((el)=>revealObserver.observe(el));
document.querySelectorAll(".gift-letter,.story-step-highlight").forEach((container)=>{
const lines=container.querySelectorAll(".heart-line");
if(!lines.length)return;
const heartObserver=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
lines.forEach((line,i)=>{
setTimeout(()=>line.classList.add("reveal-line"),i*220);
});
heartObserver.unobserve(entry.target);
}
});
},{threshold:0.35});
heartObserver.observe(container);
});
const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
const canvas=document.getElementById("particle-canvas");
if(canvas &&!prefersReducedMotion){
const ctx=canvas.getContext("2d");
let particles=[];
function resizeCanvas(){
const hero=document.querySelector(".hero");
if(hero){
canvas.width=hero.offsetWidth;
canvas.height=hero.offsetHeight;
}
}
function createParticles(count){
particles=[];
for(let i=0;i<count;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*3+1,
speedX:(Math.random()-0.5)*0.3,
speedY:(Math.random()-0.5)*0.3-0.1,
opacity:Math.random()*0.45+0.2,
hue:Math.random()*25+12,
});
}
}
function animateParticles(){
ctx.clearRect(0,0,canvas.width,canvas.height);
particles.forEach((p)=>{
p.x+=p.speedX;
p.y+=p.speedY;
if(p.x<0)p.x=canvas.width;
if(p.x>canvas.width)p.x=0;
if(p.y<0)p.y=canvas.height;
if(p.y>canvas.height)p.y=0;
ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="hsla("+p.hue+",85%,65%,"+p.opacity+")";
ctx.fill();
});
requestAnimationFrame(animateParticles);
}
resizeCanvas();
createParticles(100);
animateParticles();
window.addEventListener("resize",()=>{resizeCanvas();createParticles(100);});
}
document.getElementById("hero-start-btn")?.addEventListener("click",(e)=>{
e.preventDefault();
document.getElementById("ch01")?.scrollIntoView({behavior:"smooth"});
});
const chapterNav=document.getElementById("chapter-nav");
const navToggle=document.getElementById("nav-toggle");
const navMenu=document.getElementById("nav-menu");
navToggle?.addEventListener("click",()=>{
const open=navMenu.classList.toggle("open");
navToggle.classList.toggle("open",open);
navToggle.setAttribute("aria-expanded",open?"true":"false");
});
navMenu?.querySelectorAll(".nav-link").forEach((link)=>{
link.addEventListener("click",()=>{
navMenu.classList.remove("open");
navToggle.classList.remove("open");
navToggle.setAttribute("aria-expanded","false");
});
});
window.addEventListener("scroll",()=>{
if(chapterNav){
chapterNav.classList.toggle("scrolled",window.scrollY>60);
}
},{passive:true});
const chapters=document.querySelectorAll(".story-chapter[id^='ch']");
const navLinks=document.querySelectorAll(".chapter-nav-menu .nav-link");
if(chapters.length && navLinks.length){
const chapterObserver=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
const id=entry.target.id;
navLinks.forEach((link)=>{
link.classList.toggle("active",link.getAttribute("href")==="#"+id);
});
}
});
},{threshold:0.35,rootMargin:"-20% 0px-55% 0px"});
chapters.forEach((ch)=>chapterObserver.observe(ch));
}
function navigateToGallery(){
if(MusicPlayer.homeAudio)MusicPlayer.homeAudio.pause();
var a=new Audio(CDN+"assets/audio/gallery.mp3");
a.loop=true;a.volume=0.4;
a.addEventListener("ended",function(){a.currentTime=0;a.play().catch(function(){});});
a.play().catch(function(){});
MusicPlayer.galleryAudio=a;
MusicPlayer.activePlayer="gallery";
MusicPlayer.isPlaying=true;
if(MusicPlayer.label){MusicPlayer.label.textContent="手写的从前 — 周杰伦";MusicPlayer.label.classList.add("show");}
MusicPlayer.btn.classList.add("playing");
MusicPlayer.btn.innerHTML="<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>";
document.getElementById("gallery-overlay").classList.add("active");
document.body.style.overflow="hidden";
}
function closeGalleryOverlay(){
if(typeof closeViewer==="function")closeViewer();
if(MusicPlayer.galleryAudio)MusicPlayer.galleryAudio.pause();
var a=new Audio(CDN+"assets/audio/a-thousand-years.mp3");
a.loop=true;a.volume=0.4;
a.addEventListener("ended",function(){a.currentTime=0;a.play().catch(function(){});});
a.play().catch(function(){});
MusicPlayer.homeAudio=a;
MusicPlayer.activePlayer="main";
MusicPlayer.isPlaying=true;
if(MusicPlayer.label){MusicPlayer.label.textContent="A Thousand Years";MusicPlayer.label.classList.add("show");}
MusicPlayer.btn.classList.add("playing");
MusicPlayer.btn.innerHTML="<svg class=\"icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"/><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"/></svg>";
document.getElementById("gallery-overlay").classList.remove("active");
document.body.style.overflow="";
}
async function loadPhotoPreview(){
var grid=document.getElementById("photo-preview");
if(!grid)return;
var photos;
if(typeof PHOTOS_DATA!=='undefined'){
photos=PHOTOS_DATA;
}else{
try{
var res=await fetch("photos.json");
photos=await res.json();
}catch(e){grid.innerHTML='';return;}
}
if(!photos ||!photos.length){grid.innerHTML='';return;}
var preview=photos.slice(0,6);
grid.innerHTML=preview.map(function(photo,i){
return '<div class="photo-preview-item" data-index="'+i+'" role="button" tabindex="0" aria-label="'+photo.title+'">'+
'<img data-src="'+CDN+(photo.thumb || photo.file)+'" alt="'+photo.title+'" decoding="async" onerror="this.src=\''+CDN+photo.fallback+'\'">'+
'</div>';
}).join("");
var observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
var img=entry.target;
var src=img.getAttribute('data-src');
if(src){img.src=src;img.removeAttribute('data-src');}
observer.unobserve(img);
}
});
},{rootMargin:'100px'});
grid.querySelectorAll('img[data-src]').forEach(function(img){observer.observe(img);});
grid.querySelectorAll(".photo-preview-item").forEach(function(item){
item.addEventListener("click",navigateToGallery);
item.addEventListener("keydown",function(e){
if(e.key==="Enter" || e.key===" "){e.preventDefault();navigateToGallery();}
});
});
}
loadPhotoPreview();
const progressRing=document.getElementById("progress-ring");
const progressRingFg=document.getElementById("progress-ring-fg");
if(progressRingFg && progressRing){
const circumference=125.6;
window.addEventListener("scroll",()=>{
const scrollTop=window.scrollY;
const docHeight=document.documentElement.scrollHeight-window.innerHeight;
const progress=docHeight>0?scrollTop/docHeight:0;
progressRingFg.style.strokeDashoffset=circumference*(1-progress);
progressRing.classList.toggle("visible",scrollTop>window.innerHeight*0.5);
},{passive:true});
}
function backToTop(){
window.scrollTo({top:0,behavior:"smooth"});
}
function bindTilt(card){
card.classList.add("tilt-card");
function applyTilt(clientX,clientY){
const rect=card.getBoundingClientRect();
const x=clientX-rect.left;
const y=clientY-rect.top;
const rotateX=((y-rect.height/2)/(rect.height/2))*-4;
const rotateY=((x-rect.width/2)/(rect.width/2))*4;
card.style.transform="perspective(500px)rotateX("+rotateX+"deg)rotateY("+rotateY+"deg)";
}
function resetTilt(){
card.style.transform="";
}
card.addEventListener("touchmove",(e)=>applyTilt(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
card.addEventListener("touchend",resetTilt,{passive:true});
if(window.matchMedia("(hover:hover)").matches){
card.addEventListener("mousemove",(e)=>applyTilt(e.clientX,e.clientY));
card.addEventListener("mouseleave",resetTilt);
}
}
document.querySelectorAll(".content-card,.memory-card,.activity-card,.polaroid,.timeline-node").forEach(bindTilt);
const footerStars=document.getElementById("footer-stars");
if(footerStars){
for(let i=0;i<40;i++){
const star=document.createElement("div");
star.className="footer-star";
star.style.left=Math.random()*100+"%";
star.style.top=Math.random()*100+"%";
star.style.animationDelay=Math.random()*4+"s";
star.style.animationDuration=(2+Math.random()*3)+"s";
const size=2+Math.random()*4;
star.style.width=size+"px";
star.style.height=size+"px";
footerStars.appendChild(star);
}
}
const heroContent=document.querySelector(".hero-content");
const heroBg=document.querySelector(".hero-basketball-bg");
if(heroContent &&!prefersReducedMotion){
window.addEventListener("scroll",()=>{
const scrollY=window.scrollY;
if(scrollY<window.innerHeight){
heroContent.style.transform="translateY("+(scrollY*0.12)+"px)";
heroContent.style.opacity=1-(scrollY/window.innerHeight)*0.35;
if(heroBg)heroBg.style.transform="translateY("+(scrollY*0.06)+"px)";
}
},{passive:true});
}
document.querySelectorAll(".chapter-heading").forEach((title)=>{
const text=title.textContent.trim();
if(text.length<4 || text.length>30)return;
title.innerHTML="";
for(let i=0;i<text.length;i++){
const span=document.createElement("span");
span.className="char-reveal";
span.textContent=text[i];
span.style.transitionDelay=(i*0.04)+"s";
title.appendChild(span);
}
const charObserver=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
title.querySelectorAll(".char-reveal").forEach((el)=>el.classList.add("visible"));
}
});
},{threshold:0.4});
charObserver.observe(title);
});
document.getElementById("gallery-link")?.addEventListener("click",()=>navigateToGallery());
document.getElementById("gallery-overlay-close")?.addEventListener("click",()=>closeGalleryOverlay());
document.addEventListener("DOMContentLoaded",function(){
const particleContainer=document.getElementById("golden-particles");
if(particleContainer){
function createParticle(){
const p=document.createElement("div");
p.className="golden-particle";
const size=3+Math.random()*5;
p.style.width=size+"px";
p.style.height=size+"px";
p.style.left=Math.random()*100+"%";
p.style.animationDuration=6+Math.random()*8+"s";
p.style.animationDelay=Math.random()*5+"s";
p.style.opacity=0.3+Math.random()*0.5;
particleContainer.appendChild(p);
}
for(let i=0;i<35;i++)createParticle();
}
const fireworks=document.getElementById("golden-fireworks");
if(fireworks){
function burstFirework(){
const cx=20+Math.random()*60;
const cy=20+Math.random()*50;
const count=20+Math.floor(Math.random()*20);
const colors=["var(--gold)","var(--gold-light)","var(--amber)","var(--orange-warm)"];
for(let i=0;i<count;i++){
const p=document.createElement("div");
p.className="firework-particle";
const angle=(i/count)*360;
const dist=30+Math.random()*80;
const rad=angle*Math.PI/180;
p.style.left=cx+"%";
p.style.top=cy+"%";
p.style.setProperty("--fx",Math.cos(rad)*dist+"px");
p.style.setProperty("--fy",Math.sin(rad)*dist+"px");
p.style.background=colors[Math.floor(Math.random()*colors.length)];
p.style.width=(2+Math.random()*4)+"px";
p.style.height=p.style.width;
p.style.animationDuration=2+Math.random()*2+"s";
p.style.animationDelay=Math.random()*0.5+"s";
fireworks.appendChild(p);
setTimeout(()=>p.remove(),4000);
}
}
for(let b=0;b<3;b++){
setTimeout(()=>burstFirework(),b*800);
}
let fireworkTimer=null;
const obs=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
fireworkTimer=setInterval(burstFirework,4000);
burstFirework();
}else{
if(fireworkTimer){clearInterval(fireworkTimer);fireworkTimer=null;}
}
});
},{threshold:0.3});
obs.observe(fireworks);
}
const guitarCard=document.getElementById("guitar-card");
if(guitarCard){
guitarCard.addEventListener("click",function(){
const notes=this.querySelectorAll(".note-note");
notes.forEach(function(n,i){
n.style.animation="none";
n.offsetHeight;
n.style.animation="noteFloat 0.5s ease-in-out "+(i*0.1)+"s";
n.style.color="var(--coral-deep)";
setTimeout(function(){n.style.color="";},800);
});
});
}
const offkeyCard=document.getElementById("offkey-card");
if(offkeyCard){
offkeyCard.addEventListener("click",function(){
const path=this.querySelector(".offkey-path.her");
if(path){
path.style.animationDuration="0.3s";
setTimeout(function(){path.style.animationDuration="";},500);
}
});
}
});
var CDN='https://cdn.jsdelivr.net/gh/2732257481-prog/yang-shan@master/';
function cdn(p){return CDN+p;}
let photos=[];
let currentIndex=0;
let isViewerOpen=false;
let lazyObserver=null;
function initLazyObserver(){
if(lazyObserver)return;
lazyObserver=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
var img=entry.target;
var src=img.getAttribute('data-src');
if(src){
img.src=src;
img.removeAttribute('data-src');
}
lazyObserver.unobserve(img);
}
});
},{rootMargin:'100px'});
}
let touchStartX=0;
let touchStartY=0;
let touchCurrentX=0;
let isDragging=false;
let currentTranslate=0;
let isZoomed=false;
let zoomScale=1;
let lastPinchDist=0;
async function loadPhotos(){
if(typeof PHOTOS_DATA!=='undefined'){
photos=PHOTOS_DATA;
renderGrid();
return;
}
try{
const res=await fetch("photos.json");
photos=await res.json();
renderGrid();
}catch(e){
console.warn("photos.json not found,using demo data");
photos=[];
for(let i=1;i<=10;i++){
photos.push({
id:i,
file:"assets/images/photos/photo_"+String(i).padStart(2,"0")+".jpg",
fallback:"assets/images/photos/photo_"+String(i).padStart(2,"0")+".jpg",
title:"回忆 #"+i,
description:"我们的美好时光 #"+i,
category:i<=3?"basketball":i<=6?"daily":i<=8?"activity":"other"
});
}
renderGrid();
}
}
function renderGrid(){
var grid=document.getElementById("gallery-grid");
if(!grid)return;
initLazyObserver();
grid.innerHTML=photos.map(function(photo,index){
return '<div class="gallery-grid-item" data-index="'+index+'" onclick="openViewer('+index+')">'+
'<img data-src="'+cdn(photo.thumb || photo.file)+'" alt="'+photo.title+'" decoding="async"'+
' onerror="this.src=\''+cdn(photo.fallback)+'\';this.onerror=null;">'+
'<div class="item-overlay"><span>'+photo.title+'</span></div>'+
'</div>';
}).join("");
grid.querySelectorAll('img[data-src]').forEach(function(img){
lazyObserver.observe(img);
});
}
function openViewer(index){
currentIndex=index;
isViewerOpen=true;
isZoomed=false;
zoomScale=1;
const viewer=document.getElementById("viewer");
if(!viewer)return;
viewer.classList.add("active");
updateViewerImage();
updateDots();
document.body.style.overflow="hidden";
}
function closeViewer(){
isViewerOpen=false;
const viewer=document.getElementById("viewer");
if(!viewer)return;
viewer.classList.remove("active");
if(!document.getElementById('gallery-overlay')?.classList.contains('active')){
document.body.style.overflow='';
}
}
function updateViewerImage(){
var img=document.getElementById("viewer-image");
var title=document.getElementById("viewer-title");
var desc=document.getElementById("viewer-desc");
var photo=photos[currentIndex];
if(!img ||!photo)return;
img.src=cdn(photo.file);
img.alt=photo.title;
img.style.transform="scale(1)";
if(title)title.textContent=photo.title;
if(desc)desc.textContent=photo.description;
zoomScale=1;
isZoomed=false;
}
function updateDots(){
const dots=document.getElementById("viewer-dots");
if(!dots)return;
dots.innerHTML=photos.map((_,i)=>
`<span class="viewer-dot ${i===currentIndex?"active":""}"></span>`
).join("");
}
function navigateViewer(direction){
const newIndex=currentIndex+direction;
if(newIndex<0 || newIndex>=photos.length)return;
currentIndex=newIndex;
updateViewerImage();
updateDots();
}
const imageWrap=document.getElementById("viewer-image-wrap");
if(imageWrap){
imageWrap.addEventListener("touchstart",(e)=>{
if(e.touches.length===2){
lastPinchDist=getPinchDistance(e);
return;
}
if(isZoomed)return;
touchStartX=e.touches[0].clientX;
touchStartY=e.touches[0].clientY;
isDragging=true;
touchCurrentX=touchStartX;
currentTranslate=0;
const img=document.getElementById("viewer-image");
if(img)img.style.transition="none";
},{passive:true});
imageWrap.addEventListener("touchmove",(e)=>{
if(e.touches.length===2 && isZoomed){
const dist=getPinchDistance(e);
const scaleDiff=dist/lastPinchDist;
lastPinchDist=dist;
zoomScale=Math.max(1,Math.min(3,zoomScale*scaleDiff));
const img=document.getElementById("viewer-image");
if(img)img.style.transform=`scale(${zoomScale})`;
return;
}
if(!isDragging || isZoomed)return;
e.preventDefault();
touchCurrentX=e.touches[0].clientX;
const diff=touchCurrentX-touchStartX;
currentTranslate=diff;
const img=document.getElementById("viewer-image");
if(img)img.style.transform=`translateX(${diff}px)scale(1)`;
},{passive:false});
imageWrap.addEventListener("touchend",(e)=>{
if(isZoomed)return;
if(!isDragging)return;
isDragging=false;
const diff=touchCurrentX-touchStartX;
const threshold=60;
const img=document.getElementById("viewer-image");
if(img)img.style.transition="transform 0.3s ease";
if(Math.abs(diff)>threshold){
navigateViewer(diff>0?-1:1);
}else{
if(img)img.style.transform="translateX(0)scale(1)";
}
},{passive:true});
let lastTap=0;
imageWrap.addEventListener("touchend",(e)=>{
const now=Date.now();
const timeDiff=now-lastTap;
if(timeDiff<300 && timeDiff>0 && e.changedTouches.length===1){
toggleZoom();
}
lastTap=now;
},{passive:true});
}
function getPinchDistance(e){
const dx=e.touches[0].clientX-e.touches[1].clientX;
const dy=e.touches[0].clientY-e.touches[1].clientY;
return Math.sqrt(dx*dx+dy*dy);
}
function toggleZoom(){
isZoomed=!isZoomed;
zoomScale=isZoomed?2:1;
const img=document.getElementById("viewer-image");
if(img)img.style.transform=`scale(${zoomScale})`;
}
document.addEventListener("keydown",(e)=>{
if(!isViewerOpen)return;
if(e.key==="Escape")closeViewer();
if(e.key==="ArrowLeft")navigateViewer(-1);
if(e.key==="ArrowRight")navigateViewer(1);
});
document.addEventListener("DOMContentLoaded",()=>{
loadPhotos();
const transition=document.getElementById("page-transition");
if(transition)setTimeout(()=>transition.classList.remove("active"),100);
});
