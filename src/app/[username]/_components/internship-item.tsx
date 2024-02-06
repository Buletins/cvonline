"use client";

import type { Education, Internship } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Session } from "next-auth";
import { Trash2 } from "lucide-react";

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

interface InternshipItemProps {
  data: Internship;
  session: Session | null;
}

export default function InternshipItem({ data, session }: InternshipItemProps) {
  const { company, description, fromYear, location, title, toYear } = data;
  const router = useRouter();

  const deleteInternship = api.internship.delete.useMutation({
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="text-sm/none font-medium tracking-tight">
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
                  deleteInternship.mutate({
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
