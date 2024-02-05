import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ItemBlockProps {
  title: string;
  children: ReactNode;
  tighter?: boolean;
}

export default function ItemBlock({
  title,
  children,
  tighter,
}: ItemBlockProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-sm font-medium tracking-tight">{title}</h2>
      <div className={cn("flex w-full flex-col", tighter ? "gap-1" : "gap-4")}>
        {children}
      </div>
    </div>
  );
}
