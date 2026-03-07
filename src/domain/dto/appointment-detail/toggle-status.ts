import { ErrorHandler, ErrorTypeName } from "../../../common";

export class ToggleAppointmentDetailStatusDTO {

    private constructor(
        public appointmentDetailId: string,
        public recordStatusId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, ToggleAppointmentDetailStatusDTO?] {

        const { appointmentDetailId, recordStatusId } = object;

        if (!appointmentDetailId || !recordStatusId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new ToggleAppointmentDetailStatusDTO(
                appointmentDetailId,
                recordStatusId
            )
        ];
    }
}