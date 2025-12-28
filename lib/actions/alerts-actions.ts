"use server";
import { prisma } from "@/lib/prisma";
import { log } from "console";
import { revalidatePath } from "next/cache";
import { logActivity } from "../activity";
import { headers } from "next/dist/server/request/headers";
import { auth } from "../auth";

// mark an alert as solved
export async function markAlertAsResolved(alertId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // update alert in db
  const updatedAlert = await prisma.alert.update({
    where: { id: alertId },
    data: { isResolved: true },
  });

  await logActivity({
    houseId: updatedAlert.houseId,
    userId: session?.user.id,
    type: "UPDATE",
    entity: "ALERT",
    entityId: parseInt(alertId),
    title: `${session?.user.name} resolved an alert`,
    message: `${session?.user.name} marked ${updatedAlert.title} as resolved`,
  });
}

// undo resolved alert
export async function undoResolvedAlert(alertId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // update alert in db
  const updatedAlert = await prisma.alert.update({
    where: { id: alertId },
    data: { isResolved: false },
  });

  await logActivity({
    houseId: updatedAlert.houseId,
    userId: session?.user.id,
    type: "UPDATE",
    entity: "ALERT",
    entityId: parseInt(alertId),
    title: `${session?.user.name} unresolved an alert`,
    message: `${session?.user.name} marked ${updatedAlert.title} as unsolved`,
  });
}

// get house by house id
