"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SignInProps {
  session: Session | null;
}

export default function SignIn({ session }: SignInProps) {
  const router = useRouter();

  return (
    <Button onClick={() => signIn("google", { redirect: false })}>
      Sign in with Google
    </Button>
  );
}
