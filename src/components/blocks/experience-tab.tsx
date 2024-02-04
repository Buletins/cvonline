import BlockWrapper from "./block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "./work-experience";
import { Experience } from "@prisma/client";

interface ExperienceTabProps {
  id: string;
  data: Experience[];
}

export default function ExperienceTab({ id, data }: ExperienceTabProps) {
  return (
    <BlockWrapper
      title="Contact"
      adding={<ExperienceForm />}
      listing={<WorkExperience id={id} data={data} />}
    />
  );
}
