import { type FC } from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { IPublishJobForm } from "../types/publish-job";

interface TextareaFieldProps {
  label: string;
  name: keyof IPublishJobForm;
  placeholder?: string;
  register: UseFormRegister<IPublishJobForm>;
  errors: FieldErrors<IPublishJobForm>;
  required?: boolean;
}

export const TextareaField: FC<TextareaFieldProps> = ({
  label,
  name,
  placeholder,
  register,
  errors,
  required = true,
}) => {
  const errorMessage = errors[name]?.message;

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-[#0e1013] mb-1.5"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errorMessage ? `${name}-error` : undefined}
        {...register(name, {
          required: required ? `${label} é obrigatório` : undefined,
        })}
        rows={5}
        className={`w-full py-2.5 px-3.5 text-sm text-[#0e1013] bg-[#f8f9fa] border rounded-md focus:bg-white focus:outline-2 focus:outline-[#0047ff] focus:border-transparent transition-all placeholder:text-[#5f6774]/70 resize-none ${
          errors[name] ? "border-red-500 bg-red-50/20" : "border-[#e2e5e9]"
        }`}
      />
      {errorMessage ? (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1 text-xs text-red-600 font-medium"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
