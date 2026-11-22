import type { SiteData } from '~/types/site';

export const useSiteData = async () => {
  const { data, error } = await useAsyncData('site-data', () =>
    $fetch<SiteData>('/api/site-data'),
  );
  // 取得失敗時は空のページを出さず、prerender（nuxt generate）を失敗させる
  if (error.value) {
    throw createError({
      statusCode: error.value.statusCode,
      message: error.value.message,
      fatal: true,
    });
  }
  return {
    siteData: data,
    siteUrl: computed(() => data.value?.siteUrl ?? ''),
    profile: computed(() => data.value?.profile),
    skills: computed(() => data.value?.skills ?? []),
    services: computed(() => data.value?.services ?? []),
    works: computed(() => data.value?.works ?? []),
    career: computed(() => data.value?.career ?? []),
    contact: computed(() => data.value?.contact),
    links: computed(() => data.value?.links),
  };
};
