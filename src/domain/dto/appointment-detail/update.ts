import { ServiceEntity } from './../../../common/entity/service';
import { ErrorHandler, ErrorTypeName, RecordStatusEntity } from "../../../common";

export class UpdateAppointmentDetailDTO {

    private constructor(
        public id: string,
        public price: number,
        public durationMin: number,
        public service: ServiceEntity,
        public appointmentId: string,
        public status: RecordStatusEntity,
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateAppointmentDetailDTO?] {

        const { id, price, durationMin, serviceId, appointmentId, status } = object;

        if (
            !id ||
            price === undefined ||
            durationMin === undefined ||
            !serviceId ||
            !appointmentId ||
            !status
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
                appointmentId,
                status
            )
        ];
    }
}