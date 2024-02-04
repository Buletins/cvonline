"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { User } from "@prisma/client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Dispatch, SetStateAction } from "react";

const formSchema = z.object({
  status: z.string().min(2).max(200),
});

interface StatusFormProps {
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StatusForm({ setIsStatusOpen }: StatusFormProps) {
  const router = useRouter();

  const addStatus = api.status.create.useMutation({
    onSuccess: (data) => {
      toast.success("Username changed");
      setIsStatusOpen(false);
    },
    onError: (data) => {
      toast.error("Username allready exists");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: status ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addStatus.mutate({
      ...values,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-end gap-2 rounded-lg bg-accent p-3"
      >
        <div className="flex w-full items-start gap-2">
          <div className="flex">
            <button className="">🔥</button>
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center gap-2">
                    <Textarea
                      {...field}
                      placeholder="I'm feeling..."
                      className="resize-none p-0 focus-visible:ring-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            onClick={() => setIsStatusOpen(false)}
            type="button"
            size="sm"
            variant="link"
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" variant="outline">
            Set Status
          </Button>
        </div>
      </form>
    </Form>
  );
}
