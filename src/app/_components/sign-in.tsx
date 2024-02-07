"use client";

import { signIn } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="blurred"
          className="[background-clip:padding-box,border-box]
    [background-image:linear-gradient(rgb(5,_7,_19),_rgb(5,_7,_19)),_linear-gradient(to_right,_rgb(245,_65,_128),_rgb(51,_142,_247))] [background-origin:border-box] [border:_2px_solid_transparent]"
        >
          Login
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/15 backdrop-blur-lg">
        <DropdownMenuItem onClick={() => signIn("google", { redirect: false })}>
          Google
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signIn("google", { redirect: false })}>
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signIn("google", { redirect: false })}>
          LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
