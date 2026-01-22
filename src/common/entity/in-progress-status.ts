import { AppointmentEntity } from "./appointment";
import { AppointmentStatus } from "./appointment-status";
import { AttendedStatus } from "./attended-status";
import { CancelledStatus } from "./cancelled-status";
import { MissedStatus } from "./missed-status";

export class InProgressStatus implements AppointmentStatus {
    getStatus(): string {
        return 'IN_PROGRESS';
    }

    start(appointment: AppointmentEntity): void {
        throw new Error('Appointment already started');
    }

    attend(appointment: AppointmentEntity): void {
        appointment.setStatus(new AttendedStatus());
    }

    miss(appointment: AppointmentEntity): void {
        appointment.setStatus(new MissedStatus());
    }

    cancel(appointment: AppointmentEntity): void {
        appointment.setStatus(new CancelledStatus());
    }
}