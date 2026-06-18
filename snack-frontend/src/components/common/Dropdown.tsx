import { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function Dropdown({ options, value, onChange, className = '' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-[136px] ${className}`}>

      {/* 트리거 버튼 */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[50px] w-full items-center justify-between rounded-[8px] border border-[#E0E0E0] bg-white px-[14px] text-[18px] text-[#999999]"
      >
        <span>{selected?.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 드롭다운 목록 */}
      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-[8px] border border-[#E0E0E0] bg-white shadow-sm">
          {options.map((opt, index) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`flex h-[50px] w-full items-center px-[14px] text-[18px] text-[#999999] hover:bg-gray-50 ${
                index === 0 ? 'rounded-t-[8px]' : ''
              } ${
                index === options.length - 1 ? 'rounded-b-[8px]' : ''
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
