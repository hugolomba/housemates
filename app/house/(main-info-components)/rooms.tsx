import { Prisma } from "@/prisma/generated/client";
import { Avatar } from "@heroui/react";
import TaskCard from "../tasks/(task-components)/task-card";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@heroui/react";
import RoomCard from "../rooms/(room-components)/room-card";

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

export default function HouseMain({ houseRooms }: { houseRooms: HouseRooms }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<HouseRooms[number] | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-4">
      {houseRooms.length === 0 ? (
        <p className="text-md text-default-500">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {houseRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onClick={() => {
                setSelectedRoom(room);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="text-xl">{selectedRoom?.name}</ModalHeader>
          <ModalBody>
            {selectedRoom && (
              <div className="flex flex-col gap-3">
                <p className="font-semibold">Users</p>
                {selectedRoom.isCommon ? (
                  <p className="text-default-500">
                    Common space — all house members
                  </p>
                ) : (
                  selectedRoom.users.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <Avatar size="sm" src={user.image || ""} />
                      <span>{user.name}</span>
                    </div>
                  ))
                )}

                <Divider />

                <p className="font-semibold">Tasks</p>
                {selectedRoom?.tasks.length === 0 ? (
                  <p className="text-default-500">No tasks.</p>
                ) : (
                  selectedRoom.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                )}
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
