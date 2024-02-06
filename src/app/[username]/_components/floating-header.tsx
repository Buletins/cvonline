"use client";

import { useEffect, useState } from "react";
import type { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FloatingHeaderProps {
  user: User;
}

export default function FloatingHeader({ user }: FloatingHeaderProps) {
  const [showHeader, setFloatingHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 176) {
        setFloatingHeader(true);
      } else {
        setFloatingHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed left-1/2 top-8 z-50 w-full max-w-md -translate-x-1/2 rounded-lg bg-white/15 px-4 py-2 backdrop-blur-lg transition",
        showHeader ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <img
              src={
                "https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/Cwit4zi9q1ajFhwHZndNri4v0rm1/bafdf7ed-cab3-4033-bcf7-160cd837bc72.jpg?_a=ATO2BAA0"
              }
              alt={user.name!}
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="flex w-full flex-col gap-1">
            <div className="flex flex-col">
              <h1 className="text-sm/none font-semibold tracking-tight">
                {user.name}
              </h1>
              <p className="text-xs tracking-tight text-muted-foreground">
                {user.title}, in {user.location}
              </p>
            </div>
          </div>
        </div>
        <Button onClick={scrollToTop} size="sm">
          Terug naar boven
        </Button>
      </div>
    </div>
  );
}
