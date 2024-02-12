"use clietn";

import { toast } from "sonner";
import { useState } from "react";
import type { Skill } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2, XIcon } from "lucide-react";

import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";
import SkillForm from "../forms/skill-form";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

interface SkillBlockProps {
  data: Skill[];
}

export default function SkillBlock({ data }: SkillBlockProps) {
  return (
    <div className="flex flex-col gap-8">
      <SkillForm />
      <ScrollArea>
        <div className="flex flex-wrap gap-2">
          {data.length === 0 && (
            <p className="tracking-tight">
              Voeg een aantal relevante vaardigeheden toe.
            </p>
          )}
          {data.map((item) => (
            <SkillBadge key={item.id} id={item.id} title={item.title} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface SkillBadgeProps {
  id: string;
  title: string;
}

function SkillBadge({ id, title }: SkillBadgeProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteSkill = api.skill.delete.useMutation({
    onSuccess: (data) => {
      router.refresh();
      setIsLoading(false);
      toast.success(`${data.title} verwijderd.`);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  return (
    <Badge
      onClick={() =>
        deleteSkill.mutate({
          id: id,
        })
      }
      variant="blurred"
      className={cn(
        "cursor-pointer gap-1 hover:bg-white/50",
        isLoading && "pointer-events-none",
      )}
    >
      {title}
      {isLoading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <XIcon className="h-3 w-3" />
      )}
    </Badge>
  );
}
