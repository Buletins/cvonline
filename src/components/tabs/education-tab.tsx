import type { Education } from "@prisma/client";

import BlockWrapper from "../blocks/block-wrapper";
import EducationForm from "../forms/education-form";
import EducationItems from "../blocks/education-items";

interface EducationTabProps {
  data: Education[];
}

export default function EducationTab({ data }: EducationTabProps) {
  return (
    <BlockWrapper
      title="Opleidingen"
      description="Vermeld je opleiding(en), benoem eventueel cursussen, projecten of prestaties. Begin met je laatste opleiding."
      adding={<EducationForm />}
      listing={<EducationItems data={data} />}
    />
  );
}
