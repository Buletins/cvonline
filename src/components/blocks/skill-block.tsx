"use clietn";

import type { Skill } from "@prisma/client";

import { Button } from "../ui/button";
import SkillForm from "../forms/skill-form";
import { ScrollArea } from "../ui/scroll-area";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

interface SkillBlockProps {
  data: Skill[];
}

export default function SkillBlock({ data }: SkillBlockProps) {
  const router = useRouter();

  const deleteSkill = api.skill.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <SkillForm />
      <ScrollArea>
        {data.map((item) => (
          <div key={item.id} className="flex">
            <div className="w-32 text-sm tracking-tight text-muted-foreground">
              {item.title}
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-medium tracking-tight hover:underline">
                {item.title}
              </div>
              <div className="flex items-center gap-4">
                <Button size="sm" variant="link" className="p-0">
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    deleteSkill.mutate({
                      id: item.id,
                    })
                  }
                  size="sm"
                  variant="link"
                  className="p-0 text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
