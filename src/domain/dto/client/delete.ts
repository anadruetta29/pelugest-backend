import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteClientDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteClientDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteClientDTO(id)];
    }
}
