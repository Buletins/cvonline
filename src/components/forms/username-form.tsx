"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

interface UsernameFormProps {
  isPublished: boolean;
  username: string;
}

export default function UsernameForm({
  isPublished,
  username,
}: UsernameFormProps) {
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const togglePublish = api.user.publishProfile.useMutation({
    onSuccess: (data) => {
      router.refresh();
      console.log(data);
    },
    onError: (data) => {
      console.log("first");
      console.log(data);
    },
  });

  const changeUsername = api.user.changeUsername.useMutation({
    onSuccess: (data) => {
      toast.success("Username changed");
      router.push(`${data.username?.toLocaleLowerCase()}`);
      setIsLoading(false);
    },
    onError: () => {
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
                Gebruiksnaam
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center gap-2">
                  <Input
                    {...field}
                    disabled={!isChanging}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Switch
              onCheckedChange={() => togglePublish.mutate()}
              checked={isPublished}
              id="published-status"
            />
            <Label htmlFor="published-status">Airplane Mode</Label>
          </div>
          {isChanging ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsChanging(false)}
                type="button"
                size="sm"
                variant="outline"
              >
                Annuleer
              </Button>
              <Button type="submit" size="sm">
                Ga verder
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsChanging(true)} type="button" size="sm">
              Wijzig
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
