import { ErrorHandler, ErrorTypeName } from "../../../common";

export class UpdateClientDTO {
    private constructor(
        public id: string,
        public name: string,
        public surname: string,
        public mobilePhoneNumber: string,
        public landlinePhoneNumber: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateClientDTO?] {
        const { id, name, surname, mobilePhoneNumber, landlinePhoneNumber } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

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

        return [undefined, new UpdateClientDTO(id, name, surname, mobilePhoneNumber, landlinePhoneNumber)];
    }
}
