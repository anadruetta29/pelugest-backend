import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindProductByIdDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, FindProductByIdDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindProductByIdDTO(id)];
    }
}
