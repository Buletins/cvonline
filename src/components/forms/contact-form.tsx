"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { Session } from "next-auth";
import { Button } from "../ui/button";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(48),
  title: z.string().min(2).max(50),
  location: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  website: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
});

interface ContactFormProps {
  user: Pick<
    User,
    | "id"
    | "username"
    | "name"
    | "title"
    | "location"
    | "email"
    | "website"
    | "profileImage"
    | "description"
  >;
  session: Session | null;
}

export default function ContactForm({ user, session }: ContactFormProps) {
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="">Contact</div>
        <Button size="sm" variant="secondary">
          Add new
        </Button>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="https://read.cv/_next/image?url=%2Fassets%2Fcontact.png&w=256&q=75"
          alt=""
        />
      </div>
    </div>
  );
}
