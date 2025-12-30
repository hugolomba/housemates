/*
  Warnings:

  - Added the required column `roomType` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('LIVING_ROOM', 'BATHROOM', 'BEDROOM', 'EXTERNAL', 'OTHER');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomType" "RoomType" NOT NULL;
