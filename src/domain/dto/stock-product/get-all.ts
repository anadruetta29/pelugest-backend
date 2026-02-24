import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllStockProductsDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllStockProductsDTO?] {
        return [undefined, new GetAllStockProductsDTO()];
    }
}
