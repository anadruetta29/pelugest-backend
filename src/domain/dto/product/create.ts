import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateProductDTO {
    private constructor(
        public name: string,
        public price: number
    ){}

    static create(object: { [key: string]: any }): [string?, CreateProductDTO?]  {
        const { name, price } = object;

        if (!name || !price) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (typeof price !== "number" || price <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [undefined, new CreateProductDTO(name, price)];
    }
}