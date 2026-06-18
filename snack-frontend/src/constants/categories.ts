export interface SubCategory {
  value: string;
  label: string;
}

export interface MainCategory {
  value: string;
  label: string;
  sub: SubCategory[];
}

export const MAIN_CATEGORIES: MainCategory[] = [
  {
    value: 'snack',
    label: '스낵',
    sub: [
      { value: 'chip', label: '과자·칩' },
      { value: 'rice_snack', label: '쌀과자' },
      { value: 'nut', label: '견과류' },
      { value: 'popcorn', label: '팝콘' },
    ],
  },
  {
    value: 'beverage',
    label: '음료',
    sub: [
      { value: 'cola', label: '청량·탄산음료' },
      { value: 'juice', label: '과즙음료' },
      { value: 'energy', label: '에너지음료' },
      { value: 'coffee_drink', label: '원두커피' },
      { value: 'health_drink', label: '건강음료' },
    ],
  },
  {
    value: 'water',
    label: '생수',
    sub: [
      { value: 'still_water', label: '일반생수' },
      { value: 'sparkling', label: '탄산수' },
      { value: 'mineral', label: '미네랄워터' },
    ],
  },
  {
    value: 'convenience',
    label: '간편식',
    sub: [
      { value: 'instant', label: '즉석식품' },
      { value: 'cup_rice', label: '컵밥' },
      { value: 'sandwich', label: '샌드위치·김밥' },
    ],
  },
  {
    value: 'fresh',
    label: '신선식품',
    sub: [
      { value: 'fruit', label: '과일' },
      { value: 'vegetable', label: '채소' },
      { value: 'dairy', label: '유제품' },
    ],
  },
  {
    value: 'coffee',
    label: '원두커피',
    sub: [
      { value: 'bean', label: '원두' },
      { value: 'drip', label: '드립커피' },
      { value: 'capsule', label: '캡슐커피' },
    ],
  },
  {
    value: 'supply',
    label: '비품',
    sub: [
      { value: 'cup', label: '컵·용기' },
      { value: 'tissue', label: '티슈·냅킨' },
      { value: 'disposable', label: '일회용품' },
    ],
  },
];

export const CATEGORIES = [
  { value: 'all', label: '전체' },
  ...MAIN_CATEGORIES.flatMap((cat) => cat.sub),
];

export type CategoryValue = (typeof CATEGORIES)[number]['value'];
