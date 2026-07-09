<template>
  <SectionWrapper id="skills" number="02" title="技術スキル">
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.label" class="skill-card">
        <div class="card-titlebar">
          <DotIndicator size="8px" gap="6px" />
          <span class="card-title">{{ skill.label }}</span>
        </div>
        <div class="skill-items">{{ skill.items }}</div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { skills } from '~/data/site';
</script>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
}

.skill-card {
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--color-bg);
}

.card-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
}

.card-title {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  margin-left: 6px;
}

.skill-items {
  font-size: 13px;
  line-height: 1.6;
  padding: 14px 18px;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
