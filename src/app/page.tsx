import { getServerAuthSession } from "@/server/auth";
import SignIn from "./_components/sign-in";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) redirect(`${session.user.username}`);

  return (
    <>
      <SignIn session={session} />
    </>
  );
}
