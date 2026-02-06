import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindRecordStatusByNameDTO {
    private constructor(
        public name: string
    ){}

    static create(object: { [key: string]: any }): [string?, FindRecordStatusByNameDTO?]  {
        const { name } = object;

        if (!name) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindRecordStatusByNameDTO(name)];
    }
}