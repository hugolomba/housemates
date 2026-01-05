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

  return <h1>This is gonna be a landing/inicial page</h1>;
}
