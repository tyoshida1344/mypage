<template>
  <div id="top" class="hero">
    <div class="hero-inner">
      <div class="code-window">
        <div class="code-titlebar">
          <span class="code-dots">
            <span class="code-dot code-dot-1" />
            <span class="code-dot code-dot-2" />
            <span class="code-dot code-dot-3" />
          </span>
          <span class="code-filename">profile.ts</span>
        </div>
        <div class="code-body">
          <div class="code-line">
            <span class="line-num">1</span>
            <span class="line-content"><span class="code-comment">// {{ profile.title }}</span></span>
          </div>
          <div class="code-line code-line-name">
            <span class="line-num">2</span>
            <span class="line-content">
              <span class="code-keyword">export const</span>
              <span class="code-var"> name</span>
              <span class="code-op"> = </span>
              <span class="code-string">"{{ profile.name }}"</span>
            </span>
          </div>
          <div class="code-line">
            <span class="line-num">3</span>
            <span class="line-content">&nbsp;</span>
          </div>
          <div class="code-line">
            <span class="line-num">4</span>
            <span class="line-content"><span class="code-comment">/**</span></span>
          </div>
          <div class="code-line">
            <span class="line-num">5</span>
            <span class="line-content"><span class="code-comment"> * {{ profile.lead }}</span></span>
          </div>
          <div class="code-line">
            <span class="line-num">6</span>
            <span class="line-content"><span class="code-comment"> */</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { profile } from '~/data/site';
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #cc4400 0%, #ff5500 40%, #ff8844 100%);
}

.hero-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 80px 64px;
}

.code-window {
  background: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.code-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: #2d2d2d;
}

.code-dots {
  display: flex;
  gap: 7px;
}

.code-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.code-dot-1 {
  background: var(--color-accent-dot-1);
}

.code-dot-2 {
  background: var(--color-accent-dot-2);
}

.code-dot-3 {
  background: var(--color-accent-dot-3);
}

.code-filename {
  font-family: var(--font-mono);
  font-size: 12px;
  color: #999;
}

.code-body {
  padding: 28px 24px;
}

.code-line {
  display: flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 2;
}

.code-line-name {
  font-size: 15px;
}

.line-num {
  color: #555;
  width: 32px;
  flex-shrink: 0;
  text-align: right;
  margin-right: 20px;
  font-size: 12px;
  user-select: none;
}

.line-content {
  min-width: 0;
}

.code-comment {
  color: #6a9955;
}

.code-keyword {
  color: #c586c0;
}

.code-var {
  color: #9cdcfe;
}

.code-op {
  color: #d4d4d4;
}

.code-string {
  color: #ff5500;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .hero-inner {
    padding: 40px 20px 32px;
  }

  .code-body {
    padding: 20px 16px;
  }

  .code-line {
    font-size: 12px;
    line-height: 1.9;
  }

  .code-line-name {
    font-size: 13px;
  }

  .line-num {
    width: 24px;
    margin-right: 12px;
    font-size: 10px;
  }

  .code-string {
    font-size: 20px;
  }
}
</style>
