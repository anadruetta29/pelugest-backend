import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindStockProductByIdDTO {
    private constructor(
        public id: string
    ){}

    static create(object: { [key: string]: any }): [string?, FindStockProductByIdDTO?]  {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindStockProductByIdDTO(id)];
    }
}