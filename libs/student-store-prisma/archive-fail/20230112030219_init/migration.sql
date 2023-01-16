/*
  Warnings:

  - Added the required column `birthDate` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobilePhone` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE studentprofile_code_seq;
ALTER TABLE "StudentProfile" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "homePhone" TEXT,
ADD COLUMN     "mobilePhone" TEXT NOT NULL,
ALTER COLUMN "code" SET DEFAULT nextval('studentprofile_code_seq');
ALTER SEQUENCE studentprofile_code_seq OWNED BY "StudentProfile"."code";
