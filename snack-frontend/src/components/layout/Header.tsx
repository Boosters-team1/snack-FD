import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to={isLoggedIn ? '/products' : '/'} className="text-xl font-bold text-orange-500">
          🍿 Snack
        </Link>

        <nav className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600">{user?.name}</span>
              <Link to="/profile">
                <Button variant="secondary" size="sm">프로필</Button>
              </Link>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="secondary" size="sm">로그인</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">회원가입</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
