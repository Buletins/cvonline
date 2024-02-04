import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import ItemBlock from "./_components/item-block";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";
import EditProfileBtn from "./_components/edit-profile-btn";
import PublishBar from "./_components/publish-bar";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();

  const user = await api.user.getByUsernam.query({ username: params.username });

  if (!session && !user?.isPusblished) return "This profile is not published";

  if (!user ?? !user?.email) return "use not found";
  return (
    <>
      <div className="flex flex-col gap-8 py-20">
        {!user.isPusblished && <PublishBar />}
        <Header user={user} session={session} />
        <main className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <ItemBlock title="About">
            <p className="text-sm leading-tight tracking-tight text-muted-foreground">
              {user.description}
            </p>
          </ItemBlock>
          <ItemBlock title="Experiences">
            {user.experiences.map((item, index) => (
              <div className="">{item.title}</div>
            ))}
          </ItemBlock>
          <ItemBlock title="Contact">
            <ContactItem label="Email" href={user.email} />
            {user.contacts.map((item, index) => (
              <ContactItem
                key={index}
                label={item.contactType}
                href={item.contactValue}
              />
            ))}
          </ItemBlock>
        </main>
      </div>
      {session && <EditProfileBtn user={user} session={session} />}
    </>
  );
}
