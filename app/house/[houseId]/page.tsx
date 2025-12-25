import { prisma } from "@/lib/prisma";
import Items from "../[houseId]/items";
import HouseCard from "./house-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home({
  params,
}: {
  params: { houseId: string };
}) {
  const { houseId } = await params;

  const house = await prisma.house.findUnique({
    where: { id: Number(houseId) },
    include: {
      users: true,
      bills: true,
      infos: true,
      alerts: true,
      rooms: {
        include: {
          tasks: {
            include: {
              assigned: true,
            },
          },
        },
      },
    },
  });

  // protected routes
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  } else {
    const user = { id: session.user.id };
    const isUserInHouse = house?.users.some(
      (houseUser) => houseUser.id === user.id
    );
    if (!isUserInHouse) {
      redirect("/setup-house");
    }
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <HouseCard house={house!} />
      <Items house={house!} />
    </div>
  );
}
