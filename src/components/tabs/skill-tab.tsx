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
      listing={<SkillBlock data={data} />}
    />
  );
}
