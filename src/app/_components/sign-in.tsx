"use client";

import { signIn } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <Button
      onClick={() => signIn("google", { redirect: false })}
      variant="blurred"
      className="[background-clip:padding-box,border-box]
    [background-image:linear-gradient(rgb(5,_7,_19),_rgb(5,_7,_19)),_linear-gradient(to_right,_rgb(245,_65,_128),_rgb(51,_142,_247))] [background-origin:border-box] [border:_2px_solid_transparent] focus-visible:outline-none"
    >
      Mijn Cv
    </Button>
  );
}
