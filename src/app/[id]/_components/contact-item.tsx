interface ContactItemProps {
  label: string;
  href: string;
}

export default function ContactItem({ label, href }: ContactItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="font-medium tracking-tight">{label}</div>
      <a
        href={`mailto:${href}`}
        className="text-muted-foreground underline underline-offset-2 hover:text-primary"
      >
        {href}
      </a>
    </div>
  );
}
