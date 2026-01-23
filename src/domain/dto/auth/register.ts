import { ErrorHandler } from "../../../common/errors/ErrorHandler";
import { ErrorTypeName } from "../../../common/errors/ErrorType";

export class RegisterUserDTO {
    private constructor(
        public readonly name: string,
        public readonly lastname: string,
        public readonly email: string,
        public readonly password: string,
    ) {}

    static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
        const { name, lastname, email, password } = object;

        if (!name) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!lastname) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }        
        
        if (!email) { 
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        } // TO DO: Regex for email


        if (!password) { 
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        } 

        if (password.length < 8) { 
            throw new ErrorHandler(ErrorTypeName.INVALID_PASSWORD);
        } // TO DO: Regex for password 

        return [undefined, new RegisterUserDTO(name, lastname, email, password)];
    }
}