import { readFileSync, existsSync } from 'node:fs';
import type { SiteData } from '~/types/site';

export default defineEventHandler(async (): Promise<SiteData> => {
  const { gasApiUrl } = useRuntimeConfig();

  if (gasApiUrl) {
    return await $fetch<SiteData>(gasApiUrl);
  }

  const path = 'data/site.json';
  if (existsSync(path)) {
    return JSON.parse(readFileSync(path, 'utf-8')) as SiteData;
  }

  throw createError({
    statusCode: 500,
    message: 'GAS_API_URL が未設定で、ローカルの site.json も見つかりません',
  });
});
