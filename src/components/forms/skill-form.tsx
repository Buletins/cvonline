"use client";

import { z } from "zod";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2).max(50),
});

export default function SkillForm() {
  const router = useRouter();

  const addSkill = api.skill.create.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.title} toevegoed als vaardigheid.`);
      router.refresh();
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addSkill.mutate({
      ...values,
    });
  }

  const { title: titleError } = form.formState.errors;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky top-0 flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Vaardigheid
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Flexibel"
                  className={cn(
                    titleError && "border-destructive bg-destructive/50",
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="ml-auto">
          Toevoegen
        </Button>
      </form>
    </Form>
  );
}
