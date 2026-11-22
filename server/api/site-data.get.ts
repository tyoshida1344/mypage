import { isSuspended, type SiteData } from '~/types/site';

/** 公開停止中の項目はリンク URL をページ・payload に含めないよう空にする */
const stripSuspendedLinks = <T extends { status?: string; link: string }>(items: T[]): T[] =>
  items.map((item) => (isSuspended(item) ? { ...item, link: '' } : item));

export default defineEventHandler(async (): Promise<SiteData> => {
  const { gasApiUrl } = useRuntimeConfig();

  if (!gasApiUrl) {
    throw createError({
      statusCode: 500,
      message: 'NUXT_GAS_API_URL が設定されていません',
    });
  }

  const data = await $fetch<SiteData>(gasApiUrl);
  return {
    ...data,
    services: stripSuspendedLinks(data.services ?? []),
    works: stripSuspendedLinks(data.works ?? []),
  };
});
