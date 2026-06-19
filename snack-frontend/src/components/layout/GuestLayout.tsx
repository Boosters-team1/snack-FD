import { Link, Outlet } from 'react-router-dom';
import snackLogo from '../../assets/images/Snack-Logo.png';

/**
 * 인증 페이지(로그인/회원가입) 공용 레이아웃.
 * 주황 헤더 + 중앙 Snack 로고, 배경 background-400.
 */
export default function GuestLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background-400">
      <header className="flex h-[88px] shrink-0 items-center justify-center bg-primary-400">
        <Link to="/">
          <img
            src={snackLogo}
            alt="Snack"
            className="h-[32px] w-auto"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </Link>
      </header>
      <main className="flex flex-1 justify-center px-4">
        <Outlet />
      </main>
    </div>
  );
}
