import { Routes, Route, Outlet } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { VagaPage } from "./pages/VagaPage";
import { CadastroPage } from "./pages/CadastroPage";
import { NaoEncontradaPage } from "./pages/NaoEncontradaPage";

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

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vagas/:id" element={<VagaPage />} />
        <Route path="/publicar" element={<CadastroPage />} />
        <Route path="*" element={<NaoEncontradaPage />} />
      </Route>
    </Routes>
  );
};
