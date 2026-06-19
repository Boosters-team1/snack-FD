import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AuthLayout() {
  // if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#FBF8F4]">
=======
    <div className="min-h-screen bg-background-400">
>>>>>>> 4c988d69cbd0ee3adb9cd6969d78956e129e4fc1
      <Header />
      <Outlet />
    </div>
  );
}
