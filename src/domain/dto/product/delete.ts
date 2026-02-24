import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteProductDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteProductDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteProductDTO(id)];
    }
}
