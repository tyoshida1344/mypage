<template>
  <NuxtPage />
</template>

<script setup lang="ts">
const { profile, siteUrl } = await useSiteData();

useHead(() => {
  const name = profile.value?.name;
  const title = [name, 'プロフィール'].filter(Boolean).join(' | ');
  const description = profile.value?.lead ?? '';
  const url = siteUrl.value;
  return {
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ja_JP' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ],
  };
});
</script>
