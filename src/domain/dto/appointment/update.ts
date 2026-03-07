import { AppointmentDetailEntity, ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateAppointmentDTO {

    private constructor(
        public id: string,
        public startDateTime: Date,
        public estimatedEndDateTime: Date,
        public clientId: string,
        public hairdresserId: string,
        public details: AppointmentDetailEntity[]
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateAppointmentDTO?] {

        const { id, startDateTime, estimatedEndDateTime, clientId, hairdresserId, details } = object;

        if ( !id || !startDateTime || !estimatedEndDateTime || !clientId || !hairdresserId) {
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
            new UpdateAppointmentDTO(
                id,
                start,
                end,
                clientId,
                hairdresserId,
                details
            )
        ];
    }
}