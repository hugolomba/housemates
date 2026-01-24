"use client";

import { createContext, useContext, useMemo, useState } from "react";

type DemoHouse = {
  id: number;
  name: string;
  address: string;
  inviteCode: string;
  users: any[];
  bills: any[];
  tasks: any[];
  alerts: any[];
  credentials: any[];
  rooms: any[];
  activities: any[];
};

type DemoContextType = {
  house: DemoHouse;
  addBill: (bill: any) => void;
  addTask: (task: any) => void;
  addAlert: (alert: any) => void;
  addCredential: (credential: any) => void;
};

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [house, setHouse] = useState<DemoHouse>({
    id: 0,
    name: "Demo House",
    address: "Dublin, Ireland",
    inviteCode: "DEMO-1234",
    users: [
      { id: "u1", name: "Alex", email: "alex@demo.com", image: null },
      { id: "u2", name: "Jamie", email: "jamie@demo.com", image: null },
    ],
    bills: [
      { id: "b1", name: "Electricity", amount: 120, paid: false },
      { id: "b2", name: "Internet", amount: 60, paid: true },
    ],
    tasks: [
      { id: "t1", title: "Clean kitchen", status: false },
      { id: "t2", title: "Take out trash", status: true },
    ],
    alerts: [{ id: "a1", title: "Gas refill", isResolved: false }],
    credentials: [
      { id: "c1", label: "Wi-Fi", username: "home", password: "demo1234" },
    ],
    rooms: [
      { id: "r1", name: "Living room" },
      { id: "r2", name: "Bedroom" },
    ],
    activities: [
      {
        id: "act1",
        title: "Bill created",
        message: "Electricity bill added",
        createdAt: new Date().toISOString(),
      },
    ],
  });

  const value = useMemo(
    () => ({
      house,
      addBill: (bill: any) =>
        setHouse((prev) => ({ ...prev, bills: [...prev.bills, bill] })),
      addTask: (task: any) =>
        setHouse((prev) => ({ ...prev, tasks: [...prev.tasks, task] })),
      addAlert: (alert: any) =>
        setHouse((prev) => ({ ...prev, alerts: [...prev.alerts, alert] })),
      addCredential: (credential: any) =>
        setHouse((prev) => ({
          ...prev,
          credentials: [...prev.credentials, credential],
        })),
    }),
    [house],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
