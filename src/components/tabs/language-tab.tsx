import BlockWrapper from "../blocks/block-wrapper";

import type { Language } from "@prisma/client";
import LanguageBlock from "../blocks/language-block";
import LanguageForm from "../forms/language-form";

interface LanguageTabProps {
  data: Language[];
}

export default function LanguageTab({ data }: LanguageTabProps) {
  return (
    <BlockWrapper
      title="Talen"
      adding={<LanguageForm />}
      listing={<LanguageBlock data={data} />}
    />
  );
}
