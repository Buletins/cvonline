"use client";

import type { Session } from "next-auth";
import type { Experience } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/trpc/react";

interface ExperienceItemProps {
  data: Experience;
  session: Session | null;
}

export default function ExperienceItem({ data, session }: ExperienceItemProps) {
  const { company, description, fromYear, location, title, toYear } = data;
  const router = useRouter();

  const deleteExperience = api.experience.delete.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success(`${title} at ${company} verwijderd`);
    },
    onSettled: () => {
      router.refresh();
    },
  });

  return (
    <div className="group flex items-start gap-8">
      <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
        {fromYear} - {toYear}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="text-base/none font-medium tracking-tight">
            {title} at {company}
          </div>
          <div className="text-xs font-medium tracking-tight text-muted-foreground">
            {location}
          </div>
        </div>
        <p className="w-full break-words text-sm leading-tight tracking-tight">
          {description}
        </p>
      </div>
      {session?.user.id && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="ml-auto px-1.5 opacity-50 hover:opacity-100"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-background/50 backdrop-blur-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>
                Verwijder {title} bij {company}.
              </AlertDialogTitle>
              <AlertDialogDescription>
                Deze actie kan niet ongedaan gemaakt worden.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="py-1.5">Annuleer</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  deleteExperience.mutate({
                    id: data.id,
                  })
                }
                className="py-1.5"
              >
                Verwijder
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
