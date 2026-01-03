"use client";

import { Prisma } from "@/prisma/generated/browser";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";

type BillCardProps = {
  bill: Prisma.BillGetPayload<{
    include: {
      shares: {
        include: { user: true };
      };
      responsible: true;
    };
  }>;
};

export default function BillCard({ bill }: BillCardProps) {
  return (
    <Card
      key={bill.id}
      fullWidth
      shadow="sm"
      isPressable
      onPress={() => {
        // setSelectedBill(bill);
        // setIsModalOpen(true);
      }}
    >
      <CardHeader className="flex justify-between">
        <span className="font-bold">{bill.title}</span>
        <span className="font-semibold">
          Due: {new Date(bill.dueDate).toLocaleDateString()}
        </span>
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
}
