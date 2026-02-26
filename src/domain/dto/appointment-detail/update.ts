import { ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateAppointmentDetailDTO {

    private constructor(
        public id: string,
        public price: number,
        public durationMin: number,
        public serviceId: string,
        public appointmentId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateAppointmentDetailDTO?] {

        const { id, price, durationMin, serviceId, appointmentId } = object;

        if (
            !id ||
            price === undefined ||
            durationMin === undefined ||
            !serviceId ||
            !appointmentId
        ) {
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
            new UpdateAppointmentDetailDTO(
                id,
                parsedPrice,
                parsedDuration,
                serviceId,
                appointmentId
            )
        ];
    }
}