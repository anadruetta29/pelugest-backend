import { ErrorHandler } from "../../../errors/ErrorHandler";
import { ErrorTypeName } from "../../../errors/ErrorType";
import { AppointmentEntity } from "../appointment";
import { AppointmentStatus } from "../appointment-status";
import { CancelledStatus } from "./cancelled-status";
import { InProgressStatus } from "./in-progress-status";
import { MissedStatus } from "./missed-status";

export class ReservedStatus implements AppointmentStatus {

    getStatus(): string {
        return 'RESERVED';
    }

    start(appointment: AppointmentEntity): void {
        appointment.changeState(new InProgressStatus());
    }

    attend(): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_NOT_STARTED);
    }

    miss(appointment: AppointmentEntity): void {
        appointment.changeState(new MissedStatus());
    }

    cancel(appointment: AppointmentEntity): void {
        appointment.changeState(new CancelledStatus());
    }
}