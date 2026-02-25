-- CreateEnum
CREATE TYPE "AppointmentStatusName" AS ENUM ('RESERVED', 'IN_PROGRESS', 'ATTENDED', 'MISSED', 'CANCELLED');

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "estimatedEndDateTime" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatusName" NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_details" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "id_appointment" TEXT NOT NULL,
    "id_service" TEXT NOT NULL,

    CONSTRAINT "appointment_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "appointments_id_client_idx" ON "appointments"("id_client");

-- CreateIndex
CREATE INDEX "appointments_id_user_idx" ON "appointments"("id_user");

-- CreateIndex
CREATE INDEX "appointment_details_id_appointment_idx" ON "appointment_details"("id_appointment");

-- CreateIndex
CREATE INDEX "appointment_details_id_service_idx" ON "appointment_details"("id_service");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_details" ADD CONSTRAINT "appointment_details_id_appointment_fkey" FOREIGN KEY ("id_appointment") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment_details" ADD CONSTRAINT "appointment_details_id_service_fkey" FOREIGN KEY ("id_service") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
