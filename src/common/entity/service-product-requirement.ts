export class ServiceProductRequirementEntity {
    private constructor(
        public id: string,
        public standardAmountMl: number
    ) {}

    static fromObject(object: { [key: string]: any }): ServiceProductRequirementEntity {
        return new ServiceProductRequirementEntity(
            object.id,
            object.standardAmountMl
        );
    }
}
