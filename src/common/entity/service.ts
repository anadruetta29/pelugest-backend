import { RecordStatus } from '../../../generated/prisma/client';
import { RecordStatusEntity } from './record-status';
import { ServiceProductRequirementEntity } from './service-product-requirement';
export class ServiceEntity {
    private constructor(
        public id: string,
        public name: string,
        public description: string,
        public estimatedDurationMin: number,
        public basePrice: number,
        public serviceProductRequirementEntity: ServiceProductRequirementEntity,
        public status: RecordStatusEntity
    ) {}

    static fromObject(object: { [key: string]: any }): ServiceEntity {
        return new ServiceEntity(
            object.id,
            object.name,
            object.description,
            object.estimatedDurationMin,
            object.basePrice,
            object.serviceProductRequirementEntity,
            object.status
        );
    }
}
