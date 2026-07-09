<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="copyright">© 2026 {{ profile.name }}</div>
      <div class="footer-links">
        <a :href="`mailto:${profile.email}`">メール</a>
        <a :href="siteLinks.github" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href="#top">トップへ ↑</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile, links as siteLinks } from '~/data/site';
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  background-color: var(--color-bg);
}

.footer-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.copyright {
  font-size: 12px;
  color: var(--color-text-label);
}

.footer-links {
  display: flex;
  gap: 22px;
  font-family: var(--font-mono);
  font-size: 12px;
}

.footer-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 12px 8px;
  margin: -12px -8px;
  transition: opacity 0.2s ease;
}

.footer-links a:hover {
  opacity: 0.6;
}

@media (max-width: 768px) {
  .footer-inner {
    padding: 24px 20px;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
