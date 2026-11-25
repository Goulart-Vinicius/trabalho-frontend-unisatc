import { useCallback } from "react";
import type { IJob } from "../../jobs/types/job";

export const useAddJob = () => {
  const addJob = useCallback(async (newJob: Omit<IJob, "id">) => {
    const response = await fetch("/api/vagas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    if (!response.ok) {
      const body = await response.json();
      throw new Error(body.error || "Não foi possível salvar a vaga.");
    }
  }, []);

  return { addJob };
};
