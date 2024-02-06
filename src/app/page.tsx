import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import SignIn from "./_components/sign-in";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const users = await api.user.getUsersCount.query();
  if (session) redirect(`${session.user.username}`);

  return (
    <>
      Resumon, being used by {users}.
      <SignIn />
    </>
  );
}
