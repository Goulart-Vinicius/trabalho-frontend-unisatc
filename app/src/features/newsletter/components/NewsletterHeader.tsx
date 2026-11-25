import { type FC } from "react";

export const NewsletterHeader: FC = () => (
  <div className="text-center">
    <span className="text-xs font-mono font-semibold text-[#0047ff] tracking-wide uppercase block mb-2">
      Newsletter Curada
    </span>
    <h2
      id="newsletter-title"
      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0e1013] tracking-tight mb-3"
    >
      Vagas novas, toda quinta-feira.
    </h2>
    <p className="text-base text-[#5f6774] mb-8 max-w-xl mx-auto font-normal">
      Um resumo direto no seu e-mail com as melhores oportunidades abertas na
      semana e média salarial. Sem spam.
    </p>
  </div>
);
