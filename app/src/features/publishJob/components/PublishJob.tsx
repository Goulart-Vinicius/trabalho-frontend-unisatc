import { type FC } from "react";
import { useState } from "react";
import { usePublishJobForm } from "../hooks/usePublishJobForm";
import { PublishJobForm } from "./PublishJobForm";
import { PublishJobSuccess } from "./PublishJobSuccess";
import type { IPublishJobForm } from "../types/publish-job";
import { Link } from "react-router";

export const PublishJob: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<IPublishJobForm | null>(
    null,
  );

  const { register, handleSubmit, errors, isSubmitting } = usePublishJobForm(
    (data) => {
      setSubmittedData(data);
      setIsSubmitted(true);
    },
  );

  if (isSubmitted && submittedData) {
    return <PublishJobSuccess data={submittedData} />;
  }

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#e2e5e9]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2  py-4 text-sm font-medium text-[#0047ff] hover:underline"
        >
          <span aria-hidden="true">←</span>
          Voltar para as vagas
        </Link>

        <header className="text-start mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0e1013] tracking-tight mb-3">
            Publicar nova vaga
          </h2>
          <p className="text-lg text-[#5f6774] max-w-2xl mx-auto">
            Preencha os dados abaixo. A vaga ficará disponível no índice aberto
            por 30 dias. Custo único de <strong>R$ 299</strong>.
          </p>
        </header>

        <PublishJobForm
          onSubmit={handleSubmit}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
};
