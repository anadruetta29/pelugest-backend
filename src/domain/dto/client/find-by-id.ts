import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindClientByIdDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindClientByIdDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindClientByIdDTO(id)];
    }
}
