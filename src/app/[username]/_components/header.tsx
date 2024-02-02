"use client";

import { z } from "zod";
import EmojiPicker from "emoji-picker-react";
import {
  CameraIcon,
  CopyIcon,
  ExternalLinkIcon,
  MoreHorizontalIcon,
  SmilePlusIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import type { User } from "@prisma/client";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import SignOut from "@/app/_components/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

interface HeaderProps {
  user: Pick<
    User,
    | "id"
    | "name"
    | "title"
    | "location"
    | "email"
    | "website"
    | "profileImage"
    | "description"
  >;
  session: Session | null;
}

export default function Header({ user, session }: HeaderProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const { id, email, profileImage, location, name, title, website } = user;
  const router = useRouter();

  const updateUser = api.user.update.useMutation({
    onSuccess: (data) => {
      toast.success("Changes have been saved.");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      title: user?.title ?? "",
      location: user?.location ?? "",
      email: user?.email ?? "",
      website: user?.website ?? "",
      description: user?.description ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser.mutate({
      id,
      ...values,
    });
  }

  const { isSubmitting } = form.formState;

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
                <DropdownMenuItem>Edit profile</DropdownMenuItem>
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
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute bottom-0 right-0">
                    <button
                      onClick={() => setIsStatusOpen(!isStatusOpen)}
                      className="flex items-center justify-center rounded-full bg-black px-1.5 py-1"
                    >
                      <SmilePlusIcon className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="py-1">
                  <p>Add a status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex w-full flex-col">
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
              <Button
                variant="link"
                className="h-auto gap-2 p-0 text-muted-foreground hover:text-primary"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Visit Website
              </Button>
            </div>
          </div>
        </div>
        {isStatusOpen && (
          <div className="flex flex-col items-end gap-2 rounded-lg bg-accent p-3">
            <div className="flex w-full items-start gap-2">
              <div className="flex">
                <button className="">🔥</button>
                <EmojiPicker open={emojiOpen} />
              </div>
              <Textarea
                placeholder="I'm feeling..."
                className="resize-none p-0 focus-visible:ring-0"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button
                onClick={() => setIsStatusOpen(false)}
                size="sm"
                variant="link"
              >
                Cancel
              </Button>
              <Button size="sm" variant="outline">
                Set Status
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
