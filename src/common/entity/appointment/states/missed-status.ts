import { AppointmentStatus } from "../appointment-status";
import { AppointmentEntity } from "../appointment";

export class MissedStatus implements AppointmentStatus {
    getStatus(): string {
        return 'MISSED';
    }

    start(appointment: AppointmentEntity): void {
        throw new Error('Cannot start: appointment missed');
    }

    attend(appointment: AppointmentEntity): void {
        throw new Error('Cannot attend: appointment missed');
    }

    miss(appointment: AppointmentEntity): void {
        throw new Error('Appointment already missed');
    }

    cancel(appointment: AppointmentEntity): void {
        throw new Error('Cannot cancel: appointment missed');
    }
}
