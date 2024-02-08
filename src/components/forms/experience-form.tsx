"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { draftToMarkdown } from "markdown-draft-js";

import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Richtexteditor from "../richtexteditor";

const formSchema = z.object({
  title: z.string().min(2).max(48),
  location: z.string().min(2).max(48),
  company: z.string().min(2).max(48),
  description: z.string().min(2).max(2000),
  fromYear: z.string().min(2).max(48),
  toYear: z.string().min(2).max(48),
});

export default function ExperienceForm() {
  const router = useRouter();

  const createExperience = api.experience.create.useMutation({
    onSuccess: () => {
      toast.success("Changes have been saved.");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      company: "",
      description: "",
      fromYear: "",
      toYear: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createExperience.mutate({
      ...values,
    });
  }

  const currentYear = new Date().getFullYear();
  const startYear = 1975;
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index,
  );

  const {
    title: titleError,
    company: companyError,
    location: locationError,
    fromYear: fromYearError,
    toYear: toYearError,
    description: descriptionError,
  } = form.formState.errors;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Functietitel
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className={cn(
                      titleError && "border-destructive bg-destructive/50",
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Bedrijf
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className={cn(
                      companyError && "border-destructive bg-destructive/50",
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Plaats
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Front-End Developer"
                  className={cn(
                    locationError && "border-destructive bg-destructive/50",
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="fromYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Start datum
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        fromYearError && "border-destructive bg-destructive/50",
                      )}
                    >
                      <SelectValue placeholder="Selecteer een jaar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((item, index) => (
                      <SelectItem key={index} value={item.toString()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Einddatum
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        toYearError && "border-destructive bg-destructive/50",
                      )}
                    >
                      <SelectValue placeholder="Selecteer een jaar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((item, index) => (
                      <SelectItem key={index} value={item.toString()}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Omschrijving
              </FormLabel>
              <FormControl>
                <Richtexteditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
                {/* <Textarea
                  {...field}
                  rows={8}
                  placeholder="Front-End Developer"
                  className={cn(
                    descriptionError && "border-destructive bg-destructive/50",
                  )}
                /> */}
              </FormControl>
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
