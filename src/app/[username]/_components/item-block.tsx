import { ReactNode } from "react";

interface ItemBlockProps {
  title: string;
  children: ReactNode;
}

export default function ItemBlock({ title, children }: ItemBlockProps) {
  return (
    <div className="flex flex-col items-start gap-2">
      <h2 className="text-sm font-medium tracking-tight">{title}</h2>
      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
}
