/*
  Warnings:

  - You are about to drop the column `dateHeldAt` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfConfirmedGuests` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "dateHeldAt",
DROP COLUMN "numberOfConfirmedGuests",
ADD COLUMN     "currentdateHeldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isRecurring" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "previousDateHeldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "subscribedGuests" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
