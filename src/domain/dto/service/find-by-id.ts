import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindServiceByIdDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindServiceByIdDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindServiceByIdDTO(id)];
    }
}
