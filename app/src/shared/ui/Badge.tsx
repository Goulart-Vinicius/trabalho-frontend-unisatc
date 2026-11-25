import type { FC, ReactNode } from "react";

const VARIANTS = {
  highlight:
    "font-mono font-semibold bg-[#0047ff]/10 text-[#0047ff] border border-[#0047ff]/20",
  muted: "text-[#5f6774] bg-[#f1f3f5]",
  outline: "text-[#5f6774] border border-[#e2e5e9]",
} as const;

interface IBadgeProps {
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
}

export const Badge: FC<IBadgeProps> = ({ variant = "muted", children }) => (
  <span className={`text-xs px-2 py-0.5 rounded ${VARIANTS[variant]}`}>
    {children}
  </span>
);
