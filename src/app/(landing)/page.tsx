import { redirect } from "next/navigation";

import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import TopCta from "./_components/top-cta";
import Hero from "./_components/hero";
import ResumeExample from "./_components/resume-example";
import Background from "./_components/background";
import Gradient from "./_components/gradient";

export default async function Home() {
  const session = await getServerAuthSession();
  const users = await api.user.getUsersCount.query();
  if (session) redirect(`${session.user.username}`);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-screen w-full flex-grow flex-col overflow-hidden">
        <div className="relative flex h-full w-screen flex-nowrap items-center justify-center overflow-hidden md:ml-0 md:w-full lg:overflow-visible">
          <div className="z-30 flex w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center leading-8 md:px-0">
            <TopCta users={users} />
            <Hero />
          </div>
          <ResumeExample />
          <Background />
          <Gradient />
        </div>
      </main>
      <Footer />
    </>
  );
}
