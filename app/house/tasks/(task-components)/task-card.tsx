"use client";

import { Checkbox, Chip, Button, Link, Spinner } from "@heroui/react";
import { Prisma } from "@/prisma/generated/browser";
import { toggleTaskStatus } from "@/lib/actions/tasks-actions";
import { useState } from "react";

type TaskCardProps = {
  task: Prisma.TaskGetPayload<{
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
  }>;
};

export default function TaskCard({ task }: { task: TaskCardProps["task"] }) {
  const [isLoading, setIsLoading] = useState(false);

  const toggleTaskStatusHandler = async (taskId: number) => {
    try {
      setIsLoading(true);
      await toggleTaskStatus(taskId);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {isLoading ? (
        <Spinner variant="dots" />
      ) : (
        <Checkbox
          isSelected={task.status}
          isDisabled={isLoading}
          lineThrough={task.status}
          key={task.id}
          color={task.status ? "success" : "default"}
          onChange={() => toggleTaskStatusHandler(task.id)}
          classNames={{
            label: "w-full max-w-none flex justify-between",
          }}
        >
          <span>{task.title}</span>
          <div className="flex items-center">
            {task.assigned.map((user) => (
              <Chip key={user.name} size="sm" className="ml-2">
                {user.name}
              </Chip>
            ))}
          </div>
        </Checkbox>
      )}
    </div>
  );
}
