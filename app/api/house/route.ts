// get all house
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const userHouse = await prisma.house.findMany({
    where: {
      createdById: "user1", // Replace with the actual house ID you want to query
    },
    include: {
      alerts: true,
      bills: {
        include: {
          shares: {
            include: {
              user: true,
            },
          },
          responsible: true,
        },
      },
      credentials: true,
      createdBy: true,
      tasks: {
        include: {
          assigned: {
            select: {
              name: true,
            },
          },
          room: {
            select: {
              name: true,
              roomType: true,
            },
          },
        },
      },
      infos: true,
      rooms: {
        include: {
          tasks: {
            include: {
              assigned: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      users: true,
    },
  });

  if (!userHouse) {
    return NextResponse.json({ message: "House not found" }, { status: 404 });
  }

  return NextResponse.json(userHouse);
}
