import { useForm, type SubmitHandler } from "react-hook-form";
import type { IPublishJobForm } from "../types/publish-job";

export function usePublishJobForm(onSuccess?: (data: IPublishJobForm) => void) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<IPublishJobForm>({
    defaultValues: {
      company: "",
      role: "",
      salary: "",
      workplaceType: "",
      type: "",
      area: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<IPublishJobForm> = (data) => {
    onSuccess?.(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isSubmitSuccessful,
    reset,
  };
}