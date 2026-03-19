/*
  Warnings:

  - You are about to drop the column `summaryContent` on the `pdf_summary` table. All the data in the column will be lost.
  - Added the required column `analysis` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detailedSummary` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `difficultyLevel` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainTopic` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingTime` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortSummary` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `pdf_summary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pdf_summary" DROP COLUMN "summaryContent",
ADD COLUMN     "analysis" JSONB NOT NULL,
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "detailedSummary" TEXT NOT NULL,
ADD COLUMN     "difficultyLevel" TEXT NOT NULL,
ADD COLUMN     "mainTopic" TEXT NOT NULL,
ADD COLUMN     "readingTime" INTEGER NOT NULL,
ADD COLUMN     "shortSummary" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
