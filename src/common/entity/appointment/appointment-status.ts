import { AppointmentEntity } from "./appointment";

export interface AppointmentStatus {
    start(appointment: AppointmentEntity): void;
    attend(appointment: AppointmentEntity): void;
    miss(appointment: AppointmentEntity): void;
    cancel(appointment: AppointmentEntity): void;
    getStatus(): string;
}
