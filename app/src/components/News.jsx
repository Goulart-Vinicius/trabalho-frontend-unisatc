import { useState } from "react";

export const News = () => {
  const [email, setEmail] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      setErro(true);
      setSucesso(false);
      return;
    }

    setSucesso(true);
    setErro(false);
  };

  if (sucesso) {
    return (
      <section className="newsletter-sucesso">
        <h2>Newsletter</h2>
        <p>Inscrição realizada com sucesso para: {email}</p>
      </section>
    );
  }

  return (
    <section className="newsletter">
      <h2 id="newsletter-title">Newsletter</h2>
      {erro && (
        <p className="erro-newsletter">Digite um e-mail válido.</p>
      )}
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Assinar</button>
      </form>
    </section>
  );
};
