<template>
  <span class="dots">
    <span class="dot dot-1" />
    <span class="dot dot-2" />
    <span class="dot dot-3" />
  </span>
</template>

<style scoped>
.dots {
  display: flex;
  gap: v-bind(gap);
}

.dot {
  width: v-bind(size);
  height: v-bind(size);
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
</style>

<script setup lang="ts">
withDefaults(defineProps<{ size?: string; gap?: string }>(), {
  size: '7px',
  gap: '5px',
});
</script>
