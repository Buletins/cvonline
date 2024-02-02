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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  contactType: z.string().min(2).max(50),
  contactValue: z.string().min(2).max(48),
});

interface ContactFormProps {
  user: Pick<User, "id">;
  session: Session | null;
}

export default function ContactForm({ user, session }: ContactFormProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const router = useRouter();

  const addContact = api.contact.create.useMutation({
    onSuccess: (data) => {
      toast.success("Contact added.");
      setIsAdding(false);
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

  const { data: contactItems } = api.contact.get.useQuery({
    userId: user.id,
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
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="">Contact</div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          variant="secondary"
        >
          {isAdding ? "Canel" : "Add new"}
        </Button>
      </div>

      {isAdding ? (
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
      ) : contactItems?.length ? (
        contactItems?.map((item, index) => (
          <div key={index} className="flex">
            <div className="w-32 text-sm tracking-tight text-muted-foreground">
              {item.contactType}
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={item.contactValue}
                target="_blank"
                className="font-medium tracking-tight hover:underline"
              >
                {item.contactValue}
              </a>
              <div className="flex items-center gap-4">
                <Button size="sm" variant="link" className="p-0">
                  Edit
                </Button>
                <Button
                  onClick={() =>
                    deleteContact.mutate({
                      id: item.id,
                      userId: user.id,
                    })
                  }
                  size="sm"
                  variant="link"
                  className="p-0 text-destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="https://read.cv/_next/image?url=%2Fassets%2Fcontact.png&w=256&q=75"
            alt=""
          />
        </div>
      )}
    </div>
  );
}
