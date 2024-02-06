"use client";

import {
  CameraIcon,
  CopyIcon,
  ExternalLinkIcon,
  SmilePlusIcon,
  XIcon,
} from "lucide-react";
import type { Session } from "next-auth";
import { useState } from "react";
import type { Status, User } from "@prisma/client";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import StatusForm from "@/components/forms/status-form";
import UserMenu from "./user-menu";

interface HeaderProps {
  user: Pick<User, "location" | "id" | "website" | "name" | "title"> & {
    status: Status | null;
  };
  session: Session | null;
}

export default function Header({ user, session }: HeaderProps) {
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const router = useRouter();

  const { status, id, location, website, name, title } = user;

  const deleteStatus = api.status.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <header className="relative mx-auto flex w-full max-w-lg flex-col gap-4">
      {session && <UserMenu />}
      <div className="flex items-center gap-4">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
          <img
            src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/Cwit4zi9q1ajFhwHZndNri4v0rm1/bafdf7ed-cab3-4033-bcf7-160cd837bc72.jpg?_a=ATO2BAA0"
            alt=""
            className="h-full w-full rounded-full"
          />
          <CameraIcon className="h-6 w-6 text-muted-foreground" />
          {session?.user.id === id ? (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute bottom-0 right-0">
                    <button
                      onClick={() => setIsStatusOpen(!isStatusOpen)}
                      className="flex items-center justify-center rounded-full bg-transparent px-1.5 py-1 backdrop-blur-lg"
                    >
                      {status ? (
                        <div className="text-xs">{status.emoji}</div>
                      ) : (
                        <SmilePlusIcon className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="py-1">
                  <p>Add a status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : status ? (
            <div className="absolute bottom-0 right-0">
              <div className="flex items-center justify-center rounded-full bg-transparent px-1.5 py-1 backdrop-blur-lg">
                <div className="text-xs">{status.emoji}</div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex flex-col">
            <h1 className="text-xl/none font-semibold tracking-tight">
              {name}
            </h1>
            <p className="text-sm tracking-tight text-muted-foreground">
              {title}, in {location}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
            >
              <CopyIcon className="h-4 w-4" />
              Email
            </Button>
            {website && (
              <Button
                variant="link"
                className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
                asChild
              >
                <a href="">
                  <ExternalLinkIcon className="h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      {isStatusOpen ? (
        <StatusForm setIsStatusOpen={setIsStatusOpen} />
      ) : status?.title ? (
        <div className="group relative flex flex-col gap-2 rounded-lg bg-accent p-3">
          {session?.user.id === id && (
            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100">
              <Button
                onClick={() => deleteStatus.mutate()}
                size="sm"
                variant="outline"
                className="px-1"
              >
                <XIcon className="h-3 w-3" />
              </Button>
            </div>
          )}
          <p className="text-sm tracking-tight">{status.title}</p>
          <div className="text-xs tracking-tight text-muted-foreground">
            {status.createdAt.toLocaleTimeString()}
          </div>
        </div>
      ) : null}
    </header>
  );
}
