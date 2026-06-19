import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import landingDog from '../assets/images/Landig-Dog.png';
import snackLogo from '../assets/images/Snack-Logo.png';

const DESIGN_W = 1920;
const DESIGN_H = 1080;

const BUBBLES = [
  { text: '쉽고 빠르게 구매를 요청해보세요', x: 219, y: 467, w: 401 },
  { text: '내가 원하는 간식을, 원하는 만큼!', x: 58, y: 639, w: 399 },
  { text: '다양한 품목도 한 눈에 파악해요', x: 1308, y: 465, w: 385 },
  { text: '관리자와 유저 모두 이용 가능해요', x: 1459, y: 639, w: 407 },
] as const;

export default function LandingPage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DESIGN_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden bg-background-500"
      style={{ height: DESIGN_H * scale }}
    >
      {/* 고정 좌표계 stage (1920 × 1080) */}
      <div
        className="relative origin-top-left bg-background-500"
        style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})` }}
      >
        {/* Header (1920 × 88) */}
        <header className="absolute inset-x-0 top-0 z-30 flex h-[88px] items-center justify-between bg-primary-400 px-[120px]">
          <Link to="/">
            <img
              src={snackLogo}
              alt="Snack"
              className="h-[32px] w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </Link>
          <nav className="flex items-center gap-[60px] text-[22px] font-medium text-white">
            <Link to="/login" className="transition-opacity hover:opacity-80">
              로그인
            </Link>
            <Link to="/signup" className="transition-opacity hover:opacity-80">
              회원가입
            </Link>
          </nav>
        </header>

        {/* Hero Snack 워드마크 (x712 y160, 496 × 128) */}
        <img
          src={snackLogo}
          alt="Snack"
          className="absolute left-[712px] top-[160px] z-10 h-[128px] w-[496px] object-contain"
        />

        {/* Subtitle pill (591,338 / 738 × 68) — 흰 배경 + primary-300 테두리 */}
        <p className="absolute left-[591px] top-[338px] z-10 flex h-[68px] w-[738px] items-center justify-center whitespace-nowrap rounded-full border-[3px] border-primary-300 bg-white text-[20px] font-medium text-primary-400">
          흩어진 간식 구매처를 통합하고, 기수별 지출을 똑똑하게 관리하세요
        </p>

        {/* Speech bubbles + 꼬리 */}
        {BUBBLES.map((b) => (
          <div
            key={b.text}
            className="absolute z-20 flex h-[76px] items-center justify-center whitespace-nowrap rounded-full bg-primary-400 text-[22px] font-medium text-white"
            style={{ left: b.x, top: b.y, width: b.w }}
          >
            {b.text}
            {/* 꼬리: 아래 중앙, 32 × 23 삼각형 (translate 미사용, left 직접 계산) */}
            <span
              className="absolute top-full h-[23px] w-[32px] bg-primary-400"
              style={{ left: b.w / 2 - 16, clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
          </div>
        ))}

        {/* Dog illustration (1674 × 564 @ (123,519)) — 하단 full-bleed */}
        <div className="absolute bottom-0 left-[123px] z-0 w-[1674px]">
          <img
            src={landingDog}
            alt="Snack 마스코트"
            className="pointer-events-none h-auto w-full select-none object-contain"
          />
        </div>
      </div>
    </div>
  );
}
