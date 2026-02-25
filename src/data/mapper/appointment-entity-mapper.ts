import { Appointment as PrismaAppointment, Client, User, AppointmentDetail, Service, AppointmentStatusName } 
    from "@prisma/client";
import { AppointmentEntity } from "../../common";
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

    public static toDomain(model: AppointmentModel | null): AppointmentEntity | null {
        if (!model) return null;

        const client = ClientEntityMapper.toDomain(model.client ?? null);
        const hairdresser = UserEntityMapper.toDomain(model.hairdresser ?? null);

        if (!client || !hairdresser) {
        throw new Error("Invalid Appointment: client or hairdresser missing");
        }

        return AppointmentEntity.create({
        id: model.id,
        startDateTime: model.startDateTime,
        estimatedEndDateTime: model.estimatedEndDateTime,
        status: model.status, 
        client,
        hairdresser
        });
    }

    public static toModel(entity: AppointmentEntity | null): Partial<PrismaAppointment> | null {
        if (!entity) return null;

        return {
        id: entity.id,
        startDateTime: entity.startDateTime,
        estimatedEndDateTime: entity.estimatedEndDateTime,
        status: entity.getStatus() as AppointmentStatusName,
        id_client: entity.client.id,
        id_user: entity.hairdresser.id
        };
    }

    public static toDomainList(
        models: AppointmentModel[] | null | undefined
    ): AppointmentEntity[] {
        if (!models) return [];

        return models
        .map(model => this.toDomain(model))
        .filter((appointment): appointment is AppointmentEntity => appointment !== null);
    }
}