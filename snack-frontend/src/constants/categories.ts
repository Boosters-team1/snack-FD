export const CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: 'snack', label: '스낵' },
  { value: 'beverage', label: '음료' },
  { value: 'water', label: '생수' },
  { value: 'candy', label: '사탕·젤리' },
  { value: 'chocolate', label: '초콜릿' },
  { value: 'bread', label: '빵·케이크' },
  { value: 'icecream', label: '아이스크림' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];
