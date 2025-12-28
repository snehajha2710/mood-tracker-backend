-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "feeling" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);
