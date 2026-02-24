import { RecordStatus } from "../../../../generated/prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllStockMovementsByUserDTO {
    private constructor(
        public userId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllStockMovementsByUserDTO?] {
        const { userId } = object;

        if (!userId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new GetAllStockMovementsByUserDTO(userId)];
    }
}
