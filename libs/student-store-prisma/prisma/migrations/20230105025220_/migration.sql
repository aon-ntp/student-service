-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" VARCHAR(255) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
