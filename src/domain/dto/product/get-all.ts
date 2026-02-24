import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllProductsDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllProductsDTO?] {
        return [undefined, new GetAllProductsDTO()];
    }
}
