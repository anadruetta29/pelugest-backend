import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindStockProductByProductDTO {

    private constructor(
        public productId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindStockProductByProductDTO?] {

        const { productId } = object;

        if (!productId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new FindStockProductByProductDTO(productId)
        ];
    }
}