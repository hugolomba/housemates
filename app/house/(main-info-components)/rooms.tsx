import { Prisma } from "@/prisma/generated/client";
import {
  AvatarGroup,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@heroui/react";
import { Bath, BedDouble, CookingPot, Fence, House } from "lucide-react";

type HouseRooms = Prisma.HouseGetPayload<{
  include: {
    rooms: {
      include: {
        users: true;
      };
    };
  };
}>["rooms"];

export default function HouseMain({ houseRooms }: { houseRooms: HouseRooms }) {
  return (
    <div className="flex flex-col gap-4">
      {houseRooms.length === 0 ? (
        <p className="text-md text-default-500">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {houseRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}

function RoomCard({ room }: { room: HouseRooms[number] }) {
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
    // <div className="p-4 border border-default-200 rounded-lg">
    //   <h3 className="text-lg font-semibold">{room.name}</h3>
    //   <p className="text-sm text-default-500">Type: {room.roomType}</p>

    //   {/* Add more room details as needed */}
    // </div>
    <Card className="relative overflow-hidden p-4 shadow-md bg-white dark:bg-gray-800 rounded-4xl hover:shadow-lg transition-shadow duration-200 ease-out border border-default-200 dark:border-gray-700">
      <CardHeader>
        <h3 className="text-lg font-semibold text-foreground line-clamp-1">
          {room.name}
        </h3>
      </CardHeader>
      <CardBody className="pt-2 pb-4 px-0 relative">
        <div className="flex flex-col gap-3">
          {/* <AvatarGroup>
            {room.users.map((user) => (
              <Avatar
                key={user.id}
                src={user.image || undefined}
                name={user.name || "User"}
                size="sm"
              />
            ))}
          </AvatarGroup> */}
        </div>
        {/* <div
          className={`absolute bottom-0 right-0 opacity-10 pointer-events-none ${defineRoomColor(room.roomType)}`}
        >
          {defineRoomIcon(room.roomType)}
        </div> */}
      </CardBody>
      <CardFooter className="p-0">
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
        <div
          className={`absolute bottom-1 right-2 opacity-10 pointer-events-none ${defineRoomColor(room.roomType)}`}
        >
          {defineRoomIcon(room.roomType)}
        </div>
      </CardFooter>
    </Card>
  );
}
