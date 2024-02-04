import BlockWrapper from "./block-wrapper";

import { Contact } from "@prisma/client";
import ContactBlock from "./contact-block";
import ContactForm from "../forms/contact-form";

interface ContactTabProps {
  data: Contact[];
}

export default function ContactTab({ data }: ContactTabProps) {
  return (
    <BlockWrapper
      title="Contact"
      adding={<ContactForm />}
      listing={<ContactBlock data={data} />}
    />
  );
}
