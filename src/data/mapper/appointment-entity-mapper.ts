import { Appointment as PrismaAppointment, Client, User, AppointmentDetail, Service, AppointmentStatusName } 
    from "@prisma/client";
import { AppointmentEntity, ClientEntity, UserEntity } from "../../common";
import { ClientEntityMapper } from "./client-entity-mapper";
import { UserEntityMapper } from "./user-entity-mapper";

export type AppointmentModel = PrismaAppointment & {
    client?: Client | null;
    hairdresser?: User | null;
    details?: (AppointmentDetail & {
        service?: Service | null;
    })[];
};

export class AppointmentEntityMapper {

    public static toDomain(appointmentModel: AppointmentModel | null): AppointmentEntity | null {
        if (!appointmentModel) return null;

        return AppointmentEntity.fromObject({
            id: appointmentModel.id,
            startDateTime: appointmentModel.startDateTime,
            estimatedEndDateTime: appointmentModel.estimatedEndDateTime,
            status: appointmentModel.status, 
            client: appointmentModel.client
                ? ClientEntity.fromObject({
                    id: appointmentModel.client.id,
                    name: appointmentModel.client.name
                })
                : null,
            hairdresser: appointmentModel.hairdresser
                ? UserEntity.fromObject({
                    id: appointmentModel.hairdresser.id,
                    name: appointmentModel.hairdresser.name
                })
                : null
        })
    }

    public static toModel(appointment: AppointmentEntity | null): any {
        if (!appointment) return null;

        return {
            id: appointment.id,
            startDateTime: appointment.startDateTime,
            estimatedEndDateTime: appointment.estimatedEndDateTime,
            status: appointment.getStatus() as AppointmentStatusName,
            id_client: appointment.client.id,
            id_user: appointment.hairdresser.id
        };
    }

    public static toDomainList(
        appointmentModels: AppointmentModel[] | null | undefined
    ): AppointmentEntity[] {
        if (!appointmentModels) return [];

        return appointmentModels
        .map(model => this.toDomain(model))
        .filter((appointment): appointment is AppointmentEntity => appointment !== null);
    }
}