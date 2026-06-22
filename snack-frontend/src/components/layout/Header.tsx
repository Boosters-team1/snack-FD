import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import snackLogo from '../../assets/text.png';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = 'text-[20px] font-bold leading-8 text-[#C4C4C4] hover:text-gray-500 transition-colors';

  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E6E6] bg-[#FBF8F4]">
      <div className="flex h-[88px] items-center justify-between px-[120px]">
        {/* 왼쪽: 로고 + 상품 리스트 */}
        <div className="flex items-center gap-16">
          <Link to={isLoggedIn ? '/products' : '/'}>
            <img src={snackLogo} alt="Snack" className="h-8 w-[126px]" />
          </Link>
          <Link to="/products" className="text-[20px] font-bold leading-8 text-[#F97B22]">
            상품 리스트
          </Link>
        </div>

        {/* 오른쪽: Cart · Profile · Logout */}
        <nav className="flex items-center gap-12">
          <Link to="/cart" className={navLinkClass}>Cart</Link>
          <Link to="/profile" className={navLinkClass}>Profile</Link>
          <button onClick={handleLogout} className={navLinkClass}>Logout</button>
        </nav>
      </div>
    </header>
  );
}
