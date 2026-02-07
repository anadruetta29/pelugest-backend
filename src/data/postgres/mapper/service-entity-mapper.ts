import { Service, RecordStatus } from "@prisma/client";
import { ServiceEntity } from "../../../common";
import { RecordStatusEntity } from "../../../common/entity/record-status";

export type ServiceModel = Service & {
  	status?: RecordStatus | null;
};

export class ServiceEntityMapper {

	public static toDomain(serviceModel: ServiceModel | null): ServiceEntity | null {
		if (!serviceModel) return null;

		return ServiceEntity.fromObject({
			id: serviceModel.id,
			name: serviceModel.name,
			description: serviceModel.description,
			estimatedDurationMin: serviceModel.estimatedDurationMin,
			basePrice: serviceModel.basePrice,
			status: serviceModel.status
				? RecordStatusEntity.fromObject({
					id: serviceModel.status.id,
					name: serviceModel.status.name
				})
				: null
		});
  	}

	public static toModel(service: ServiceEntity | null): any {
		if (!service) return null;

	return {
			id: service.id,
			name: service.name,
			description: service.description,
			estimatedDurationMin: service.estimatedDurationMin,
			basePrice: service.basePrice,
			id_record_status: service.status?.id
		};
	}

	public static toDomainList(serviceModels: ServiceModel[] | null | undefined): ServiceEntity[] {
		if (!serviceModels) return [];

		return serviceModels
		.map(this.toDomain)
		.filter((service): service is ServiceEntity => service !== null);
	}
}
