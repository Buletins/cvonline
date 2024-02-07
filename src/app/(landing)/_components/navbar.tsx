"use client";

import Link from "next/link";
import SignIn from "@/app/_components/sign-in";

export default function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-[100] mx-auto w-full max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="font-medium tracking-tight transition hover:text-muted-foreground"
        >
          Resumon
        </Link>

        <SignIn />
      </div>
    </header>
  );
}
