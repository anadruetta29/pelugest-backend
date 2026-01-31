import { ErrorHandler, ErrorTypeName } from "../../../common";

export class FindByNameDTO {
    private constructor(
        public name: string
    ){}

    static create(object: { [key: string]: any }): [string?, FindByNameDTO?]  {
        const { name } = object;

        if (!name) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new FindByNameDTO(name)];
    }
}