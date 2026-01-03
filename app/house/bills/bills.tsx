"use client";

import { Tabs, Tab } from "@heroui/react";
import { useState } from "react";
import BillDetailsModal from "./bill-modal";
import BillCard from "./bill-card";
import { Prisma } from "@/prisma/generated/browser";

type HouseBills = Prisma.HouseGetPayload<{
  include: {
    bills: {
      include: {
        shares: {
          include: {
            user: true;
          };
        };
        responsible: true;
      };
    };
  };
}>["bills"];
export default function Bills({ houseBills }: { houseBills: HouseBills }) {
  const overdueBills = houseBills.filter((bill) => {
    const now = new Date();
    const billDate = new Date(bill.dueDate);
    const unpaidCount = bill.shares.filter((s) => !s.paid).length;
    return billDate < now && unpaidCount > 0;
  });

  const paidBills = houseBills.filter((bill) =>
    bill.shares.every((share) => share.paid)
  );

  const dueThisMonthBills = houseBills.filter((bill) => {
    const now = new Date();
    const billDate = new Date(bill.dueDate);
    return (
      billDate.getMonth() === now.getMonth() &&
      billDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className="container flex flex-col gap-4">
      <Tabs
        aria-label="Dynamic tabs"
        key="test"
        classNames={{
          panel: "flex flex-col gap-2",
        }}
      >
        {/* <Tab>All Bills ({houseBills.length})</Tab> */}
        {/* <Tab>
          Paid Bills (
          {
            houseBills.filter((bill) =>
              bill.shares.every((share) => share.paid)
            ).length
          }
          )
        </Tab> */}
        <Tab title={`All (${houseBills.length})`}>
          {houseBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} />
          ))}
        </Tab>
        <Tab title={`Due This Month (${dueThisMonthBills.length})`}>
          {houseBills
            .filter((bill) => {
              const now = new Date();
              const billDate = new Date(bill.dueDate);
              return (
                billDate.getMonth() === now.getMonth() &&
                billDate.getFullYear() === now.getFullYear()
              );
            })
            .map((bill) => (
              <BillCard key={bill.id} bill={bill} />
            ))}
        </Tab>
        <Tab
          title={`Overdue (${
            houseBills.filter((bill) => {
              const now = new Date();
              const billDate = new Date(bill.dueDate);
              const unpaidCount = bill.shares.filter((s) => !s.paid).length;
              return billDate < now && unpaidCount > 0;
            }).length
          })`}
        >
          {overdueBills.length === 0 ? (
            <p className="text-center text-default-500 mt-4">
              No overdue bills! 🎉
            </p>
          ) : (
            overdueBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
          )}
        </Tab>

        <Tab title={`Paid (${paidBills.length})`}>
          {paidBills.length === 0 ? (
            <p className="text-center text-default-500 mt-4">
              No overdue bills! 🎉
            </p>
          ) : (
            paidBills.map((bill) => <BillCard key={bill.id} bill={bill} />)
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
