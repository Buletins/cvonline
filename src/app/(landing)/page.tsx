import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import SignIn from "../_components/sign-in";
import { api } from "@/trpc/server";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Page from "@/app/[username]/page";

export default async function Home() {
  const session = await getServerAuthSession();
  const users = await api.user.getUsersCount.query();
  if (session) redirect(`${session.user.username}`);

  return (
    <>
      <Navbar />
      <Hero />
      <div id="#case" className="">
        <Page params={{ username: "buletinsehu" }} />
      </div>
    </>
  );
}
