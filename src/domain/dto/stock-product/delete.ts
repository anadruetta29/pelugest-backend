import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteStockProductDTO {
    
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteStockProductDTO?] {

        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteStockProductDTO(id)];
    }
}