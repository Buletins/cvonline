import BlockWrapper from "./block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "./work-experience";
import { Experience } from "@prisma/client";

interface ExperienceTabProps {
  data: Experience[];
}

export default function ExperienceTab({ data }: ExperienceTabProps) {
  return (
    <BlockWrapper
      title="Contact"
      adding={<ExperienceForm />}
      listing={<WorkExperience data={data} />}
    />
  );
}
