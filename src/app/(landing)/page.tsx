import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import SignIn from "../_components/sign-in";
import { api } from "@/trpc/server";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Page from "@/app/(resume)/[username]/page";
import Footer from "./_components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

export default async function Home() {
  const session = await getServerAuthSession();
  const users = await api.user.getUsersCount.query();
  if (session) redirect(`${session.user.username}`);

  return (
    <>
      <Navbar />
      <main className="mx-auto flex h-screen w-full flex-grow flex-col overflow-hidden">
        <section className="relative flex h-full w-screen flex-nowrap items-center justify-center overflow-hidden md:ml-0 md:w-full lg:overflow-visible">
          <div className="z-30 flex w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center leading-8 md:px-0">
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="rounded-full border bg-white/5 px-2 py-1 pr-3 text-xs backdrop-blur-lg transition hover:bg-white/10"
              >
                🚀 Try for 2€
              </Link>
              <div className="text-xs tracking-tight text-muted-foreground">
                {users} resumes made.
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold tracking-tight">
                Slechts 2% van de cv's komt door de eerste ronde. Zorg ervoor
                dat jij in die top 2% zit.
              </h1>
            </div>
            <p className="max-w-lg text-lg/snug tracking-tight text-muted-foreground">
              Binnen 5 minuten een perfect cv waarmee je positief opvalt. Voer
              je gegevens in, gebruik je cv online met een persoonlijke link en
              solliciteer op jouw droombaan. Probeer nu gratis!
            </p>
            <Button className="gap-2 rounded-full border px-3 py-1.5 backdrop-blur-lg transition">
              Maak je cv
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="relative grid w-full grid-cols-3">
              <div className="scale-75">
                <Page params={{ username: "buletinsehu" }} />
              </div>
              <div className="scale-75">
                <Page params={{ username: "buletinsehu" }} />
              </div>
              <div className="scale-75">
                <Page params={{ username: "buletinsehu" }} />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute right-1/2 top-[50%] z-30 h-full w-[765px] -translate-y-1/2 translate-x-1/2 touch-none overflow-visible md:h-[740px]">
            <img
              alt="hero gradient"
              className="h-full w-full overflow-visible object-cover"
              src="https://www.nextui.pro/images/hero-gradient2.png"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 top-0 z-20 h-screen w-screen">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/70 to-black" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

{
  /* <Navbar />
<Hero />
<div id="#case" className="">
  <Page params={{ username: "buletinsehu" }} />
</div> */
}
