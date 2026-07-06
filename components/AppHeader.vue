<template>
  <header class="header">
    <a href="#top" class="logo">
      <span class="dots">
        <span class="dot dot-red" />
        <span class="dot dot-blue" />
        <span class="dot dot-green" />
      </span>
      <span class="name">{{ profile.name }}</span>
    </a>
    <nav class="nav">
      <a href="#about">自己紹介</a>
      <a href="#skills">技術スキル</a>
      <a href="#product">提供サービス</a>
      <a href="#works">ポートフォリオ</a>
      <a href="#career">経歴</a>
      <a href="#contact" class="nav-cta">連絡先</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { profile } from '~/data/site.json'
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 80px;
  border-bottom: 1px solid var(--color-border);
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

.dot-red {
  background: var(--color-accent-red);
}

.dot-blue {
  background: var(--color-accent-blue);
}

.dot-green {
  background: var(--color-accent-green);
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

.nav a {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-decoration: none;
}

.nav-cta {
  color: var(--color-surface) !important;
  background: var(--color-text);
  padding: 9px 18px;
  border-radius: 100px;
}

@media (max-width: 768px) {
  .header {
    padding: 16px 20px;
    flex-wrap: wrap;
    gap: 12px 16px;
  }

  .nav {
    gap: 14px 16px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
