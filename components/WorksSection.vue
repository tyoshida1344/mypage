<template>
  <SectionWrapper id="works" number="04" title="ポートフォリオ一覧">
    <a
      v-if="siteLinks?.github"
      :href="siteLinks.github"
      class="github-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <DotIndicator size="6px" gap="4px" />
      GitHub でコードを見る<span class="arrow">↗</span>
    </a>
    <div class="works-list">
      <component
        :is="isSuspended(work) ? 'div' : 'a'"
        v-for="(work, i) in works"
        :key="i"
        class="work-card"
        v-bind="cardLinkAttrs(work)"
      >
        <div class="work-image">
          <img
            v-if="work.thumb && !failedThumbs.has(i)"
            ref="thumbEls"
            :data-index="i"
            :src="work.thumb"
            :alt="`${work.title}のサムネイル`"
            loading="lazy"
            class="work-thumb"
            @error="failedThumbs.add(i)"
          >
          <span v-else class="no-image" aria-hidden="true">No Image</span>
        </div>
        <div class="work-body">
          <div class="work-header">
            <span class="work-title">{{ work.title }}</span>
            <span v-if="isSuspended(work)" class="suspended-badge">公開停止中</span>
            <span v-else class="work-link">見る ↗</span>
          </div>
          <div class="work-desc">{{ work.description }}</div>
          <div class="work-tech">{{ work.tech }}</div>
        </div>
      </component>
    </div>
  </SectionWrapper>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';

const { works, links: siteLinks } = await useSiteData();

/** 読み込みに失敗したサムネイルのインデックス（No Image 表示に切り替える） */
const failedThumbs = reactive(new Set<number>());
const thumbEls = ref<HTMLImageElement[]>([]);

// 静的 HTML の画像はハイドレーション前に読込失敗していると @error を取り逃すため、マウント時にも確認する
onMounted(() => {
  thumbEls.value.forEach((el) => {
    if (el.complete && el.naturalWidth === 0) failedThumbs.add(Number(el.dataset.index));
  });
});
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

a.work-card:hover,
a.work-card:focus-visible {
  border-color: var(--color-accent-light);
  box-shadow: var(--shadow-card-hover);
}

.work-image {
  width: 116px;
  height: 78px;
  border-radius: 4px;
  flex: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-accent-bg) 0%, var(--color-bg) 100%);
}

.work-thumb {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.no-image {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-text-label);
  letter-spacing: 0.06em;
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

.suspended-badge {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  color: var(--color-text-label);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  padding: 2px 9px;
  white-space: nowrap;
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
