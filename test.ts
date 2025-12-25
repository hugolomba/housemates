import { prisma } from "./lib/prisma";

async function main() {
  try {
    const users = await prisma.user.findMany();
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
