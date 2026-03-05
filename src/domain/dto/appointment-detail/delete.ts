import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteAppointmentDetailDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteAppointmentDetailDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteAppointmentDetailDTO(id)];
    }
}
