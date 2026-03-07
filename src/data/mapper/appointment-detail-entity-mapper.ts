import { AppointmentDetail as PrismaAppointmentDetail, Client, User, AppointmentDetail, Service, AppointmentStatusName, RecordStatus } 
    from "@prisma/client";
import { AppointmentDetailEntity, AppointmentEntity, ClientEntity, RecordStatusEntity, UserEntity } from "../../common";

export type AppointmentDetailModel = PrismaAppointmentDetail & {
    service?: Service | null;
    status?: RecordStatus | null;
};

export class AppointmentDetailEntityMapper {

    public static toDomain(appointmentDetailModel: AppointmentDetailModel | null): AppointmentDetailEntity | null {
        if (!appointmentDetailModel) return null;

        return AppointmentDetailEntity.fromObject({
            id: appointmentDetailModel.id,
            price: appointmentDetailModel.price,
            durationMin: appointmentDetailModel.durationMin,
            service: {
                id: appointmentDetailModel.id_service
            },
            status: appointmentDetailModel.status
                ? RecordStatusEntity.fromObject({
                    id: appointmentDetailModel.status.id,
                    name: appointmentDetailModel.status.name
                })
                : null
        });
    }

    public static toModel(appointmentDetail: AppointmentDetailEntity | null): any {
        if (!appointmentDetail) return null;

        return {
            id: appointmentDetail.id,
            price: appointmentDetail.price,
            durationMin: appointmentDetail.durationMin,
            id_service: appointmentDetail.service.id,
            id_appointment: appointmentDetail.appointmentId,
            id_record_status: appointmentDetail.status?.id,
        };
    }

    public static toDomainList(
        appointmentDetailModels: AppointmentDetailModel[] | null | undefined
    ): AppointmentDetailEntity[] {
        if (!appointmentDetailModels) return [];

        return appointmentDetailModels
        .map(model => this.toDomain(model))
        .filter((appointmentDetail): appointmentDetail is AppointmentDetailEntity => appointmentDetail !== null);
    }
}