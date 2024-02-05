import type { Experience } from "@prisma/client";

import BlockWrapper from "./block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "./work-experience";

interface ExperienceTabProps {
  id: string;
  data: Experience[];
}

export default function ExperienceTab({ id, data }: ExperienceTabProps) {
  return (
    <BlockWrapper
      title="Werkervaring"
      adding={<ExperienceForm />}
      listing={<WorkExperience id={id} data={data} />}
    />
  );
}
