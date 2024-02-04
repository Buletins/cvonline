import { useState } from "react";
import { Button } from "../ui/button";

interface BlockWrapperProps {
  title: string;
  adding: React.ReactNode;
  listing: React.ReactNode;
}

export default function BlockWrapper({
  title,
  adding,
  listing,
}: BlockWrapperProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="">{title}</div>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          variant="secondary"
        >
          {isAdding ? "Canel" : "Add new"}
        </Button>
      </div>
      {isAdding ? adding : listing}
    </div>
  );
}
