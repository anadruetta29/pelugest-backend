import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateAppointmentDetailDTO {

    private constructor(
        public price: number,
        public durationMin: number,
        public serviceId: string,
        public appointmentId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateAppointmentDetailDTO?] {

        const { price, durationMin, serviceId, appointmentId } = object;

        if ( !price || !durationMin || !serviceId || !appointmentId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        const parsedPrice = Number(price);
        const parsedDuration = Number(durationMin);

        if (isNaN(parsedPrice) || parsedPrice < 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (isNaN(parsedDuration) || parsedDuration <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [
            undefined,
            new CreateAppointmentDetailDTO(
                parsedPrice,
                parsedDuration,
                serviceId,
                appointmentId
            )
        ];
    }
}