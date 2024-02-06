import type { Experience } from "@prisma/client";

import BlockWrapper from "../blocks/block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "../blocks/work-experience";
import InternshipForm from "../forms/internship-form";

interface InternshipTabProps {
  id: string;
  data: Experience[];
}

export default function InternshipTab({ id, data }: InternshipTabProps) {
  return (
    <BlockWrapper
      title="Stage"
      adding={<InternshipForm />}
      listing={<WorkExperience id={id} data={data} />}
    />
  );
}
