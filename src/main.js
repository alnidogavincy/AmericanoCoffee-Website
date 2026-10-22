import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@fontsource/anton/latin-400.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-800.css';
import '@fontsource/caveat/latin-700.css';
import './base.css';
import './style.css';
import { DRINKS } from './drinks';
import { getIngredientIconSVG } from './icons';

gsap.registerPlugin(ScrollTrigger);
const $ = (id) => document.getElementById(id);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const money = (value) => `$ ${value.toFixed(2)}`;
let current = 0;
let transitioning = false;
let slideTimeline;
let introTimeline;
let introOpen = true;
let previousFocus;
let toastTimer;
const modal = $('order-modal');
const main = $('main-content');
const stage = $('hero-stage');
const columns = [...stage.children].filter((el) => el.classList.contains('col-span-12'));
columns.forEach((el, i) => el.classList.add(['hero-copy', 'hero-product', 'hero-ingredients'][i]));
stage.firstElementChild.classList.add('hero-title');
document.querySelector('#menu-section > div:last-child').classList.add('hero-controls');
document.querySelector('#our-story > div:last-child').classList.add('story-content');
document.querySelector('#roaster-cta > div:last-child').classList.add('roaster-content');
const image = $('hero-cup-img');
image.classList.remove('cup-Rising');
$('hero-ribbon-path').classList.remove('ribbon-redraw');

// Preload each local product so swaps never flash an unloaded image.
DRINKS.forEach((drink) => { const preload = new Image(); preload.src = drink.image; });

function paintSlide(index) {
  current = (index + DRINKS.length) % DRINKS.length;
  const drink = DRINKS[current];
  const variables = { bgPrimary: '--bg-primary', bgSecondary: '--bg-secondary', leaf1: '--leaf-1', leaf2: '--leaf-2', leaf3: '--leaf-3' };
  const theme = Object.fromEntries(Object.entries(variables).map(([key, variable]) => [variable, drink.colors[key]]));
  gsap.to(document.documentElement, { ...theme, duration: reduced.matches ? 0 : 0.65, overwrite: 'auto' });
  $('hero-giant-title').innerHTML = [...drink.name].map((letter) => `<span class="giant-letter" aria-hidden="true">${letter}</span>`).join('');
  $('hero-giant-title').setAttribute('aria-label', drink.name);
  $('slide-num-current').textContent = drink.number;
  $('slide-flavor-tag').textContent = drink.flavorTag;
  $('hero-script-badge').textContent = drink.scriptBadge;
  $('hero-tagline').innerHTML = drink.tagline;
  $('hero-description').textContent = drink.description;
  $('hero-price').textContent = money(drink.price);
  image.src = drink.image;
  image.alt = `Hand holding an iced ${drink.name.toLowerCase()}`;
  $('hero-ribbon-path').setAttribute('d', drink.ribbonPath);
  document.querySelectorAll('.ice-accent').forEach((el) => { el.style.opacity = drink.showIce ? '1' : '.25'; });
  $('ingredient-pills-container').innerHTML = drink.ingredients.map((ingredient) => `<details class="ingredient-pill"><summary><span class="ingredient-icon">${getIngredientIconSVG(ingredient.icon)}</span><span>${ingredient.name}</span><span class="ingredient-arrow" aria-hidden="true">+</span></summary><p>${ingredient.detail}</p></details>`).join('');
  [...$('carousel-dots').children].forEach((dot, i) => { dot.setAttribute('aria-current', String(i === current)); });
}

$('carousel-dots').innerHTML = DRINKS.map((drink, i) => `<button class="slide-dot" data-slide="${i}" aria-label="Select ${drink.name}" aria-current="false"></button>`).join('');
$('carousel-dots').addEventListener('click', (event) => { const button = event.target.closest('[data-slide]'); if (button) goTo(Number(button.dataset.slide)); });

function entrance(timeline, position = 0, direction = 1) {
  const path = $('hero-ribbon-path');
  const length = path.getTotalLength();
  timeline.fromTo('.giant-letter', { yPercent: 110, rotate: 5, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: .72, stagger: .035, ease: 'power4.out' }, position)
    .fromTo(image, { y: 170, rotation: direction * 12, opacity: 0, scale: .94 }, { y: 0, rotation: 0, opacity: 1, scale: 1, duration: .85, ease: 'power3.out' }, position + .08)
    .fromTo(['#hero-tagline', '#hero-description', '#hero-price', '#hero-script-badge'], { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .5, stagger: .045 }, position + .2)
    .fromTo('.ingredient-pill', { x: 45, opacity: 0 }, { x: 0, opacity: 1, stagger: .07, duration: .5 }, position + .3)
    .fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' }, position + .1);
}

function goTo(index) {
  const next = (index + DRINKS.length) % DRINKS.length;
  if (transitioning || introOpen || next === current) return;
  if (reduced.matches) { paintSlide(next); return; }
  transitioning = true;
  stage.setAttribute('aria-busy', 'true');
  const direction = index >= current ? 1 : -1;
  slideTimeline = gsap.timeline({ onComplete: () => { transitioning = false; stage.removeAttribute('aria-busy'); } });
  slideTimeline.to('.giant-letter', { yPercent: -100, opacity: 0, stagger: .018, duration: .3, ease: 'power2.in' }, 0)
    .to(image, { y: 100, rotation: -direction * 10, opacity: 0, duration: .35 }, 0)
    .to(['#hero-tagline', '#hero-description', '#hero-price', '#hero-script-badge', '.ingredient-pill'], { opacity: 0, duration: .2 }, 0)
    .to('#hero-ribbon-path', { opacity: 0, duration: .2 }, 0)
    .call(() => {
      paintSlide(next);
      gsap.set('#hero-ribbon-path', { opacity: 1 });
      // New title and ingredient nodes exist only after paintSlide.
      const incoming = gsap.timeline();
      entrance(incoming, 0, direction);
      slideTimeline.add(incoming, .4);
    }, [], .4);
}
$('prev-slide-btn').addEventListener('click', () => goTo(current - 1));
$('next-slide-btn').addEventListener('click', () => goTo(current + 1));
let pointerStart;
stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('a, button, summary, details, select')) return;
  pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
  stage.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointerup', (event) => {
  if (!pointerStart) return;
  const dx = event.clientX - pointerStart.x;
  const dy = event.clientY - pointerStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) goTo(current + (dx < 0 ? 1 : -1));
  pointerStart = null;
});
stage.addEventListener('pointercancel', () => { pointerStart = null; });

function finishIntro() {
  if (!introOpen) return;
  introTimeline?.kill();
  introOpen = false;
  const skipHadFocus = $('intro-overlay').contains(document.activeElement);
  main.inert = false;
  document.body.classList.remove('intro-active');
  $('intro-overlay').inert = true;
  gsap.to('#intro-overlay', { autoAlpha: 0, duration: reduced.matches ? 0 : .45 });
  if (!reduced.matches) {
    transitioning = true;
    stage.setAttribute('aria-busy', 'true');
    slideTimeline = gsap.timeline({ onComplete: () => { transitioning = false; stage.removeAttribute('aria-busy'); } });
    entrance(slideTimeline);
  }
  if (skipHadFocus) main.focus({ preventScroll: true });
  ScrollTrigger.refresh();
}
function playIntro() {
  introOpen = true;
  main.inert = true;
  $('intro-overlay').inert = false;
  document.body.classList.add('intro-active');
  gsap.set('#intro-overlay', { autoAlpha: 1 });
  gsap.set('#intro-cup-svg', { x: 160, y: -170, rotation: -30, scale: .8 });
  gsap.set('.intro-hand-entering', { x: 0, y: 0, opacity: 1 });
  if (reduced.matches) { finishIntro(); return; }
  $('skip-intro-btn').focus({ preventScroll: true });
  introTimeline = gsap.timeline({ onComplete: finishIntro });
  introTimeline.to('#intro-cup-svg', { x: 0, y: 0, rotation: 0, scale: 1, duration: .85, ease: 'power3.out' })
    .to('.intro-hand-entering', { x: 240, y: -220, opacity: 0, duration: .6 }, .65)
    .to('.intro-crema-swirl', { rotation: 45, svgOrigin: '260 240', duration: 1.6 }, .5)
    .to('#intro-cup-svg', { rotation: 30, scale: 1.12, duration: 1.1, ease: 'sine.inOut' }, .9)
    .to('#intro-cup-svg', { rotation: 55, scale: 14, duration: .8, ease: 'power3.in' }, 2.1);
}
$('skip-intro-btn').addEventListener('click', finishIntro);
$('intro-scene').addEventListener('click', finishIntro);
$('replay-intro-btn').addEventListener('click', () => { if (!transitioning) playIntro(); });

// Persist only validated product identifiers and known customization values.
const storageKey = 'americano-coffee-cart-v1';
const iceOptions = [...$('custom-ice-select').options].map((o) => o.value);
const milkOptions = [...$('custom-milk-select').options].map((o) => o.value);
let cart = [];
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
  if (Array.isArray(saved)) cart = saved.filter((item) => item && DRINKS.some((d) => d.id === item.id) && Number.isInteger(item.qty) && item.qty > 0 && item.qty <= 99 && iceOptions.includes(item.ice) && milkOptions.includes(item.milk));
} catch { /* The experience remains usable when storage is unavailable. */ }
function saveCart() { try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Optional persistence. */ } }
function toast(message) {
  $('toast-text').textContent = message;
  $('toast-notification').classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('toast-notification').classList.remove('is-visible'), 2600);
}
function updateCart() {
  const count = cart.reduce((n, item) => n + item.qty, 0);
  $('cart-count-badge').textContent = count;
  $('cart-count-badge').classList.toggle('hidden', count === 0);
  $('footer-cart-count').textContent = count;
  $('cart-total-price').textContent = money(cart.reduce((n, item) => n + DRINKS.find((d) => d.id === item.id).price * item.qty, 0));
  $('cart-items-list').innerHTML = cart.length ? cart.map((item, i) => {
    const drink = DRINKS.find((d) => d.id === item.id);
    return `<article class="cart-item"><div><h4>${drink.name}</h4><p>${item.ice} · ${item.milk}</p><strong>${money(drink.price * item.qty)}</strong></div><div class="quantity"><button data-change="-1" data-index="${i}" aria-label="Decrease ${drink.name} quantity">−</button><span>${item.qty}</span><button data-change="1" data-index="${i}" aria-label="Increase ${drink.name} quantity" ${item.qty >= 99 ? 'disabled' : ''}>+</button><button data-remove="${i}" aria-label="Remove ${drink.name}" class="remove-item">Remove</button></div></article>`;
  }).join('') : '<p class="empty-cart">Your cup bag is empty.<br>Find your next favorite above.</p>';
}
function addDrink(drink) {
  const ice = $('custom-ice-select').value;
  const milk = $('custom-milk-select').value;
  const item = cart.find((item) => item.id === drink.id && item.ice === ice && item.milk === milk);
  if (item?.qty >= 99) { toast('Maximum 99 cups per selection.'); return; }
  if (item) item.qty++; else cart.push({ id: drink.id, qty: 1, ice, milk });
  $('checkout-status-msg').classList.add('hidden');
  saveCart(); updateCart(); toast(`${drink.name} added to your cup`);
}
$('taste-it-btn').addEventListener('click', () => { if (!transitioning) addDrink(DRINKS[current]); });
$('modal-drink-selector').innerHTML = DRINKS.map((d) => `<button class="quick-add" data-drink="${d.id}">+ ${d.name} <span>${money(d.price)}</span></button>`).join('');
$('modal-drink-selector').addEventListener('click', (event) => { const button = event.target.closest('[data-drink]'); if (button) addDrink(DRINKS.find((d) => d.id === button.dataset.drink)); });
$('cart-items-list').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const index = Number(button.dataset.index ?? button.dataset.remove);
  if (button.hasAttribute('data-remove')) cart.splice(index, 1);
  else { cart[index].qty += Number(button.dataset.change); if (cart[index].qty <= 0) cart.splice(index, 1); }
  saveCart(); updateCart();
  const nextFocus = $('cart-items-list').querySelector(`[data-index="${index}"][data-change="${button.dataset.change}"]`) || $('clear-cart-btn');
  nextFocus.focus();
});
$('clear-cart-btn').addEventListener('click', () => { cart = []; saveCart(); updateCart(); });
$('checkout-btn').addEventListener('click', () => {
  const status = $('checkout-status-msg');
  status.textContent = cart.length ? 'Demo complete! No payment was taken and no real order was sent. Your next coffee is waiting.' : 'Add a drink to your cup bag first.';
  status.classList.remove('hidden');
  if (cart.length) { cart = []; saveCart(); updateCart(); }
});
function openOrder() {
  previousFocus = document.activeElement;
  modal.classList.remove('hidden'); modal.classList.add('flex');
  main.inert = true;
  document.body.classList.add('modal-active');
  $('checkout-status-msg').classList.add('hidden');
  updateCart();
  gsap.fromTo(modal.firstElementChild, { xPercent: 100 }, { xPercent: 0, duration: reduced.matches ? 0 : .45, ease: 'power3.out' });
  $('close-order-btn').focus();
}
function closeOrder() {
  modal.classList.add('hidden'); modal.classList.remove('flex');
  main.inert = false;
  document.body.classList.remove('modal-active');
  previousFocus?.focus({ preventScroll: true });
}
['open-order-btn', 'grab-yours-btn', 'footer-order-btn'].forEach((id) => $(id).addEventListener('click', openOrder));
$('close-order-btn').addEventListener('click', closeOrder);
modal.addEventListener('click', (event) => { if (event.target === modal) closeOrder(); });
document.addEventListener('keydown', (event) => {
  if (introOpen) {
    if (event.key === 'Escape' || event.key === 'Enter') finishIntro();
    if (event.key === 'Tab') { event.preventDefault(); $('skip-intro-btn').focus(); }
    return;
  }
  if (!modal.classList.contains('hidden')) {
    if (event.key === 'Escape') closeOrder();
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button:not(:disabled), select, a[href]')].filter((el) => el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    return;
  }
  if (event.target.closest('input, select, textarea, [contenteditable]')) return;
  const rect = stage.getBoundingClientRect();
  if (rect.bottom < innerHeight * .3 || rect.top > innerHeight * .7) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); goTo(current + (event.key === 'ArrowRight' ? 1 : -1)); }
});

// The story's ribbon exits at the same edge where the roaster ribbon enters.
document.querySelectorAll('#our-story > svg > path').forEach((path) => path.setAttribute('d', 'M 1600 0 C 1490 130, 100 120, 90 430 C 80 750, 1360 740, 1260 840 C 1200 920, 280 820, 0 920'));
document.querySelector('#roaster-cta > svg > path').setAttribute('d', 'M 0 0 C 200 160, 540 80, 760 180 C 950 260, 1000 340, 890 370 C 790 400, 760 290, 850 270 C 1040 230, 1150 750, 1600 860');
const drop = document.querySelector('.coffee-drop-glow');
const dropPosition = document.createElementNS('http://www.w3.org/2000/svg', 'g');
dropPosition.setAttribute('transform', 'translate(-30 -140)');
drop.before(dropPosition);
dropPosition.append(drop);
document.querySelector('#roaster-cta > svg').setAttribute('preserveAspectRatio', 'none');
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.to('#foliage-layer', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '#menu-section', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-title', { y: -75, opacity: .3, ease: 'none', scrollTrigger: { trigger: '#menu-section', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('#hero-cup-wrapper', { y: 85, ease: 'none', scrollTrigger: { trigger: '#menu-section', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.from('.story-content > div:first-child', { y: 130, rotation: -8, opacity: .15, scrollTrigger: { trigger: '#our-story', start: 'top 90%', end: 'top 15%', scrub: 1 } });
  gsap.from('.story-content > div:last-child > *', { y: 65, opacity: 0, stagger: .13, scrollTrigger: { trigger: '.story-content', start: 'top 85%', end: 'center 65%', scrub: .6 } });
  gsap.from('.roaster-content', { y: 100, opacity: 0, scale: .9, scrollTrigger: { trigger: '#roaster-cta', start: 'top 80%', end: 'top 10%', scrub: .7 } });
  document.querySelectorAll('#our-story > svg > path, #roaster-cta > svg > path').forEach((path) => {
    const length = path.getTotalLength();
    gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: path.closest('section'), start: 'top 95%', end: 'bottom 95%', scrub: .5 } });
  });
  document.querySelectorAll('#our-story > .floating-item, #roaster-cta > .floating-item').forEach((bean, i) => {
    gsap.fromTo(bean, { top: `${15 + i * 8}%` }, { top: `${25 + i * 8}%`, ease: 'none', scrollTrigger: { trigger: bean.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  gsap.from('#the-cafe > div:first-child img', { scale: 1.12, scrollTrigger: { trigger: '#the-cafe', start: 'top bottom', end: 'top top', scrub: 1 } });
});
const cafe = $('the-cafe');
cafe.addEventListener('pointermove', (event) => {
  if (reduced.matches || event.pointerType === 'touch') return;
  const rect = cafe.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width * 100;
  const y = (event.clientY - rect.top) / rect.height * 100;
  cafe.style.setProperty('--mx', `${x}%`); cafe.style.setProperty('--my', `${y}%`);
  $('mural-cursor-ring').style.left = `${x}%`; $('mural-cursor-ring').style.top = `${y}%`;
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => anchor.addEventListener('click', (event) => {
  const target = document.querySelector(anchor.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
  target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true });
  history.replaceState(null, '', anchor.getAttribute('href'));
}));
reduced.addEventListener('change', () => {
  if (!reduced.matches) return;
  if (introOpen) finishIntro();
  if (transitioning) {
    slideTimeline?.kill();
    transitioning = false;
    stage.removeAttribute('aria-busy');
    paintSlide(current);
    gsap.set([image, '.giant-letter', '#hero-tagline', '#hero-description', '#hero-price', '#hero-script-badge', '.ingredient-pill'], { clearProps: 'transform,opacity' });
    gsap.set('#hero-ribbon-path', { opacity: 1, strokeDashoffset: 0 });
  }
});
paintSlide(0);
updateCart();
playIntro();
document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
