import { ErrorHandler, ErrorTypeName } from "../../../common";
import { StockMovementEntity } from "../../../common/entity/stock-movement";
import { StockMovementTypeEntity } from "../../../common/entity/stock-movement-type";

export class CreateStockMovementDTO {

    private constructor(
        public quantityMl: number,
        public type: string,
        public productId: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateStockMovementDTO?] {

        const { quantityMl, type, productId } = object;

        if (!quantityMl || !type || !productId ) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new CreateStockMovementDTO(
                quantityMl,
                type,
                productId,
            )
        ];
    }
}