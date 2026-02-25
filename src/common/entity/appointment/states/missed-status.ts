import { AppointmentStatus } from "../appointment-status";
import { AppointmentEntity } from "../appointment";
import { ErrorTypeName } from "../../../errors/ErrorType";
import { ErrorHandler } from "../../../errors/ErrorHandler";

export class MissedStatus implements AppointmentStatus {
    getStatus(): string {
        return 'MISSED';
    }

    start(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_MISSED);
    }

    attend(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_MISSED);
    }

    miss(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_MISSED);
    }

    cancel(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_MISSED);
    }
}
