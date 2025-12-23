/*
  Warnings:

  - You are about to drop the column `houseId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Alert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `House` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HouseInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Share` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TaskAssignees` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Alert" DROP CONSTRAINT "Alert_houseId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_houseId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "House" DROP CONSTRAINT "House_createdById_fkey";

-- DropForeignKey
ALTER TABLE "HouseInfo" DROP CONSTRAINT "HouseInfo_houseId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_houseId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_billId_fkey";

-- DropForeignKey
ALTER TABLE "Share" DROP CONSTRAINT "Share_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_roomId_fkey";

-- DropForeignKey
ALTER TABLE "_TaskAssignees" DROP CONSTRAINT "_TaskAssignees_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskAssignees" DROP CONSTRAINT "_TaskAssignees_B_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_houseId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "houseId";

-- DropTable
DROP TABLE "Alert";

-- DropTable
DROP TABLE "Bill";

-- DropTable
DROP TABLE "House";

-- DropTable
DROP TABLE "HouseInfo";

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "Share";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "_TaskAssignees";

-- DropEnum
DROP TYPE "Priority";
