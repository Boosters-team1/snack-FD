import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GuestLayout from './components/layout/GuestLayout';
import AuthLayout from './components/layout/AuthLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
