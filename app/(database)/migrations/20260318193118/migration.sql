/*
  Warnings:

  - Added the required column `pages` to the `pdf` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pdf" ADD COLUMN     "pages" INTEGER NOT NULL;
