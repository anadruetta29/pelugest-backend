import { AppointmentDetailEntity, ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateAppointmentDTO {

    private constructor(
        public startDateTime: Date,
        public estimatedEndDateTime: Date,
        public clientId: string,
        public hairdresserId: string,
        public details: AppointmentDetailEntity[]
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateAppointmentDTO?] {

        const { startDateTime, estimatedEndDateTime, clientId, hairdresserId, details } = object;

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

        for (const detail of details) {

            if (!detail.serviceId || 
                detail.price === undefined || 
                detail.durationMin === undefined) {

                throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
            }

            if (detail.price < 0 || detail.durationMin <= 0) {
                throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
            }
        }


        return [
            undefined,
            new CreateAppointmentDTO(
                start,
                end,
                clientId,
                hairdresserId,
                details
            )
        ];
    }
}