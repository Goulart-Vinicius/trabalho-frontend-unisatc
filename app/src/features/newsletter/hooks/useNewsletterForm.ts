import { useForm, type SubmitHandler } from "react-hook-form";

export interface INewsletterForm {
  email: string;
}

export function useNewsletterForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitSuccessful },
  } = useForm<INewsletterForm>({ defaultValues: { email: "" } });

  const onSubmit: SubmitHandler<INewsletterForm> = () => {
    // futuramente: await fetch("/api/newsletter", ...)
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    getValues,
    errors,
    isSubmitSuccessful,
  };
}
