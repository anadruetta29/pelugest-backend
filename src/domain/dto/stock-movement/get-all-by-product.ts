import { RecordStatus } from "../../../../generated/prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllStockMovementsByProductDTO {
    private constructor(
        public productId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllStockMovementsByProductDTO?] {
        const { productId } = object;

        if (!productId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new GetAllStockMovementsByProductDTO(productId)];
    }
}
