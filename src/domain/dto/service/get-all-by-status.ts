import { RecordStatus } from "../../../../generated/prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllByStatusDTO {
    private constructor(
        public statusId: string
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllByStatusDTO?] {
        const { statusId } = object;

        if (!statusId) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new GetAllByStatusDTO(statusId)];
    }
}
