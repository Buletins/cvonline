import ResumonBadge from "@/app/_components/resumon-badge";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <ResumonBadge />
    </div>
  );
}
