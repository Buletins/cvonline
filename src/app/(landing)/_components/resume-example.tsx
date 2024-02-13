import Page from "@/app/(resume)/[username]/page";

export default function ResumeExample() {
  return (
    <div className="pointer-events-none absolute opacity-20">
      <div className="relative grid w-full">
        <div className="scale-75 place-items-center">
          <Page params={{ username: "anjaceulemans" }} />
        </div>
      </div>
    </div>
  );
}
