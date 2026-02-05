import { prisma } from "../../../app"; 
import { ClientEntity } from "../../../common";
import { UserEntity } from "../../../common/entity/user";
import { ClientEntityMapper } from "../mapper/client-entity-mapper";
import { UserEntityMapper } from "../mapper/user-entity-mapper";

export class ClientPostgresRepository {
    
    async create(clientEntity: ClientEntity): Promise<ClientEntity | null> {

        const data = ClientEntityMapper.toModel(clientEntity);

        const clientModel = await prisma.client.create({
            data: {
                id: data.id,
                name: data.name,
                surname: data.surname,
                mobilePhoneNumber: data.mobilePhoneNumber,
                landlinePhoneNumber: data.landlinePhoneNumber,
                status: {
                    connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
        });

        return ClientEntityMapper.toDomain(clientModel);
    }

    async update(clientEntity: ClientEntity): Promise<ClientEntity | null> {
        const data = ClientEntityMapper.toModel(clientEntity);

        const clientModel = await prisma.client.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                surname: data.surname,
                mobilePhoneNumber: data.mobilePhoneNumber,
                landlinePhoneNumber: data.landlinePhoneNumber,
                status: {
                    connect: { id: data.id_record_status }
                }
            },
            include: {
                status: true
            }
        });

        return ClientEntityMapper.toDomain(clientModel);
    }

    async delete(id: string): Promise<ClientEntity | null> {
        const clientModel = await prisma.client.update({
            where: { id },
            data: {
                status: {
                    connect: { id: 'DELETED' } 
                }
            },
            include: {
                status: true
            }
        });

        return ClientEntityMapper.toDomain(clientModel);
    }

    async findById(id: string): Promise<ClientEntity | null> {
        const clientModel = await prisma.client.findUnique({
            where: { id },
            include: { 
                status: true 
            }
        });
    
        return ClientEntityMapper.toDomain(clientModel);
    }

}