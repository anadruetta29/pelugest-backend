import { AppointmentStatus } from "../appointment-status";
import { AppointmentEntity } from "../appointment";
import { ErrorHandler } from "../../../errors/ErrorHandler";
import { ErrorTypeName } from "../../../errors/ErrorType";

export class CancelledStatus implements AppointmentStatus {
    getStatus(): string {
        return 'CANCELLED';
    }

    start(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_CANCELLED);
    }

    attend(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_CANCELLED);
    }

    miss(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_CANCELLED);
    }

    cancel(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_CANCELLED);
    }
}