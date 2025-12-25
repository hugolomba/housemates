-- CreateEnum
CREATE TYPE "CredentialType" AS ENUM ('WIFI', 'APPLIANCE', 'SERVICE', 'OTHER');

-- CreateTable
CREATE TABLE "HouseCredential" (
    "id" SERIAL NOT NULL,
    "houseId" INTEGER NOT NULL,
    "type" "CredentialType" NOT NULL,
    "label" TEXT NOT NULL,
    "email" TEXT,
    "username" TEXT,
    "password" TEXT,
    "url" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HouseCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HouseCredential" ADD CONSTRAINT "HouseCredential_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
