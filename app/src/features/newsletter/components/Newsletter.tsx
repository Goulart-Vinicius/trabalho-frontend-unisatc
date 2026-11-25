import { type FC } from "react";
import { useNewsletterForm } from "../hooks/useNewsletterForm";
import { NewsletterHeader } from "./NewsletterHeader";
import { NewsletterForm } from "./NewsletterForm";
import { NewsletterSuccess } from "./NewsletterSuccess";

export const Newsletter: FC = () => {
  const { register, handleSubmit, getValues, errors, isSubmitSuccessful } =
    useNewsletterForm();

  return (
    <section
      aria-labelledby="newsletter-title"
      className="py-16 sm:py-20 border-t border-[#e2e5e9] bg-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterHeader />

        <div className="w-full max-w-md mx-auto">
          {isSubmitSuccessful ? (
            <NewsletterSuccess email={getValues("email")} />
          ) : (
            <NewsletterForm
              onSubmit={handleSubmit}
              register={register}
              errors={errors}
            />
          )}
        </div>
      </div>
    </section>
  );
};
