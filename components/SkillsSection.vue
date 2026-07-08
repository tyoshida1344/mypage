<template>
  <SectionWrapper id="skills" number="02" title="技術スキル">
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.label" class="skill-card">
        <div class="skill-label">
          <span class="skill-dot" />
          {{ skill.label }}
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
  border-radius: 6px;
  padding: 16px 18px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.skill-card:hover {
  border-color: var(--color-accent-light);
  box-shadow: var(--shadow-card-hover);
}

.skill-label {
  font-size: 11px;
  color: var(--color-text-label);
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.skill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--color-accent);
}

.skill-items {
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
