import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllClientsDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllClientsDTO?] {
        return [undefined, new GetAllClientsDTO()];
    }
}
