<template>
  <SectionWrapper id="about" number="01" title="自己紹介" :dot-color="'var(--color-accent-red)'">
    <p class="about-text">{{ profile.about }}</p>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { profile } from '~/data/site';
</script>

<style scoped>
.about-text {
  font-size: 14px;
  line-height: 2.1;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 300;
  max-width: 560px;
}
</style>
