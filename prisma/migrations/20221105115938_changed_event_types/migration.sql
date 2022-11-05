-- AlterTable
ALTER TABLE "events" ALTER COLUMN "currentdateHeldAt" DROP NOT NULL,
ALTER COLUMN "previousDateHeldAt" DROP NOT NULL,
ALTER COLUMN "subscribedGuests" SET DATA TYPE TEXT[];
