<template>
  <SectionWrapper id="career" number="05" title="経歴">
    <div class="timeline">
      <div class="timeline-line" />

      <div v-for="(phase, i) in career" :key="i" class="phase">
        <div class="phase-header">
          <div class="phase-dot" />
          <div class="phase-company">{{ phase.company }}</div>
          <div class="phase-period">{{ phase.period }}</div>
        </div>
        <div class="phase-items">
          <div v-for="item in phase.items" :key="item.period" class="phase-item">
            <span class="item-period">{{ item.period }}</span>
            <div>
              <div class="item-title">{{ item.title }}</div>
              <div class="item-tech">{{ item.tech }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { career } from '~/data/site';
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-line {
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: var(--color-primary-light);
}

.phase-header {
  position: relative;
  margin-bottom: 8px;
}

.phase-dot {
  position: absolute;
  left: -30px;
  top: 5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--color-primary);
}

.phase-company {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.phase-period {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  margin-top: 3px;
}

.phase-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px 0 34px;
}

.phase:last-child .phase-items {
  padding-bottom: 0;
}

.phase-item {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 18px;
  align-items: baseline;
}

.item-period {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
}

.item-title {
  font-size: 14px;
  font-weight: 500;
}

.item-tech {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  margin-top: 4px;
}

@media (max-width: 768px) {
  .phase-item {
    grid-template-columns: 88px 1fr;
    gap: 10px;
  }
}
</style>
