"use client";

import Image from "next/image";
import { Home, CreditCard, CheckSquare, Bell, Key } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingClient() {
  return (
    <>
      {/* HERO */}
      <section className="w-full bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Everything your household needs, in one place
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                HouseMates helps people who share a house stay organised. Manage
                bills, tasks, alerts, credentials, and all your household
                information in a single shared space.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-start justify-center">
                <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-white font-semibold">
                  Create your house
                </button>
                <button className="border border-gray-300 dark:border-neutral-700 px-6 py-3 rounded-full font-semibold">
                  How it works
                </button>
              </div>
            </motion.div>

            <div className="relative w-full h-[320px] md:h-[420px]">
              <Image
                src="/images/mockup.png"
                alt="HouseMates app preview"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN DO */}
      <section className="w-full bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What you can do with HouseMates
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage shared living, without messy group
              chats or spreadsheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center gap-4">
              <CreditCard className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">Bills & payments</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Add bills, split costs between housemates, and track who has
                paid their share.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <CheckSquare className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">Tasks & alerts</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Create shared tasks and alerts so nothing is forgotten in your
                home.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Key className="w-10 h-10 text-blue-500" />
              <h3 className="text-xl font-semibold">Shared credentials</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Keep Wi‑Fi passwords, appliance logins, and access codes in one
                secure place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How it works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Get started in minutes and keep your shared home organised from
              day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create your house</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set up your house and invite your housemates to join.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add information</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Register bills, tasks, alerts, rooms, and shared credentials.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-500 text-white text-xl font-bold">
                <CheckSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stay organised</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Everyone stays aligned, knows what to pay, and what needs
                attention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Loved by people who share a home
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real feedback from people who use HouseMates to keep their home
              organised.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                “We stopped arguing about bills. Everyone knows exactly what
                they owe and when to pay.”
              </p>
              <div className="font-semibold">Sarah M.</div>
              <div className="text-sm text-gray-500">Shared apartment</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                “Having all passwords and house info in one place saved us so
                much time.”
              </p>
              <div className="font-semibold">Lucas R.</div>
              <div className="text-sm text-gray-500">
                House with 4 roommates
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white dark:bg-black p-6 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                “Tasks, alerts, bills… everything finally feels organised. We
                actually use it every day.”
              </p>
              <div className="font-semibold">Emily T.</div>
              <div className="text-sm text-gray-500">Shared house</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Make shared living simple
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Stop chasing messages and spreadsheets. Manage your shared home with
            clarity and confidence.
          </p>
          <button className="bg-white text-blue-500 px-8 py-3 rounded-full font-semibold">
            Create your account
          </button>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      <Icon className="w-10 h-10 text-blue-500" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{children}</p>
    </motion.div>
  );
}
