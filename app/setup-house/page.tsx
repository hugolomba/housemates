import { checkIfUserHasHouse } from "@/lib/actions/house-actions";
import SetupHouse from "./setup-house";
import { auth } from "@/lib/auth";
import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/navigation";
export default async function SetupHousePage() {
  // check if user has a house
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const userHasHouse = await checkIfUserHasHouse(session.user.id);

  if (userHasHouse) redirect("/house");

  return <SetupHouse />;
}
