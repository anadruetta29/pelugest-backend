import { RecordStatus as PrismaRecordStatus } from "@prisma/client";
import { RecordStatusEntity } from "../../../common/entity/record-status";

export type RecordStatusModel = PrismaRecordStatus;

export class RecordStatusEntityMapper {

    public static toDomain(statusModel: RecordStatusModel | null): RecordStatusEntity | null {
        if (!statusModel) return null;

        return RecordStatusEntity.fromObject({
            id: statusModel.id,
            name: statusModel.name,
        });
    }

    public static toModel(status: RecordStatusEntity | null): any {
        if (!status) return null;

        return {
            id: status.id,
            name: status.name,
        };
    }

    public static toDomainList(statusModels: RecordStatusModel[] | null | undefined): RecordStatusEntity[] {
        if (!statusModels) return [];

        return statusModels
            .map(model => this.toDomain(model))
            .filter((status): status is RecordStatusEntity => status !== null);
    }
    
}