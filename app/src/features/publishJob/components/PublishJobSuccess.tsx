import type { FC } from "react";
import { Link } from "react-router";
import { Button } from "../../../shared/ui/Button";
import { JobDetailCard } from "../../../shared/components/JobDetailCard";
import type { IPublishJobForm } from "../types/publish-job";

interface PublishJobSuccessProps {
  data: IPublishJobForm;
}

export const PublishJobSuccess: FC<PublishJobSuccessProps> = ({ data }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 m-8">
      <div className="text-center py-4 bg-[#f1f3f5] border border-[#e2e5e9] rounded-lg">
        <span className="font-semibold text-[#0047ff] text-lg">
          ✓ Vaga publicada com sucesso
        </span>
        <p className="text-sm text-[#5f6774] mt-1">
          Sua vaga está disponível no índice. O valor de R$ 299 será cobrado.
        </p>
        <JobDetailCard
          company={data.company}
          role={data.role}
          salary={data.salary}
          workplaceType={data.workplaceType}
          type={data.type}
          area={data.area}
          description={data.description}
          publishedAt="Agora"
        />
      </div>

      <div className="text-center pt-6">
        <Link to="/">
          <Button variant="primary" size="md">
            Voltar para a Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
