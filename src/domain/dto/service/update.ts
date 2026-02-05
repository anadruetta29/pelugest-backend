import { ErrorHandler, ErrorTypeName, RecordStatusEntity } from "../../../common";

export class UpdateServiceDTO {
    private constructor(
        public id: string,
        public name: string,
        public description: string,
        public estimatedDurationMin: number,
        public basePrice: number,
        public status: string
    ) {}

    static create(object: { [key: string]: any }): [string?, UpdateServiceDTO?] {
        const {
            id,
            name,
            description,
            estimatedDurationMin,
            basePrice,
            status
        } = object;

        if (!id || !name || !estimatedDurationMin || !basePrice || !status) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (typeof basePrice !== "number" || basePrice <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (typeof estimatedDurationMin !== "number" || estimatedDurationMin <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [undefined, new UpdateServiceDTO(id, name, description, estimatedDurationMin, basePrice, status)];
    }
}
