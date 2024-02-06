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
      description="Vermeld hier je taalvaardigheden, wanneer deze van belang zijn voor de sollicitatie. Het vaardigheidsniveau wordt bepaald door je vermogen om de taal te verstaan, te spreken, te lezen en te schrijven."
      adding={<LanguageForm />}
      listing={<LanguageBlock data={data} />}
    />
  );
}
