import type { Education } from "@prisma/client";

import BlockWrapper from "./block-wrapper";
import EducationForm from "../forms/education-form";
import EducationItems from "./education-items";

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
