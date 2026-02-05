// record-status-postgres-repository.ts
import { prisma } from "../../../app";
import { RecordStatusEntity } from "../../../common/entity/record-status";
import { RecordStatusEntityMapper } from "../mapper/record-status-entity-mapper";

export class RecordStatusPostgresRepository {

    async findByName(name: string): Promise<RecordStatusEntity | null> {
        const statusModel = await prisma.recordStatus.findUnique({
            where: { name }, 
        });

        return RecordStatusEntityMapper.toDomain(statusModel);
    }

    async findById(id: string): Promise<RecordStatusEntity | null> {
        const statusModel = await prisma.recordStatus.findUnique({
            where: { id },
        });

        return RecordStatusEntityMapper.toDomain(statusModel);
    }

    async create(statusEntity: RecordStatusEntity): Promise<RecordStatusEntity | null> {
        const data = RecordStatusEntityMapper.toModel(statusEntity);

        const statusModel = await prisma.recordStatus.create({
            data: {
                id: data.id,
                name: data.name,
            },
        });

        return RecordStatusEntityMapper.toDomain(statusModel);
    }

    async findAll(): Promise<RecordStatusEntity[]> {
        const statusModels = await prisma.recordStatus.findMany();
        return RecordStatusEntityMapper.toDomainList(statusModels);
    }
}
