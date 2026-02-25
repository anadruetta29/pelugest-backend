import { AppointmentEntity } from "../appointment";
import { AppointmentStatus } from "../appointment-status";
import { AttendedStatus } from "./attended-status";
import { MissedStatus } from "./missed-status";

export class InProgressStatus implements AppointmentStatus {

    getStatus(): string {
        return 'IN_PROGRESS';
    }

    start(): void {
        throw new Error('Appointment already started');
    }

    attend(appointment: AppointmentEntity): void {
        appointment.changeState(new AttendedStatus());
    }

    miss(appointment: AppointmentEntity): void {
        appointment.changeState(new MissedStatus());
    }

    cancel(): void {
        throw new Error('Cannot cancel an appointment that is in progress');
    }
}