interface BadgeProps {
  count: number;
  label?: string;
}

export default function Badge({ count, label = '회 구매' }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
      {count.toLocaleString('ko-KR')}{label}
    </span>
  );
}
