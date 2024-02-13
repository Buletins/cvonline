import Link from "next/link";

interface TopCtaProps {
  users: number;
}

export default function TopCta({ users }: TopCtaProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Link
        href="/"
        className="rounded-full border bg-white/5 px-2 py-1 text-xs backdrop-blur-lg transition hover:bg-white/10"
      >
        Probeer gratis 🚀
      </Link>
      <div className="text-xs tracking-tight text-muted-foreground">
        {users} cv's gemaakt.
      </div>
    </div>
  );
}
