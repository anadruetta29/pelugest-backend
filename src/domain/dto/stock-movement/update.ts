import { ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateStockMovementDTO {

    private constructor(
        public id: string,
        public quantityMl: number,
        public type: string,
        public productId: string,
        public userId: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateStockMovementDTO?] {

        const { id, quantityMl, type, productId, userId, status } = object;

        if (!id || !quantityMl || !type || !productId || !userId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new UpdateStockMovementDTO(
                id,
                quantityMl,
                type,
                productId,
                userId,
            )
        ];
    }
}