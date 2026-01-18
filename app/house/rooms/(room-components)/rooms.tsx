"use client";
import { Prisma } from "@/prisma/generated/client";
import { Avatar } from "@heroui/react";
import TaskCard from "../../tasks/(task-components)/task-card";
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
import RoomCard from "./room-card";
import CreateRoom from "./create-room";
import { deleteRoom } from "@/lib/actions/rooms-actions";

type HouseProps = {
  house: Prisma.HouseGetPayload<{
    include: {
      users: true;
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
  }>;
};

export default function HouseRooms({ house }: HouseProps) {
  const [addRoomIsOpen, setAddRoomIsOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<
    HouseProps["house"]["rooms"][number] | null
  >(null);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteRoom = async (roomId: number) => {
    try {
      setIsDeleting(true);

      await deleteRoom(roomId);

      setDeleteModalIsOpen(false);
      setIsModalOpen(false);

      console.log("Room deleted");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <Button
          color="default"
          size="sm"
          onPress={() => setAddRoomIsOpen(true)}
        >
          + New Room
        </Button>

        <CreateRoom
          createRoomIsOpen={addRoomIsOpen}
          setCreateRoomIsOpen={setAddRoomIsOpen}
          house={house}
        />
      </div>

      <div className="flex flex-col gap-4">
        {house.rooms.length === 0 ? (
          <p className="text-md text-default-500">No rooms available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {house.rooms.map((room) => (
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
                  <p>
                    <strong>Type:</strong> {selectedRoom.roomType}
                  </p>

                  <Divider />

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
                  {selectedRoom.tasks.length === 0 ? (
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
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  setDeleteModalIsOpen(true);
                }}
              >
                Delete Room
              </Button>
              <Button variant="flat" onPress={() => setIsModalOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* delete modal */}
        <Modal
          isOpen={deleteModalIsOpen}
          onOpenChange={setDeleteModalIsOpen}
          backdrop="blur"
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="text-xl">Delete Room</ModalHeader>
            <ModalBody>
              Are you sure you want to delete the room &quot;
              {selectedRoom?.name}&quot;? This action cannot be undone.
            </ModalBody>
            <ModalFooter>
              <Button
                variant="flat"
                onPress={() => setDeleteModalIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  handleDeleteRoom(selectedRoom!.id);
                }}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
