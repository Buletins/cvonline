"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";
import type { Education } from "@prisma/client";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface EducationItemsProps {
  id: string;
  data: Education[];
}

export default function EducationItems({ id, data }: EducationItemsProps) {
  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      {data.map((item) => (
        <EducationItem key={item.id} id={id} item={item} />
      ))}
    </div>
  );
}

interface EducationProps {
  id: string;
  item: Education;
}

function EducationItem({ id, item }: EducationProps) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const router = useRouter();

  const deleteExperience = api.experience.delete.useMutation({
    onSuccess: (data) => {
      router.refresh();
    },
    onSettled: (data) => {
      router.refresh();
    },
  });

  const isLoading = deleteExperience.isLoading;

  return (
    <div
      key={item.id}
      className="relative flex items-center justify-between gap-4 border-b border-border/50 pb-4 last:border-b-0"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="font-medium leading-none tracking-tight ">
            {item.title} at {item.school}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs tracking-tight text-muted-foreground">
              {item.fromYear} - {item.toYear}
            </div>
            <div className="text-xs tracking-tight text-muted-foreground">
              in {item.location}
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex h-full flex-col items-end justify-between gap-4">
        <Switch id="published-status" />
        {isConfirm ? (
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm tracking-tight">
              Are you sure? This cant be undone.
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() =>
                  deleteExperience.mutate({
                    userId: id,
                    id: item.id,
                  })
                }
                disabled={isLoading}
                size="sm"
                variant="link"
                className="p-0"
              >
                Yes
              </Button>
              <Button
                onClick={() => setIsConfirm(false)}
                disabled={isLoading}
                size="sm"
                variant="link"
                className="p-0 text-destructive"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              disabled={isLoading}
              size="sm"
              variant="link"
              className="p-0"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsConfirm(true)}
              disabled={isLoading}
              size="sm"
              variant="link"
              className="p-0 text-destructive"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
