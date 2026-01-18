import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session.user.houseId) {
    redirect("/setup-house");
  } else if (session && session.user.houseId) {
    redirect("/house");
  }

  return (
    <section>
      <div className="h-8 px-2.5 py-[5px] bg-zinc-900 rounded-md inline-flex justify-center items-center gap-1">
        <div className="text-center justify-start text-white text-base font-normal font-['Patrick_Hand'] tracking-tight">
          Button
        </div>
      </div>
    </section>
  );
}
