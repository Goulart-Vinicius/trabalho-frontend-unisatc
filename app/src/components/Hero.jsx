export const Hero = ({ titulo, subtitulo, children }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-titulo">{titulo}</h1>
        <p className="hero-subtitulo">{subtitulo}</p>
        <div className="hero-acoes">{children}</div>
      </div>
    </section>
  );
};
