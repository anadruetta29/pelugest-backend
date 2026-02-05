import { ErrorHandler, ErrorTypeName } from "../../../common";

export class CreateServicetDTO {
    private constructor(
        public name: string,
        public description: string,
        public estimatedDurationMin: number,
        public basePrice: number
    ){}

    static create(object: { [key: string]: any }): [string?, CreateServicetDTO?]  {
        const { name, description, estimatedDurationMin, basePrice } = object;

        if (!name || !description || !estimatedDurationMin || !basePrice) {
            throw new ErrorHandler(ErrorTypeName.MISSING_REQUIRED_FIELDS);
        }

        return [undefined, new CreateServicetDTO(name, description, estimatedDurationMin, basePrice)];
    }
}