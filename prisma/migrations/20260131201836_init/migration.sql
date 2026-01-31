-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "mobilePhoneNumber" TEXT NOT NULL,
    "landlinePhoneNumber" TEXT NOT NULL,
    "id_record_status" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_id_record_status_fkey" FOREIGN KEY ("id_record_status") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
