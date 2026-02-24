import { ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateStockProductDTO {

    private constructor(
        public id: string,
        public currentAmountMl?: number,
        public minimumStockMl?: number
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateStockProductDTO?] {

        const { id, currentAmountMl, minimumStockMl } = object;

        if (!id || !currentAmountMl || !minimumStockMl) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new UpdateStockProductDTO(
                id,
                currentAmountMl,
                minimumStockMl
            )
        ];
    }
}