import { Service } from "@prisma/client";

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
        } | null
    ) {}

    static fromObject(object: { [key: string]: any }): AppointmentDetailEntity {

        if (!object.id) {
            throw new Error("AppointmentDetail id is required");
        }

        if (object.price == null) {
            throw new Error("AppointmentDetail price is required");
        }

        if (object.durationMin == null) {
            throw new Error("AppointmentDetail durationMin is required");
        }

        if (!object.appointmentId) {
            throw new Error("AppointmentDetail appointmentId is required");
        }

        return new AppointmentDetailEntity(
            object.id,
            object.price,
            object.durationMin,
            object.appointmentId,
            object.service ?? null
        );
    }
}