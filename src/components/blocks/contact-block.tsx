import type { Contact } from "@prisma/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { useAdding } from "@/hooks/use-adding";

interface ContactBlockProps {
  data: Contact[];
  email: string;
}

export default function ContactBlock({ data, email }: ContactBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <div className="w-32 text-sm tracking-tight text-muted-foreground">
          Emailadres
        </div>
        <div className="font-medium tracking-tight">{email}</div>
      </div>
      {data.map((item) => (
        <ContactItem key={item.id} item={item} />
      ))}
    </div>
  );
}

const formSchema = z.object({
  contactValue: z.string().min(2).max(48),
});

interface ContactItemProps {
  item: Contact;
}

function ContactItem({ item }: ContactItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isAdding = useAdding();

  const router = useRouter();

  const deleteContact = api.contact.delete.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.contactType} Verwijderd.`);
      setIsEditing(false);
      router.refresh();
    },
  });

  const updateContact = api.contact.update.useMutation({
    onSuccess: () => {
      toast.success("Wijzeging opgeslagen.");
      setIsEditing(false);
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactValue: item.contactValue,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateContact.mutate({
      id: item.id,
      ...values,
    });
  }

  return (
    <div key={item.id} className="flex w-full">
      <div className="w-32 shrink-0 text-sm tracking-tight text-muted-foreground">
        {item.contactType}
      </div>
      <div className={cn("flex w-full flex-col", isEditing && "gap-2")}>
        {isEditing ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="contactValue"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Front-End Developer"
                        className="focus-visible:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="ml-auto flex items-center gap-4">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  size="sm"
                  variant="link"
                  className="p-0 hover:opacity-50"
                >
                  Annuleer
                </Button>
                <Button type="submit" size="sm">
                  Opslaan
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="font-medium tracking-tight">{item.contactValue}</div>
        )}
        {!isEditing && (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsEditing(true)}
              size="sm"
              variant="link"
              className="p-0 hover:opacity-50"
            >
              Bewerk
            </Button>
            <Button
              onClick={() =>
                deleteContact.mutate({
                  id: item.id,
                })
              }
              size="sm"
              variant="link"
              className="p-0 text-destructive hover:opacity-50"
            >
              Verwijder
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
