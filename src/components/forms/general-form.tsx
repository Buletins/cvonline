"use client";

import { z } from "zod";
import type { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UsernameForm from "./username-form";

const formSchema = z.object({
  name: z.string().min(2).max(48),
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  website: z.string().min(0).optional(),
  description: z.string().min(2).max(500),
});

interface GeneralFormProps {
  user: Pick<
    User,
    | "id"
    | "username"
    | "name"
    | "title"
    | "location"
    | "email"
    | "website"
    | "profileImage"
    | "description"
    | "isPusblished"
  >;
}

export default function GeneralForm({ user }: GeneralFormProps) {
  const router = useRouter();

  const {
    id,
    username,
    email,
    isPusblished,
    location,
    name,
    title,
    website,
    description,
  } = user;

  const updateUser = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Changes have been saved.");
      router.refresh();
    },
  });

  const generateDescription = api.replicate.generateDescription.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name ?? "",
      title: title ?? "",
      location: location ?? "",
      email: email ?? "",
      website: website ?? "",
      description: description ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser.mutate({
      id,
      ...values,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <UsernameForm isPublished={isPusblished} username={username} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Full name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
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
                <FormLabel className="text-xs text-muted-foreground">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
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
                <FormLabel className="text-xs text-muted-foreground">
                  Website
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Description
                </FormLabel>
                <FormControl>
                  <div className="relative h-full w-full">
                    <Textarea
                      {...field}
                      rows={8}
                      placeholder="Front-End Developer"
                      className="resize-none bg-accent focus-visible:ring-0"
                    />
                    <div className="absolute right-2 top-2">
                      <Button
                        onClick={() =>
                          generateDescription.mutate({
                            prompt:
                              "Can you write a small description for my resume, i am a front end developer from belgium, please limit it to 200 characters.",
                          })
                        }
                        type="button"
                        size="sm"
                        className="px-1 py-0.5 text-xs"
                      >
                        Ask AI
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="sm" className="ml-auto">
            Done
          </Button>
        </form>
      </Form>
    </div>
  );
}
