import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-symbol">OB</span>
          <span className="logo-text">OpenBoard</span>
        </Link>
        <nav className="header-nav">
          <Link to="/#vagas" className="nav-link">
            Vagas abertas
          </Link>
          <Link to="/publicar" className="btn-publicar">
            Publicar vaga R$ 299
          </Link>
        </nav>
      </div>
    </header>
  );
};
