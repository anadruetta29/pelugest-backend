import { AppointmentStatus } from "./appointment-status";
import { AttendedStatus } from "./states/attended-status";
import { CancelledStatus } from "./states/cancelled-status";
import { InProgressStatus } from "./states/in-progress-status";
import { MissedStatus } from "./states/missed-status";
import { ReservedStatus } from "./states/reserved-status";

export class AppointmentStateFactory {

    static create(status: string): AppointmentStatus {

        switch (status) {
            case "RESERVED":
                return new ReservedStatus();

            case "IN_PROGRESS":
                return new InProgressStatus();

            case "ATTENDED":
                return new AttendedStatus();

            case "MISSED":
                return new MissedStatus();

            case "CANCELLED":
                return new CancelledStatus();

            default:
                throw new Error("Invalid appointment status");
        }
    }
}