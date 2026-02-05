import { prisma } from "../../app";
import { RecordStatusEntity } from "../../common/entity/record-status";
import { RecordStatusEntityMapper, RecordStatusModel } from "../postgres/mapper/record-status-entity-mapper";

export class RecordStatusRepository {

    async findById(id: string): Promise<RecordStatusEntity | null> {
        const model = await prisma.recordStatus.findUnique({
            where: { id },
        });

        return RecordStatusEntityMapper.toDomain(model as RecordStatusModel);
    }

    async findByName(name: string): Promise<RecordStatusEntity | null> {
        const model = await prisma.recordStatus.findUnique({
            where: { name },
        });

        return RecordStatusEntityMapper.toDomain(model as RecordStatusModel);
    }

    async getAll(): Promise<RecordStatusEntity[]> {
        const models = await prisma.recordStatus.findMany();
        return RecordStatusEntityMapper.toDomainList(models as RecordStatusModel[]);
    }

}
