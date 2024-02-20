"use client";

import { z } from "zod";
import { useState, type Dispatch, type SetStateAction } from "react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const addStatus = api.status.create.useMutation({
    onSuccess: () => {
      toast.success("Status geplaatst!");
      setIsStatusOpen(false);
      setIsLoading(false);
      router.refresh();
    },
    onError: () => {
      toast.error("Er is iets misgegaan, probeer opnieuw.");
    },
    onMutate: () => {
      setIsLoading(true);
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
        className="flex flex-col items-end gap-2 rounded-lg bg-white/15 p-3 backdrop-blur-lg"
      >
        <div className="flex w-full items-start gap-2">
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem className="w-auto">
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-auto border-transparent bg-transparent p-0 shadow-none focus:ring-0 focus-visible:ring-0">
                      <SelectValue placeholder="🔥" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-16 min-w-0 bg-white/15">
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
                      disabled={isLoading}
                      placeholder="Vandaag ingeschreven voor een nieuwe cursus!"
                      className="resize-none border-transparent bg-transparent p-0 shadow-none focus-visible:ring-0"
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
            disabled={isLoading}
            type="button"
            size="sm"
            variant="link"
          >
            Annuleer
          </Button>
          <Button
            disabled={isLoading}
            type="submit"
            size="sm"
            variant="blurred"
          >
            Plaats status
          </Button>
        </div>
      </form>
    </Form>
  );
}
