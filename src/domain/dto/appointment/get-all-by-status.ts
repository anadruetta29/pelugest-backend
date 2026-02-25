import { AppointmentStatusName } from "@prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllAppointmentsByStatusDTO {

    private constructor(
        public status: AppointmentStatusName
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllAppointmentsByStatusDTO?] {

        const { status } = object;

        if (!status) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!Object.values(AppointmentStatusName).includes(status)) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [
            undefined,
            new GetAllAppointmentsByStatusDTO(status as AppointmentStatusName)
        ];
    }
}