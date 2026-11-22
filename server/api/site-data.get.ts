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

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * GAS のレスポンスが SiteData の形をしているか。
 * GAS は実行時エラーでも 200 で HTML を返すため、HTTP ステータスだけでは判定できない
 */
const isSiteData = (data: unknown): data is SiteData =>
  isObject(data) &&
  isObject(data.profile) &&
  isObject(data.contact) &&
  ['skills', 'services', 'works', 'career'].every((key) => Array.isArray(data[key]));

/** 原因をログ（Netlify の Deploy log）に残してからエラーにする */
const fail = (statusCode: number, message: string): never => {
  console.error(`[site-data] ${message}`);
  throw createError({ statusCode, message });
};

export default defineEventHandler(async (): Promise<SiteData> => {
  const { gasApiUrl } = useRuntimeConfig();

  if (!gasApiUrl) {
    return fail(500, 'NUXT_GAS_API_URL が設定されていません');
  }

  const data = await $fetch<unknown>(gasApiUrl).catch((error: Error) =>
    fail(502, `GAS からのデータ取得に失敗しました: ${error.message}`),
  );

  if (!isSiteData(data)) {
    return fail(502, 'GAS のレスポンスがサイトデータの形式ではありません');
  }

  return {
    ...data,
    services: toPublicItems(data.services),
    works: toPublicItems(data.works),
  };
});
