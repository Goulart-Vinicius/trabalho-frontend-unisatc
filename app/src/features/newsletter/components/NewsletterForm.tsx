import { type FC } from "react";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Button } from "../../../shared/ui/Button";
import { type INewsletterForm } from "../hooks/useNewsletterForm";

interface NewsletterFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<INewsletterForm>;
  errors: FieldErrors<INewsletterForm>;
}

export const NewsletterForm: FC<NewsletterFormProps> = ({
  onSubmit,
  register,
  errors,
}) => {
  const errorMessage = errors.email?.message;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col items-center justify-center gap-2.5 w-full"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full">
        <label htmlFor="newsletter-email" className="sr-only">
          Seu e-mail profissional <span aria-hidden="true">*</span>
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errorMessage ? "newsletter-error" : undefined}
          {...register("email", {
            required: "Por favor, digite seu endereço de e-mail.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "E-mail inválido",
            },
          })}
          className={`w-full sm:flex-1 py-2.5 px-3.5 text-sm text-[#0e1013] bg-[#f8f9fa] border rounded-md focus:bg-white focus:outline-2 focus:outline-[#0047ff] focus:border-transparent transition-all placeholder:text-[#5f6774]/70 ${
            errors.email ? "border-red-500 bg-red-50/20" : "border-[#e2e5e9]"
          }`}
        />
        <Button type="submit" variant="cobalt" size="md" className="w-full sm:w-auto">
          Assinar índice
        </Button>
      </div>

      {errorMessage ? (
        <p
          id="newsletter-error"
          role="alert"
          className="text-xs text-red-600 font-medium self-start sm:self-center"
        >
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
};
