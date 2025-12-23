/*
  Warnings:

  - You are about to drop the `_HouseUsers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `House` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `House` table without a default value. This is not possible if the table is not empty.
  - The required column `inviteCode` was added to the `House` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_HouseUsers" DROP CONSTRAINT "_HouseUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_HouseUsers" DROP CONSTRAINT "_HouseUsers_B_fkey";

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "inviteCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "houseId" INTEGER;

-- DropTable
DROP TABLE "_HouseUsers";

-- CreateIndex
CREATE UNIQUE INDEX "House_inviteCode_key" ON "House"("inviteCode");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
