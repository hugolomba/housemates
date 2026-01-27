import HouseSettingsClient from "./settings-client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function HouseSettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.houseId) {
    redirect("/auth");
  }

  return <HouseSettingsClient />;
}
