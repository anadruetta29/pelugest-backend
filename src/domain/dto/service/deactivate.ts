import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeactivateServiceDTO {
    private constructor(
        public readonly id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeactivateServiceDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeactivateServiceDTO(id)];
    }
}
