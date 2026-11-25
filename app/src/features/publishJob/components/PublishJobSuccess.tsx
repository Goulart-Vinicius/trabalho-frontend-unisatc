import { type FC } from "react";
import { Link } from "react-router";
import { Button } from "../../../shared/ui/Button";

export const PublishJobSuccess: FC = () => (
  <div className="space-y-6">
    <div className="text-center py-4 bg-[#f1f3f5] border border-[#e2e5e9] rounded-lg">
      <span className="font-semibold text-[#0047ff] text-lg">
        ✓ Vaga publicada com sucesso
      </span>
      <p className="text-sm text-[#5f6774] mt-1">
        Sua vaga está disponível no índice. O valor de R$ 299 será cobrado.
      </p>
    </div>

    <div className="text-center">
      <Link to="/">
        <Button variant="primary" size="md">
          Voltar para a Home
        </Button>
      </Link>
    </div>
  </div>
);
