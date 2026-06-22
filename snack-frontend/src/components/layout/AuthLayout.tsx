import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AuthLayout() {
  // if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <Header />
      <Outlet />
    </div>
  );
}
