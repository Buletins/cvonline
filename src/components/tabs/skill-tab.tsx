import BlockWrapper from "../blocks/block-wrapper";

import type { Contact, Skill } from "@prisma/client";
import SkillBlock from "../blocks/skill-block";

interface SkillTabProps {
  data: Skill[];
}

export default function SkillTab({ data }: SkillTabProps) {
  return (
    <BlockWrapper
      hideButton
      title="Vaardigheden"
      description="Vermeld hier je vaardigheden. Leg hierbij de nadruk op vaardigheden die belangrijk zijn voor de functie waar je op solliciteert."
      listing={<SkillBlock data={data} />}
    />
  );
}
