-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "address" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentWishList" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "courseLookupId" TEXT NOT NULL,

    CONSTRAINT "StudentWishList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseLookup" (
    "id" TEXT NOT NULL,
    "originalCourseId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseLookup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_code_key" ON "StudentProfile"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CourseLookup_originalCourseId_key" ON "CourseLookup"("originalCourseId");

-- AddForeignKey
ALTER TABLE "StudentWishList" ADD CONSTRAINT "StudentWishList_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
