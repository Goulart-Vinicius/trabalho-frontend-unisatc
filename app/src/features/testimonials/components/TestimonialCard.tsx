import type { FC } from "react";
import type { ITestimonial } from "../types/testimonial";

interface ITestimonialCardProps {
  testimonial: ITestimonial;
}

export const TestimonialCard: FC<ITestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="flex flex-col justify-between p-6 bg-white border border-[#e2e5e9] rounded-lg shadow-xs hover:border-[#ccd2d9] transition-colors">
      <p className="text-sm text-[#0e1013] leading-relaxed mb-6 font-normal">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#f1f3f5]">
        <div
          className={`w-9 h-9 rounded-full ${testimonial.avatarBg} text-white font-semibold text-xs flex items-center justify-center shrink-0 shadow-xs`}
        >
          {testimonial.avatarInitial}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#0e1013] truncate">
            {testimonial.name}
          </p>
          <span className="text-xs text-[#5f6774] block truncate">
            {testimonial.role}
          </span>
        </div>
      </div>
    </div>
  );
};
