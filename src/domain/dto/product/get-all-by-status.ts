import { RecordStatus } from "../../../../generated/prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllProductsByStatusDTO {
    private constructor(
        public statusId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllProductsByStatusDTO?] {
        const { statusId } = object;

        if (!statusId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new GetAllProductsByStatusDTO(statusId)];
    }
}
