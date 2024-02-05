import BlockWrapper from "../blocks/block-wrapper";

import type { Contact } from "@prisma/client";
import ContactBlock from "../blocks/contact-block";
import ContactForm from "../forms/contact-form";

interface ContactTabProps {
  data: Contact[];
}

export default function LanguageTab({ data }: ContactTabProps) {
  return (
    <BlockWrapper
      title="Talen"
      adding={<ContactForm />}
      listing={<ContactBlock data={data} />}
    />
  );
}
