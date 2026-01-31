import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateClientDTO {
    private constructor(
        public name: string,
        public surname: string,
        public mobilePhoneNumber: string,
        public landlinePhoneNumber: string
    ){}

    static create(object: { [key: string]: any }): [string?, CreateClientDTO?]  {
        const { name, surname, mobilePhoneNumber, landlinePhoneNumber } = object;

        if (!name || !surname || !mobilePhoneNumber) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new CreateClientDTO(name, surname, mobilePhoneNumber, landlinePhoneNumber)];
    }
}