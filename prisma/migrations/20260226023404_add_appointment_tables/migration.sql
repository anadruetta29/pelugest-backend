/*
  Warnings:

  - Added the required column `id_record_status` to the `appointment_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointment_details" ADD COLUMN     "id_record_status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "appointment_details" ADD CONSTRAINT "appointment_details_id_record_status_fkey" FOREIGN KEY ("id_record_status") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
