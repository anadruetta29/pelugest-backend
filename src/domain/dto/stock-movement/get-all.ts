import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllStockMovementsDTO {
    private constructor() {}

    static create(_: { [key: string]: any } = {}): [string?, GetAllStockMovementsDTO?] {
        return [undefined, new GetAllStockMovementsDTO()];
    }
}
