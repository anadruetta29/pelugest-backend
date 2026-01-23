import { AppointmentEntity } from "./appointment";
import { AppointmentStatus } from "./appointment-status";

export class CancelledStatus implements AppointmentStatus {
    getStatus(): string {
        return 'CANCELLED';
    }

    start(appointment: AppointmentEntity): void {
        throw new Error('Cannot start: appointment cancelled');
    }

    attend(appointment: AppointmentEntity): void {
        throw new Error('Cannot attend: appointment cancelled');
    }

    miss(appointment: AppointmentEntity): void {
        throw new Error('Cannot miss: appointment cancelled');
    }

    cancel(appointment: AppointmentEntity): void {
        throw new Error('Appointment already cancelled');
    }
}