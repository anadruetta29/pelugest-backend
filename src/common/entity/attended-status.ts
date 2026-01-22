import { AppointmentEntity } from "./appointment";
import { AppointmentStatus } from "./appointment-status";

export class AttendedStatus implements AppointmentStatus {
    getStatus(): string {
        return 'ATTENDED';
    }

    start(appointment: AppointmentEntity): void {
        throw new Error('Appointment already attended');
    }

    attend(appointment: AppointmentEntity): void {
        throw new Error('Appointment already attended');
    }

    miss(appointment: AppointmentEntity): void {
        throw new Error('Appointment already attended');
    }

    cancel(appointment: AppointmentEntity): void {
        throw new Error('Cannot cancel: appointment already attended');
    }
}