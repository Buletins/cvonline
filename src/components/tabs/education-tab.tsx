import type { Education } from "@prisma/client";

import BlockWrapper from "../blocks/block-wrapper";
import EducationForm from "../forms/education-form";
import EducationItems from "../blocks/education-items";

interface EducationTabProps {
  id: string;
  data: Education[];
}

export default function EducationTab({ id, data }: EducationTabProps) {
  return (
    <BlockWrapper
      title="Opleidingen"
      adding={<EducationForm />}
      listing={<EducationItems id={id} data={data} />}
    />
  );
}
