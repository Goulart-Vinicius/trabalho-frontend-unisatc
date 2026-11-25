import type { FC } from "react";
import { Link } from "react-router";

export const Footer: FC = () => {
  return (
    <footer className="border-t border-[#e2e5e9] bg-[#f8f9fa] py-8 text-xs text-[#5f6774]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0e1013]">OpenBoard</span>
          <span>·</span>
          <span>O índice aberto de contratações em startups</span>
        </div>

        <nav
          className="flex flex-wrap items-center gap-6"
          aria-label="Links do rodapé"
        >
          <Link to="#login" className="hover:text-[#0e1013] transition-colors">
            Entrar
          </Link>
          <Link
            to="/publish"
            className="hover:text-[#0e1013] transition-colors"
          >
            Publicar vaga
          </Link>
          <Link to="#vagas" className="hover:text-[#0e1013] transition-colors">
            Vagas abertas
          </Link>
          <Link
            to="#newsletter-title"
            className="hover:text-[#0e1013] transition-colors"
          >
            Newsletter
          </Link>
        </nav>
      </div>
    </footer>
  );
};
