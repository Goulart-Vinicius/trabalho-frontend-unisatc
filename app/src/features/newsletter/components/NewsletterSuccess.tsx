import { type FC } from "react";

interface NewsletterSuccessProps {
  email: string;
}

export const NewsletterSuccess: FC<NewsletterSuccessProps> = ({ email }) => (
  <output className="block p-4 bg-[#f1f3f5] border border-[#e2e5e9] rounded-lg text-sm text-[#0e1013]">
    <span className="font-semibold text-[#0047ff]">✓ Inscrição confirmada</span>{" "}
    para <strong>{email}</strong>. Você receberá o próximo índice na
    quinta-feira.
  </output>
);
