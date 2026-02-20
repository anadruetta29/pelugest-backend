import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateStockProductDTO {

     private constructor(
        public currentAmountMl: number,
        public minimumStockMl: number,
        public productId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateStockProductDTO?] {

        const { currentAmountMl, minimumStockMl, productId } = object;

        if (!currentAmountMl || !minimumStockMl || !productId ) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new CreateStockProductDTO(
                currentAmountMl,
                minimumStockMl,
                productId
            )
        ];
    }
}