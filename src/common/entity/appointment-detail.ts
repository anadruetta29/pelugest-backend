import { Service } from "@prisma/client";
import { RecordStatusEntity } from "./record-status";

export class AppointmentDetailEntity {

    private constructor(
        public id: string,
        public price: number,
        public durationMin: number,
        public appointmentId: string,
        public service: {
            id: string;
            name: string;
            price: number;
            durationMin: number;
        } | null,
        public status: RecordStatusEntity
    ) {}

    static fromObject(object: { [key: string]: any }): AppointmentDetailEntity {
        return new AppointmentDetailEntity(
            object.id,
            object.price,
            object.durationMin,
            object.appointmentId,
            object.service ?? null,
            object.status
        );
    }
}