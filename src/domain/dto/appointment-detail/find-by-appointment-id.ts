import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindAppointmentDetailsByAppointmentIdDTO {

    private constructor(
        public appointmentId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindAppointmentDetailsByAppointmentIdDTO?] {

        const { appointmentId } = object;

        if (!appointmentId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (typeof appointmentId !== "string") {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [
            undefined,
            new FindAppointmentDetailsByAppointmentIdDTO(appointmentId)
        ];
    }
}