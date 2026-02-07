import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllServicesDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllServicesDTO?] {
        return [undefined, new GetAllServicesDTO()];
    }
}
