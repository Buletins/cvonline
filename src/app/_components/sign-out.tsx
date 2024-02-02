"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function SignOut() {
  return (
    <Button
      onClick={() => {
        toast.success("You have been logged out.");
        signOut({ callbackUrl: "/" });
      }}
      size="sm"
    >
      Sign out
    </Button>
  );
}
