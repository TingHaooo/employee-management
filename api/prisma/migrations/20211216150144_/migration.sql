-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'ADMIN');

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_authorId_fkey";

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'STAFF',

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewModel" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "targetId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "ReviewModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskModel" (
    "id" SERIAL NOT NULL,
    "assignedId" INTEGER NOT NULL,
    "reviewForId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "TaskModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewModel" ADD CONSTRAINT "ReviewModel_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewModel" ADD CONSTRAINT "ReviewModel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskModel" ADD CONSTRAINT "TaskModel_assignedId_fkey" FOREIGN KEY ("assignedId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskModel" ADD CONSTRAINT "TaskModel_reviewForId_fkey" FOREIGN KEY ("reviewForId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
