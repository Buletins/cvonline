"use client";

import {
  CameraIcon,
  CopyIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  SmilePlusIcon,
  XIcon,
} from "lucide-react";

import { useState } from "react";

import type { Status, User } from "@prisma/client";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Session } from "next-auth";
import SignOut from "@/app/_components/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatusForm from "@/components/forms/status-form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { useEditProfile } from "@/hooks/use-editprofile";

interface HeaderProps {
  user: User & {
    status: Status;
  };
  status: Status;
  session: Session | null;
}

export default function Header({ user, session }: HeaderProps) {
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const router = useRouter();
  const editProfile = useEditProfile();

  const { status, location, name, title } = user;

  const deleteStatus = api.status.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <header className="relative flex  w-full items-end">
      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-4">
        {session && (
          <div className="absolute right-0 top-0 flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="px-1">
                  <MoreHorizontalIcon className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => editProfile.open()}>
                  Edit profile
                </DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border">
            <img
              src="https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/Cwit4zi9q1ajFhwHZndNri4v0rm1/bafdf7ed-cab3-4033-bcf7-160cd837bc72.jpg?_a=ATO2BAA0"
              alt=""
              className="h-full w-full rounded-full"
            />
            <CameraIcon className="h-6 w-6 text-muted-foreground" />
            {session?.user.id === user.id ? (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="absolute bottom-0 right-0">
                      <button
                        onClick={() => setIsStatusOpen(!isStatusOpen)}
                        className="flex items-center justify-center rounded-full bg-black px-1.5 py-1"
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
            ) : (
              <div className="absolute bottom-0 right-0">
                <div className="flex items-center justify-center rounded-full bg-black px-1.5 py-1">
                  {status ? (
                    <div className="text-xs">{status.emoji}</div>
                  ) : (
                    <SmilePlusIcon className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
            )}
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
              {user.website && (
                <Button
                  variant="link"
                  className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Visit Website
                </Button>
              )}
            </div>
          </div>
        </div>
        {isStatusOpen ? (
          <StatusForm setIsStatusOpen={setIsStatusOpen} />
        ) : status ? (
          <div className="group relative flex flex-col gap-2 rounded-lg bg-accent p-3">
            {session?.user.id === user.id && (
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
      </div>
    </header>
  );
}
