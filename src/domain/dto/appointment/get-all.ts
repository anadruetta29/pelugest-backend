import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllAppointmentsDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllAppointmentsDTO?] {
        return [undefined, new GetAllAppointmentsDTO()];
    }
}
