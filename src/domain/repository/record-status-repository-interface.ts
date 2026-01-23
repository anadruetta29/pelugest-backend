import { RecordStatusEntity } from "../../common/entity/record-status";

export interface RecordStatusRepositoryI {

    findById(id: string): Promise<RecordStatusEntity | null>;

    findByName(name: string): Promise<RecordStatusEntity | null>;

    getAll(): Promise<RecordStatusEntity[]>;
    
}
