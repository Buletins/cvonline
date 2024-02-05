"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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

const formSchema = z.object({
  title: z.string().min(2).max(48),
  location: z.string().min(2).max(48),
  school: z.string().min(2).max(48),
  description: z.string().min(2).max(200),
  fromYear: z.string().min(2).max(48),
  toYear: z.string().min(2).max(48),
});

export default function EducationForm() {
  const createExperience = api.education.create.useMutation({
    onSuccess: () => {
      toast.success("Changes have been saved.");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      school: "",
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
                  title
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Front-End Developer" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  company
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Front-End Developer" />
                </FormControl>
                <FormMessage />
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
                Location
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Front-End Developer" />
              </FormControl>
              <FormMessage />
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
                  fromYear
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select " />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  toYear
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
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
                <FormMessage />
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
                description
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={8}
                  placeholder="Front-End Developer"
                />
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
  );
}
