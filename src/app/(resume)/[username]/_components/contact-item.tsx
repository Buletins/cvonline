import { Button } from "@/components/ui/button";

interface ContactItemProps {
  label: string;
  href: string;
}

export default function ContactItem({ label, href }: ContactItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-16 text-sm font-medium tracking-tight">{label}</div>
      <Button variant="link" className="p-0 text-muted-foreground" asChild>
        <a href={`mailto:${href}`}>{href}</a>
      </Button>
    </div>
  );
}
