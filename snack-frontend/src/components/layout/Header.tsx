<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logoImg from "../../assets/images/logo.png";
=======
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import snackLogo from '../../assets/text.png';
>>>>>>> 4c988d69cbd0ee3adb9cd6969d78956e129e4fc1

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

<<<<<<< HEAD
  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E6E6] bg-[#FBF8F4]">
      <div className="flex h-[88px] items-center justify-between px-[120px]">
        {/* 왼쪽: 로고 + 상품 리스트 */}
        <div className="flex items-center gap-16">
          <Link to="/products" className="leading-none">
            <img src={logoImg} alt="Snack" width={126} height={32} />
          </Link>
          <Link to="/products" className="text-[16px] font-bold text-[#F97B22]">
            상품 리스트
          </Link>
        </div>

        {/* 오른쪽 */}
        {isLoggedIn ? (
          <nav className="flex items-center gap-16">
            <Link
              to="/profile"
              className="text-[20px] font-bold leading-[32px] text-[#C4C4C4] hover:text-gray-500"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-[20px] font-bold leading-[32px] text-[#C4C4C4] hover:text-gray-500"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-16">
            <Link
              to="/login"
              className="text-[20px] font-bold leading-[32px] text-[#C4C4C4] hover:text-gray-500"
            >
              Profile
            </Link>
            <Link
              to="/signup"
              className="text-[20px] font-bold leading-[32px] text-[#C4C4C4] hover:text-gray-500"
            >
              Logout
            </Link>
          </nav>
        )}
=======
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
>>>>>>> 4c988d69cbd0ee3adb9cd6969d78956e129e4fc1
      </div>
    </header>
  );
}
