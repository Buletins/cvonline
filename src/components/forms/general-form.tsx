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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import UsernameForm from "./username-form";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2).max(48),
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  telephone: z.string().min(2).max(50),
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
    | "telephone"
    | "website"
    | "profileImage"
    | "description"
    | "isPusblished"
    | "isCreated"
  >;
}

export default function GeneralForm({ user }: GeneralFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const router = useRouter();

  const {
    id,
    username,
    email,
    telephone,
    isPusblished,
    location,
    name,
    title,
    website,
    description,
    isCreated,
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
      telephone: telephone ?? "",
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
      <UsernameForm
        isPublished={isPusblished}
        username={username}
        isCreated={isCreated}
      />
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
                  Volledige naam
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isCreated || !isEditing}
                    placeholder="Front-End Developer"
                    className="focus-visible:ring-0"
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
                  Job functie
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isCreated || !isEditing}
                    placeholder="Front-End Developer"
                    className="focus-visible:ring-0"
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
                  Huidge locatie
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={!isCreated || !isEditing}
                    placeholder="Front-End Developer"
                    className="focus-visible:ring-0"
                  />
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
                  <FormLabel className="text-xs text-muted-foreground">
                    Emailadres
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isCreated || !isEditing}
                      placeholder="mijnemail@resumon.be"
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-muted-foreground">
                    Telefoonnummer
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={!isCreated || !isEditing}
                      placeholder="0483 12 34 56"
                      className="focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    disabled={!isCreated || !isEditing}
                    placeholder="Front-End Developer"
                    className="focus-visible:ring-0"
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
                  Profiel
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={!isCreated || !isEditing}
                    rows={8}
                    placeholder="Front-End Developer"
                    className="resize-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Korte alinea die boven aan je cv komt te staan. Geef hierin
                  aan wie je bent, waar je naar op zoek bent, wat je ambities
                  zijn en waarin je uitblinkt.
                </FormDescription>
              </FormItem>
            )}
          />
          {isEditing ? (
            <div className="ml-auto flex items-center gap-2">
              <Button
                onClick={() => setIsEditing(false)}
                type="button"
                size="sm"
                variant="outline"
              >
                Annuleer
              </Button>
              <Button type="submit" size="sm">
                Bewerk
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              type="button"
              size="sm"
              className="ml-auto"
            >
              Wijzig
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
