-- DropForeignKey
ALTER TABLE "StudentWishList" DROP CONSTRAINT "StudentWishList_courseLookupId_fkey";

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "birthDate",
DROP COLUMN "homePhone",
DROP COLUMN "mobilePhone",
ALTER COLUMN "code" DROP DEFAULT,
ALTER COLUMN "updateAt" SET NOT NULL;
DROP SEQUENCE "studentprofile_code_seq";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Product";

