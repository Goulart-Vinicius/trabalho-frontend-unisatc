import type { FC } from "react";
import type { IDerivedOption } from "../../features/jobs/utils/deriveOptions";

interface IFilterGroupProps {
  label: string;
  options: readonly IDerivedOption[];
  selected: string[];
  onToggle: (id: string) => void;
  showCount?: boolean;
  variant?: "dark" | "primary";
}
const SELECTED_STYLES = {
  dark: "bg-[#0e1013] text-white shadow-xs",
  primary: "bg-[#0047ff] text-white shadow-xs",
} as const;

const IDLE_STYLES =
  "bg-[#f8f9fa] text-[#5f6774] border border-[#e2e5e9] hover:border-[#ccd2d9] hover:text-[#0e1013]";

export const FilterGroup: FC<IFilterGroupProps> = ({
  label,
  options,
  selected,
  onToggle,
  showCount,
  variant = "dark",
}) => {
  return (
    <fieldset className="flex flex-col gap-2.5 border-0 p-0 m-0">
      <legend className="text-xs font-medium text-[#5f6774] mb-1">
        {label}
      </legend>

      <div className="flex flex-col gap-1.5">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(option.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all focus-visible:outline-2 focus-visible:outline-[#0047ff] ${
                isSelected ? SELECTED_STYLES[variant] : IDLE_STYLES
              }`}
            >
              <span>{option.label}</span>
              {showCount ? (
                <span
                  aria-label={`${option.count} vagas`}
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-white text-[#5f6774] border border-[#e2e5e9]"
                  }`}
                >
                  {option.count}
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${
                    isSelected ? "bg-white" : "bg-[#ccd2d9]"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
