/*
  Warnings:

  - Added the required column `test` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "test" TEXT;

-- CreateTable
CREATE TABLE "Temp" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Temp_pkey" PRIMARY KEY ("id")
);
