/** シートの status 列で使う値 */
export const ITEM_STATUS = {
  /** 表示はするがリンクにしない（「公開停止中」バッジを出す） */
  suspended: '停止中',
  /** サイトに一切出さない */
  private: '非公開',
} as const;

type HasStatus = { status?: string };

/** status とリンクを持つ一覧の項目（services / works） */
export type StatusItem = HasStatus & { link: string };

export const isSuspended = (item: HasStatus): boolean =>
  item.status?.trim() === ITEM_STATUS.suspended;

export const isPrivate = (item: HasStatus): boolean => item.status?.trim() === ITEM_STATUS.private;

/** カードを外部リンクにするための属性。公開停止中はリンクにしない */
export const cardLinkAttrs = (item: StatusItem) =>
  isSuspended(item) ? {} : { href: item.link, target: '_blank', rel: 'noopener noreferrer' };
