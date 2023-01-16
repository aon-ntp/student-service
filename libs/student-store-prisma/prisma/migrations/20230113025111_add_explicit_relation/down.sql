-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_authorId_fkey";

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "BooksOnAuthors";

