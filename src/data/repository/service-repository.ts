import { Service } from '@prisma/client';
import { prisma } from "../../app";
import { ServiceEntity } from "../../common";
import { ServiceRepositoryI } from "../../domain/repository/service-repository-interface";
import { ServiceEntityMapper, ServiceModel } from "../postgres/mapper/service-entity-mapper";

export class ServiceRepository implements ServiceRepositoryI {

    async findById(id: string): Promise<ServiceEntity | null> {
        const model = await prisma.service.findUnique({
            where: { id },
            include: { status: true }
        });

        return ServiceEntityMapper.toDomain(model as ServiceModel);
    }


    async save(client: ServiceEntity): Promise<ServiceEntity> {
        const model = ServiceEntityMapper.toModel(client);
        
        const saved = await prisma.service.create({
            data: {
                id: model.id,
                name: model.name,
                description: model.description,
                estimatedDurationMin: model.estimatedDurationMin,
                basePrice: model.basePrice,
                status: { connect: { id: model.id_record_status } }
            },
            include: { status: true }
        });

        return ServiceEntityMapper.toDomain(saved as ServiceModel)!;
    }

    async update(service: ServiceEntity): Promise<ServiceEntity> {
        const model = ServiceEntityMapper.toModel(service);
        
        const updated = await prisma.service.update({
            where: { id: model.id },
            data: {
                id: model.id,
                name: model.name,
                description: model.description,
                estimatedDurationMin: model.estimatedDurationMin,
                basePrice: model.basePrice,
                id_record_status: model.id_record_status
            },
            include: { status: true }
        });

        return ServiceEntityMapper.toDomain(updated as ServiceModel)!;
    }

    async delete(serviceId: string): Promise<void> {
        await prisma.service.delete({
            where: { id: serviceId }
        });
    }

    async getAll(): Promise<ServiceEntity[]> {
        const models = await prisma.service.findMany({
            include: { status: true }
        });

        return ServiceEntityMapper.toDomainList(models as ServiceModel[]);
    }


    async getAllByStatus(statusId: string): Promise<ServiceEntity[]> {
        const models = await prisma.service.findMany({
            where: { id_record_status: statusId },
            include: { status: true }
        });
        
        return ServiceEntityMapper.toDomainList(models as ServiceModel[]);
    }

}