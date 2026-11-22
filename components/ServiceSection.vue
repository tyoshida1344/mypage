<template>
  <SectionWrapper id="product" number="03" title="提供サービス">
    <div class="service-list">
      <component
        :is="isSuspended(service) ? 'div' : 'a'"
        v-for="service in services"
        :key="service.name"
        class="service-card"
        v-bind="cardLinkAttrs(service)"
      >
        <ImageSlider :images="service.images" :alt="service.name" />
        <div class="service-body">
          <div class="service-tags">
            <span class="tag">{{ service.type }}</span>
          </div>
          <div class="service-name">{{ service.name }}</div>
          <p class="service-desc">{{ service.description }}</p>
          <div class="service-tech">{{ service.tech }}</div>
          <div class="service-actions">
            <span v-if="isSuspended(service)" class="suspended-badge">公開停止中</span>
            <template v-else>
              <span class="btn-primary"> {{ service.linkLabel }}<span class="arrow">↗</span> </span>
              <span class="service-note">{{ service.note }}</span>
            </template>
          </div>
        </div>
      </component>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
const { services } = await useSiteData();
</script>

<style scoped>
.service-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.service-card {
  display: block;
  border: 1px solid var(--color-border-light);
  border-radius: 8px;
  overflow: hidden;
  max-width: 560px;
  text-decoration: none;
  color: inherit;
  background-color: var(--color-bg);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

a.service-card {
  cursor: pointer;
}

a.service-card:hover,
a.service-card:focus-visible {
  border-color: var(--color-accent-light);
  box-shadow: var(--shadow-card-hover);
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
  color: var(--color-primary);
  border: 1px solid var(--color-accent-light);
  border-radius: 100px;
  padding: 4px 11px;
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
  background: var(--color-primary);
  color: var(--color-surface);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  padding: 12px 22px;
  border-radius: 100px;
  transition: background 0.2s ease;
}

a.service-card:hover .btn-primary {
  background: var(--color-primary-dark);
}

.arrow {
  font-family: var(--font-mono);
  font-size: 12px;
}

.suspended-badge {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: var(--color-text-label);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 12px 22px;
}

.service-note {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
}
</style>
