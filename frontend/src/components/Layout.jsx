import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isDarkPage =
    location.pathname === "/login" || location.pathname === "/profile";

  return (
    <>
      <Header />

      <main className={`main${isDarkPage ? " bg-dark" : ""}`}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
