import type { SiteData } from '~/types/site';

export const useSiteData = async () => {
  const { data } = await useAsyncData('site-data', () =>
    $fetch<SiteData>('/api/site-data'),
  );
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
