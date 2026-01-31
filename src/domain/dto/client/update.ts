import { ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateClientDTO {
    private constructor(
        public name: string,
        public surname: string,
        public mobilePhoneNumber: string,
        public landlinePhoneNumber: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateClientDTO?] {
        const { name, surname, mobilePhoneNumber, landlinePhoneNumber } = object;

        if (!name) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!surname) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!mobilePhoneNumber) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (!landlinePhoneNumber) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new UpdateClientDTO(name, surname, mobilePhoneNumber, landlinePhoneNumber)];
    }
}
