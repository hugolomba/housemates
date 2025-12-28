//  helper function to log activities in the system

import { prisma } from "@/lib/prisma";
import { ActivityType, ActivityEntity } from "@/prisma/generated/client";

type LogActivityInput = {
  houseId: number;
  userId?: string;
  type: ActivityType;
  entity: ActivityEntity;
  entityId?: number;
  message: string;
  title: string;
};

export async function logActivity({
  houseId,
  userId,
  type,
  entity,
  entityId,
  message,
  title,
}: LogActivityInput) {
  return prisma.activity.create({
    data: {
      houseId,
      userId,
      type,
      entity,
      entityId,
      message,
      title,
    },
  });
}
