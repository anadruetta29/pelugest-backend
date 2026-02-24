import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteStockMovementDTO {
    
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteStockMovementDTO?] {

        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteStockMovementDTO(id)];
    }
}