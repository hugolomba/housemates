// import { HouseRooms } from "@/lib/types/house-types";
import { Prisma } from "@/prisma/generated/browser";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@heroui/react";
import { Bath, BedDouble, CookingPot, Fence, House } from "lucide-react";

type HouseRooms = Prisma.HouseGetPayload<{
  include: {
    rooms: {
      include: {
        tasks: {
          include: {
            room: {
              select: {
                name: true;
                roomType: true;
              };
            };
            assigned: {
              select: {
                name: true;
              };
            };
          };
        };
        users: true;
      };
    };
  };
}>["rooms"];

export default function RoomCard({
  room,
  onClick,
}: {
  room: HouseRooms[number];
  onClick: () => void;
}) {
  const defineRoomIcon = (roomType: string) => {
    switch (roomType) {
      case "LIVING_ROOM":
      case "OTHER":
        return <House size={80} />;
      case "BEDROOM":
        return <BedDouble size={80} />;
      case "BATHROOM":
        return <Bath size={80} />;
      case "EXTERNAL":
        return <Fence size={80} />;
      case "KITCHEN":
        return <CookingPot size={80} />;
    }
  };

  const defineRoomColor = (roomType: string) => {
    switch (roomType) {
      case "LIVING_ROOM":
      case "OTHER":
        return "text-blue-500";
      case "BEDROOM":
        return "text-purple-500";
      case "BATHROOM":
        return "text-teal-500";
      case "EXTERNAL":
        return "text-green-500";
      case "KITCHEN":
        return "text-orange-500";
      default:
        return "text-default-500";
    }
  };

  return (
    <Card
      onPress={onClick}
      isPressable
      className="relative overflow-hidden p-4 shadow-md bg-white dark:bg-gray-800 rounded-4xl hover:shadow-lg transition-shadow duration-200 ease-out border border-default-200 dark:border-gray-700"
    >
      <CardHeader className="p-0">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
          {room.name}
        </h3>
      </CardHeader>
      <CardBody className="pt-2 pb-4 px-0 relative">
        <div className="flex flex-col gap-3">
          {room.tasks.length === 0 ||
          room.tasks.filter((task) => !task.status).length === 0 ? (
            <p className="text-md text-default-500">No tasks.</p>
          ) : (
            <p className="text-md text-default-500">
              {room.tasks.filter((task) => !task.status).length} task
              {room.tasks.filter((task) => !task.status).length !== 1
                ? "s"
                : ""}{" "}
              pending
            </p>
          )}
        </div>
      </CardBody>
      <CardFooter className="p-0">
        {room.isCommon ? (
          <p className="text-sm text-default-500  border border-default-200 bg-gray-100 rounded-full px-2 py-1">
            Common Space
          </p>
        ) : (
          <AvatarGroup>
            {room.users.map((user) => (
              <Avatar
                key={user.id}
                src={user.image || undefined}
                name={user.name || "User"}
                size="sm"
              />
            ))}
          </AvatarGroup>
        )}
        <div
          className={`absolute bottom-1 right-2 opacity-10 pointer-events-none ${defineRoomColor(room.roomType)}`}
        >
          {defineRoomIcon(room.roomType)}
        </div>
      </CardFooter>
    </Card>
  );
}
