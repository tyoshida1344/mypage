<template>
  <div id="top" class="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <div class="subtitle">{{ profile.title }}</div>
        <h1 class="title">{{ profile.name }}</h1>
        <p class="lead">{{ profile.lead }}</p>
      </div>
      <div class="hero-code" aria-hidden="true">
        <pre><span class="hl-keyword">interface</span> <span class="hl-type">Engineer</span> {
  <span class="hl-prop">name</span>: <span class="hl-type">string</span>
  <span class="hl-prop">title</span>: <span class="hl-type">string</span>
  <span class="hl-prop">skills</span>: <span class="hl-type">string</span>[]
  <span class="hl-prop">available</span>: <span class="hl-type">boolean</span>
}

<span class="hl-keyword">export const</span> <span class="hl-var">profile</span>: <span class="hl-type">Engineer</span> <span class="hl-op">=</span> {
  <span class="hl-prop">name</span>: <span class="hl-string">"{{ profile.name }}"</span>,
  <span class="hl-prop">title</span>: <span class="hl-string">"{{ profile.title }}"</span>,
  <span class="hl-prop">skills</span>: [
    <span class="hl-string">"TypeScript"</span>, <span class="hl-string">"Vue.js"</span>,
    <span class="hl-string">"Nuxt"</span>, <span class="hl-string">"Node.js"</span>,
  ],
  <span class="hl-prop">available</span>: <span class="hl-bool">true</span>,
}</pre>
      </div>
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

.hero-inner {
  position: relative;
  max-width: 1160px;
  margin: 0 auto;
  padding: 96px 80px 72px;
}

.hero-text {
  max-width: 55%;
}

.hero-code {
  position: absolute;
  right: -80px;
  top: 60px;
  pointer-events: none;
  user-select: none;
  animation: code-fade-in 0.8s ease 0.3s both;
}

@keyframes code-fade-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-code pre {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.8;
  margin: 0;
  background: rgba(0, 0, 0, 0.4);
  padding: 28px;
  border-radius: 16px;
}

.hl-keyword {
  color: #c586c0;
}

.hl-type {
  color: #4ec9b0;
}

.hl-prop {
  color: #9cdcfe;
}

.hl-var {
  color: #4fc1ff;
}

.hl-op {
  color: #d4d4d4;
}

.hl-string {
  color: #ce9178;
}

.hl-bool {
  color: #569cd6;
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
  font-size: 56px;
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
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 48px 20px 36px;
  }

  .hero-text {
    max-width: none;
  }

  .hero-code {
    position: relative;
    right: auto;
    top: auto;
    margin-top: 24px;
    margin-right: -40px;
    margin-bottom: -60px;
  }

  .hero-code pre {
    font-size: 10px;
    padding: 20px;
    border-radius: 12px;
  }

  .title {
    font-size: 36px;
    letter-spacing: 0.02em;
  }
}
</style>
