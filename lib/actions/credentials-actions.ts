"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth";
import { headers } from "next/dist/server/request/headers";
import { House, Prisma } from "@/prisma/generated/client";
import { log } from "console";
import { logActivity } from "../activity";
import { Form } from "lucide-react";
import { revalidatePath } from "next/cache";

export async function createCredential(FormData: FormData, houseId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const title = FormData.get("label") as string;
  const type = FormData.get("type") as
    | "WIFI"
    | "APPLIANCE"
    | "SERVICE"
    | "OTHER";
  const email = FormData.get("email") as string;
  const username = FormData.get("username") as string;
  const password = FormData.get("password") as string;
  const url = FormData.get("url") as string;
  const notes = FormData.get("notes") as string;

  const newCredential = await prisma.houseCredential.create({
    data: {
      houseId: houseId,
      label: title,
      type: type,
      email: email,
      username: username,
      password: password,
      url: url,
      notes: notes,
    },
  });

  await logActivity({
    houseId: houseId,
    userId: session.user.id,
    type: "CREATE",
    entity: "CREDENTIAL",
    entityId: newCredential.id,
    title: `New credential "${newCredential.label}" added`,
    message: `A new credential "${newCredential.label}" has been added to the house.`,
  });

  revalidatePath("/house");
  return newCredential;
}

export async function deleteCredential(credentialId: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await prisma.houseCredential.delete({
    where: {
      id: credentialId,
    },
  });

  await logActivity({
    houseId: session.user.houseId!,
    userId: session.user.id,
    type: "DELETE",
    entity: "CREDENTIAL",
    entityId: credentialId,
    title: `Credential deleted`,
    message: `A credential has been deleted from the house.`,
  });

  revalidatePath("/house");
}

// export async function updateCredential(data: {
//   id: number;
//   label?: string;
//   type?: string;
//   email?: string;
//   username?: string;
//   password?: string;
//   url?: string;
//   notes?: string;
// }) {
//   const updatedCredential = await prisma.credential.update({
//     where: {
//       id: data.id,
//     },
//     data: {
//       label: data.label,
//       type: data.type,
//       email: data.email,
//       username: data.username,
//       password: data.password,
//       url: data.url,
//       notes: data.notes,
//     },
//   });

//   return updatedCredential;
// }
