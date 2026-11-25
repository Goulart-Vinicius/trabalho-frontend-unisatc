import type { FC } from "react";
import { useTestimonials } from "../hooks/useTestimonials";
import { TestimonialCard } from "./TestimonialCard";

export const Testimonials: FC = () => {
  const testimonials = useTestimonials();
  return (
    <section className="py-16 sm:py-20 border-t border-[#e2e5e9] bg-[#f8f9fa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono font-semibold text-[#0047ff] tracking-wide uppercase block mb-1">
            Depoimentos
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0e1013] tracking-tight">
            Validado por quem contrata e quem constrói.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};
