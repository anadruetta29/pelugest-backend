import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateAppointmentDTO {

    private constructor(
        public startDateTime: Date,
        public estimatedEndDateTime: Date,
        public clientId: string,
        public hairdresserId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateAppointmentDTO?] {

        const { startDateTime, estimatedEndDateTime, clientId, hairdresserId } = object;

        if (!startDateTime || !estimatedEndDateTime || !clientId || !hairdresserId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        const start = new Date(startDateTime);
        const end = new Date(estimatedEndDateTime);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (end <= start) {
            throw new ErrorHandler(ErrorTypeName.INVALID_DATE_RANGE);
        }

        return [
            undefined,
            new CreateAppointmentDTO(
                start,
                end,
                clientId,
                hairdresserId
            )
        ];
    }
}