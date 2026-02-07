import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeactivateClientDTO {
    private constructor(
        public readonly id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeactivateClientDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeactivateClientDTO(id)];
    }
}
