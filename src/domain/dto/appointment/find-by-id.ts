import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindAppointmentByIdDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindAppointmentByIdDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindAppointmentByIdDTO(id)];
    }
}
