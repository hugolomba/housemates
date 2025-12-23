"use client";
import { Prisma } from "@/prisma/generated/client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";

export default function HouseCard({
  house,
}: {
  house: Prisma.HouseGetPayload<{ include: { users: true } }>;
}) {
  return (
    <Card>
      <CardHeader>House Card for House ID: {house.name}</CardHeader>
      <CardBody>
        <p>Number of Users: {house.users.length}</p>
      </CardBody>
      <CardFooter>
        <p>Footer Content</p>
      </CardFooter>
    </Card>
  );
}
