import { type FC } from "react";
import { Button } from "../../../shared/ui/Button";
import { SelectField } from "./SelectField";
import { TextField } from "./TextField";
import { TextareaField } from "./TextareaField";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import type { IPublishJobForm } from "../types/publish-job";

const WORKPLACE_OPTIONS: { value: string; label: string }[] = [
  { value: "Remoto", label: "Remoto" },
  { value: "Presencial", label: "Presencial" },
  { value: "Híbrido", label: "Híbrido" },
];

const TYPE_OPTIONS: { value: string; label: string }[] = [
  { value: "Efetivo", label: "Efetivo" },
  { value: "Estágio", label: "Estágio" },
  { value: "Temporário", label: "Temporário" },
];

const AREA_OPTIONS: { value: string; label: string }[] = [
  { value: "Engenharia", label: "Engenharia" },
  { value: "Design", label: "Design" },
  { value: "Gestão", label: "Gestão" },
];

interface PublishJobFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<IPublishJobForm>;
  errors: FieldErrors<IPublishJobForm>;
  isSubmitting: boolean;
}

export const PublishJobForm: FC<PublishJobFormProps> = ({
  onSubmit,
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <TextField
          label="Empresa"
          name="company"
          placeholder="Ex: Vercel, Nubank, SATC Labs..."
          register={register}
          errors={errors}
        />
        <TextField
          label="Cargo / Título da vaga"
          name="role"
          placeholder="Ex: Full-stack Engineer, Product Designer..."
          register={register}
          errors={errors}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <TextField
          label="Faixa salarial"
          name="salary"
          placeholder="Ex: R$ 10k - 20k"
          register={register}
          errors={errors}
        />
        <SelectField
          label="Modalidade de trabalho"
          name="workplaceType"
          options={WORKPLACE_OPTIONS}
          register={register}
          errors={errors}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <SelectField
          label="Tipo de contratação"
          name="type"
          options={TYPE_OPTIONS}
          register={register}
          errors={errors}
        />
        <SelectField
          label="Área"
          name="area"
          options={AREA_OPTIONS}
          register={register}
          errors={errors}
        />
      </div>

      <TextareaField
        label="Descrição da vaga"
        name="description"
        placeholder="Descreva as responsabilidades, requisitos, tecnologias, benefícios..."
        register={register}
        errors={errors}
      />

      <div className="flex justify-end pt-4 border-t border-[#e2e5e9]">
        <Button
          type="submit"
          variant="cobalt"
          size="md"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publicando..." : "Publicar vaga por R$ 299"}
        </Button>
      </div>
    </form>
  );
};
