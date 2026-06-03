import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
