<template>
  <div
    class="slider"
    @mouseenter="pause"
    @mouseleave="resume"
    @touchstart.passive="onTouchStart"
    @touchmove.passive="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    @click.capture="onClickCapture"
  >
    <div
      class="slider-track"
      :class="{ dragging: dragX !== 0 }"
      :style="{ transform: `translateX(calc(${-current * 100}% + ${dragX}px))` }"
    >
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

// ---- スワイプ操作 ----
/** 切り替えに必要なスワイプ距離（スライダー幅に対する割合） */
const SWIPE_THRESHOLD_RATIO = 0.2;
/** 縦横どちらの操作かを判定し始める移動量(px) */
const AXIS_LOCK_DISTANCE = 8;

const dragX = ref(0);
let startX = 0;
let startY = 0;
let axis: 'x' | 'y' | null = null;
/** スワイプ直後に発火するクリックでタップ送り・カードのリンク遷移が起きないようにする */
let justSwiped = false;

function onTouchStart(e: TouchEvent) {
  if (props.images.length <= 1) return;
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
  axis = null;
  justSwiped = false;
  pause();
}

function onTouchMove(e: TouchEvent) {
  if (props.images.length <= 1 || axis === 'y') return;
  const t = e.touches[0];
  const dx = t.clientX - startX;
  if (!axis) {
    const dy = t.clientY - startY;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < AXIS_LOCK_DISTANCE) return;
    axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (axis === 'y') return;
  }
  dragX.value = dx;
}

function onTouchEnd(e: TouchEvent) {
  if (props.images.length <= 1) return;
  if (axis === 'x') {
    const width = (e.currentTarget as HTMLElement).clientWidth;
    if (e.type === 'touchend' && Math.abs(dragX.value) > width * SWIPE_THRESHOLD_RATIO) {
      if (dragX.value < 0) next();
      else prev();
    }
    justSwiped = true;
  }
  dragX.value = 0;
  axis = null;
  resume();
}

function onClickCapture(e: MouseEvent) {
  if (!justSwiped) return;
  justSwiped = false;
  e.preventDefault();
  e.stopPropagation();
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
  touch-action: pan-y pinch-zoom;
  height: 320px;
  background: linear-gradient(135deg, var(--color-accent-bg) 0%, var(--color-bg) 100%);
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 0.4s ease;
}

.slider-track.dragging {
  transition: none;
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
