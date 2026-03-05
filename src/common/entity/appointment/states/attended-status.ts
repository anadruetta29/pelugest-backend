import { AppointmentStatus } from "../appointment-status";
import { AppointmentEntity } from "../appointment";
import { ErrorHandler } from "../../../errors/ErrorHandler";
import { ErrorTypeName } from "../../../errors/ErrorType";

export class AttendedStatus implements AppointmentStatus {
    getStatus(): string {
        return 'ATTENDED';
    }

    start(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_ATTENDED);
    }

    attend(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_ATTENDED);
    }

    miss(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_ATTENDED);
    }

    cancel(appointment: AppointmentEntity): void {
        throw new ErrorHandler(ErrorTypeName.APPOINTMENT_ALREADY_ATTENDED);
    }

    canBeModified(): boolean {
        return false;
    }

    toJSON() {
        return { name: this.getStatus() };
    }
}