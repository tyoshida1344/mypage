/** シートの status 列でこの値が指定された項目は公開停止中として扱う */
export const SUSPENDED_STATUS = '停止中';

export const isSuspended = (item: { status?: string }): boolean =>
  item.status?.trim() === SUSPENDED_STATUS;

/** カードを外部リンクにするための属性。公開停止中はリンクにしない */
export const cardLinkAttrs = (item: { status?: string; link: string }) =>
  isSuspended(item) ? {} : { href: item.link, target: '_blank', rel: 'noopener noreferrer' };
