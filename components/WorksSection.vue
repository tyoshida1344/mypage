<template>
  <SectionWrapper id="works" number="04" title="ポートフォリオ一覧">
    <a :href="siteLinks.github" class="github-link" target="_blank" rel="noopener noreferrer">
      <DotIndicator size="6px" gap="4px" />
      GitHub でコードを見る<span class="arrow">↗</span>
    </a>
    <div class="works-list">
      <a
        v-for="(work, i) in works"
        :key="i"
        :href="work.link"
        class="work-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="work-image">
          <NuxtImg :src="work.thumb" :alt="`${work.title}のサムネイル`" loading="lazy" class="work-thumb" />
        </div>
        <div class="work-body">
          <div class="work-header">
            <span class="work-title">{{ work.title }}</span>
            <span class="work-link">見る ↗</span>
          </div>
          <div class="work-desc">{{ work.description }}</div>
          <div class="work-tech">{{ work.tech }}</div>
        </div>
      </a>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { works, links as siteLinks } from '~/data/site';
</script>

<style scoped>
.github-link {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  color: var(--color-text);
  text-decoration: none;
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 9px 18px;
  margin-bottom: 24px;
  background-color: var(--color-bg);
  transition: opacity 0.2s ease;
}

.github-link:hover,
.github-link:focus-visible {
  opacity: 0.6;
}

.arrow {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-label);
}

.works-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.work-card {
  display: flex;
  gap: 18px;
  border: 1px solid var(--color-border-light);
  border-radius: 6px;
  padding: 14px;
  text-decoration: none;
  color: var(--color-text);
  align-items: center;
  background-color: var(--color-bg);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.work-card:hover,
.work-card:focus-visible {
  border-color: var(--color-accent-light);
  box-shadow: var(--shadow-card-hover);
}

.work-image {
  width: 116px;
  height: 78px;
  border-radius: 4px;
  flex: none;
  overflow: hidden;
  background: linear-gradient(135deg, var(--color-accent-bg) 0%, var(--color-bg) 100%);
}

.work-thumb {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.work-body {
  flex: 1;
  min-width: 0;
}

.work-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 14px;
}

.work-title {
  font-size: 15px;
  font-weight: 500;
}

.work-link {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--color-text-label);
  flex: none;
}

.work-desc {
  font-size: 13px;
  color: var(--color-text-light);
  font-weight: 300;
  line-height: 1.7;
  margin-top: 6px;
}

.work-tech {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  margin-top: 8px;
}
</style>
