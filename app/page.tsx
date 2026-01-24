import { auth } from "@/lib/auth";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";
import Image from "next/image";
import { Home, CreditCard, CheckSquare, Bell, Key } from "lucide-react";
import { motion } from "framer-motion";
import LandingClient from "./_components/landing";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && !session.user.houseId) {
    redirect("/setup-house");
  } else if (session && session.user.houseId) {
    redirect("/house");
  }

  return (
    <>
      {/* HERO */}
      <LandingClient />
    </>
  );
}
