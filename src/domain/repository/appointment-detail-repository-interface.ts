import { AppointmentDetailEntity } from "../../common";

export interface AppointmentDetailRepositoryI {

    findById(id: string): Promise<AppointmentDetailEntity | null>;

    save(detail: AppointmentDetailEntity): Promise<AppointmentDetailEntity>;

    update(detail: AppointmentDetailEntity): Promise<AppointmentDetailEntity>;

    delete(id: string): Promise<void>;

    findByAppointmentId(appointmentId: string): Promise<AppointmentDetailEntity[]>;
}