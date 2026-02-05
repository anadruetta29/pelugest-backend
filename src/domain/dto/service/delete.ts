import { ErrorHandler, ErrorTypeName } from "../../../common";

export class DeleteServiceDTO {
    private constructor(
        public id: string
    ) {}

    static create(object: { [key: string]: any }): [string?, DeleteServiceDTO?] {
        const { id } = object;

        if (!id) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new DeleteServiceDTO(id)];
    }
}
