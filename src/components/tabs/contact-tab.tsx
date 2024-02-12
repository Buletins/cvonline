import BlockWrapper from "../blocks/block-wrapper";

import type { Contact } from "@prisma/client";
import ContactBlock from "../blocks/contact-block";
import ContactForm from "../forms/contact-form";

interface ContactTabProps {
  data: Contact[];
  email: string;
}

export default function ContactTab({ data, email }: ContactTabProps) {
  return (
    <BlockWrapper
      title="Contact"
      adding={<ContactForm />}
      listing={<ContactBlock data={data} email={email} />}
    />
  );
}
