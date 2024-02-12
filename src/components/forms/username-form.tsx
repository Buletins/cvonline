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
import { cn } from "@/lib/utils";

const usernamePattern = /^[a-zA-Z0-9]+$/;

const formSchema = z.object({
  username: z
    .string()
    .min(7, "Gebruiksnaam moet minstens 7 letters hebben.")
    .max(50)
    .regex(
      usernamePattern,
      "Gebruik enkel letters en cijfers voor uw gebruiksnaam.",
    )
    .optional(),
});

interface UsernameFormProps {
  isPublished: boolean;
  username: string;
  isCreated: boolean;
}

export default function UsernameForm({
  isPublished,
  username,
  isCreated,
}: UsernameFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const togglePublish = api.user.publishProfile.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const changeUsername = api.user.changeUsername.useMutation({
    onSuccess: (data) => {
      toast.success("Gebruiksnaam gewijzigd.");
      router.push(`${data.username?.toLocaleLowerCase()}`);
      setIsLoading(false);
    },
    onError: () => {
      toast.error("Deze gebruiksnaam is al in gebruik.");
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: username ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    changeUsername.mutate({
      ...values,
    });
  }

  const { username: usernameError } = form.formState.errors;
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
                    disabled={!isEditing}
                    placeholder="timthijsmans"
                    className={cn(
                      "focus-visible:ring-0",
                      usernameError && "border-destructive bg-destructive/50",
                    )}
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
              onCheckedChange={() => {
                if (!isCreated) {
                  toast.error("Verander eerst uw gebruiksnaam.");
                } else {
                  togglePublish.mutate();
                  toast.error("Profiel is zichtbaar");
                }
              }}
              checked={isPublished}
              id="published-status"
            />
            <Label htmlFor="published-status">Profiel zichtbaar</Label>
          </div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setIsEditing(false)}
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
            <Button onClick={() => setIsEditing(true)} type="button" size="sm">
              Wijzig
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
