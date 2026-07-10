<template>
  <div class="slider" @mouseenter="pause" @mouseleave="resume">
    <div class="slider-track" :style="{ transform: `translateX(-${current * 100}%)` }">
      <template v-if="images.length">
        <div v-for="(src, i) in images" :key="i" class="slider-slide">
          <img :src="src" :alt="`${alt} ${i + 1}`" loading="lazy" class="slider-img">
        </div>
      </template>
      <div v-else class="slider-slide slider-placeholder">
        <span class="placeholder-text" aria-hidden="true">スクリーンショット</span>
      </div>
    </div>

    <template v-if="images.length > 1">
      <div class="slider-tap slider-tap-prev" @click.prevent.stop="prev" />
      <div class="slider-tap slider-tap-next" @click.prevent.stop="next" />

      <button class="slider-arrow slider-arrow-prev" aria-label="前の画像" @click.prevent.stop="prev">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 15L7 10L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="slider-arrow slider-arrow-next" aria-label="次の画像" @click.prevent.stop="next">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 5L13 10L8 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <div class="slider-dots">
        <button
          v-for="(_, i) in images"
          :key="i"
          class="slider-dot"
          :class="{ active: i === current }"
          :aria-label="`画像 ${i + 1}`"
          :aria-current="i === current ? 'true' : undefined"
          @click.prevent.stop="current = i"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(defineProps<{ images: string[]; alt?: string }>(), {
  alt: 'サービス画像',
});

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function next() {
  current.value = (current.value + 1) % props.images.length;
}

function prev() {
  current.value = (current.value - 1 + props.images.length) % props.images.length;
}

function startAutoPlay() {
  if (props.images.length <= 1) return;
  timer = setInterval(next, 4000);
}

function pause() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function resume() {
  if (!timer) startAutoPlay();
}

onMounted(startAutoPlay);
onBeforeUnmount(pause);
</script>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  height: 320px;
  background: linear-gradient(135deg, var(--color-accent-bg) 0%, var(--color-bg) 100%);
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 0.4s ease;
}

.slider-slide {
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.slider-placeholder {
  background: linear-gradient(135deg, var(--color-accent-bg) 0%, var(--color-bg) 100%);
}

.placeholder-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-label);
  letter-spacing: 0.06em;
}

.slider-tap {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
  z-index: 1;
}

.slider-tap-prev {
  left: 0;
}

.slider-tap-next {
  right: 0;
}

.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.85);
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.slider:hover .slider-arrow {
  opacity: 1;
}

.slider-arrow-prev {
  left: 10px;
}

.slider-arrow-next {
  right: 10px;
}

.slider-arrow:hover {
  background: rgba(255, 255, 255, 1);
}

.slider-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.slider-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: var(--color-border);
  cursor: pointer;
  transition: background 0.2s ease;
}

.slider-dot.active {
  background: var(--color-primary);
}
</style>
