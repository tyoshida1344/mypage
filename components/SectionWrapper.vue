<template>
  <div :id="id" class="section" :class="{ 'no-border': noBorder }">
    <div class="section-label">
      <span class="section-number">
        <span class="dot" />
        {{ number }}
      </span>
      <div class="section-title">{{ title }}</div>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  number: string;
  title: string;
  noBorder?: boolean;
}>();
</script>

<style scoped>
.section {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 1px solid var(--color-border);
}

.no-border {
  border-bottom: none;
}

.section-label {
  padding: 52px 0;
}

.no-border .section-label {
  padding-bottom: 64px;
}

.section-number {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--color-text-secondary);
}

.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: middle;
  background: var(--color-accent);
}

.section-title {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--color-text-label);
  margin-top: 8px;
}

.section-content {
  padding: 52px 0 52px 40px;
}

.no-border .section-content {
  padding-bottom: 64px;
}

@media (max-width: 768px) {
  .section {
    grid-template-columns: 1fr;
  }

  .section-label {
    padding: 38px 0 4px;
  }

  .no-border .section-label {
    padding: 38px 0 4px;
  }

  .section-content {
    padding: 14px 0 44px;
  }

  .no-border .section-content {
    padding: 14px 0 44px;
  }
}
</style>
