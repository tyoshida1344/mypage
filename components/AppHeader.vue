<template>
  <header class="header" :class="{ scrolled: isScrolled }">
    <div class="header-inner">
      <a href="#top" class="logo">
        <span class="dots">
          <span class="dot dot-1" />
          <span class="dot dot-2" />
          <span class="dot dot-3" />
        </span>
        <span class="name">{{ profile.name }}</span>
      </a>
      <nav class="nav" aria-label="メインナビゲーション">
        <a href="#about">自己紹介</a>
        <a href="#skills">技術スキル</a>
        <a href="#product">提供サービス</a>
        <a href="#works">ポートフォリオ</a>
        <a href="#career">経歴</a>
        <a href="#contact" class="nav-cta">連絡先</a>
      </nav>
      <button
        class="hamburger"
        :class="{ active: menuOpen }"
        :aria-label="menuOpen ? 'メニューを閉じる' : 'メニューを開く'"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span class="hamburger-line" />
        <span class="hamburger-line" />
        <span class="hamburger-line" />
      </button>
    </div>

    <Transition name="slide">
      <div v-if="menuOpen" class="mobile-overlay" @click="closeMenu">
        <nav class="mobile-nav" aria-label="モバイルナビゲーション" @click.stop>
          <a href="#about" @click="closeMenu">自己紹介</a>
          <a href="#skills" @click="closeMenu">技術スキル</a>
          <a href="#product" @click="closeMenu">提供サービス</a>
          <a href="#works" @click="closeMenu">ポートフォリオ</a>
          <a href="#career" @click="closeMenu">経歴</a>
          <a href="#contact" class="mobile-cta" @click="closeMenu">連絡先</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { profile } from '~/data/site';

const isScrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  isScrolled.value = window.scrollY > 10;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    closeMenu();
  }
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
});

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('keydown', onKeydown);
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background: var(--color-bg);
  z-index: 100;
  transition: box-shadow 0.3s ease;
}

.header.scrolled {
  box-shadow: var(--shadow-header);
}

.header-inner {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-text);
}

.dots {
  display: flex;
  gap: 5px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.dot-1 {
  background: var(--color-accent-dot-1);
}

.dot-2 {
  background: var(--color-accent-dot-2);
}

.dot-3 {
  background: var(--color-accent-dot-3);
}

.name {
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.04em;
  margin-left: 3px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav a:not(.nav-cta) {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.nav a:not(.nav-cta):hover {
  opacity: 0.6;
}

.nav-cta {
  color: var(--color-surface);
  background: var(--color-primary);
  font-size: 13px;
  text-decoration: none;
  padding: 9px 18px;
  border-radius: 100px;
  transition: background 0.2s ease;
}

.nav-cta:hover {
  background: var(--color-primary-dark);
}

.hamburger {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  min-width: 44px;
  min-height: 44px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger.active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-overlay {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.mobile-nav {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background: var(--color-bg);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  padding: 32px 28px;
  gap: 0;
}

.mobile-nav a {
  font-size: 15px;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  transition: color 0.2s ease;
}

.mobile-nav a:last-child {
  border-bottom: none;
}

.mobile-nav a:hover {
  color: var(--color-primary);
}

.mobile-cta {
  color: var(--color-primary) !important;
  font-weight: 600;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}

.slide-enter-active .mobile-nav,
.slide-leave-active .mobile-nav {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
}

.slide-enter-from .mobile-nav {
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
}

.slide-leave-to .mobile-nav {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .header-inner {
    padding: 0 20px;
  }

  .nav {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
</style>
