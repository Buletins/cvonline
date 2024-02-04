"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

interface UsernameFormProps {
  username: string;
}

export default function UsernameForm({ username }: UsernameFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const changeUsername = api.user.changeUsername.useMutation({
    onSuccess: (data) => {
      toast.success("Username changed");
      router.push(`${data.username?.toLocaleLowerCase()}`);
      setIsLoading(false);
    },
    onError: (data) => {
      toast.error("Username allready exists");
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: username ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    changeUsername.mutate({
      ...values,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-muted-foreground">
                Username
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-2">
                  <Input
                    {...field}
                    placeholder="Front-End Developer"
                    className="bg-accent focus-visible:ring-0"
                  />
                  {isLoading && (
                    <Loader2 className="absolute right-3 h-4 w-4 animate-spin" />
                  )}
                </div>
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
