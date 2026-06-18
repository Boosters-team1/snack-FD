export const CATEGORIES = [
  { id: 1, label: '스낵' },
  { id: 2, label: '음료' },
  { id: 3, label: '생수' },
  { id: 4, label: '간편식' },
  { id: 5, label: '신선식품' },
  { id: 6, label: '원두커피' },
  { id: 7, label: '비품' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];
