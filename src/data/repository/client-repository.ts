import { Client } from './../../../node_modules/.prisma/client/index.d';
import { prisma } from "../../app";
import { ClientEntity } from "../../common";
import { ClientEntityMapper, ClientModel } from "../postgres/mapper/client-entity-mapper";
import { ClientRepositoryI } from '../../domain/repository/client-respository-interface';

export class ClientRepository implements ClientRepositoryI {

    async findById(id: string): Promise<ClientEntity | null> {
        const model = await prisma.client.findUnique({
            where: { id },
            include: { status: true }
        });

        return ClientEntityMapper.toDomain(model as ClientModel);
    }


    async save(client: ClientEntity): Promise<ClientEntity> {
        const model = ClientEntityMapper.toModel(client);
        
        const saved = await prisma.client.create({
            data: {
                id: model.id,
                name: model.name,
                surname: model.surname,
                mobilePhoneNumber: model.mobilePhoneNumber,
                landlinePhoneNumber: model.landlinePhoneNumber,
                status: { connect: { id: model.id_record_status } }
            },
            include: { status: true }
        });

        return ClientEntityMapper.toDomain(saved as ClientModel)!;
    }

    async update(client: ClientEntity): Promise<ClientEntity> {
        const model = ClientEntityMapper.toModel(client);
        
        const updated = await prisma.client.update({
            where: { id: model.id },
            data: {
                name: model.name,
                surname: model.surname,
                mobilePhoneNumber: model.mobilePhoneNumber,
                landlinePhoneNumber: model.landlinePhoneNumber,
                id_record_status: model.id_record_status
            },
            include: { status: true }
        });

        return ClientEntityMapper.toDomain(updated as ClientModel)!;
    }

    async delete(clientId: string): Promise<void> {
        await prisma.client.delete({
            where: { id: clientId }
        });
    }

    async getAll(): Promise<ClientEntity[]> {
        const models = await prisma.client.findMany({
            include: { status: true }
        });

        return ClientEntityMapper.toDomainList(models as ClientModel[]);
    }

    async getAllByStatus(statusId: string): Promise<ClientEntity[]> {
        const models = await prisma.client.findMany({
            where: { id_record_status: statusId },
            include: { status: true }
        });
        
        return ClientEntityMapper.toDomainList(models as ClientModel[]);
    }

}