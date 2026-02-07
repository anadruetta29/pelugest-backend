import { prisma } from "../../../app";
import { ServiceEntity } from "../../../common";
import { ServiceEntityMapper } from "../mapper/service-entity-mapper";

export class ServicePostgresRepository {

    async create(serviceEntity: ServiceEntity): Promise<ServiceEntity | null> {

        const data = ServiceEntityMapper.toModel(serviceEntity);

        const serviceModel = await prisma.service.create({
            data: {
                id: data.id,
                name: data.name,
                description: data.description,
                estimatedDurationMin: data.estimatedDurationMin,
                basePrice: data.basePrice,
                status: {
                connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
        });

        return ServiceEntityMapper.toDomain(serviceModel);
    }

    async update(serviceEntity: ServiceEntity): Promise<ServiceEntity | null> {
        const data = ServiceEntityMapper.toModel(serviceEntity);

        const serviceModel = await prisma.service.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                description: data.description,
                estimatedDurationMin: data.estimatedDurationMin,
                basePrice: data.basePrice,
                status: {
                connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
            });

        return ServiceEntityMapper.toDomain(serviceModel);
    }

    async delete(id: string): Promise<ServiceEntity | null> {
        const serviceModel = await prisma.service.update({
            where: { id },
            data: {
                status: {
                connect: { id: "DELETED" }
                }
            },
            include: {
                status: true
            }
        });

            return ServiceEntityMapper.toDomain(serviceModel);
    }

    async findById(id: string): Promise<ServiceEntity | null> {
            const serviceModel = await prisma.service.findUnique({
                where: { id },
                include: {
                    status: true
                }
            });

            return ServiceEntityMapper.toDomain(serviceModel);
    }

    async findAll(): Promise<ServiceEntity[]> {
        const serviceModels = await prisma.service.findMany({
            include: {
                status: true
            }
        });

        return ServiceEntityMapper.toDomainList(serviceModels);
    }
}
