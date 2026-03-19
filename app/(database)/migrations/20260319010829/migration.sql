/*
  Warnings:

  - You are about to drop the column `completedAt` on the `pdf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pdf" DROP COLUMN "completedAt";

-- AlterTable
ALTER TABLE "pdf_summary" ALTER COLUMN "author" DROP NOT NULL;
