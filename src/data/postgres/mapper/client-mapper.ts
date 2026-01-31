import { RecordStatusEntity } from "../../../common/entity/record-status";
import { ClientEntity } from "../../../common";
import { Client as PrismaClient, RecordStatus } from "@prisma/client";

export type ClientModel = PrismaClient & {
    status?: RecordStatus | null;
};

export class ClientEntityMapper {

    public static toDomain(clientModel: ClientModel | null): ClientEntity | null {
        if (!clientModel) return null;

        return ClientEntity.fromObject({
            id: clientModel.id,
            name: clientModel.name,
            surname: clientModel.surname,
            mobilePhoneNumber: clientModel.mobilePhoneNumber,
            landlinePhoneNumber: clientModel.landlinePhoneNumber,
            status: clientModel.status
                ? RecordStatusEntity.fromObject({
                    id: clientModel.status.id,
                    name: clientModel.status.name
                })
                : null
        });
    }

    public static toModel(client: ClientEntity | null): any {
        if (!client) return null;

        return {
            id: client.id,
            name: client.name,
            surname: client.surname,
            mobilePhoneNumber: client.mobilePhoneNumber,
            landlinePhoneNumber: client.landlinePhoneNumber,
            id_record_status: client.status?.id,
        };
    }

    public static toDomainList(clientModels: ClientModel[] | null | undefined): ClientEntity[] {
        if (!clientModels) return [];

        return clientModels
            .map(model => this.toDomain(model)) 
            .filter((user): user is ClientEntity => user !== null); 
    }
}