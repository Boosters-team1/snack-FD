import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import landingDog from '../assets/images/landing-dog.png';

export default function LandingPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
      <img src={landingDog} alt="스낵 강아지" className="mb-8 h-48 w-48 object-contain" />
      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        오늘 간식은 <span className="text-orange-500">Snack</span>에서
      </h1>
      <p className="mb-10 text-lg text-gray-500">다양한 스낵과 음료를 한 곳에서 만나보세요.</p>
      <div className="flex gap-4">
        <Link to="/signup">
          <Button size="lg">지금 시작하기</Button>
        </Link>
        <Link to="/login">
          <Button size="lg" variant="secondary">로그인</Button>
        </Link>
      </div>
    </div>
  );
}
