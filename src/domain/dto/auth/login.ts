import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";

export class LoginUserDTO {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
        const { email, password } = object;

        if (!email) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!password) { 
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new LoginUserDTO(email, password)];
    }
}