import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute bottom-3 z-20 mt-auto flex w-full flex-col items-center gap-1">
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm tracking-tight text-muted-foreground">
          © 2024 Resumon. All rights reserved.
        </p>
        {/* <div className="text-default-200 flex flex-row items-center justify-start gap-3">
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/">Terms</Link>
          </Button>
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/">License</Link>
          </Button>
          <Button variant="link" size="sm" className="px-0" asChild>
            <Link href="/">Privacy</Link>
          </Button>
        </div> */}
      </div>
    </footer>
  );
}
