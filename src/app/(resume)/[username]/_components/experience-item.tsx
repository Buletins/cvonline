"use client";

import type { Session } from "next-auth";
import type { Experience } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import Markdown from "@/components/markdown";

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
    <div className="relative flex flex-col items-start gap-4 md:flex-row md:gap-8">
      <div className="w-24 shrink-0 text-xs/none text-muted-foreground">
        {fromYear} - {toYear}
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <div className="text-base/none font-medium tracking-tight">
              {title} bij {company}
            </div>
            <div className="text-xs font-medium tracking-tight text-muted-foreground">
              {location}
            </div>
          </div>
          <div className="flex items-center gap-2 md:relative">
            <Dialog modal={false}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="secondary"
                  className="px-1.5 py-0.5 opacity-50 hover:opacity-100"
                >
                  Meer
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/15 backdrop-blur-lg">
                <DialogHeader>
                  <DialogTitle>
                    {title} bij {company}.
                    <div className="text-xs/none text-muted-foreground">
                      {fromYear} - {toYear}
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    <Markdown>{description}</Markdown>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            {session?.user.id === data.userId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="px-1.5 opacity-50 hover:opacity-100"
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
                    <AlertDialogCancel className="py-1.5">
                      Annuleer
                    </AlertDialogCancel>
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
        </div>
        <Markdown>{description}</Markdown>
      </div>
    </div>
  );
}
