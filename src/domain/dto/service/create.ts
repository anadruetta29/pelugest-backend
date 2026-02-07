import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateServiceDTO {
    private constructor(
        public name: string,
        public description: string,
        public estimatedDurationMin: number,
        public basePrice: number
    ){}

    static create(object: { [key: string]: any }): [string?, CreateServiceDTO?]  {
        const { name, description, estimatedDurationMin, basePrice } = object;

        if (!name || !description || !estimatedDurationMin || !basePrice) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        if (typeof basePrice !== "number" || basePrice <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        if (typeof estimatedDurationMin !== "number" || estimatedDurationMin <= 0) {
            throw new ErrorHandler(ErrorTypeName.INVALID_FIELD);
        }

        return [undefined, new CreateServiceDTO(name, description, estimatedDurationMin, basePrice)];
    }
}