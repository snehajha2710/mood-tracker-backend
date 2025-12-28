/*
  Warnings:

  - Changed the type of `feeling` on the `Mood` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Feeling" AS ENUM ('CALM', 'HAPPY', 'SAD', 'ANXIOUS');

-- AlterTable
ALTER TABLE "Mood" DROP COLUMN "feeling",
ADD COLUMN     "feeling" "Feeling" NOT NULL;

-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);
