import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import SignIn from "./_components/sign-in";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) redirect(`${session.user.username}`);

  return (
    <>
      <SignIn />
    </>
  );
}
