<template>
  <div id="top" class="hero">
    <div class="hero-code" aria-hidden="true">
      <pre>interface Engineer {
  name: string
  title: string
  skills: string[]
  available: boolean
}

export const profile: Engineer = {
  name: "{{ profile.name }}",
  title: "{{ profile.title }}",
  skills: [
    "TypeScript", "Vue.js",
    "Nuxt", "Node.js",
  ],
  available: true,
}</pre>
    </div>
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
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #cc4400 0%, #ff5500 40%, #ff8844 100%);
}

.hero-code {
  position: absolute;
  top: 20px;
  right: -20px;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.18);
  white-space: pre;
  pointer-events: none;
  user-select: none;
}

.hero-inner {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 96px 80px 72px;
}

.subtitle {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 24px;
}

.title {
  font-weight: 700;
  font-size: 68px;
  line-height: 1.12;
  letter-spacing: 0.03em;
  margin: 0 0 26px;
  color: #ffffff;
}

.lead {
  font-size: 16px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
  font-weight: 300;
  max-width: 600px;
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 48px 20px 36px;
  }

  .hero-code {
    font-size: 11px;
    right: -40px;
    top: 10px;
  }

  .title {
    font-size: 40px;
    letter-spacing: 0.02em;
  }
}
</style>
