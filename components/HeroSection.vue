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
  background: linear-gradient(135deg, #b33a00 0%, #ff5500 40%, #ffaa55 100%);
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
  top: 0;
  pointer-events: none;
  user-select: none;
  animation: code-fade-in 0.8s ease 0.3s both;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 60%),
    linear-gradient(180deg, transparent 0%, black 20%);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent 0%, black 60%),
    linear-gradient(180deg, transparent 0%, black 20%);
  mask-composite: intersect;
  background: #000;
}

.hero-code::after {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  width: 100vw;
  height: 100%;
  background: #000;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 20%);
  mask-image: linear-gradient(180deg, transparent 0%, black 20%);
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
  padding: 32px 28px;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, white 20%);
  mask-image: linear-gradient(180deg, transparent 0%, white 20%);
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
  animation: code-fade-in 0.8s ease both;
}

.title {
  font-weight: 700;
  font-size: 56px;
  line-height: 1.12;
  letter-spacing: 0.03em;
  margin: 0 0 26px;
  color: #ffffff;
  animation: code-fade-in 0.8s ease 0.1s both;
}

.lead {
  font-size: 16px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.88);
  margin: 0;
  font-weight: 300;
  animation: code-fade-in 0.8s ease 0.2s both;
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
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: -60px;
    border-radius: 0;
  }

  .hero-code pre {
    font-size: 10px;
    padding: 20px;
  }

  .title {
    font-size: 36px;
    letter-spacing: 0.02em;
  }
}
</style>
