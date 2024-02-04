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
  company: z.string().min(2).max(48),
  description: z.string().min(2).max(200),
  fromYear: z.string().min(2).max(48),
  toYear: z.string().min(2).max(48),
});

export default function ExperienceForm() {
  const createExperience = api.experience.create.useMutation({
    onSuccess: (data) => {
      toast.success("Changes have been saved.");
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
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  company
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
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Location
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
                    <SelectItem value="1974">1974</SelectItem>
                    <SelectItem value="1975">1975</SelectItem>
                    <SelectItem value="1976">1976</SelectItem>
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
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
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
                  className="resize-none bg-accent focus-visible:ring-0"
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
