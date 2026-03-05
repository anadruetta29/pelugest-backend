import { prisma } from "../../app";
import { AppointmentStatusName } from "@prisma/client";
import { AppointmentEntity } from "../../common";
import { AppointmentEntityMapper, AppointmentModel } from "../mapper/appointment-entity-mapper";
import { AppointmentRepositoryI } from "../../domain/repository/appointment-repository-interface";

export class AppointmentRepository implements AppointmentRepositoryI {

    async findById(id: string): Promise<AppointmentEntity | null> {
        const model = await prisma.appointment.findUnique({
            where: { id },
            include: {
                client: true,
                hairdresser: true,
                details: {
                    include: { service: true }
                }
            }
        });

        return AppointmentEntityMapper.toDomain(model as AppointmentModel);
    }

    async save(appointment: AppointmentEntity, details: any[]): Promise<AppointmentEntity> {
        const model = AppointmentEntityMapper.toModel(appointment);

        const saved = await prisma.appointment.create({
            data: {
                id: model.id,
                startDateTime: model.startDateTime,
                estimatedEndDateTime: model.estimatedEndDateTime,
                status: model.status as AppointmentStatusName,
                client: { connect: { id: model.id_client } },
                hairdresser: { connect: { id: model.id_user } },
                // Crea los detalles al mismo tiempo
                details: {
                    create: details.map(d => ({
                        id: d.id,
                        price: d.price,
                        durationMin: d.durationMin,
                        id_service: d.service.id,
                        id_record_status: d.status.id
                    }))
                }
            },
            include: {
                client: true,
                hairdresser: true,
                details: { include: { service: true } }
            }
        });

        return AppointmentEntityMapper.toDomain(saved as AppointmentModel)!;
    }

    async update(appointment: AppointmentEntity): Promise<AppointmentEntity> {
        const model = AppointmentEntityMapper.toModel(appointment);

        const updated = await prisma.appointment.update({
            where: { id: model.id },
            data: {
                startDateTime: model.startDateTime,
                estimatedEndDateTime: model!.estimatedEndDateTime,
                status: model.status as AppointmentStatusName,
                id_client: model.id_client,
                id_user: model.id_user
            },
            include: {
                client: true,
                hairdresser: true,
                details: { include: { service: true } }
            }
        });

        return AppointmentEntityMapper.toDomain(updated as AppointmentModel)!;
    }

    async delete(id: string): Promise<void> {
        await prisma.appointment.delete({
            where: { id }
        });
    }

    async getAll(): Promise<AppointmentEntity[]> {
        const models = await prisma.appointment.findMany({
            include: {
                client: true,
                hairdresser: true,
                details: { include: { service: true } }
            },
            orderBy: { startDateTime: "asc" }
        });

        return AppointmentEntityMapper.toDomainList(models as AppointmentModel[]);
    }

    async getAllByStatus(status: AppointmentStatusName): Promise<AppointmentEntity[]> {
        const models = await prisma.appointment.findMany({
            where: { status },
            include: {
                client: true,
                hairdresser: true,
                details: { include: { service: true } }
            },
            orderBy: { startDateTime: "asc" }
        });

        return AppointmentEntityMapper.toDomainList(models as AppointmentModel[]);
    }

    async search(params: { clientId?: string; hairdresserId?: string; skip: number; take: number }) {
        const { clientId, hairdresserId, skip, take } = params;

        const where: any = {};

        if (clientId) {
            where.id_client = clientId;
        }

        if (hairdresserId) {
            where.id_user = hairdresserId;
        }

        const [models, total] = await prisma.$transaction([
            prisma.appointment.findMany({
                where,
                skip,
                take,
                include: {
                    client: true,
                    hairdresser: true,
                    details: { include: { service: true } }
                },
                orderBy: { startDateTime: "asc" }
            }),
            prisma.appointment.count({ where })
        ]);

        return {
            data: AppointmentEntityMapper.toDomainList(models as AppointmentModel[]),
            total
        };
    }
}