import { AppointmentDetail as PrismaAppointmentDetail, Client, User, AppointmentDetail, Service, AppointmentStatusName } 
    from "@prisma/client";
import { AppointmentDetailEntity, AppointmentEntity, ClientEntity, UserEntity } from "../../common";

export type AppointmentDetailModel = PrismaAppointmentDetail & {
    service?: Service | null;
};

export class AppointmentEntityMapper {

    public static toDomain(appointmentDetailModel: AppointmentDetailModel | null): AppointmentDetailEntity | null {
        if (!appointmentDetailModel) return null;

        return AppointmentDetailEntity.fromObject({
            id: appointmentDetailModel.id,
            price: appointmentDetailModel.price,
            durationMin: appointmentDetailModel.durationMin,
            service: appointmentDetailModel.service
                ? {
                    id: appointmentDetailModel.service.id,
                    name: appointmentDetailModel.service.name,
                    price: appointmentDetailModel.service.basePrice,
                    duration: appointmentDetailModel.service.estimatedDurationMin
                }
                : null
        });
    }

    public static toModel(appointmentDetail: AppointmentDetailEntity | null): any {
        if (!appointmentDetail) return null;

        return {
            id: appointmentDetail.id,
            price: appointmentDetail.price,
            durationMin: appointmentDetail.durationMin,
            id_service: appointmentDetail.service?.id,
            id_appointment: appointmentDetail.appointmentId
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