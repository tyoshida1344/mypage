<template>
  <div id="top" class="hero">
    <div class="hero-inner">
      <div class="hero-text">
        <div class="subtitle fade-in">{{ profile.title }}</div>
        <h1 class="title fade-in d1">{{ profile.name }}</h1>
        <p class="lead fade-in d2">{{ profile.lead }}</p>
      </div>
      <div class="hero-code fade-in d3" aria-hidden="true">
        <pre><span class="kw">interface</span> <span class="ty">Engineer</span> {
  <span class="pr">name</span>: <span class="ty">string</span>
  <span class="pr">title</span>: <span class="ty">string</span>
  <span class="pr">skills</span>: <span class="ty">string</span>[]
  <span class="pr">available</span>: <span class="ty">boolean</span>
}

<span class="kw">export const</span> <span class="vr">profile</span>: <span class="ty">Engineer</span> <span class="op">=</span> {
  <span class="pr">name</span>: <span class="st">"{{ profile.name }}"</span>,
  <span class="pr">title</span>: <span class="st">"{{ profile.title }}"</span>,
  <span class="pr">skills</span>: [
    <span class="st">"TypeScript"</span>, <span class="st">"Vue.js"</span>,
    <span class="st">"Nuxt"</span>, <span class="st">"Node.js"</span>,
  ],
  <span class="pr">available</span>: <span class="bl">true</span>,
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
  background: linear-gradient(180deg, transparent 0%, #000 20%);
}

.hero-code::after {
  content: '';
  position: absolute;
  top: 0;
  left: 100%;
  width: 100vw;
  height: 100%;
  background: inherit;
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

.kw { color: #c586c0; }
.ty { color: #4ec9b0; }
.pr { color: #9cdcfe; }
.vr { color: #4fc1ff; }
.op { color: #d4d4d4; }
.st { color: #ce9178; }
.bl { color: #569cd6; }

.fade-in {
  animation: fade-up 0.8s ease both;
}

.d1 { animation-delay: 0.1s; }
.d2 { animation-delay: 0.2s; }
.d3 { animation-delay: 0.3s; }

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
  color: #fff;
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
    margin: 24px -20px -60px;
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
