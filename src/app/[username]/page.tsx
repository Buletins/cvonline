import ItemBlock from "./_components/item-block";
import ItemDetail from "./_components/item-detail";
import ContactItem from "./_components/contact-item";
import Header from "./_components/header";
import { api } from "@/trpc/server";
import ExperienceBlock from "./_components/experience-block";
import { getServerAuthSession } from "@/server/auth";
import EditProfileBtn from "./_components/edit-profile-btn";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerAuthSession();

  const user = await api.user.getByUsernam.query({ username: params.username });

  if (!user) return "use not found";
  return (
    <>
      <div className="flex flex-col gap-8 py-20">
        <Header user={user} session={session} />
        <main className="mx-auto flex w-full max-w-lg flex-col gap-8">
          <ItemBlock title="About">
            <p className="text-sm leading-tight tracking-tight text-muted-foreground">
              {user.description}
            </p>
          </ItemBlock>
          <ItemBlock title="Contact">
            <ContactItem label="E-mail" href="buletin.sehu@hotmail.com" />
            <ContactItem label="Phone" href="+32 483 42 28 10" />
            <ContactItem label="Twitter" href="@buletin.sehu" />
            <ContactItem label="LinkedIn" href="@buletins" />
          </ItemBlock>
          {/* <ExperienceBlock data={user.experiences} /> */}
          {/* <ItemBlock title="Education">
          <ItemDetail
          sub="Master in UX Design"
          title="UniversAmsterdam"
          timeline="2014-2016"
          description="ies with a master thesis about human computer interaction in AI."
          />
          <ItemDetail
          sub="Master in UX Design"
          title="Unences, Amsterdam"
          timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
            />
            <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
            />
            <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
            />
            <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
            />
            <ItemDetail
            sub="Master in UX Design"
            title="University Applied Sciences, Amsterdam"
            timeline="2014-2016"
            description="Specializing in UX and UI Design and closing the studies with a master thesis about human computer interaction in AI."
            />
            </ItemBlock>
            <ItemBlock title="Contact">
            <ContactItem label="E-mail" href="buletin.sehu@hotmail.com" />
            <ContactItem label="Phone" href="+32 483 42 28 10" />
            <ContactItem label="Twitter" href="@buletin.sehu" />
            <ContactItem label="LinkedIn" href="@buletins" />
          </ItemBlock> */}
        </main>
      </div>
      {session && <EditProfileBtn user={user} session={session} />}
    </>
  );
}
