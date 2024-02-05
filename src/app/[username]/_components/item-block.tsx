import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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
    <div className="flex flex-col items-start gap-1">
      <h2 className="text-sm font-medium tracking-tight">{title}</h2>
      <div className={cn("flex w-full flex-col", tighter ? "gap-1" : "gap-4")}>
        {children}
      </div>
    </div>
  );
}
