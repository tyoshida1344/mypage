<template>
  <SectionWrapper
    id="product"
    number="03"
    title="提供サービス"
    :dot-color="'var(--color-accent-green)'"
  >
    <div class="service-list">
      <div v-for="service in services" :key="service.name" class="service-card">
        <div class="service-image" role="img" :aria-label="`${service.name}のイメージ画像`">
          <span class="service-image-text" aria-hidden="true">デモGIF / スクリーンショット</span>
        </div>
        <div class="service-body">
          <div class="service-tags">
            <span class="tag">{{ service.type }}</span>
            <span class="tag-sub">{{ service.category }}</span>
          </div>
          <div class="service-name">{{ service.name }}</div>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-tech">{{ service.tech }}</div>
          <div class="service-actions">
            <a :href="service.link" class="btn-primary" target="_blank" rel="noopener noreferrer">
              {{ service.linkLabel }}<span class="arrow">↗</span>
            </a>
            <span class="service-note">{{ service.note }}</span>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { services } from '~/data/site';
</script>

<style scoped>
.service-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.service-card {
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  overflow: hidden;
  max-width: 560px;
}

.service-image {
  height: 320px;
  background: repeating-linear-gradient(135deg, #f1eee9, #f1eee9 6px, #e7e3dc 6px, #e7e3dc 12px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-image-text {
  font-family: var(--font-mono);
  font-size: 10px;
  color: #a8a39c;
  letter-spacing: 0.06em;
}

.service-body {
  padding: 24px 26px;
}

.service-tags {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--color-text);
  border: 1px solid var(--color-border-tag);
  border-radius: 100px;
  padding: 4px 11px;
  white-space: nowrap;
}

.tag-sub {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: var(--color-text-label);
  white-space: nowrap;
}

.service-name {
  font-size: 19px;
  font-weight: 600;
  margin-bottom: 8px;
}

.service-desc {
  font-size: 14px;
  line-height: 1.9;
  color: var(--color-text-muted);
  font-weight: 300;
  margin: 0 0 18px;
}

.service-tech {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  margin-bottom: 20px;
}

.service-actions {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: var(--color-text);
  color: var(--color-surface);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 12px 22px;
  border-radius: 100px;
}

.arrow {
  font-family: var(--font-mono);
  font-size: 12px;
}

.service-note {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
}
</style>
