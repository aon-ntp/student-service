-- AlterTable
CREATE SEQUENCE studentprofile_code_seq;
ALTER TABLE "StudentProfile" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "homePhone" TEXT,
ADD COLUMN     "mobilePhone" TEXT,
ALTER COLUMN "code" SET DEFAULT nextval('studentprofile_code_seq'),
ALTER COLUMN "updateAt" DROP NOT NULL;
ALTER SEQUENCE studentprofile_code_seq OWNED BY "StudentProfile"."code";

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentWishList" ADD CONSTRAINT "StudentWishList_courseLookupId_fkey" FOREIGN KEY ("courseLookupId") REFERENCES "CourseLookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
