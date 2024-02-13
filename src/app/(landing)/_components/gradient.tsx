export default function Gradient() {
  return (
    <div className="pointer-events-none absolute inset-0 top-0 z-20 h-screen w-screen">
      <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/70 to-black" />
    </div>
  );
}
