import type { SiteData } from '~/types/site';
import { isPrivate, isSuspended, type StatusItem } from '~/utils/status';

/**
 * サイトに出す項目だけに絞る。ページ・payload に含めないよう、
 * 非公開の項目は丸ごと除外し、公開停止中の項目はリンク URL を空にする
 */
const toPublicItems = <T extends StatusItem>(items: T[]): T[] =>
  items
    .filter((item) => !isPrivate(item))
    .map((item) => (isSuspended(item) ? { ...item, link: '' } : item));

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
    services: toPublicItems(data.services ?? []),
    works: toPublicItems(data.works ?? []),
  };
});
