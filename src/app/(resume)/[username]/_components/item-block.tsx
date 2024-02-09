import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ItemBlockProps {
  title: string;
  children: ReactNode;
  tighter?: boolean;
  button?: React.ReactNode;
}

export default function ItemBlock({
  title,
  children,
  tighter,
  button,
}: ItemBlockProps) {
  return (
    <div className="relative flex flex-col items-start gap-2">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-sm font-medium tracking-tight">{title}</h2>
        {button}
      </div>
      <div className={cn("flex w-full flex-col", tighter ? "gap-1" : "gap-4")}>
        {children}
      </div>
    </div>
  );
}
