import { ErrorHandler, ErrorTypeName } from "../../../common";

export class SearchProductDTO {

    private constructor(
        public name: string | undefined,
        public page: number,
        public limit: number
    ) {}

    get skip(): number {
        return (this.page - 1) * this.limit;
    }

    get take(): number {
        return this.limit;
    }

    static create(object: { [key: string]: any }): [string?, SearchProductDTO?] {

        const { name, page = 1, limit = 10 } = object;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (isNaN(pageNumber) || pageNumber <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PAGINATION);
        }

        if (isNaN(limitNumber) || limitNumber <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_PAGINATION);
        }

        return [
            undefined,
            new SearchProductDTO(
                name,
                pageNumber,
                limitNumber
            )
        ];
    }
}