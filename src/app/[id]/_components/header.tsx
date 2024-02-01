"use client";

import { z } from "zod";
import {
  AtSignIcon,
  BriefcaseIcon,
  CopyIcon,
  ExternalLinkIcon,
  GlobeIcon,
  MapPinIcon,
  MessageCircleMoreIcon,
  User2Icon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
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
}

export default function Header({ user }: HeaderProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    <header className="relative flex min-h-60 w-full items-end border-b">
      <div className="relative mx-auto flex w-full max-w-4xl items-end pb-4">
        <Dialog
          onOpenChange={() => {
            form.reset();
            setIsEditing(false);
          }}
        >
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="absolute right-0 top-0"
            >
              Profiel
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background/50 backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle>Who are you?</DialogTitle>
              <DialogDescription>Give us some inforamtion</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border px-2">
                              <User2Icon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                disabled={!isEditing || isSubmitting}
                                placeholder="Front-End Developer"
                                className="h-auto border-none px-0 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border px-2">
                              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                disabled={!isEditing}
                                placeholder="Front-End Developer"
                                className="h-auto border-none px-0 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 rounded-md border px-2">
                            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                            <Input
                              {...field}
                              disabled={!isEditing}
                              placeholder="Front-End Developer"
                              className="h-auto border-none px-0 focus-visible:ring-0"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border px-2">
                              <AtSignIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                disabled={!isEditing}
                                placeholder="Front-End Developer"
                                className="h-auto border-none px-0 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 rounded-md border px-2">
                              <GlobeIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                disabled={!isEditing}
                                placeholder="Front-End Developer"
                                className="h-auto border-none px-0 focus-visible:ring-0"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <div className="flex w-full items-start gap-2 rounded-md border px-2">
                            <MessageCircleMoreIcon className="mt-2 h-4 w-4 text-muted-foreground" />
                            <Textarea
                              {...field}
                              disabled={!isEditing}
                              placeholder="Front-End Developer"
                              className="h-auto resize-none border-none px-0 focus-visible:ring-0"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              {isEditing && (
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={!isEditing}
                  size="sm"
                >
                  Save
                </Button>
              )}
              <Button
                onClick={() => {
                  isEditing
                    ? (form.reset(), setIsEditing(false))
                    : setIsEditing(true);
                }}
                type="button"
                size="sm"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="w-48 shrink-0">
          <div className="h-36 w-36 overflow-hidden rounded-full bg-accent">
            <img
              src="https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Prescription02&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
              className="h-full w-full"
            />
          </div>
        </div>
        <div className="flex w-full flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm tracking-tight text-muted-foreground">
                {title}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm tracking-tight text-muted-foreground">
                {location}
              </div>
            </div>
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
    </header>
  );
}
