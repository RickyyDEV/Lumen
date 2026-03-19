-- DropForeignKey
ALTER TABLE "pdf" DROP CONSTRAINT "pdf_pdfSummaryId_fkey";

-- AlterTable
ALTER TABLE "pdf" ALTER COLUMN "pdfSummaryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pdf" ADD CONSTRAINT "pdf_pdfSummaryId_fkey" FOREIGN KEY ("pdfSummaryId") REFERENCES "pdf_summary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
