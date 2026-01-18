import { headers } from "next/dist/server/request/headers";
import { redirect } from "next/dist/client/components/navigation";
import { auth } from "@/lib/auth";
// import Tasks from "./(task-components)/tasks";
import { getHouseById } from "@/lib/actions/house-actions";
import Tasks from "../tasks/(task-components)/tasks";
import { House } from "lucide-react";
import HouseRooms from "./(room-components)/rooms";

export default async function RoomsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    redirect("/auth");
  }

  const house = await getHouseById(session.user.houseId!);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">House Rooms</h1>
          <p className="text-sm text-default-500">
            Manage and view all rooms in your house. Here you can see details
            about each room and its associated tasks.
          </p>
        </header>
        <HouseRooms house={house} />
      </div>
    </div>
  );
}
