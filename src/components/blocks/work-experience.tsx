"use client";

import { Experience } from "@prisma/client";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "lucide-react";

interface WorkExperienceProps {
  id: string;
  data: Experience[];
}

export default function WorkExperience({ id, data }: WorkExperienceProps) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((item) => (
        <WorkExperienceItem id={id} item={item} />
      ))}
    </div>
  );
}

interface WorkExperienceProps {
  id: string;
  item: Experience;
}

function WorkExperienceItem({ id, item }: WorkExperienceProps) {
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
      className="relative flex items-end justify-between gap-4"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="font-medium tracking-tight ">
              {item.title} at {item.company}
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
          <p className="line-clamp-2 w-full max-w-xs break-words text-sm leading-tight tracking-tight">
            {item.description}
          </p>
        </div>
      </div>
      <div className="relative flex items-center gap-4">
        {isConfirm ? (
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm tracking-tight">
              Are you sure? This can't be undone.
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