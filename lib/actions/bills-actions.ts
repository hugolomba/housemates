"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // ou getServerSession
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { logActivity } from "../activity";

export async function markShareAsPaid(billId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  // Find the share for the current user and bill
  const share = await prisma.share.findFirst({
    where: {
      billId,
      userId: session.user.id,
    },
    include: { bill: true },
  });

  if (!share) {
    throw new Error("Share not found for this user");
  }

  if (share.paid) {
    return { success: true };
  }

  await prisma.share.update({
    where: { id: share.id },
    data: { paid: true },
    include: { bill: true },
  });

  await logActivity({
    houseId: share.bill.houseId,
    userId: session.user.id,
    type: "UPDATE",
    entity: "SHARE",
    entityId: share.bill.id,
    title: `${session.user.name} marked a share as paid`,
    message: `${session.user.name} marked the share for bill ${share.bill.title} as paid`,
  });

  revalidatePath("/house");

  return { success: true };
}
