import type { Experience } from "@prisma/client";

import BlockWrapper from "../blocks/block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "../blocks/work-experience";

interface ExperienceTabProps {
  data: Experience[];
}

export default function ExperienceTab({ data }: ExperienceTabProps) {
  return (
    <BlockWrapper
      title="Werkervaring"
      adding={<ExperienceForm />}
      listing={<WorkExperience data={data} />}
    />
  );
}
