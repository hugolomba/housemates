import { prisma } from "../lib/prisma";

async function main() {
  // Clear existing data
  await prisma.alert.deleteMany();
  await prisma.share.deleteMany(); // ⬅️ THIS WAS MISSING
  await prisma.task.deleteMany();
  await prisma.bill.deleteMany();
  await prisma.room.deleteMany();
  await prisma.houseInfo.deleteMany();
  await prisma.house.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      id: "user1",
      name: "Hugo",
      email: "hmlomba@gmail.com",
      image: "https://avatars.githubusercontent.com/u/16869726?v=4",
      emailVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "user2",
      name: "Andrea",
      email: "andrea@example.com",
      emailVerified: false,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      id: "user3",
      name: "Rafaela",
      email: "rafaela@example.com",
      emailVerified: false,
    },
  });

  // Create house (REQUIRED: createdBy)
  const house = await prisma.house.create({
    data: {
      name: "Medusa's House",

      createdBy: {
        connect: { id: user1.id },
      },

      users: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }],
      },

      infos: {
        create: [
          { key: "Address", value: "89 Terenure Road North" },
          { key: "City", value: "Dublin" },
          { key: "wifiPassword", value: "5mJ{d3XT" },
        ],
      },
    },
  });

  // Create rooms
  const room1 = await prisma.room.create({
    data: {
      name: "Living Room",
      house: {
        connect: { id: house.id },
      },
    },
  });

  const room2 = await prisma.room.create({
    data: {
      name: "Hugo and Andrea's Room",
      house: {
        connect: { id: house.id },
      },
    },
  });

  // Create tasks
  await prisma.task.create({
    data: {
      title: "Clean the living room",
      status: true,
      room: {
        connect: { id: room1.id },
      },
      assigned: {
        connect: [{ id: user2.id }],
      },
    },
  });

  await prisma.task.create({
    data: {
      title: "Wash the dishes",
      description: "Wash plates, glasses, and cutlery",
      room: {
        connect: { id: room2.id },
      },
      assigned: {
        connect: [{ id: user1.id }],
      },
    },
  });

  // Create bill
  const bill = await prisma.bill.create({
    data: {
      title: "Electricity Bill",
      description: "Bill for the month of December",
      totalValue: 120.5,
      dueDate: new Date("2025-12-31"),

      house: {
        connect: { id: house.id },
      },

      responsible: {
        connect: { id: user1.id },
      },

      shares: {
        create: [
          {
            user: { connect: { id: user1.id } },
            value: 60.25,
            paid: true,
          },
          {
            user: { connect: { id: user2.id } },
            value: 60.25,
            paid: false,
          },
        ],
      },
    },
  });

  // Create alert
  await prisma.alert.create({
    data: {
      title: "Test warning",
      message: "Test alert message",
      priority: "HIGH",

      createdBy: {
        connect: { id: user1.id },
      },

      house: {
        connect: { id: house.id },
      },

      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
