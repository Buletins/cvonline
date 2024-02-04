import BlockWrapper from "./block-wrapper";
import ExperienceForm from "../forms/experience-form";
import WorkExperience from "./work-experience";
import { Contact } from "@prisma/client";
import ContactBlock from "./contact-block";

interface ContactTabProps {
  data: Contact[];
}

export default function ContactTab({ data }: ContactTabProps) {
  return (
    <BlockWrapper
      title="Contact"
      adding={<ExperienceForm />}
      listing={<ContactBlock data={data} />}
    />
  );
}
