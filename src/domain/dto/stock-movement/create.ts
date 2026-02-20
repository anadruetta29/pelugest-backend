import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateStockMovementDTO {

    private constructor(
        public quantityMl: number,
        public type: string,
        public productId: string,
        public userId: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateStockMovementDTO?] {

        const { quantityMl, type, productId, userId } = object;

        if (!quantityMl || !type || !productId || !userId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new CreateStockMovementDTO(
                quantityMl,
                type,
                productId,
                userId
            )
        ];
    }
}