import { ReactNode } from "react";

interface ItemBlockProps {
  title: string;
  children: ReactNode;
}

export default function ItemBlock({ title, children }: ItemBlockProps) {
  return (
    <div className="flex items-start">
      <div className="sticky top-8 w-48 shrink-0">
        <h2 className="font-medium tracking-tight">{title}</h2>
      </div>
      <div className="flex w-full flex-col gap-2">{children}</div>
    </div>
  );
}
