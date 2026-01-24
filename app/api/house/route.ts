// get all house
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const houseId = 1; // demo house
  const house = await prisma.house.findMany({
    include: {
      users: true,
      tasks: {
        include: {
          room: {
            select: {
              name: true,
              roomType: true,
            },
          },
          assigned: {
            select: {
              name: true,
            },
          },
        },
      },
      bills: {
        include: {
          shares: {
            include: {
              user: true,
            },
          },
          responsible: true,
        },
        orderBy: { dueDate: "desc" },
      },
      infos: true,
      alerts: true,
      credentials: true,
      activities: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      rooms: {
        include: {
          tasks: {
            include: {
              room: {
                select: {
                  name: true,
                  roomType: true,
                },
              },
              assigned: {
                select: {
                  name: true,
                },
              },
            },
          },
          users: true,
        },
      },
    },
  });

  if (!house) {
    return NextResponse.json({ message: "House not found" }, { status: 404 });
  }

  return NextResponse.json(house);
}
