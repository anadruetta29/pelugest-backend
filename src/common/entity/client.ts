import { RecordStatusEntity } from "./record-status";

export class ClientEntity {
    private constructor(
        public id: string,
        public name: string,
        public surname: string,
        public mobilePhoneNumber: string,
        public landlinePhoneNumber: string,
        public status: RecordStatusEntity
    ) {}

    static fromObject(object: {[key: string]: any}): ClientEntity {
        return new ClientEntity(object.id,
            object.name, 
            object.surname,
            object.mobilePhoneNumber,
            object.landlinePhoneNumber,
            object.status
        )
    }
}