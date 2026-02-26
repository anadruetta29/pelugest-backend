import { prisma } from "../../app";
import { AppointmentDetailEntity } from "../../common";
import { AppointmentDetailRepositoryI } from "../../domain/repository/appointment-detail-repository-interface";
import { AppointmentDetailEntityMapper, AppointmentDetailModel } from "../mapper/appointment-detail-entity-mapper";

export class AppointmentDetailRepository implements AppointmentDetailRepositoryI {

    async findById(id: string): Promise<AppointmentDetailEntity | null> {
        const model = await prisma.appointmentDetail.findUnique({
            where: { id },
            include: {
                service: true
            }
        });

        return AppointmentDetailEntityMapper.toDomain(
            model as AppointmentDetailModel
        );
    }

    async save(detail: AppointmentDetailEntity): Promise<AppointmentDetailEntity> {
        const model = AppointmentDetailEntityMapper.toModel(detail);

        const saved = await prisma.appointmentDetail.create({
            data: {
                id: model.id,
                price: model.price,
                durationMin: model.durationMin,
                service: {
                    connect: { id: model.id_service }
                },
                appointment: {
                    connect: { id: model.id_appointment }
                }
            },
            include: {
                service: true
            }
        });

        return AppointmentDetailEntityMapper.toDomain(
            saved as AppointmentDetailModel
        )!;
    }

    async update(detail: AppointmentDetailEntity): Promise<AppointmentDetailEntity> {
        const model = AppointmentDetailEntityMapper.toModel(detail);

        const updated = await prisma.appointmentDetail.update({
            where: { id: model.id },
            data: {
                price: model.price,
                durationMin: model.durationMin,
                id_service: model.id_service,
                id_appointment: model.id_appointment
            },
            include: {
                service: true
            }
        });

        return AppointmentDetailEntityMapper.toDomain(
            updated as AppointmentDetailModel
        )!;
    }

    async delete(id: string): Promise<void> {
        await prisma.appointmentDetail.delete({
            where: { id }
        });
    }

    async findByAppointmentId(appointmentId: string): Promise<AppointmentDetailEntity[]> {
        const models = await prisma.appointmentDetail.findMany({
            where: { id_appointment: appointmentId },
            include: {
                service: true
            }
        });

        return AppointmentDetailEntityMapper.toDomainList(
            models as AppointmentDetailModel[]
        );
    }
}