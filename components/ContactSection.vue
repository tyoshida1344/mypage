<template>
  <SectionWrapper
    id="contact"
    number="06"
    title="連絡先"
    no-border
  >
    <a :href="`mailto:${profile.email}`" class="email">
      {{ profile.email }}
    </a>
    <div class="contact-sub">{{ contact.description }}</div>
    <div class="contact-details">
      <template v-for="detail in contact.details" :key="detail.label">
        <div class="detail-label">{{ detail.label }}</div>
        <div class="detail-value">{{ detail.value }}</div>
      </template>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { profile, contact } from '~/data/site';
</script>

<style scoped>
.email {
  font-size: 22px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 3px;
  display: inline-block;
  transition: opacity 0.2s ease;
}

.email:hover {
  opacity: 0.6;
}

.contact-sub {
  font-size: 13px;
  color: var(--color-text-light);
  font-weight: 300;
  margin-top: 16px;
}

.contact-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 18px;
  margin-top: 24px;
  max-width: 480px;
}

.detail-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-label);
  padding-top: 2px;
}

.detail-value {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.7;
}
</style>
