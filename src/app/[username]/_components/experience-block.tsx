"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import type { Experience } from "@prisma/client";
import ItemBlock from "./item-block";
import ItemDetail from "./item-detail";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { XIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";

const formSchema = z.object({
  sub: z.string().min(2).max(50),
  title: z.string().min(2).max(50),
  timeline: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

interface ExperienceBlockProps {
  data: Experience[];
}

export default function ExperienceBlock({ data }: ExperienceBlockProps) {
  const [addNew, setAddNew] = useState<boolean>(false);
  const [experience, setExperience] = useState<string[]>([]);

  const router = useRouter();

  const addExperience = () => {
    addExperience1.mutate({
      userId: "cls3hdkdb000038xontn81kou",
      description: "",
      sub: "",
      timeline: "",
      title: "",
    });
  };

  const removeExperience = (id: string) => {
    deleteExperience1.mutate({
      userId: "cls3hdkdb000038xontn81kou",
      id: id,
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sub: "",
      title: "",
      timeline: "",
      description: "",
    },
  });

  const addExperience1 = api.experience.create.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.refresh();
    },
  });

  const deleteExperience1 = api.experience.delete.useMutation({
    onSuccess: (data) => {
      console.log(data);
      router.refresh();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addExperience1.mutate({
      userId: "",
      ...values,
    });
  }

  return (
    <ItemBlock title="Experience">
      <div className="flex flex-col items-start gap-2">
        {data.map((item) => (
          <div key={item.id} className="w-full">
            {item.isDraft ? (
              <Form key={item.id} {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="relative flex w-full flex-col rounded-lg border bg-accent/50 p-4 backdrop-blur-lg"
                >
                  <Button
                    type="button"
                    onClick={() => removeExperience(item.id)}
                    size="sm"
                    variant="outline"
                    className="absolute right-2 top-2 gap-1 px-1 pl-1.5"
                  >
                    Verwijder
                    <XIcon className="h-2.5 w-2.5" />
                  </Button>
                  <div className="flex flex-col">
                    <FormField
                      control={form.control}
                      name="sub"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Front-End Developer"
                              className="h-auto border-none p-0 tracking-tight text-muted-foreground focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Amsterdam Tech Hub"
                              className="h-auto border-none p-0 text-base font-semibold tracking-tight text-primary placeholder:text-primary focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="2014-2016"
                              className="h-auto border-none p-0 text-xs tracking-tight text-muted-foreground focus-visible:ring-0"
                            />
                          </FormControl>
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
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
                            className="h-auto w-4/5 resize-none border-none px-0 text-base leading-tight tracking-tight text-muted-foreground focus-visible:ring-0"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={form.handleSubmit(onSubmit)} size="sm">
                    Save
                  </Button>
                </form>
              </Form>
            ) : (
              <ItemDetail {...item} />
            )}
          </div>
        ))}
        {/* {data.map((item) => (
          <ItemDetail key={item.id} {...item} />
        ))} */}
        {experience?.map((item, index) => (
          <Form key={index} {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="relative flex w-full flex-col rounded-lg border bg-accent/50 p-4 backdrop-blur-lg"
            >
              <Button
                // onClick={() => removeExperience(index)}
                size="sm"
                variant="outline"
                className="absolute right-2 top-2 gap-1 px-1 pl-1.5"
              >
                Verwijder
                <XIcon className="h-2.5 w-2.5" />
              </Button>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="sub"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Front-End Developer"
                          className="h-auto border-none p-0 tracking-tight text-muted-foreground focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Amsterdam Tech Hub"
                          className="h-auto border-none p-0 text-base font-semibold tracking-tight text-primary placeholder:text-primary focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="2014-2016"
                          className="h-auto border-none p-0 text-xs tracking-tight text-muted-foreground focus-visible:ring-0"
                        />
                      </FormControl>
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
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Directed a team in designing digital products, from concept to launch, focusing on user-centric solutions."
                        className="h-auto w-4/5 resize-none border-none px-0 text-base leading-tight tracking-tight text-muted-foreground focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button onClick={form.handleSubmit(onSubmit)} size="sm">
                Save
              </Button>
            </form>
          </Form>
        ))}

        <Button onClick={addExperience} size="sm">
          Nieuw
        </Button>
      </div>
    </ItemBlock>
  );
}
