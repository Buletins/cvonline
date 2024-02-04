"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

import type { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  contactType: z.string().min(2).max(50),
  contactValue: z.string().min(2).max(48),
});

interface ContactFormProps {
  user: Pick<User, "id">;
}

export default function ContactForm({ user }: ContactFormProps) {
  const router = useRouter();

  const addContact = api.contact.create.useMutation({
    onSuccess: (data) => {
      toast.success("Contact added.");
      router.refresh();
    },
  });

  const deleteContact = api.contact.delete.useMutation({
    onSuccess: (data) => {
      toast.success("Contact deleted.");
      router.refresh();
    },
    onSettled: (data) => {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactType: "",
      contactValue: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addContact.mutate({
      ...values,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="contactType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Value
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
        </div>
        <Button type="submit" size="sm" className="ml-auto">
          Done
        </Button>
      </form>
    </Form>
  );
}
