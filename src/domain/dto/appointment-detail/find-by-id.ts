import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindAppointmentDetailByIdDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindAppointmentDetailByIdDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindAppointmentDetailByIdDTO(id)];
    }
}
