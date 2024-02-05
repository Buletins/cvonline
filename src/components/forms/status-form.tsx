"use client";

import { z } from "zod";
import type { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components//ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  emoji: z.string().max(50),
  title: z.string().max(200),
});

interface StatusFormProps {
  setIsStatusOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StatusForm({ setIsStatusOpen }: StatusFormProps) {
  const router = useRouter();

  const addStatus = api.status.create.useMutation({
    onSuccess: () => {
      toast.success("Username changed");
      setIsStatusOpen(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Username allready exists");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emoji: "",
      title: "",
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
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem className="w-auto">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-auto bg-accent p-0 focus:ring-0 focus-visible:ring-0">
                      <SelectValue placeholder="🔥" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-16 min-w-0">
                    <SelectItem value="😂">😂</SelectItem>
                    <SelectItem value="❤️">❤️</SelectItem>
                    <SelectItem value="👍">👍</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-grow">
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
