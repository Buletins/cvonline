import { getServerAuthSession } from "@/server/auth";
import SignIn from "./_components/sign-in";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <>
      {session?.user.email}
      {session?.user.name}
      {session?.user.id}
      <SignIn session={session} />
    </>
  );
}
