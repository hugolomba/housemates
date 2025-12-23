import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Items from "../house/[houseId]/items";

export default async function Dashboard() {
  // protected routes
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log("Dashboard session:", session);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl font-bold">Dashboard page test</h1>
      <p>Welcome to the dashboard!</p>
    </div>
  );
}
