import type { SiteData } from '~/types/site';

export default defineEventHandler(async (): Promise<SiteData> => {
  const { gasApiUrl } = useRuntimeConfig();

  if (!gasApiUrl) {
    throw createError({
      statusCode: 500,
      message: 'NUXT_GAS_API_URL が設定されていません',
    });
  }

  return await $fetch<SiteData>(gasApiUrl);
});
