<template>
  <div id="top" class="hero">
    <div class="hero-inner">
      <div class="subtitle">{{ profile.title }}</div>
      <h1 class="title">{{ profile.name }}</h1>
      <p class="lead">{{ profile.lead }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/site';
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #fff3ea 0%, #ffe0c8 50%, #ffd1aa 100%);
}

.hero-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 96px 80px 72px;
}

.subtitle {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--color-text-label);
  margin-bottom: 24px;
}

.title {
  font-weight: 700;
  font-size: 68px;
  line-height: 1.12;
  letter-spacing: 0.03em;
  margin: 0 0 26px;
  color: var(--color-text);
}

.lead {
  font-size: 16px;
  line-height: 2;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 300;
  max-width: 600px;
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 48px 20px 36px;
  }

  .title {
    font-size: 40px;
    letter-spacing: 0.02em;
  }
}
</style>
