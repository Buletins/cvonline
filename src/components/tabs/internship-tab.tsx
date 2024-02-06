import type { Experience } from "@prisma/client";

import BlockWrapper from "../blocks/block-wrapper";
import WorkExperience from "../blocks/work-experience";
import InternshipForm from "../forms/internship-form";

interface InternshipTabProps {
  data: Experience[];
}

export default function InternshipTab({ data }: InternshipTabProps) {
  return (
    <BlockWrapper
      title="Stage"
      description="Vermeld hier je stages. Begin met de meest recente/relevante stage. Geef uitleg over je dagelijkse taken en verantwoordelijkheden."
      adding={<InternshipForm />}
      listing={<WorkExperience data={data} />}
    />
  );
}
