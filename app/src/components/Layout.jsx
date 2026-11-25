import { Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
