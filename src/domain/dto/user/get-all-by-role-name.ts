import { Role } from "@prisma/client";
import { ErrorHandler, ErrorTypeName } from "../../../common";

export class GetAllUsersByRoleNameDTO {

    private constructor(
        public roleName: string
    ) {}

    static create(object: { [key: string]: any }): [string?, GetAllUsersByRoleNameDTO?] {

        const { roleName } = object;

        if (!roleName) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [
            undefined,
            new GetAllUsersByRoleNameDTO(roleName)
        ];
    }
}