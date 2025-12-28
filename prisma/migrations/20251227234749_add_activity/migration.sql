/*
  Warnings:

  - Added the required column `houseId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('CREATE', 'UPDATE', 'COMPLETE', 'PAY', 'RESOLVE');

-- CreateEnum
CREATE TYPE "ActivityEntity" AS ENUM ('HOUSE', 'ROOM', 'TASK', 'BILL', 'SHARE', 'ALERT');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "houseId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,
    "userId" TEXT,
    "type" "ActivityType" NOT NULL,
    "entity" "ActivityEntity" NOT NULL,
    "entityId" INTEGER,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Activity_houseId_createdAt_idx" ON "Activity"("houseId", "createdAt");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
