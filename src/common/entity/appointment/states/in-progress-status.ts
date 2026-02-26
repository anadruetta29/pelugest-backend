import { ErrorHandler } from "../../../errors/ErrorHandler";
import { ErrorTypeName } from "../../../errors/ErrorType";
import { AppointmentEntity } from "../appointment";
import { AppointmentStatus } from "../appointment-status";
import { AttendedStatus } from "./attended-status";
import { MissedStatus } from "./missed-status";

export class InProgressStatus implements AppointmentStatus {

    getStatus(): string {
        return 'IN_PROGRESS';
    }

    start(): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_STARTED);
    }

    attend(appointment: AppointmentEntity): void {
        appointment.changeState(new AttendedStatus());
    }

    miss(appointment: AppointmentEntity): void {
        appointment.changeState(new MissedStatus());
    }

    cancel(): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_IN_PROGRESS);
    }

    canBeModified(): boolean {
        return false;
    }
}