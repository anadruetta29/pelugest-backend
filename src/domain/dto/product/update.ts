import { ErrorHandler, ErrorTypeName, RecordStatusEntity } from "../../../common";

export class UpdateProductDTO {
    private constructor(
        public id: string,
        public name: string,
        public price: number,
        public status: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateProductDTO?] {
        const {
            id,
            name,
            price,
            status
        } = object;

        if (!id || !name || !price || !status) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (typeof price !== "number" || price <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [undefined, new UpdateProductDTO(id, name, price, status)];
    }
}
