import { AppointmentEntity } from "./appointment";
import { AppointmentStatus } from "./appointment-status";
import { CancelledStatus } from "./cancelled-status";
import { InProgressStatus } from "./in-progress-status";

export class ReservedStatus implements AppointmentStatus {
    getStatus(): string {
        return 'RESERVED';
    }

    start(appointment: AppointmentEntity): void {
        appointment.setStatus(new InProgressStatus());
    }

    attend(appointment: AppointmentEntity): void {
        throw new Error('Cannot attend: appointment not started');
    }

    miss(appointment: AppointmentEntity): void {
        throw new Error('Cannot miss: appointment not started');
    }

    cancel(appointment: AppointmentEntity): void {
        appointment.setStatus(new CancelledStatus());
    }
}