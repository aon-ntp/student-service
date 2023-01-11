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
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentWishList" ADD CONSTRAINT "StudentWishList_courseLookupId_fkey" FOREIGN KEY ("courseLookupId") REFERENCES "CourseLookup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
