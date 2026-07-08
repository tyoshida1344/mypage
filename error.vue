<template>
  <div class="error-page">
    <p class="error-code">{{ error?.statusCode ?? 500 }}</p>
    <h1 class="error-message">{{ message }}</h1>
    <NuxtLink to="/" class="back-link">トップページへ戻る</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const messages: Record<number, string> = {
  404: 'ページが見つかりません',
  500: 'サーバーエラーが発生しました',
};

const message = computed(() => messages[props.error?.statusCode ?? 500] ?? 'エラーが発生しました');
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 40px 20px;
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
}

.error-code {
  font-family: var(--font-mono);
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  margin: 0 0 16px;
  color: var(--color-primary);
}

.error-message {
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 40px;
  color: var(--color-text-secondary);
}

.back-link {
  font-size: 14px;
  color: var(--color-surface);
  background: var(--color-text);
  padding: 12px 24px;
  border-radius: 100px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.back-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }

  .error-message {
    font-size: 16px;
  }
}
</style>
