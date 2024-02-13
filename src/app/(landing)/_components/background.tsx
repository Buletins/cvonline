export default function Background() {
  return (
    <div className="pointer-events-none absolute right-1/2 top-[50%] z-30 h-full w-[765px] -translate-y-1/2 translate-x-1/2 touch-none overflow-visible md:h-[740px]">
      <img
        alt="hero gradient"
        className="h-full w-full overflow-visible object-cover"
        src="https://www.nextui.pro/images/hero-gradient2.png"
      />
    </div>
  );
}
